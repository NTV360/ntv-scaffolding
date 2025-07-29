import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexLegend,
  ApexTooltip,
  ApexPlotOptions,
  ApexFill,
} from 'ng-apexcharts';

export enum GraphVariant {
  LineWithLegend = 'line-with-legend', // Line graph with legends, no filters
  LineWithFilterLegend = 'line-with-filter-legend', // Line graph with both filters and legends
  BarWithLegend = 'bar-with-legend', // Bar graph with legends, no filters
  BarWithFilterLegend = 'bar-with-filter-legend', // Bar graph with both filters and legends
}

export interface TimeFrame {
  value: string;
  label: string;
  categories: string[]; // Categories for this time frame
  disabled?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FilterEvent {
  timeFrame: 'month' | 'year';
  month?: string;
  year?: string;
}

/**
 * Defines the available size variants for the graph component.
 * Each size is designed for specific use cases and has predefined dimensions.
 */
export type GraphSizeVariant =
  | 'small' // 800px - for standard graphs
  | 'medium' // 1000px - for detailed analysis
  | 'large' // 1380px - for full-width dashboards
  | 'fullscreen' // 100vw x 100vh - for fullscreen display
  | 'custom'; // for custom dimensions

/**
 * Interface for custom graph sizing and spacing configuration.
 * Allows fine-grained control over graph dimensions.
 */
export interface GraphStyleConfig {
  /** Graph width (e.g., '400px', '100%') */
  width?: string;
  /** Graph height */
  height?: string;
  /** Maximum width constraint */
  maxWidth?: string;
  /** Maximum height constraint */
  maxHeight?: string;
  /** Minimum width constraint */
  minWidth?: string;
  /** Minimum height constraint */
  minHeight?: string;
}

/**
 * Predefined size configurations for different graph variants.
 * Provides consistent sizing across the application.
 */
export const GRAPH_SIZE_PRESETS: Record<
  Exclude<GraphSizeVariant, 'custom'>,
  GraphStyleConfig
> = {
  small: {
    width: '800px',
    height: '400px',
    maxWidth: '100%',
  },
  medium: {
    width: '1000px',
    height: '500px',
    maxWidth: '100%',
  },
  large: {
    width: '1380px',
    height: '500px',
    maxWidth: '100%',
  },
  fullscreen: {
    width: '100%',
    height: '600px',
    maxWidth: '100%',
    maxHeight: '100%',
  },
};

// Default style values
export const GRAPH_STYLES = {
  // Chart dimensions
  height: 400,
  width: '100%',

  // Font settings
  fontFamily: 'Nunito',
  titleFontSize: '20px',
  subHeaderFontSize: '14px',
  labelFontSize: '12px',
  legendFontSize: '12px',

  // Font weights
  titleFontWeight: 600,
  subHeaderFontWeight: 400,
  labelFontWeight: 400,
  legendFontWeight: 400,

  // Colors
  titleColor: '#333333',
  subHeaderColor: '#666666',
  labelColor: '#666666',
  axisColor: '#E5E5E5',
  gridColor: '#E5E5E5',
  backgroundColor: '#FFFFFF',
  defaultSeriesColors: ['#8DCB2C', '#008FFB'],

  // Grid
  gridOpacity: 1,
  gridDashArray: 0,
  showGrid: true,
  showAxisBorder: true,
  showAxisTicks: true,

  // Markers
  markerSize: 0,
  markerStrokeWidth: 2,
  markerStrokeColor: '#FFFFFF',
  markerFillColor: 'inherit',

  // Stroke
  strokeWidth: 3,
  strokeCurve: 'smooth' as const,

  // Legend
  showLegend: false,
  legendPosition: 'top' as const,
  legendHorizontalAlign: 'right' as const,

  // Features
  showToolbar: false,
  showDataLabels: false,

  // Chart padding
  chartPadding: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },

  // Axis styling
  xaxis: {
    labels: {
      rotateAlways: false,
      hideOverlappingLabels: true,
      style: {
        colors: '#666666',
      },
    },
    axisBorder: {
      show: true,
      color: '#E5E5E5',
    },
    axisTicks: {
      show: true,
      color: '#E5E5E5',
    },
  },

  yaxis: {
    labels: {
      style: {
        colors: '#666666',
      },
    },
    axisBorder: {
      show: true,
      color: '#E5E5E5',
    },
    axisTicks: {
      show: true,
      color: '#E5E5E5',
    },
  },
} as const;

export type GraphStyles = {
  // Font sizes
  titleFontSize?: string;
  subHeaderFontSize?: string;
  labelFontSize?: string;
  legendFontSize?: string;

  // Font weights
  titleFontWeight?: string | number;
  subHeaderFontWeight?: string | number;
  labelFontWeight?: string | number;
  legendFontWeight?: string | number;

  // Colors
  titleColor?: string;
  subHeaderColor?: string;
  labelColor?: string;
  axisColor?: string;
  gridColor?: string;
  backgroundColor?: string;

  // Font family
  fontFamily?: string;

  // Grid
  gridOpacity?: number;
  gridDashArray?: number;

  // Markers
  markerSize?: number;
  markerStrokeWidth?: number;
  markerStrokeColor?: string;
  markerFillColor?: string;

  // Stroke
  strokeWidth?: number;
  strokeCurve?: 'smooth' | 'straight' | 'stepline';

  // Chart
  height?: number;

  // Legend
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendHorizontalAlign?: 'left' | 'center' | 'right';

  // Features
  showToolbar?: boolean;
  showLegend?: boolean;
  showDataLabels?: boolean;
  showGrid?: boolean;
  showAxisBorder?: boolean;
  showAxisTicks?: boolean;
};

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  colors: string[];
  markers: ApexMarkers;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
}

/**
 * Interface for header metrics display
 */
export interface HeaderMetric {
  label: string;
  value: number;
  color?: string;
}

export interface GraphConfig {
  variant?: GraphVariant;
  /** Size preset for the graph */
  size?: GraphSizeVariant;
  /** Custom size configuration */
  customSize?: GraphStyleConfig;
  /** Header title */
  header?: string;
  /** Header subtitle */
  subHeader?: string;
  /** Metrics to display in header */
  headerMetrics?: HeaderMetric[];
  /** Data series (optional if using graphData) */
  series?: {
    name: string;
    data: number[];
  }[];
  /** Custom colors for series */
  colors?: string[];
  /** Time frame configuration */
  timeFrames?: {
    monthly?: TimeFrame[];
    yearly?: TimeFrame[];
  };
  /** Selected time frame */
  selectedTimeFrame?: 'month' | 'year';
  /** Selected month */
  selectedMonth?: string;
  /** Selected year */
  selectedYear?: string;
  /** Optional categories override */
  categories?: string[];

  /**Dynamic hierarchical graph data (preferred for time-based data like 2024 → active → jan) */
  graphData?: GraphDataType;
}

export interface GraphDataType {
  [year: string]: {
    [category: string]: {
      [month in MonthKey]?: number[]; // 4 values per month (weekly data)
    };
  };
}

export type MonthKey =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';
