import {
  Component,
  ViewChild,
  input,
  computed,
  signal,
  effect,
  AfterViewInit,
  ElementRef,
  inject,
  output,
  HostListener,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import {
  ChartOptions,
  GraphConfig,
  GraphVariant,
  FilterEvent,
  MonthKey,
} from './graph.types';
import {
  MONTH_CATEGORIES,
  WEEK_CATEGORIES,
  getFullMonthName,
  MONTH_KEYS,
} from './graph.constants';
import {
  findBestAvailableYear,
  getDefaultYear,
  ChartConfigBuilder,
  DataProcessor,
  ChartOptionsFactory,
} from './graph.utils';
import { FILE_ICONS } from '../../utils/file-icons';

/**
 * Graph component that renders interactive charts with filtering capabilities.
 * Supports line and bar chart types with monthly/yearly time frame filtering.
 *
 * @example
 * ```html
 * <ntv-graph
 *   [config]="graphConfig"
 *   (filterChange)="onFilterChange($event)">
 * </ntv-graph>
 * ```
 */
@Component({
  selector: 'ntv-graph',
  templateUrl: './graph.html',
  styleUrls: ['./graph.css'],
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('chart') chart!: ChartComponent;
  private elementRef = inject(ElementRef);

  // Inputs and outputs
  config = input.required<GraphConfig>();
  filterChange = output<FilterEvent>();

  // Internal state signals
  private _chartType = signal<'line' | 'bar'>('line');
  private _timeFrame = signal<'month' | 'year'>('month');
  private _selectedMonth = signal<string>('default');
  private _selectedYear = signal<string>(getDefaultYear());

  // Dropdown state signals
  private _monthDropdownOpen = signal<boolean>(false);
  private _yearDropdownOpen = signal<boolean>(false);

  /** Chart type strategies for cleaner variant handling */
  private readonly chartTypeStrategies = {
    [GraphVariant.LineWithLegend]: 'line',
    [GraphVariant.LineWithFilterLegend]: 'line',
    [GraphVariant.BarWithLegend]: 'bar',
    [GraphVariant.BarWithFilterLegend]: 'bar',
  } as const;

  /** Filter visibility strategies */
  private readonly filterVisibilityStrategies = new Set([
    GraphVariant.LineWithFilterLegend,
    GraphVariant.BarWithFilterLegend,
  ]);

  /** Size detection strategies */
  private readonly sizeStrategies = {
    isSmall: (config: GraphConfig) =>
      config.size === 'small' ||
      config.customSize?.height === '200px' ||
      config.customSize?.width === '300px',
    isFullscreen: (config: GraphConfig) => config.size === 'fullscreen',
  };

  /** CSS properties that can be reset */
  private readonly resetableStyleProperties = [
    'width',
    'height',
    'maxWidth',
    'maxHeight',
    'minWidth',
    'minHeight',
  ] as const;

  // Computed properties

  /**
   * Current graph variant with fallback to default
   */
  readonly variant = computed(
    () => this.config().variant || GraphVariant.LineWithLegend
  );

  /**
   * Whether filter controls should be visible based on variant
   */
  readonly showFilters = computed(() =>
    this.filterVisibilityStrategies.has(this.variant())
  );

  /**
   * Current chart type derived from internal state or variant
   */
  readonly chartType = computed(() => {
    const internalType = this._chartType();
    return internalType || this.getChartTypeFromVariant(this.variant());
  });

  /**
   * Current time frame selection with intelligent defaults
   */
  readonly selectedTimeFrame = computed(() => {
    const config = this.config();

    return (
      config.selectedTimeFrame ||
      (this.selectedMonth() !== 'default' ? 'month' : 'year')
    );
  });

  /**
   * Currently selected month
   */
  readonly selectedMonth = computed(
    () => this.config().selectedMonth || this._selectedMonth()
  );

  /**
   * Currently selected year with intelligent fallback strategy
   */
  readonly selectedYear = computed(() => {
    const config = this.config();

    return (
      config.selectedYear ||
      this.getBestAvailableYear(config) ||
      String(new Date().getFullYear())
    );
  });

  /**
   * Available monthly time frame options
   */
  readonly monthlyTimeFrames = computed(() => {
    const config = this.config();

    // If graphData is present, always use dynamically generated frames
    if (config.graphData) {
      return this.generateMonthlyTimeFrames(config);
    }

    // Otherwise, use static timeFrames from config
    return config.timeFrames?.monthly || this.generateMonthlyTimeFrames(config);
  });

  /**
   * Available yearly time frame options
   */
  readonly yearlyTimeFrames = computed(() => {
    const config = this.config();

    return config.timeFrames?.yearly || this.generateYearlyTimeFrames(config);
  });

  /**
   * Monthly time frames excluding default option
   */
  readonly filteredMonthlyTimeFrames = computed(() =>
    this.monthlyTimeFrames().filter((frame) => frame.value !== 'default')
  );

  /**
   * Yearly time frames excluding default option
   */
  readonly filteredYearlyTimeFrames = computed(() =>
    this.yearlyTimeFrames().filter((frame) => frame.value !== 'default')
  );

  /**
   * Complete chart options configuration
   */
  readonly chartOptions = computed<Partial<ChartOptions>>(() => {
    const config = this.config();
    const timeFrame = config.selectedTimeFrame || this._timeFrame();
    const selectedMonth = config.selectedMonth || this._selectedMonth();
    const selectedYear = this.selectedYear();

    return ChartOptionsFactory.create(
      config,
      this.chartType(),
      timeFrame,
      selectedMonth,
      selectedYear
    );
  });

  /**
   * Dropdown state computed properties
   */
  readonly isMonthDropdownOpen = computed(() => this._monthDropdownOpen());
  readonly isYearDropdownOpen = computed(() => this._yearDropdownOpen());

  /** Sanitized dropdown icon */
  public readonly dropdownIcon: SafeHtml;

  constructor() {
    this.dropdownIcon = inject(DomSanitizer).bypassSecurityTrustHtml(
      FILE_ICONS['DROPDOWN']
    );
    this.setupEffects();
  }

  /**
   * Initializes reactive effects for chart updates and state management
   * @private
   */
  private setupEffects(): void {
    // Chart update effect
    effect(() => {
      this.chart?.updateOptions(this.chartOptions(), true, true);
    });

    // Custom size effect
    effect(() => this.updateCustomSize());

    // Reset chart type when variant changes
    effect(() => this.resetChartType());
  }

  /**
   * Gets chart type from variant using strategy pattern
   * @param variant - Current graph variant
   * @returns Chart type ('line' or 'bar')
   * @private
   */
  private getChartTypeFromVariant(variant: GraphVariant): 'line' | 'bar' {
    return (this.chartTypeStrategies[variant] || 'line') as 'line' | 'bar';
  }

  /**
   * Gets the best available year using fallback strategy
   * @param config - Graph configuration
   * @returns Best available year or null
   * @private
   */
  private getBestAvailableYear(config: GraphConfig): string | null {
    const userSelectedYear = this._selectedYear();

    if (userSelectedYear !== getDefaultYear()) {
      return userSelectedYear;
    }

    return config.graphData ? findBestAvailableYear(config.graphData) : null;
  }

  /**
   * Generates monthly time frame options from graph data
   * @param config - Graph configuration
   * @returns Array of monthly time frame options
   * @private
   */
  private generateMonthlyTimeFrames(config: GraphConfig) {
    const defaultFrame = {
      value: 'default',
      label: 'Month',
      categories: MONTH_CATEGORIES,
    };

    const selectedYear = this.selectedYear();
    const yearData = config.graphData?.[selectedYear];

    if (!yearData) {
      return [
        defaultFrame,
        ...MONTH_KEYS.map((month) => ({
          value: month,
          label: getFullMonthName(
            month.charAt(0).toUpperCase() + month.slice(1)
          ),
          categories: WEEK_CATEGORIES,
        })),
      ];
    }

    // Get all available months from any category in the year data
    const allAvailableMonths = new Set<MonthKey>();

    Object.keys(yearData).forEach((category) => {
      const categoryData = yearData[category as keyof typeof yearData];
      if (categoryData && typeof categoryData === 'object') {
        Object.keys(categoryData).forEach((month) => {
          if (MONTH_KEYS.includes(month as MonthKey)) {
            allAvailableMonths.add(month as MonthKey);
          }
        });
      }
    });

    // Sort months chronologically
    const sortedMonths = Array.from(allAvailableMonths).sort(
      (a, b) => MONTH_KEYS.indexOf(a) - MONTH_KEYS.indexOf(b)
    );

    return [
      defaultFrame,
      ...sortedMonths.map((month) => ({
        value: month,
        label: getFullMonthName(month.charAt(0).toUpperCase() + month.slice(1)),
        categories: WEEK_CATEGORIES,
      })),
    ];
  }

  /**
   * Generates yearly time frame options from graph data
   * @param config - Graph configuration
   * @returns Array of yearly time frame options
   * @private
   */
  private generateYearlyTimeFrames(config: GraphConfig) {
    const defaultFrame = {
      value: 'default',
      label: 'Year',
      categories: MONTH_CATEGORIES,
    };

    const availableYears = config.graphData
      ? Object.keys(config.graphData).sort((a, b) => Number(a) - Number(b))
      : this.getDefaultYearRange();

    return [
      defaultFrame,
      ...availableYears.map((year) => ({
        value: year,
        label: year,
        categories: MONTH_CATEGORIES,
      })),
    ];
  }

  /**
   * Gets default year range when no data is available
   * @returns Array of default years
   * @private
   */
  private getDefaultYearRange(): string[] {
    const currentYear = new Date().getFullYear();
    return [String(currentYear - 1), String(currentYear)];
  }

  /**
   * Updates custom container sizing
   * @private
   */
  private updateCustomSize(): void {
    const customSize = this.config().customSize;
    const container =
      this.elementRef?.nativeElement?.querySelector('.graph-content');

    if (!container) return;

    // Reset styles first
    this.resetableStyleProperties.forEach((prop) => {
      container.style[prop as any] = '';
    });

    // Apply custom styles if provided
    if (customSize) {
      Object.entries(customSize).forEach(([property, value]) => {
        container.style[property as any] = value || '';
      });
    }
  }

  /**
   * Resets chart type to variant default
   * @private
   */
  private resetChartType(): void {
    const defaultType = this.getChartTypeFromVariant(this.variant());
    this._chartType.set(defaultType);
  }

  /**
   * Updates chart with animation for type changes
   * @param newType - New chart type
   * @private
   */
  private updateChartWithAnimation(newType: 'line' | 'bar'): void {
    if (!this.chart) return;

    const currentCategories = this.chartOptions().xaxis?.categories || [];
    const fillConfig =
      newType === 'bar' ? { fill: { type: 'solid', opacity: 0 } } : {};

    const options = {
      chart: {
        type: newType,
        animations: ChartConfigBuilder.createAnimationConfig(),
      },
      xaxis: ChartConfigBuilder.createXAxisConfig(
        newType,
        currentCategories,
        DataProcessor.isWeeklyView(this._timeFrame(), this._selectedMonth())
      ),
      ...fillConfig,
    };

    this.chart.updateOptions(options, true, true);
  }

  /**
   * Updates filter state and emits change event
   * @param timeFrame - Time frame type ('month' | 'year')
   * @param value - Selected value
   * @private
   */
  private updateFilters(timeFrame: 'month' | 'year', value: string): void {
    this._timeFrame.set(timeFrame);

    const updateStrategies = {
      month: () => this._selectedMonth.set(value),
      year: () => {
        this._selectedYear.set(value);
        this._selectedMonth.set('default');
      },
    };

    updateStrategies[timeFrame]();
    this.emitFilterChange();
  }

  /**
   * Emits filter change event and updates chart
   * @private
   */
  private emitFilterChange(): void {
    const filterEvent: FilterEvent = {
      timeFrame: this._timeFrame(),
      month: this._selectedMonth(),
      year: this._selectedYear(),
    };

    this.filterChange.emit(filterEvent);
    this.chart?.updateOptions(this.chartOptions(), true, true);
  }

  /**
   * Closes all dropdown menus
   * @private
   */
  private closeAllDropdowns(): void {
    this._monthDropdownOpen.set(false);
    this._yearDropdownOpen.set(false);
  }

  /**
   * Toggles dropdown state with mutual exclusion
   * @param dropdownType - Type of dropdown to toggle
   * @param currentState - Current dropdown state signal
   * @param otherState - Other dropdown state signal to close
   * @private
   */
  private toggleDropdownExclusive(
    currentState: ReturnType<typeof signal<boolean>>,
    otherState: ReturnType<typeof signal<boolean>>
  ): void {
    const isOpening = !currentState();
    currentState.set(isOpening);

    if (isOpening) {
      otherState.set(false);
    }
  }

  // Public API methods

  /**
   * Checks if component is in small size mode
   * @returns True if component should render in small mode
   */
  isSmall(): boolean {
    return this.sizeStrategies.isSmall(this.config());
  }

  /**
   * Checks if component is in fullscreen mode
   * @returns True if component should render in fullscreen mode
   */
  isFullscreen(): boolean {
    return this.sizeStrategies.isFullscreen(this.config());
  }

  /**
   * Component lifecycle hook - called after view initialization
   */
  ngAfterViewInit(): void {
    this.updateCustomSize();
    this.chart?.updateOptions(this.chartOptions(), true, true);
  }

  /**
   * Global click handler to close dropdowns when clicking outside
   * @param event - Click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.custom-dropdown')) {
      this.closeAllDropdowns();
    }
  }

  // Event handlers

  /**
   * Handles month selection change from native select
   * @param event - Change event
   */
  onMonthChange(event: Event): void {
    const month = (event.target as HTMLSelectElement).value;
    this.updateFilters('month', month);
  }

  /**
   * Handles month selection change from custom dropdown
   * @param value - Selected month value
   */
  onMonthChangeFromModel(value: string): void {
    this.updateFilters('month', value);
  }

  /**
   * Handles year selection change
   * @param event - Change event
   */
  onYearChange(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.updateFilters('year', year);
  }

  /**
   * Toggles month dropdown visibility
   */
  toggleMonthDropdown(): void {
    this.toggleDropdownExclusive(
      this._monthDropdownOpen,
      this._yearDropdownOpen
    );
  }

  /**
   * Toggles year dropdown visibility
   */
  toggleYearDropdown(): void {
    this.toggleDropdownExclusive(
      this._yearDropdownOpen,
      this._monthDropdownOpen
    );
  }

  /**
   * Gets the display label for selected month
   * @returns Selected month label or default
   */
  getSelectedMonthLabel(): string {
    const selectedMonth = this.selectedMonth();
    const monthOption = this.monthlyTimeFrames().find(
      (m) => m.value === selectedMonth
    );
    return monthOption?.label || 'Month';
  }

  /**
   * Gets the display label for selected year
   * @returns Selected year label or default
   */
  getSelectedYearLabel(): string {
    const selectedYear = this.selectedYear();
    const yearOption = this.yearlyTimeFrames().find(
      (y) => y.value === selectedYear
    );
    return yearOption?.label || 'Year';
  }

  /**
   * Handles month checkbox selection in custom dropdown
   * @param value - Month value
   * @param event - Checkbox change event
   */
  onMonthCheckboxChange(value: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.updateFilters('month', value);
      this._monthDropdownOpen.set(false);
    }
  }

  /**
   * Handles year checkbox selection in custom dropdown
   * @param value - Year value
   * @param event - Checkbox change event
   */
  onYearCheckboxChange(value: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.updateFilters('year', value);
      this._yearDropdownOpen.set(false);
    }
  }

  /**
   * Toggles between line and bar chart types
   */
  toggleChartType(): void {
    const currentType = this._chartType();
    const newType = currentType === 'line' ? 'bar' : 'line';

    this._chartType.set(newType);
    this.updateChartWithAnimation(newType);
  }
}
