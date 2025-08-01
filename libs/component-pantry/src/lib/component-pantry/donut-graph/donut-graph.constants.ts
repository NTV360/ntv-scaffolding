/**
 * Default colors for donut chart segments
 */
export const DONUT_GRAPH_DEFAULT_COLORS = [
  '#A9DA5C',
  '#095AF3',
  '#FFAE00',
  '#F6284E',
  '#7017e6',
  '#C99EEF',
  '#d10bdb',
  '#fbff00',
] as string[];

/**
 * Enhanced size presets for donut graph component with better space utilization
 */
export const DONUT_GRAPH_SIZE_PRESETS = {
  small: {
    width: '468px',
    height: '293px',
    chartSize: 'small',
    legendColumns: 1,
    chartToLegendRatio: '1.2:1',
  },
  medium: {
    width: '600px',
    height: '400px',
    chartSize: 'medium',
    legendColumns: 1,
    chartToLegendRatio: '1.5:1',
  },
  large: {
    width: '900px',
    height: '600px',
    chartSize: 'large',
    legendColumns: 2,
    chartToLegendRatio: '2:1',
  },
  fullscreen: {
    width: '100vw',
    height: '100vh',
    chartSize: 'fullscreen',
    legendColumns: 'auto',
    chartToLegendRatio: '2.5:1',
  },
} as const;

/**
 * Chart size configurations for better space utilization
 */
export const DONUT_CHART_SIZES = {
  small: {
    container: { width: '250px', height: '220px' }, // ← Increased ApexCharts size for Small
    donutHole: '45%',
    legend: { minWidth: '160px', columns: 1 },
  },
  medium: {
    container: { width: '280px', height: '280px' },
    donutHole: '50%',
    legend: { minWidth: '200px', columns: 1 },
  },
  large: {
    container: { width: '500px', height: '500px' },
    donutHole: '55%',
    legend: { minWidth: '280px', columns: 2 },
  },
  fullscreen: {
    container: { width: '600px', height: '600px' },
    donutHole: '60%',
    legend: { minWidth: '350px', columns: 'auto' },
  },
  auto: {
    container: { width: '100%', height: '100%' },
    donutHole: '50%',
    legend: { minWidth: '200px', columns: 'responsive' },
  },
} as const;

/**
 * Default chart configuration values
 */
export const DONUT_GRAPH_DEFAULTS = {
  // Chart dimensions
  height: 250,
  donutHoleSize: 30,
  strokeWidth: 0,

  // Font settings
  fontFamily: 'Nunito, sans-serif',
  titleFontSize: '20px',
  titleFontWeight: '700',
  titleColor: '#091635',
  subtitleFontSize: '16px',
  subtitleFontWeight: '500',
  subtitleColor: '#4a5568',
  dataLabelFontSize: '14px',
  dataLabelFontWeight: '700',
  legendFontSize: '14px',
  legendFontWeight: '700',

  // Legend settings
  legendPosition: 'right' as const,
  legendMarkerSize: 14,
  legendItemMargin: {
    horizontal: 12,
    vertical: 12,
  },

  // Features
  showDataLabels: true,
  showLegend: true,
  showToolbar: false,

  // Stroke settings
  strokeColors: ['#ffffff'] as string[],

  // Responsive breakpoint
  responsiveBreakpoint: 480,
} as const;

/**
 * Chart type configuration
 */
export const DONUT_GRAPH_CHART_TYPE = 'donut' as const;

/**
 * Responsive configuration for different screen sizes
 */
export const DONUT_GRAPH_RESPONSIVE_CONFIG = [
  {
    breakpoint: 1200,
    options: {
      chart: {
        height: 500,
      },
      legend: {
        show: false, // Always disable built-in legend
      },
      dataLabels: {
        enabled: false, // Always disable data labels
      },
    },
  },
  {
    breakpoint: 1024,
    options: {
      chart: {
        height: 400,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
  {
    breakpoint: 900,
    options: {
      chart: {
        height: 350,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
  {
    breakpoint: 768,
    options: {
      chart: {
        height: 300,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
  {
    breakpoint: 600,
    options: {
      chart: {
        height: 250,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
  {
    breakpoint: 480,
    options: {
      chart: {
        height: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
  {
    breakpoint: 360,
    options: {
      chart: {
        height: 150,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
] as any[];

/**
 * CSS class names for styling
 */
export const DONUT_GRAPH_CLASSES = {
  container: 'donut-graph-container',
  header: 'donut-graph-header',
  titleSection: 'donut-graph-title-section',
  icon: 'donut-graph-icon',
  titleInfo: 'donut-graph-title-info',
  totalCount: 'donut-graph-total-count',
  title: 'donut-graph-title',
  content: 'donut-graph-content',
  small: 'donut-graph-small',
  fullscreen: 'donut-graph-fullscreen',
} as const;

/**
 * Legend position options
 */
export const DONUT_GRAPH_LEGEND_POSITIONS = [
  'top',
  'right',
  'bottom',
  'left',
] as const;

/**
 * Size variant options
 */
export const DONUT_GRAPH_SIZE_VARIANTS = [
  'small',
  'medium',
  'large',
  'fullscreen',
  'custom',
  'auto',
] as const;

/**
 * Legend layout configurations
 */
export const DONUT_LEGEND_LAYOUTS = {
  small: {
    columns: 1,
    maxHeight: '200px',
    itemsPerColumn: 8,
  },
  medium: {
    columns: 1,
    maxHeight: '250px',
    itemsPerColumn: 10,
  },
  large: {
    columns: 2,
    maxHeight: '400px',
    itemsPerColumn: 12,
  },
  fullscreen: {
    columns: 'auto',
    maxHeight: '80vh',
    itemsPerColumn: 15,
  },
} as const;

/**
 * Unified demo data structure mimicking API response
 */
export const GRAPH_DEMO_DATA = {
  // Raspberry Pi Versions
  raspberryPiVersions: {
    title: 'Raspberry Pi Versions',
    totalCount: 100000, // 100% total for graph clarity
    data: [
      { label: 'Raspberry Pi 3', total: 12000 },
      { label: 'Raspberry Pi 4 1G', total: 6000 },
      { label: 'Raspberry Pi 4 2G', total: 10000 },
      { label: 'Raspberry Pi 4 4G', total: 20000 },
      { label: 'Raspberry Pi 4 8G', total: 25000 },
      { label: 'Raspberry Pi Zero', total: 3000 },
      { label: 'Raspberry Pi Zero W', total: 4000 },
      { label: 'Raspberry Pi Zero 2 W', total: 5000 },
      { label: 'Raspberry Pi 5 4G', total: 8000 },
      { label: 'Raspberry Pi 5 8G', total: 7000 },
    ],
  },
} as const;
