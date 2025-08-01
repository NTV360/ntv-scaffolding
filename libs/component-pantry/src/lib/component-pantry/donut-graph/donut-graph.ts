import {
  Component,
  ViewChild,
  input,
  computed,
  signal,
  AfterViewInit,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  DonutChartConfig,
  DonutChartItem,
  DonutChartOptions,
} from './donut-graph.types';
import {
  DONUT_GRAPH_DEFAULT_COLORS,
  DONUT_GRAPH_SIZE_PRESETS,
  DONUT_GRAPH_DEFAULTS,
  DONUT_GRAPH_CHART_TYPE,
  DONUT_GRAPH_RESPONSIVE_CONFIG,
  DONUT_CHART_SIZES,
  DONUT_LEGEND_LAYOUTS,
} from './donut-graph.constants';
import {
  getColors,
  setupEffects,
  updateCustomSize,
  setupChartHoverListeners as setupChartHoverListenersUtil,
  getDonutSize as getDonutSizeUtil,
  calculatePercentage as calculatePercentageUtil,
  onChartSegmentHover as onChartSegmentHoverUtil,
  onLegendItemHover as onLegendItemHoverUtil,
  updateChartHoverEffects as updateChartHoverEffectsUtil,
} from './donut-graph.utils';
import { FILE_ICONS } from '../../utils/file-icons';

/**
 * Donut Graph component that renders interactive donut charts.
 * Accepts data with labels and total numbers, displaying them as segments in a donut chart.
 *
 * @example
 * ```html
 * <ntv-donut-graph
 *   [data]="donutData"
 *   [config]="donutConfig">
 * </ntv-donut-graph>
 * ```
 */
@Component({
  selector: 'ntv-donut-graph',
  templateUrl: './donut-graph.html',
  styleUrls: ['./donut-graph.css'],
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
})
export class DonutGraphComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  public elementRef = inject(ElementRef);

  // Used to sanitize potentially unsafe HTML content for safe binding
  private sanitizer = inject(DomSanitizer);

  // Hover state management
  readonly hoveredIndex = signal<number | null>(null);

  // Legend dropdown state for mobile
  readonly isLegendDropdownOpen = signal<boolean>(false);

  // Container size tracking for auto size mode
  private resizeObserver?: ResizeObserver;
  private windowResizeHandler?: () => void;
  private containerSize = signal<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // SVG
  public readonly raspberryIcon: SafeHtml;

  // Inputs
  data = input.required<DonutChartItem[]>();
  config = input<DonutChartConfig>({});

  // Default colors for donut segments
  private readonly defaultColors = DONUT_GRAPH_DEFAULT_COLORS;

  // Computed properties
  /**
   * Total count for display
   */
  readonly totalCount = computed(() => {
    const config = this.config();
    if (config.totalCount !== undefined) {
      return config.totalCount;
    }
    return this.data().reduce((sum, item) => sum + item.total, 0);
  });

  /**
   * Display value based on hover state
   */
  readonly displayValue = computed(() => {
    const hoveredIndex = this.hoveredIndex();

    if (
      hoveredIndex !== null &&
      hoveredIndex >= 0 &&
      hoveredIndex < this.data().length
    ) {
      const hoveredValue = this.data()[hoveredIndex].total;
      return hoveredValue;
    }
    const totalValue = this.totalCount();
    return totalValue;
  });

  /**
   * Title to display
   */
  readonly title = computed(() => this.config().title || '');

  /**
   * Size configuration
   */
  readonly size = computed(() => this.config().size || 'medium');

  /**
   * Custom size configuration
   */
  readonly customSize = computed(() => this.config().customSize);

  /**
   * Whether component is in small size mode
   */
  readonly isSmall = computed(() => this.size() === 'small');

  /**
   * Whether component is in large size mode
   */
  readonly isLarge = computed(() => this.size() === 'large');

  /**
   * Whether component is in fullscreen mode
   */
  readonly isFullscreen = computed(() => this.size() === 'fullscreen');

  /**
   * Whether component is in auto size mode
   */
  readonly isAuto = computed(() => this.size() === 'auto');

  /**
   * Whether to use dropdown legend for mobile auto size
   */
  readonly shouldUseDropdownLegend = computed(() => {
    const isAuto = this.isAuto();
    const isMobile = this.isMobile();
    const containerSize = this.containerSize();

    // Use dropdown for mobile auto size or very small containers
    return isAuto && (isMobile || containerSize.width < 400);
  });

  /**
   * Whether the current viewport is mobile
   */
  readonly isMobile = computed(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  /**
   * Whether the current viewport is tablet
   */
  readonly isTablet = computed(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  });

  /**
   * Whether the current viewport is desktop
   */
  readonly isDesktop = computed(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024;
  });

  /**
   * Current viewport size category
   */
  readonly viewportSize = computed(() => {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  });

  /**
   * Computes the number of legend columns to display based on:
   * - Component size (e.g., 'small', 'medium', 'auto', etc.)
   * - Dataset length
   * - Device type (mobile vs desktop)
   * - Layout configuration from `DONUT_LEGEND_LAYOUTS`
   *
   * ### Behavior:
   * - **Mobile**: Always uses 1 column for vertical stacking and readability.
   * - **Non-mobile**:
   *    - If `layoutConfig.columns` is `'auto'`, columns are inferred by:
   *        - ≤ 6 items: 1 column
   *        - ≤ 12 items: 2 columns
   *        - > 12 items: up to 3 columns based on data length (1 per ~8 items)
   *    - If `layoutConfig.columns` is a number, that fixed column count is used.
   *    - Otherwise, defaults to 1.
   *
   * @returns {number} Number of legend columns to render
   */
  readonly legendColumns = computed(() => {
    const size = this.size();
    const dataLength = this.data().length;
    const isMobile = this.isMobile();

    // Mobile devices always use 1 column for vertical legend
    if (isMobile) return 1;

    const layoutConfig =
      DONUT_LEGEND_LAYOUTS[size as keyof typeof DONUT_LEGEND_LAYOUTS];

    if (layoutConfig.columns === 'auto') {
      if (dataLength <= 6) return 1;
      if (dataLength <= 12) return 2;
      return Math.min(3, Math.ceil(dataLength / 8)); // Cap at 3 columns
    }

    return typeof layoutConfig.columns === 'number' ? layoutConfig.columns : 1;
  });

  /**
   * Chart size configuration based on size preset
   */
  readonly chartSizeConfig = computed(() => {
    const size = this.size();
    return (
      DONUT_CHART_SIZES[size as keyof typeof DONUT_CHART_SIZES] ||
      DONUT_CHART_SIZES.medium
    );
  });

  /**
   * Computes the best position for the chart legend based on:
   * - Chart size mode (`auto` or fixed)
   * - Viewport type (`mobile`, `tablet`, or `desktop`)
   * - Container aspect ratio
   * - User-configured preference (if provided)
   *
   * ### Behavior:
   * - **Mobile**: Always uses `'bottom'` for better vertical stacking
   * - **Tablet**:
   *    - Portrait (aspect ratio < 1.2): `'bottom'`
   *    - Landscape: uses `config.legendPosition` or defaults to `'right'`
   * - **Desktop**:
   *    - Uses `config.legendPosition` or defaults to `'right'`
   * - **Auto mode**:
   *    - Mobile: `'bottom'`
   *    - Desktop/Tablet:
   *       - Landscape (aspect ratio ≥ 1.2): `'right'` (or user config)
   *       - Portrait: `'left'` (or user config)
   */
  readonly legendPosition = computed(() => {
    const config = this.config();
    const viewportSize = this.viewportSize();
    const size = this.size();

    if (size === 'auto') {
      if (viewportSize === 'mobile') return 'bottom';

      const { width, height } = this.containerSize();
      const aspectRatio = width / height;

      return aspectRatio >= 1.2
        ? config.legendPosition || 'right'
        : config.legendPosition || 'left';
    }

    if (viewportSize === 'mobile') return 'bottom';

    if (viewportSize === 'tablet') {
      const { width, height } = this.containerSize();
      const aspectRatio = width / height;

      return aspectRatio < 1.2 ? 'bottom' : config.legendPosition || 'right';
    }

    return config.legendPosition || 'right';
  });

  /**
   * Container styles based on size configuration with proper preset application
   */
  readonly containerStyles = computed(() => {
    const size = this.size();
    const customSize = this.customSize();

    if (customSize) {
      return customSize;
    }

    // For auto size, return empty object to let container determine size
    if (size === 'auto') {
      return {};
    }

    // Apply the size presets properly
    const preset =
      DONUT_GRAPH_SIZE_PRESETS[size as keyof typeof DONUT_GRAPH_SIZE_PRESETS];
    if (preset) {
      return {
        width: preset.width,
        height: preset.height,
        minWidth: preset.width,
        minHeight: preset.height,
      };
    }

    // Default to medium size if size is not recognized
    return {
      width: DONUT_GRAPH_SIZE_PRESETS.medium.width,
      height: DONUT_GRAPH_SIZE_PRESETS.medium.height,
    };
  });

  /**
   * Chart area styles based on constants instead of CSS classes
   */
  readonly chartAreaStyles = computed(() => {
    const size = this.size();
    const chartSizeConfig = this.chartSizeConfig();
    const legendPosition = this.legendPosition();

    if (size === 'auto') {
      // In auto mode, adjust chart size based on legend position
      if (legendPosition === 'right' || legendPosition === 'left') {
        // When legend is beside, chart should take available space
        return {
          width: '100%',
          height: '100%',
          aspectRatio: '1',
          maxWidth: '100%',
          maxHeight: '100%',
          flex: '1',
          minWidth: '200px',
          minHeight: '200px',
        };
      } else {
        // When legend is top/bottom, chart can be larger
        return {
          width: '100%',
          height: '100%',
          aspectRatio: '1',
          maxWidth: '100%',
          maxHeight: '100%',
        };
      }
    }

    // Use the container dimensions from constants
    const containerWidth = chartSizeConfig.container.width;
    const containerHeight = chartSizeConfig.container.height;

    return {
      width: containerWidth,
      height: containerHeight,
      aspectRatio: '1',
      maxWidth: containerWidth,
      maxHeight: containerHeight,
      minWidth: containerWidth,
      minHeight: containerHeight,
    };
  });

  constructor() {
    this.raspberryIcon = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['RASPBERRY']
    );
    setupEffects(this);
  }

  /**
   * Component lifecycle hook - called after view initialization
   */
  ngAfterViewInit(): void {
    updateCustomSize(this);
    this.updateChartWithConstants();
    this.setupChartHoverListeners();
    this.setupResizeObserver();
    this.setupClickOutsideHandler();
  }

  /**
   * Updates the chart with the current constants-based sizing
   */
  private updateChartWithConstants(): void {
    if (this.chart) {
      this.chart.updateOptions(this.chartOptions(), true, true);
    }
  }

  /**
   * Component lifecycle hook - called on component destruction
   */
  ngOnDestroy(): void {
    this.cleanupResizeObserver();
  }

  /**
   * Sets up a ResizeObserver and a window resize listener to track
   * changes in container and component dimensions.
   * Updates internal size state and triggers chart re-rendering.
   *
   * Only active when `auto` sizing mode is enabled.
   */
  private setupResizeObserver(): void {
    if (!this.isAuto()) return;

    const parentContainer = this.elementRef.nativeElement.parentElement;
    const componentElement = this.elementRef.nativeElement;

    if (!parentContainer) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        const parentRect = parentContainer.getBoundingClientRect();
        const componentRect = componentElement.getBoundingClientRect();

        const effectiveWidth = Math.min(parentRect.width, componentRect.width);
        const effectiveHeight = Math.min(
          parentRect.height,
          componentRect.height
        );

        this.containerSize.set({
          width: effectiveWidth,
          height: effectiveHeight,
        });
        this.updateChartSize();
      }
    });

    // Observe both parent container and component
    this.resizeObserver.observe(parentContainer);
    this.resizeObserver.observe(componentElement);

    // Initial size measurement
    const parentRect = parentContainer.getBoundingClientRect();
    const componentRect = componentElement.getBoundingClientRect();

    this.containerSize.set({
      width: Math.min(parentRect.width, componentRect.width),
      height: Math.min(parentRect.height, componentRect.height),
    });

    // Set up window resize listener for full responsiveness
    this.windowResizeHandler = () => {
      // Refresh viewport breakpoints
      this.isMobile();
      this.isTablet();
      this.isDesktop();
      this.viewportSize();
      this.legendPosition();

      // Update container dimensions
      if (this.isAuto()) {
        const newParentRect = parentContainer.getBoundingClientRect();
        const newComponentRect = componentElement.getBoundingClientRect();

        this.containerSize.set({
          width: Math.min(newParentRect.width, newComponentRect.width),
          height: Math.min(newParentRect.height, newComponentRect.height),
        });

        this.updateChartSize();
      }
    };

    window.addEventListener('resize', this.windowResizeHandler);
  }

  /**
   * Cleans up all resize-related observers and handlers.
   *
   * - Disconnects ResizeObserver
   * - Removes window resize listener
   * - Clears timeout used for debounced chart updates
   * - Removes global click handler (for dropdowns)
   */
  private cleanupResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }

    if (this.windowResizeHandler) {
      window.removeEventListener('resize', this.windowResizeHandler);
      this.windowResizeHandler = undefined;
    }

    if (this.updateTimeout) {
      window.clearTimeout(this.updateTimeout);
      this.updateTimeout = undefined;
    }

    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
      this.clickOutsideHandler = undefined;
    }
  }

  /**
   * Adds a global click listener to detect clicks outside the legend dropdown.
   * Automatically closes the dropdown when a click occurs elsewhere.
   */
  private setupClickOutsideHandler(): void {
    this.clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = this.elementRef.nativeElement.querySelector(
        '.donut-legend-dropdown-header'
      );

      if (dropdown && !dropdown.contains(target)) {
        this.closeLegendDropdown();
      }
    };

    document.addEventListener('click', this.clickOutsideHandler);
  }

  /**
   * Triggers a debounced update to the chart instance using the latest container dimensions.
   *
   * Prevents excessive re-rendering by delaying execution with a 100ms timeout.
   * No-op if chart is not initialized or not in auto mode.
   */
  private updateChartSize(): void {
    if (!this.isAuto() || !this.chart) return;

    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    this.updateTimeout = window.setTimeout(() => {
      const newOptions = this.chartOptions();
      this.chart?.updateOptions(newOptions, true, true);
    }, 100); // 100ms debounce delay
  }

  private updateTimeout?: number;
  private clickOutsideHandler?: (event: MouseEvent) => void;

  /**
   * Returns the auto-calculated chart width based on container size and device type.
   * Ensures a responsive layout with a minimum width for visibility.
   *
   * @returns {string} - Calculated width in pixels or '100%' if invalid container size.
   */
  private getAutoChartWidth(): string {
    return this.getAutoChartSize('width');
  }

  /**
   * Returns the auto-calculated chart height based on container size and device type.
   * Ensures a responsive layout with a minimum height for visibility.
   *
   * @returns {string} - Calculated height in pixels or '100%' if invalid container size.
   */
  private getAutoChartHeight(): string {
    return this.getAutoChartSize('height');
  }

  /**
   * Shared helper to compute chart dimension (width/height) responsively.
   * Applies minimum values and mobile-specific logic to ensure readability.
   *
   * @param {'width' | 'height'} dimensionType - The dimension being calculated (used for future expansion).
   * @returns {string} - Calculated dimension size with 'px' suffix or '100%' if invalid.
   */
  private getAutoChartSize(dimensionType: 'width' | 'height'): string {
    const { width, height } = this.containerSize();
    const isMobile = this.isMobile();

    if (width <= 0 || height <= 0) return '100%';

    const size = this.computeResponsiveSize(Math.min(width, height), isMobile);
    const minSize = isMobile ? 80 : 120;

    return `${Math.max(minSize, size)}px`;
  }

  /**
   * Calculates the responsive chart size based on container dimension and device type.
   * Uses predefined breakpoints and scaling factors to ensure consistency and flexibility.
   *
   * @param {number} containerSize - The smaller dimension of the container (width or height).
   * @param {boolean} isMobile - Indicates whether the device is mobile.
   * @returns {number} - Calculated size in pixels (numeric only, without unit).
   */
  private computeResponsiveSize(
    containerSize: number,
    isMobile: boolean
  ): number {
    const breakpoints = isMobile
      ? [
          { max: 120, factor: 0.8, min: 80 },
          { max: 200, factor: 0.7, min: 100 },
          { max: 300, factor: 0.6, min: 140 },
          { max: 500, factor: 0.5, min: 180 },
          { max: Infinity, factor: 0.4, min: 200 },
        ]
      : [
          { max: 200, factor: 0.8, min: 120 },
          { max: 400, factor: 0.7, min: 200 },
          { max: 600, factor: 0.6, min: 300 },
          { max: 800, factor: 0.5, min: 400 },
          { max: Infinity, factor: 0.4, min: 500 },
        ];

    const { factor, min } = breakpoints.find((b) => containerSize < b.max)!;
    return Math.max(min, containerSize * factor);
  }

  /**
   * Enhanced chart options with improved centering configuration
   */
  readonly chartOptions = computed<Partial<DonutChartOptions>>(() => {
    const chartData = this.data();
    const config = this.config();
    const containerSize = this.containerSize();
    const chartSizeConfig = this.chartSizeConfig();

    // Get the actual chart dimensions from constants
    const getChartDimensions = () => {
      if (this.isAuto()) {
        return {
          height: this.getAutoChartHeight(),
          width: this.getAutoChartWidth(),
        };
      }

      // Use the container dimensions from constants
      return {
        height: parseInt(chartSizeConfig.container.height),
        width: parseInt(chartSizeConfig.container.width),
      };
    };

    const dimensions = getChartDimensions();

    return {
      series: chartData.map((item) => item.total),
      chart: {
        type: DONUT_GRAPH_CHART_TYPE,
        height: dimensions.height,
        width: dimensions.width,
        fontFamily: DONUT_GRAPH_DEFAULTS.fontFamily,
        toolbar: {
          show: DONUT_GRAPH_DEFAULTS.showToolbar,
        },
        // Enhanced centering configuration
        offsetX: 0,
        offsetY: 0,
        // Ensure chart maintains aspect ratio
        sparkline: {
          enabled: false,
        },
        // Background configuration for better centering
        background: 'transparent',
      },
      colors: getColors(chartData, config),
      labels: [], // Disable labels to prevent text on chart segments
      dataLabels: {
        enabled: false, // Always disable data labels
      },
      legend: {
        show: false, // Always disable built-in legend
      },
      plotOptions: {
        pie: {
          donut: {
            size: this.getDonutSize(),
            labels: {
              show: false, // Critical: disable all labels
            },
            // Enhanced donut configuration
            background: 'transparent',
          },
          // Disable expansion and maintain centering
          expandOnClick: false,
          offsetX: 0,
          offsetY: 0,
        },
      },
      stroke: {
        width: config.strokeWidth || DONUT_GRAPH_DEFAULTS.strokeWidth,
        colors: DONUT_GRAPH_DEFAULTS.strokeColors,
      },
      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.1,
          },
        },
        active: {
          filter: {
            type: 'darken',
            value: 0.1,
          },
        },
      },
      tooltip: {
        enabled: false, // Disable tooltips for cleaner appearance
      },
      title: {
        text: '',
        align: 'center', // Center align title
        style: {
          fontSize: DONUT_GRAPH_DEFAULTS.titleFontSize,
          fontWeight: DONUT_GRAPH_DEFAULTS.titleFontWeight,
          fontFamily: DONUT_GRAPH_DEFAULTS.fontFamily,
          color: DONUT_GRAPH_DEFAULTS.titleColor,
        },
      },
      // Enhanced responsive configuration
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              offsetX: 0,
              offsetY: 0,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '30%', // Smaller donut on mobile for better text visibility
                },
                offsetX: 0,
                offsetY: 0,
              },
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
      ],
    };
  });

  /**
   * Enhanced donut size calculation based on total count for better visual balance
   * Larger totals get smaller holes (thicker segments), smaller totals get larger holes
   */
  public getDonutSize(): string {
    const size = this.size();
    const chartSizeConfig = this.chartSizeConfig();
    const isMobile = this.isMobile();
    const totalCount = this.totalCount();
    const baseDonutHole = parseInt(chartSizeConfig.donutHole);

    const totalAdjustments: { max: number; adjust: number; minCap?: number }[] =
      [
        { max: 10, adjust: +20, minCap: 85 },
        { max: 50, adjust: +15, minCap: 80 },
        { max: 100, adjust: +10, minCap: 75 },
        { max: 500, adjust: +5, minCap: 70 },
        { max: 1000, adjust: 0 },
        { max: 5000, adjust: -5, minCap: 45 },
        { max: 10000, adjust: -8, minCap: 42 },
        { max: 50000, adjust: -12, minCap: 38 },
        { max: 100000, adjust: -15, minCap: 35 },
        { max: 500000, adjust: -18, minCap: 32 },
        { max: 1000000, adjust: -22, minCap: 30 },
        { max: Infinity, adjust: -25, minCap: 25 },
      ];

    let adjustedSize = baseDonutHole;
    for (const { max, adjust, minCap } of totalAdjustments) {
      if (totalCount <= max) {
        adjustedSize =
          minCap !== undefined
            ? Math[minCap < baseDonutHole + adjust ? 'max' : 'min'](
                baseDonutHole + adjust,
                minCap
              )
            : baseDonutHole + adjust;
        break;
      }
    }

    if (isMobile) adjustedSize = Math.max(adjustedSize * 0.9, 25);

    if (size === 'small') {
      adjustedSize = Math.min(adjustedSize + 5, 75);
    } else if (size === 'auto') {
      const { width = 300, height = 300 } = this.containerSize();
      const minDimension = Math.min(width, height);
      if (minDimension < 200) {
        adjustedSize = Math.min(adjustedSize + 8, 70);
      }
    }

    return `${Math.round(adjustedSize)}%`;
  }

  /**
   * Gets the count range category for styling purposes
   */
  public getCountRange(): string {
    const totalCount = this.totalCount();
    const ranges = [
      { max: 100, label: 'small' },
      { max: 1000, label: 'medium' },
      { max: 10000, label: 'large' },
      { max: 100000, label: 'xlarge' },
      { max: 1000000, label: 'xxlarge' },
    ];

    return ranges.find((r) => totalCount <= r.max)?.label || 'massive';
  }

  /**
   * Gets the CSS class for center text based on total count
   */
  public getCenterTextClass(): string {
    return `count-${this.getCountRange()}`;
  }

  /**
   * Calculates responsive font size for center text based on total count and available space
   */
  public getCenterTextFontSize(): string {
    const totalCount = this.totalCount();
    const isMobile = this.isMobile();
    const size = this.size();
    const containerSize = this.containerSize();
    const chartSizeConfig = this.chartSizeConfig();

    // Get the current donut hole size percentage
    const donutHolePercent = parseInt(this.getDonutSize().replace('%', ''));

    // Calculate available space in the center based on chart size
    let availableCenterSpace: number;

    if (size === 'auto') {
      // For auto mode, use container size
      const minDimension = Math.min(
        containerSize.width || 300,
        containerSize.height || 300
      );
      availableCenterSpace = minDimension * (donutHolePercent / 100) * 0.6;
    } else {
      // For fixed sizes, use the chart container dimensions from constants
      const chartWidth = parseInt(chartSizeConfig.container.width);
      const chartHeight = parseInt(chartSizeConfig.container.height);
      const minChartDimension = Math.min(chartWidth, chartHeight);
      availableCenterSpace = minChartDimension * (donutHolePercent / 100) * 0.6;
    }

    // Determine font size based on digit count and available space
    const digitCount = totalCount.toString().length;
    let baseFontSize: number;

    // Enhanced size detection for better small graph handling
    const isSmallGraph = size === 'small' || availableCenterSpace < 100;
    const isVerySmallGraph = size === 'small' && availableCenterSpace < 60;

    if (isMobile) {
      // Mobile font sizing with better small graph support
      if (isVerySmallGraph) {
        // Very small graphs on mobile
        baseFontSize = Math.min(availableCenterSpace / 2.5, 10);
      } else if (isSmallGraph) {
        // Small graphs on mobile
        if (digitCount <= 2) {
          baseFontSize = Math.min(availableCenterSpace / 2, 12);
        } else if (digitCount <= 4) {
          baseFontSize = Math.min(availableCenterSpace / 2.5, 10);
        } else {
          baseFontSize = Math.min(availableCenterSpace / 3, 8);
        }
      } else {
        // Normal mobile sizing
        if (digitCount <= 2) {
          baseFontSize = Math.min(availableCenterSpace / 1.8, 18);
        } else if (digitCount <= 4) {
          baseFontSize = Math.min(availableCenterSpace / 2.2, 16);
        } else if (digitCount <= 6) {
          baseFontSize = Math.min(availableCenterSpace / 2.8, 14);
        } else {
          baseFontSize = Math.min(availableCenterSpace / 3.5, 12);
        }
      }
      baseFontSize = Math.max(baseFontSize, 6); // Lower minimum for mobile
    } else {
      // Desktop font sizing with better small graph support
      if (isVerySmallGraph) {
        // Very small graphs on desktop
        baseFontSize = Math.min(availableCenterSpace / 2, 14);
      } else if (isSmallGraph) {
        // Small graphs on desktop
        if (digitCount <= 2) {
          baseFontSize = Math.min(availableCenterSpace / 1.8, 18);
        } else if (digitCount <= 4) {
          baseFontSize = Math.min(availableCenterSpace / 2.2, 16);
        } else {
          baseFontSize = Math.min(availableCenterSpace / 2.8, 14);
        }
      } else {
        // Normal desktop sizing
        if (digitCount <= 2) {
          baseFontSize = Math.min(availableCenterSpace / 1.5, 32);
        } else if (digitCount <= 4) {
          baseFontSize = Math.min(availableCenterSpace / 2, 28);
        } else if (digitCount <= 6) {
          baseFontSize = Math.min(availableCenterSpace / 2.5, 24);
        } else {
          baseFontSize = Math.min(availableCenterSpace / 3, 20);
        }
      }
      baseFontSize = Math.max(baseFontSize, 10); // Lower minimum for desktop
    }

    // Size-specific adjustments with better small graph handling
    switch (size) {
      case 'small':
        baseFontSize *= 1.1;
        break;
      case 'medium':
        baseFontSize *= 1.5;
        break;
      case 'large':
        baseFontSize *= 1.15;
        break;
      case 'fullscreen':
        baseFontSize *= 1.3;
        break;
      case 'auto':
        // Auto mode gets adaptive sizing based on available space
        if (availableCenterSpace < 80) {
          baseFontSize *= 0.85;
        } else if (availableCenterSpace > 200) {
          baseFontSize *= 1.1;
        }
        break;
    }

    return `${Math.round(baseFontSize)}px`;
  }

  /**
   * Formats numbers to display exact values without abbreviations
   */
  public formatLargeNumber(num: number): string {
    return num.toString();
  }

  /**
   * Gets display value with exact number formatting
   */
  public getFormattedDisplayValue(): string {
    const value = this.displayValue();
    return value.toString();
  }

  /**
   * Enhanced display value with exact number formatting
   */
  readonly formattedDisplayValue = computed(() => {
    const value = this.displayValue();
    return value.toString();
  });

  /**
   * Gets colors for chart segments using the utility function
   */
  public getColors(data: DonutChartItem[], config: DonutChartConfig): string[] {
    return getColors(data, config);
  }

  /**
   * Sets up hover event listeners for chart segments
   */
  public setupChartHoverListeners(): void {
    setupChartHoverListenersUtil(this);
  }

  /**
   * Calculates percentage for a given value
   * @param value - The value to calculate percentage for
   * @returns Percentage as a string
   */
  public calculatePercentage(value: number): string {
    return calculatePercentageUtil(value, this);
  }

  public onChartSegmentHover(index: number, isHovering: boolean): void {
    onChartSegmentHoverUtil(index, isHovering, this);
  }

  public onLegendItemHover(index: number, isHovering: boolean): void {
    onLegendItemHoverUtil(index, isHovering, this);
  }

  public updateChartHoverEffects(): void {
    updateChartHoverEffectsUtil(this);
  }

  /**
   * Toggles the legend dropdown visibility
   */
  public toggleLegendDropdown(): void {
    this.isLegendDropdownOpen.update((current) => !current);
  }

  /**
   * Closes the legend dropdown
   */
  public closeLegendDropdown(): void {
    this.isLegendDropdownOpen.set(false);
  }

  /**
   * Calculates the column index for multi-column legend layout
   */
  public getLegendColumnIndex(index: number): number {
    return Math.floor(
      index / Math.ceil(this.data().length / this.legendColumns())
    );
  }
}
