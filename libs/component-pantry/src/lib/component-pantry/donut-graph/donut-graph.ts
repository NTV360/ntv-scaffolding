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
   * Chart options for ApexCharts
   */
  readonly chartOptions = computed<Partial<DonutChartOptions>>(() => {
    const chartData = this.data();
    const config = this.config();
    const containerSize = this.containerSize();

    return {
      series: chartData.map((item) => item.total),
      chart: {
        type: DONUT_GRAPH_CHART_TYPE,
        height: this.isAuto() ? this.getAutoChartHeight() : '100%',
        width: this.isAuto() ? this.getAutoChartWidth() : '100%',
        fontFamily: DONUT_GRAPH_DEFAULTS.fontFamily,
        toolbar: {
          show: DONUT_GRAPH_DEFAULTS.showToolbar,
        },
        offsetX: 0,
        offsetY: 0,
      },
      colors: getColors(chartData, config),
      labels: [], // Disable labels to prevent text on chart segments
      dataLabels: {
        enabled: false, // Always disable data labels - we use our custom legend
      },
      legend: {
        show: false, // Always disable built-in legend - we use our custom legend
      },
      plotOptions: {
        pie: {
          donut: {
            size: this.getDonutSize(),
            labels: {
              show: false,
            },
          },
          expandOnClick: false,
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
        enabled: false,
      },
      title: {
        text: '',
        align: 'left',
        style: {
          fontSize: DONUT_GRAPH_DEFAULTS.titleFontSize,
          fontWeight: DONUT_GRAPH_DEFAULTS.titleFontWeight,
          fontFamily: DONUT_GRAPH_DEFAULTS.fontFamily,
          color: DONUT_GRAPH_DEFAULTS.titleColor,
        },
      },
      subtitle: {
        text: config.subtitle || '',
        align: 'left',
        style: {
          fontSize: DONUT_GRAPH_DEFAULTS.subtitleFontSize,
          fontWeight: DONUT_GRAPH_DEFAULTS.subtitleFontWeight,
          fontFamily: DONUT_GRAPH_DEFAULTS.fontFamily,
          color: DONUT_GRAPH_DEFAULTS.subtitleColor,
        },
      },
      responsive: DONUT_GRAPH_RESPONSIVE_CONFIG,
    };
  });

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
   * Whether the current viewport is mobile
   */
  readonly isMobile = computed(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  /**
   * Legend position with mobile detection
   */
  readonly legendPosition = computed(() => {
    const config = this.config();
    const isMobile = this.isMobile();

    // If mobile and no specific position is set, default to bottom
    if (isMobile && !config.legendPosition) {
      return 'bottom';
    }

    // Use config position or default to right
    return config.legendPosition || 'right';
  });

  /**
   * Container styles based on size configuration
   */
  readonly containerStyles = computed(() => {
    const size = this.size();
    const customSize = this.customSize();

    if (customSize) {
      return customSize;
    }

    // For all sizes, return empty object to let container determine size
    if (
      size === 'auto' ||
      size === 'small' ||
      size === 'medium' ||
      size === 'large' ||
      size === 'fullscreen'
    ) {
      return {};
    }

    return (
      DONUT_GRAPH_SIZE_PRESETS[size as keyof typeof DONUT_GRAPH_SIZE_PRESETS] ||
      DONUT_GRAPH_SIZE_PRESETS.medium
    );
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
    this.chart?.updateOptions(this.chartOptions(), true, true);
    this.setupChartHoverListeners();
    this.setupResizeObserver();
  }

  /**
   * Component lifecycle hook - called on component destruction
   */
  ngOnDestroy(): void {
    this.cleanupResizeObserver();
  }

  /**
   * Sets up ResizeObserver to track parent container size changes
   */
  private setupResizeObserver(): void {
    if (!this.isAuto()) return;

    // Observe the parent container instead of the component itself
    const parentContainer = this.elementRef.nativeElement.parentElement;
    if (!parentContainer) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.containerSize.set({ width, height });
        this.updateChartSize();
      }
    });

    this.resizeObserver.observe(parentContainer);

    // Initial size measurement
    const rect = parentContainer.getBoundingClientRect();
    this.containerSize.set({ width: rect.width, height: rect.height });

    // Set up window resize listener for mobile detection
    this.windowResizeHandler = () => {
      // Force recomputation of mobile state
      this.isMobile();
      this.legendPosition();
    };

    window.addEventListener('resize', this.windowResizeHandler);
  }

  /**
   * Cleans up ResizeObserver and window resize handler
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
  }

  /**
   * Updates chart size based on container dimensions
   */
  private updateChartSize(): void {
    if (!this.isAuto() || !this.chart) return;

    const newOptions = this.chartOptions();
    this.chart.updateOptions(newOptions, true, true);
  }

  /**
   * Gets the chart width for auto size mode
   */
  private getAutoChartWidth(): string {
    const containerSize = this.containerSize();
    const width = containerSize.width;

    if (width <= 0) return '100%';

    // For auto size, use the full available width
    // The chart will be constrained by the container's CSS
    return '100%';
  }

  /**
   * Gets the chart height for auto size mode
   */
  private getAutoChartHeight(): string {
    const containerSize = this.containerSize();
    const height = containerSize.height;

    if (height <= 0) return '100%';

    // For auto size, use the full available height
    // The chart will be constrained by the container's CSS
    return '100%';
  }

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
   * Gets the donut hole size based on current size variant
   */
  public getDonutSize(): string {
    return getDonutSizeUtil(this);
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
}
