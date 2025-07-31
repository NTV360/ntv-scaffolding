import {
  MonthKey,
  GRAPH_SIZE_PRESETS,
  GraphConfig,
  ChartOptions,
} from './graph.types';
import {
  MONTH_CATEGORIES,
  MONTH_KEYS,
  getFullMonthName,
  DEFAULT_GRAPH_COLORS,
  WEEK_CATEGORIES,
} from './graph.constants';

/**
 * Standard data processing constants
 */
const WEEKS_PER_MONTH = 4;
const MONTHS_PER_YEAR = 12;
const TOTAL_WEEKS_PER_YEAR = 48;
const EXCLUDED_FIELDS = new Set(['active', 'downturn']);

/**
 * Returns an array of monthly totals based on the input
 * weekly data, handling incomplete month data gracefully.
 *
 * @param buckets - A record of MonthKey to weekly number arrays
 * @returns Array of monthly totals for available months
 *
 * @example
 * ```typescript
 * const buckets = { jan: [10, 20, 15, 25], feb: [30, 40] };
 * const totals = getMonthlyTotals(buckets); // [70, 70]
 * ```
 */
export function getMonthlyTotals(
  buckets: Record<MonthKey, number[]>
): number[] {
  const availableMonths = Object.keys(buckets).filter((month) => {
    const data = buckets[month as MonthKey];
    return data?.length > 0;
  }) as MonthKey[];

  return availableMonths.length === 0
    ? []
    : availableMonths
        .sort((a, b) => MONTH_KEYS.indexOf(a) - MONTH_KEYS.indexOf(b))
        .map(
          (month) => buckets[month]?.reduce((sum, val) => sum + val, 0) || 0
        );
}

/**
 * Returns the 4 weekly values for a given month key.
 * If fewer than 4 values exist, fills with zeros.
 *
 * @param buckets - A record of MonthKey to weekly number arrays
 * @param month - The selected month key (e.g., 'jan', 'feb')
 * @returns Exactly 4 weekly values
 *
 * @example
 * ```typescript
 * const buckets = { jan: [10, 20] };
 * const weeks = getWeeklyValues(buckets, 'jan'); // [10, 20, 0, 0]
 * ```
 */
export function getWeeklyValues(
  buckets: Record<MonthKey, number[]>,
  month: MonthKey
): number[] {
  const values = buckets[month] || [];
  return Array.from({ length: WEEKS_PER_MONTH }, (_, i) => values[i] ?? 0);
}

/**
 * Groups a flat array of 48 values (4 weeks × 12 months) into 12 monthly sums.
 *
 * @param flatData - Array of 48 numbers (weeks for each month, in order)
 * @returns Array of 12 numbers, each the sum of 4 weeks for a month
 *
 * @example
 * ```typescript
 * const flatData = new Array(48).fill(1); // All weeks have value 1
 * const monthly = groupFlatDataByMonth(flatData); // [4, 4, 4, ...] (12 months)
 * ```
 */
export function groupFlatDataByMonth(flatData: number[]): number[] {
  if (!Array.isArray(flatData) || flatData.length !== TOTAL_WEEKS_PER_YEAR) {
    return Array(MONTHS_PER_YEAR).fill(0);
  }

  return Array.from({ length: MONTHS_PER_YEAR }, (_, monthIndex) => {
    const startIndex = monthIndex * WEEKS_PER_MONTH;
    return flatData
      .slice(startIndex, startIndex + WEEKS_PER_MONTH)
      .reduce((sum, value) => sum + value, 0);
  });
}

/**
 * Finds the best available year from graph data, preferring current year
 * or falling back to the closest available year.
 *
 * @param graphData - Graph data object with year keys
 * @returns Best available year as string
 *
 * @example
 * ```typescript
 * const graphData = { '2022': {}, '2024': {} };
 * const bestYear = findBestAvailableYear(graphData); // '2024' (closest to current)
 * ```
 */
export function findBestAvailableYear(graphData: any): string {
  const currentYear = new Date().getFullYear();
  const currentYearStr = String(currentYear);

  if (!graphData) return currentYearStr;

  const availableYears = Object.keys(graphData).sort(
    (a, b) => Number(a) - Number(b)
  );

  if (availableYears.length === 0) return currentYearStr;
  if (availableYears.includes(currentYearStr)) return currentYearStr;

  // Find year with minimum distance from current year
  return availableYears.reduce((closest, year) => {
    const currentDistance = Math.abs(Number(closest) - currentYear);
    const candidateDistance = Math.abs(Number(year) - currentYear);
    return candidateDistance < currentDistance ? year : closest;
  });
}

/**
 * Gets the default year (current year) as a string.
 *
 * @returns Current year as string
 */
export function getDefaultYear(): string {
  return String(new Date().getFullYear());
}

/**
 * Builder class for creating chart configuration objects.
 * Provides static methods for generating consistent chart configurations.
 */
export class ChartConfigBuilder {
  /** Default size configuration */
  private static readonly DEFAULT_SIZE = { width: '100%', height: 400 };

  /** Animation configuration presets */
  private static readonly ANIMATION_PRESETS = {
    main: { enabled: true, easing: 'easeinout' as const, speed: 800 },
    gradual: { enabled: true, delay: 150 },
    dynamic: { enabled: true, speed: 350 },
  };

  /** Label style presets */
  private static readonly LABEL_STYLES = {
    default: { colors: '#666', fontSize: '12px', fontFamily: 'Nunito' },
    tooltip: { fontSize: '12px', fontWeight: '900', fontFamily: 'Nunito' },
  };

  /**
   * Creates size configuration based on graph config
   *
   * @param config - Graph configuration object
   * @returns Size configuration object
   */
  public static createSizeConfig(config: GraphConfig) {
    return (
      config.customSize ||
      (config.size && config.size !== 'custom'
        ? GRAPH_SIZE_PRESETS[config.size]
        : null) ||
      this.DEFAULT_SIZE
    );
  }

  /**
   * Creates comprehensive animation configuration
   *
   * @returns Animation configuration object
   */
  public static createAnimationConfig() {
    return {
      ...this.ANIMATION_PRESETS.main,
      animateGradually: this.ANIMATION_PRESETS.gradual,
      dynamicAnimation: this.ANIMATION_PRESETS.dynamic,
    };
  }

  /**
   * Creates data labels configuration (disabled by default)
   *
   * @returns Data labels configuration object
   */
  public static createDataLabelsConfig() {
    return {
      enabled: false,
      show: false,
      style: { fontSize: '0px', colors: ['transparent'], opacity: 0 },
      formatter: () => '',
      offsetY: 0,
      background: { enabled: false },
      dropShadow: { enabled: false },
      textAnchor: 'middle' as const,
      distributed: false,
      hideEmptyValues: true,
      showForNullValues: false,
      showForZeroValues: false,
      position: 'top' as const,
      opacity: 0,
      display: 'none',
    };
  }

  /**
   * Creates X-axis configuration
   *
   * @param chartType - Chart type ('line' or 'bar')
   * @param categories - Array of category labels
   * @param isWeeklyView - Whether this is a weekly view
   * @returns X-axis configuration object
   */
  public static createXAxisConfig(
    chartType: 'line' | 'bar',
    categories: string[],
    isWeeklyView = false
  ) {
    return {
      type: 'category' as const,
      categories: [...categories],
      labels: {
        style: this.LABEL_STYLES.default,
        show: true,
        rotate: 0,
        trim: false,
        hideOverlappingLabels: false,
        maxHeight: undefined,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickPlacement: 'on',
      position: 'bottom' as const,
      crosshairs: { show: false },
      tooltip: { enabled: false },
      floating: false,
      decimalsInFloat: 0,
      tickAmount: Math.max(0, categories.length - 1),
      ...this.createAxisDefaults(),
    };
  }

  /**
   * Creates Y-axis configuration
   *
   * @returns Y-axis configuration object
   */
  public static createYAxisConfig() {
    return {
      labels: {
        formatter: (value: number) => Math.round(value).toString(),
        style: this.LABEL_STYLES.default,
      },
      tickAmount: 20,
      min: 0,
      forceNiceScale: true,
    };
  }

  /**
   * Creates tooltip configuration
   *
   * @param isWeeklyView - Whether this is a weekly view
   * @returns Tooltip configuration object
   */
  public static createTooltipConfig(isWeeklyView: boolean) {
    return {
      enabled: true,
      shared: true,
      intersect: false,
      x: { show: true },
      y: { formatter: (value: number) => `${value}` },
      marker: { show: true },
      style: {
        ...this.LABEL_STYLES.tooltip,
        background: 'rgba(255, 255, 255, 0.8)',
      },
      fillSeriesColor: false,
      custom: this.createCustomTooltip(isWeeklyView),
    };
  }

  /**
   * Creates default axis properties
   *
   * @returns Default axis configuration
   * @private
   */
  private static createAxisDefaults() {
    return {
      min: undefined,
      max: undefined,
      range: undefined,
      hideEmptyCategories: false,
      forceNiceScale: false,
    };
  }

  /**
   * Creates custom tooltip formatter function
   *
   * @param isWeeklyView - Whether this is a weekly view
   * @returns Custom tooltip formatter function
   * @private
   */
  private static createCustomTooltip(isWeeklyView: boolean) {
    return function ({ series, dataPointIndex, w }: any): string {
      const categories = isWeeklyView ? WEEK_CATEGORIES : MONTH_CATEGORIES;
      const rawLabel =
        categories[dataPointIndex] || w.globals.labels[dataPointIndex];
      const label = isWeeklyView ? rawLabel : getFullMonthName(rawLabel);

      const tooltipRows = series
        .map((s: number[], i: number) => {
          const value = s?.[dataPointIndex] ?? 0;
          const seriesLabel = w.config.series?.[i]?.name || `Series ${i + 1}`;
          const color = w.config.colors?.[i] || '#ccc';

          return ChartConfigBuilder.createTooltipRow(seriesLabel, value, color);
        })
        .join('');

      return ChartConfigBuilder.createTooltipContainer(label, tooltipRows);
    };
  }

  /**
   * Creates a single tooltip row
   *
   * @param label - Series label
   * @param value - Series value
   * @param color - Series color
   * @returns HTML string for tooltip row
   * @private
   */
  private static createTooltipRow(
    label: string,
    value: number,
    color: string
  ): string {
    return `
      <div style="display: flex; align-items: center; margin-bottom: 4px;">
        <div style="width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 8px;"></div>
        <div style="flex: 1; margin-right: 15px;">${label}</div>
        <div>${value}</div>
      </div>
    `;
  }

  /**
   * Creates the tooltip container with styling
   *
   * @param label - Main tooltip label
   * @param content - Tooltip content rows
   * @returns Complete tooltip HTML
   * @private
   */
  private static createTooltipContainer(
    label: string,
    content: string
  ): string {
    return `
      <div style="
        padding: 10px;
        background: rgba(255, 255, 255, 0.51);
        border-radius: 8px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(3.3px);
        font-family: Nunito, sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: #333;
      ">
        <div style="margin-bottom: 8px; font-weight: 700; text-align: center; font-size: 14px; color: #333;">Comparison</div>
        <div style="margin-bottom: 8px; font-weight: 600; text-align: center; color: #666; font-size: 11px;">${label}</div>
        ${content}
      </div>
    `;
  }
}

/**
 * Data processing utility class for handling chart data transformations.
 */
export class DataProcessor {
  /**
   * Determines if the current view should show weekly data
   *
   * @param timeFrame - Current time frame ('month' or 'year')
   * @param selectedMonth - Selected month value
   * @returns True if weekly view should be shown
   */
  static isWeeklyView(timeFrame: string, selectedMonth: string): boolean {
    return (
      timeFrame === 'month' &&
      selectedMonth !== 'default' &&
      selectedMonth !== '' &&
      MONTH_KEYS.includes(selectedMonth as MonthKey)
    );
  }

  /**
   * Processes series data for chart display
   *
   * @param series - Raw series data
   * @param isWeeklyView - Whether to process for weekly view
   * @param selectedMonth - Selected month for weekly view
   * @returns Processed series data
   */
  static processSeriesData(
    series: any[],
    isWeeklyView: boolean,
    selectedMonth: string
  ): any[] {
    return series.map((s) =>
      this.isValidSeriesData(s.data)
        ? this.processSeriesItem(s, isWeeklyView, selectedMonth)
        : s
    );
  }

  /**
   * Creates series data from graph data structure
   *
   * @param graphData - Source graph data
   * @param selectedYear - Selected year
   * @param isWeeklyView - Whether to create weekly data
   * @param selectedMonth - Selected month for weekly view
   * @returns Array of series objects
   */
  static createSeriesFromGraphData(
    graphData: any,
    selectedYear: string,
    isWeeklyView: boolean,
    selectedMonth: MonthKey
  ): any[] {
    const yearData = graphData?.[selectedYear] || {};
    const categories = Object.keys(yearData);

    return categories.map((category) => ({
      name: this.formatCategoryName(category),
      data: this.extractCategoryData(
        yearData,
        category,
        isWeeklyView,
        selectedMonth,
        graphData,
        selectedYear
      ),
    }));
  }

  /**
   * Validates if series data is in expected format
   *
   * @param data - Data to validate
   * @returns True if data is valid
   * @private
   */
  private static isValidSeriesData(data: any): boolean {
    return Array.isArray(data) && data.length === TOTAL_WEEKS_PER_YEAR;
  }

  /**
   * Processes a single series item
   *
   * @param series - Series item to process
   * @param isWeeklyView - Whether processing for weekly view
   * @param selectedMonth - Selected month
   * @returns Processed series item
   * @private
   */
  private static processSeriesItem(
    series: any,
    isWeeklyView: boolean,
    selectedMonth: string
  ): any {
    if (isWeeklyView) {
      const monthIdx = MONTH_KEYS.indexOf(selectedMonth as MonthKey);
      if (monthIdx >= 0) {
        const startIdx = monthIdx * WEEKS_PER_MONTH;
        const weeklyData = series.data.slice(
          startIdx,
          startIdx + WEEKS_PER_MONTH
        );
        return {
          ...series,
          data: this.padDataToLength(weeklyData, WEEKS_PER_MONTH),
        };
      }
    }

    return { ...series, data: groupFlatDataByMonth(series.data) };
  }

  /**
   * Formats category name for display
   *
   * @param category - Raw category name
   * @returns Formatted category name
   * @private
   */
  private static formatCategoryName(category: string): string {
    return `${String(category).charAt(0).toUpperCase()}${String(category).slice(
      1
    )}`;
  }

  /**
   * Extracts and processes data for a specific category
   *
   * @param yearData - Year data object
   * @param category - Category name
   * @param isWeeklyView - Whether extracting weekly data
   * @param selectedMonth - Selected month
   * @param graphData - Full graph data (for weekly extraction)
   * @param selectedYear - Selected year
   * @returns Processed category data
   * @private
   */
  private static extractCategoryData(
    yearData: any,
    category: string,
    isWeeklyView: boolean,
    selectedMonth: MonthKey,
    graphData: any,
    selectedYear: string
  ): number[] {
    const monthlyBuckets = (yearData[category as keyof typeof yearData] ||
      {}) as Record<MonthKey, number[]>;

    const rawData = isWeeklyView
      ? this.getWeeksForMonth(graphData, selectedYear, category, selectedMonth)
      : getMonthlyTotals(monthlyBuckets);

    return this.normalizeDataLength(rawData, isWeeklyView);
  }

  /**
   * Gets weekly data for a specific month
   *
   * @param graphData - Full graph data
   * @param year - Target year
   * @param category - Target category
   * @param month - Target month
   * @returns Array of 4 weekly values
   * @private
   */
  private static getWeeksForMonth(
    graphData: any,
    year: string,
    category: string,
    month: MonthKey
  ): number[] {
    const categoryData =
      graphData?.[year]?.[category as keyof (typeof graphData)[typeof year]];
    const monthValues =
      (categoryData as Record<MonthKey, number[]>)?.[month] || [];

    return Array.from(
      { length: WEEKS_PER_MONTH },
      (_, i) => monthValues[i] ?? 0
    );
  }

  /**
   * Normalizes data array to expected length
   *
   * @param data - Data array to normalize
   * @param isWeeklyView - Whether this is weekly data
   * @returns Normalized data array
   * @private
   */
  private static normalizeDataLength(
    data: number[],
    isWeeklyView: boolean
  ): number[] {
    if (isWeeklyView) {
      return this.padDataToLength(data, WEEKS_PER_MONTH);
    }

    return data.length === 0 ? [0] : data;
  }

  /**
   * Pads data array to specified length with zeros
   *
   * @param data - Data array to pad
   * @param targetLength - Target length
   * @returns Padded data array
   * @private
   */
  private static padDataToLength(
    data: number[],
    targetLength: number
  ): number[] {
    const result = [...data];
    while (result.length < targetLength) {
      result.push(0);
    }
    return result.slice(0, targetLength);
  }
}

/**
 * Factory class for creating complete chart options configurations.
 */
export class ChartOptionsFactory {
  /**
   * Creates complete chart options configuration
   *
   * @param config - Graph configuration
   * @param chartType - Chart type ('line' or 'bar')
   * @param timeFrame - Time frame ('month' or 'year')
   * @param selectedMonth - Selected month
   * @param selectedYear - Selected year
   * @returns Complete chart options object
   */
  static create(
    config: GraphConfig,
    chartType: 'line' | 'bar',
    timeFrame: string,
    selectedMonth: string,
    selectedYear: string
  ): Partial<ChartOptions> {
    const isWeeklyView = DataProcessor.isWeeklyView(timeFrame, selectedMonth);
    const sizeConfig = ChartConfigBuilder.createSizeConfig(config);
    const categories = this.getDynamicCategories(
      config,
      selectedYear,
      isWeeklyView,
      selectedMonth
    );

    console.log('ChartOptionsFactory.create Debug:', {
      timeFrame,
      selectedMonth,
      selectedYear,
      isWeeklyView,
      categories,
      hasGraphData: !!config.graphData,
    });

    const series = this.buildSeries(
      config,
      isWeeklyView,
      selectedMonth,
      selectedYear,
      categories
    );
    const fillConfig = this.createFillConfig(chartType);

    return {
      series,
      chart: this.createChartConfig(chartType, sizeConfig),
      xaxis: ChartConfigBuilder.createXAxisConfig(
        chartType,
        categories,
        isWeeklyView
      ),
      yaxis: ChartConfigBuilder.createYAxisConfig(),
      colors: config.colors || DEFAULT_GRAPH_COLORS,
      stroke: { curve: 'smooth', width: 5 },
      markers: this.createMarkersConfig(isWeeklyView),
      grid: this.createGridConfig(),
      dataLabels: ChartConfigBuilder.createDataLabelsConfig(),
      tooltip: ChartConfigBuilder.createTooltipConfig(isWeeklyView),
      ...fillConfig,
    };
  }

  /**
   * Builds series data for the chart
   *
   * @param config - Graph configuration
   * @param isWeeklyView - Whether this is weekly view
   * @param selectedMonth - Selected month
   * @param selectedYear - Selected year
   * @param categories - Available categories
   * @returns Processed series array
   * @private
   */
  private static buildSeries(
    config: GraphConfig,
    isWeeklyView: boolean,
    selectedMonth: string,
    selectedYear: string,
    categories: string[]
  ): any[] {
    let series = config.series ?? [];

    // Choose data source strategy
    const hasExistingSeries = series.length > 0;
    const hasGraphData = !!config.graphData;

    if (hasExistingSeries && !hasGraphData) {
      series = DataProcessor.processSeriesData(
        series,
        isWeeklyView,
        selectedMonth
      );
    } else if (!hasExistingSeries && hasGraphData) {
      series = DataProcessor.createSeriesFromGraphData(
        config.graphData,
        selectedYear,
        isWeeklyView,
        selectedMonth as MonthKey
      );
    }

    // Normalize series data to match categories
    return this.normalizeSeriesToCategories(series, categories.length);
  }

  /**
   * Normalizes series data to match category count
   *
   * @param series - Series array to normalize
   * @param expectedLength - Expected data length
   * @returns Normalized series array
   * @private
   */
  private static normalizeSeriesToCategories(
    series: any[],
    expectedLength: number
  ): any[] {
    return series.map((s) => {
      const data = [...(s.data || [])];

      // Pad or trim to match expected length
      while (data.length < expectedLength) data.push(0);
      if (data.length > expectedLength) data.splice(expectedLength);

      return { ...s, data };
    });
  }

  /**
   * Creates fill configuration for different chart types
   *
   * @param chartType - Chart type
   * @returns Fill configuration object
   * @private
   */
  private static createFillConfig(chartType: 'line' | 'bar') {
    return chartType === 'bar'
      ? { fill: { type: 'solid', opacity: 1, colors: ['#000000'] } }
      : {};
  }

  /**
   * Creates main chart configuration
   *
   * @param chartType - Chart type
   * @param sizeConfig - Size configuration
   * @returns Chart configuration object
   * @private
   */
  private static createChartConfig(chartType: 'line' | 'bar', sizeConfig: any) {
    return {
      type: chartType,
      height: sizeConfig.height,
      width: sizeConfig.width,
      toolbar: { show: false },
      fontFamily: 'Nunito',
      background: '#FFFFFF',
      zoom: { enabled: false },
      animations: ChartConfigBuilder.createAnimationConfig(),
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    };
  }

  /**
   * Creates markers configuration
   *
   * @param isWeeklyView - Whether this is weekly view
   * @returns Markers configuration object
   * @private
   */
  private static createMarkersConfig(isWeeklyView: boolean) {
    const baseSize = isWeeklyView ? 6 : 2;
    const hoverSize = isWeeklyView ? 10 : 6;

    return {
      size: baseSize,
      hover: { size: hoverSize },
      strokeWidth: 2,
      strokeColors: '#FFFFFF',
      shape: 'circle' as const,
    };
  }

  /**
   * Creates grid configuration
   *
   * @returns Grid configuration object
   * @private
   */
  private static createGridConfig() {
    return {
      show: true,
      borderColor: '#E5E5E5',
      strokeDashArray: 6,
      position: 'back' as const,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    };
  }

  /**
   * Creates dynamic categories based on available data
   *
   * @param config - Graph configuration
   * @param selectedYear - Selected year
   * @param isWeeklyView - Whether this is a weekly view
   * @param selectedMonth - Selected month
   * @returns Array of category labels
   * @private
   */
  private static getDynamicCategories(
    config: GraphConfig,
    selectedYear: string,
    isWeeklyView: boolean,
    selectedMonth: string
  ): string[] {
    if (isWeeklyView) return WEEK_CATEGORIES;

    // Strategy: Extract from graph data if available
    const categoriesFromData = this.extractCategoriesFromGraphData(
      config.graphData,
      selectedYear
    );

    return categoriesFromData.length > 0
      ? categoriesFromData
      : MONTH_CATEGORIES;
  }

  /**
   * Extracts available categories from graph data
   *
   * @param graphData - Graph data object
   * @param selectedYear - Selected year
   * @returns Array of category labels
   * @private
   */
  private static extractCategoriesFromGraphData(
    graphData: any,
    selectedYear: string
  ): string[] {
    if (!graphData) return [];

    const yearData = graphData[selectedYear];
    if (!yearData) return [];

    const availableMonths = new Set<MonthKey>();

    // Collect all months from all categories
    Object.keys(yearData).forEach((category) => {
      const categoryData = yearData[category as keyof typeof yearData];
      if (categoryData && typeof categoryData === 'object') {
        Object.keys(categoryData)
          .filter((month) => MONTH_KEYS.includes(month as MonthKey))
          .forEach((month) => availableMonths.add(month as MonthKey));
      }
    });

    // Sort chronologically and format for display
    return Array.from(availableMonths)
      .sort((a, b) => MONTH_KEYS.indexOf(a) - MONTH_KEYS.indexOf(b))
      .map((month) =>
        getFullMonthName(month.charAt(0).toUpperCase() + month.slice(1))
      );
  }
}
