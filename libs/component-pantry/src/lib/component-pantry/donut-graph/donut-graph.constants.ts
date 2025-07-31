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
 * Size presets for donut graph component
 */
export const DONUT_GRAPH_SIZE_PRESETS = {
  small: { width: '468px', height: '293px' },
  medium: { width: '700px', height: '400px' },
  large: { width: '1000px', height: '500px' },
  fullscreen: { width: '100%', height: '600px' },
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
 * Responsive configuration for mobile devices
 */
export const DONUT_GRAPH_RESPONSIVE_CONFIG = [
  {
    breakpoint: DONUT_GRAPH_DEFAULTS.responsiveBreakpoint,
    options: {
      chart: {
        height: 300,
      },
      legend: {
        position: 'bottom' as const,
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
 * Unified demo data structure mimicking API response
 */
export const GRAPH_DEMO_DATA = {
  // Raspberry Pi Versions
  raspberryPiVersions: {
    title: 'Raspberry Pi Versions',
    totalCount: 158870, //this data should be the overall total to calculate the 100% of the graph
    data: [
      { label: 'Raspberry Pi3', total: 6020 },
      { label: 'Raspberry Pi4 1G', total: 18020 },
      { label: 'Raspberry Pi4 2G', total: 13200 },
      { label: 'Raspberry Pi4 4G', total: 7020 },
      { label: 'Raspberry Pi4 8G', total: 26020 },
      { label: 'Raspberry Pi Zero', total: 4020 },
      { label: 'Raspberry Pi Zero W', total: 300 },
      { label: 'Raspberry Pi Zero 2 W', total: 250 },
      { label: 'Raspberry Pi4 4G', total: 700 },
      { label: 'Raspberry Pi4 8G', total: 2600 },
      { label: 'Raspberry Pi Zero', total: 400 },
      { label: 'Raspberry Pi Zero W', total: 300 },
      { label: 'Raspberry Pi Zero 2 W', total: 250 },
      { label: 'Raspberry Pi4 4G', total: 700 },
      { label: 'Raspberry Pi4 8G', total: 22200 },
      { label: 'Raspberry Pi Zero', total: 2400 },
      { label: 'Raspberry Pi Zero W', total: 3200 },
      { label: 'Raspberry Pi Zero 2 W', total: 250 },
      { label: 'Raspberry Pi4 4G', total: 7200 },
      { label: 'Raspberry Pi4 8G', total: 22600 },
      { label: 'Raspberry Pi Zero', total: 4200 },
      { label: 'Raspberry Pi Zero W', total: 2300 },
      { label: 'Raspberry Pi Zero 2 W', total: 2250 },
    ],
  },
} as const;
