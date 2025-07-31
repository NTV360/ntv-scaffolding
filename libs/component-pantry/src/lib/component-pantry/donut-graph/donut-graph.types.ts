import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

/**
 * Interface for individual donut chart data items
 */
export interface DonutChartItem {
  /** Label for the segment (e.g., "Raspberry Pi3") */
  label: string;
  /** Total number for this segment (e.g., 600) */
  total: number;
  /** Optional color for this segment (for backward compatibility) */
  color?: string;
}

/**
 * Interface for donut chart configuration
 */
export interface DonutChartConfig {
  /** Title of the chart */
  title?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Total count to display (e.g., 6627) */
  totalCount?: number;
  /** Size variant for the chart */
  size?: 'small' | 'medium' | 'large' | 'fullscreen' | 'custom' | 'auto';
  /** Custom size configuration */
  customSize?: {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
  };
  /** Custom colors for segments */
  colors?: string[];
  /** Whether to show data labels on segments */
  showDataLabels?: boolean;
  /** Whether to show legend */
  showLegend?: boolean;
  /** Legend position */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Chart height */
  height?: number;
  /** Stroke width for donut */
  strokeWidth?: number;
  /** Donut hole size (percentage) */
  donutHoleSize?: number;
}

/**
 * Interface for chart options used by ApexCharts
 */
export interface DonutChartOptions {
  series: number[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
  tooltip?: ApexTooltip;
}
