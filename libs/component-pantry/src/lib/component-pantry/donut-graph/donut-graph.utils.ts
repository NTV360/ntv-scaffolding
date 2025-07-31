import { effect } from '@angular/core';
import { DonutChartConfig, DonutChartItem } from './donut-graph.types';
import { DONUT_GRAPH_DEFAULT_COLORS } from './donut-graph.constants';
import { DonutGraphComponent } from './donut-graph';

const defaultColors = DONUT_GRAPH_DEFAULT_COLORS;

/**
 * Gets colors for chart segments
 * @param data - Chart data
 * @param config - Chart configuration
 * @returns Array of colors
 */
export function getColors(
  data: DonutChartItem[],
  config: DonutChartConfig
): string[] {
  // Use custom colors if provided
  if (config.colors && config.colors.length > 0) {
    return data.map(
      (_, index) => config.colors![index % config.colors!.length]
    );
  }

  // Use item-specific colors if available (for backward compatibility)
  const itemColors = data.map((item) => item.color).filter(Boolean);
  if (itemColors.length === data.length) {
    return itemColors as string[];
  }

  // Use default colors without repetition - cycle through all available colors
  return data.map((_, index) => defaultColors[index % defaultColors.length]);
}

/**
 * Sets up reactive effects for chart updates
 * @param component - The DonutGraphComponent instance
 */
export function setupEffects(component: DonutGraphComponent): void {
  // Chart update effect
  effect(() => {
    component.chart?.updateOptions(component.chartOptions(), true, true);
  });

  // Custom size effect
  effect(() => updateCustomSize(component));

  // Hover effects update
  effect(() => {
    component.hoveredIndex();
    component.updateChartHoverEffects();
  });

  // Re-setup hover listeners when data changes
  effect(() => {
    component.data();
    setTimeout(() => {
      component.setupChartHoverListeners();
    }, 200);
  });
}

/**
 * Updates custom container sizing
 * @param component - The DonutGraphComponent instance
 */
export function updateCustomSize(component: DonutGraphComponent): void {
  const customSize = component.customSize();
  const container = component.elementRef?.nativeElement?.querySelector(
    '.donut-graph-content'
  );

  if (!container || !customSize) return;

  // Reset styles first
  const resetableProperties = [
    'width',
    'height',
    'maxWidth',
    'maxHeight',
    'minWidth',
    'minHeight',
  ];
  resetableProperties.forEach((prop) => {
    container.style[prop as any] = '';
  });

  // Apply custom styles
  Object.entries(customSize).forEach(([property, value]) => {
    if (value) {
      container.style[property as any] = value;
    }
  });
}

/**
 * Sets up hover event listeners for chart segments
 * @param component - The DonutGraphComponent instance
 */
export function setupChartHoverListeners(component: DonutGraphComponent): void {
  // Wait for chart to be ready
  setTimeout(() => {
    const chartElement = component.elementRef.nativeElement.querySelector(
      '.donut-chart-container'
    );
    if (!chartElement) return;

    const segments = chartElement.querySelectorAll('.apexcharts-pie-area');
    segments.forEach((segment: Element, index: number) => {
      segment.addEventListener('mouseenter', () => {
        component.onChartSegmentHover(index, true);
      });

      segment.addEventListener('mouseleave', () => {
        component.onChartSegmentHover(index, false);
      });
    });
  }, 100); // Small delay to ensure chart is rendered
}

/**
 * Gets the donut hole size based on current size variant
 * @param component - The DonutGraphComponent instance
 */
export function getDonutSize(component: DonutGraphComponent): string {
  const config = component.config();
  const size = component.size();

  // Use config.donutHoleSize if provided
  if (config.donutHoleSize !== undefined) {
    return `${config.donutHoleSize}%`;
  }

  switch (size) {
    case 'small':
      return '50%'; // Smaller hole for small size
    case 'medium':
      return '50%'; // Medium hole
    case 'large':
      return '50%'; // Larger hole for large size
    case 'fullscreen':
      return '50%'; // Largest hole for fullscreen
    default:
      return '50%'; // Default
  }
}

/**
 * Calculates percentage for a given value
 * @param value - The value to calculate percentage for
 * @param component - The DonutGraphComponent instance
 * @returns Percentage as a string
 */
export function calculatePercentage(
  value: number,
  component: DonutGraphComponent
): string {
  const total = component.totalCount();
  if (total === 0) return '0%';

  if (value < 0) {
    console.warn('calculatePercentage: Negative value provided:', value);
    return '0%';
  }

  if (total < 0) {
    console.warn('calculatePercentage: Negative total count:', total);
    return '0%';
  }

  const percent = (value / total) * 100;
  if (percent > 0 && percent < 1) {
    return percent.toFixed(1) + '%';
  }
  return Math.round(percent) + '%';
}

/**
 * Handles chart segment hover
 * @param index - Index of the hovered chart segment
 * @param isHovering - Whether hovering or not
 */
export function onChartSegmentHover(
  index: number,
  isHovering: boolean,
  component: DonutGraphComponent
): void {
  if (isHovering) {
    component.hoveredIndex.set(index);
  } else {
    component.hoveredIndex.set(null);
  }
  component.updateChartHoverEffects();
}

/**
 * Handles legend item hover
 * @param index - Index of the hovered legend item
 * @param isHovering - Whether hovering or not
 */
export function onLegendItemHover(
  index: number,
  isHovering: boolean,
  component: DonutGraphComponent
): void {
  if (isHovering) {
    component.hoveredIndex.set(index);
  } else {
    component.hoveredIndex.set(null);
  }
  component.updateChartHoverEffects();
}

/**
 * Updates chart hover effects based on current hover state
 */
export function updateChartHoverEffects(component: DonutGraphComponent): void {
  if (!component.chart) return;

  const chartElement = component.elementRef.nativeElement.querySelector(
    '.donut-chart-container'
  );
  const containerElement = component.elementRef.nativeElement.querySelector(
    '.donut-graph-container'
  );

  if (!chartElement || !containerElement) return;

  const segments = chartElement.querySelectorAll('.apexcharts-pie-area');
  const hoveredIndex = component.hoveredIndex();

  // Update chart container class
  if (hoveredIndex !== null) {
    chartElement.classList.add('chart-hovered');
    containerElement.classList.add('chart-hovered');
  } else {
    chartElement.classList.remove('chart-hovered');
    containerElement.classList.remove('chart-hovered');
  }

  // Update chart segments
  segments.forEach((segment: Element, i: number) => {
    if (hoveredIndex !== null && i === hoveredIndex) {
      (segment as HTMLElement).style.opacity = '1';
      (segment as HTMLElement).style.filter = 'brightness(1.1)';
    } else if (hoveredIndex !== null) {
      (segment as HTMLElement).style.opacity = '0.3';
      (segment as HTMLElement).style.filter = 'brightness(0.7)';
    } else {
      (segment as HTMLElement).style.opacity = '';
      (segment as HTMLElement).style.filter = '';
    }
  });

  // Update legend items
  const legendItems =
    component.elementRef.nativeElement.querySelectorAll('.legend-item');
  legendItems.forEach((item: Element, i: number) => {
    if (hoveredIndex !== null && i === hoveredIndex) {
      (item as HTMLElement).classList.add('legend-item-hovered');
      (item as HTMLElement).classList.remove('legend-item-dimmed');
    } else {
      (item as HTMLElement).classList.remove('legend-item-hovered');
      if (hoveredIndex !== null) {
        (item as HTMLElement).classList.add('legend-item-dimmed');
      } else {
        (item as HTMLElement).classList.remove('legend-item-dimmed');
      }
    }
  });
}
