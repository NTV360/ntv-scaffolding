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
/**
 * Calculates percentage for a given value ensuring all percentages sum to 100%
 * @param value - The value to calculate percentage for
 * @param component - The DonutGraphComponent instance
 * @returns Percentage as a string
 */
export function calculatePercentage(
  value: number,
  component: DonutGraphComponent
): string {
  const total = component.totalCount();
  const data = component.data();

  if (total === 0) return '0%';

  if (value < 0) {
    console.warn('calculatePercentage: Negative value provided:', value);
    return '0%';
  }

  if (total < 0) {
    console.warn('calculatePercentage: Negative total count:', total);
    return '0%';
  }

  // Find the index of this value in the data array
  const valueIndex = data.findIndex((item) => item.total === value);

  // If we can't find the value or there's only one item, use simple calculation
  if (valueIndex === -1 || data.length === 1) {
    const percent = (value / total) * 100;
    if (percent > 0 && percent < 1) {
      return percent.toFixed(1) + '%';
    }
    return Math.round(percent) + '%';
  }

  // Calculate all percentages to ensure they sum to 100%
  const percentages = calculateAllPercentages(data, total);

  return percentages[valueIndex];
}

/**
 * Calculates all percentages ensuring they sum to exactly 100%
 * @param data - Array of chart data items
 * @param total - Total count
 * @returns Array of percentage strings
 */
function calculateAllPercentages(
  data: DonutChartItem[],
  total: number
): string[] {
  if (total === 0) return data.map(() => '0%');

  // Calculate raw percentages
  const rawPercentages = data.map((item) => (item.total / total) * 100);

  // Round all percentages
  const roundedPercentages = rawPercentages.map((p) => Math.round(p));

  // Calculate the difference from 100%
  const sum = roundedPercentages.reduce((acc, p) => acc + p, 0);
  const difference = 100 - sum;

  // Adjust percentages to sum to 100%
  if (difference !== 0) {
    // Find items to adjust (prefer larger values for positive adjustments)
    const adjustmentTargets = rawPercentages
      .map((raw, index) => ({
        index,
        raw,
        rounded: roundedPercentages[index],
        diff: raw - roundedPercentages[index],
      }))
      .sort((a, b) => (difference > 0 ? b.diff - a.diff : a.diff - b.diff));

    // Apply adjustments
    let remainingAdjustment = Math.abs(difference);
    for (
      let i = 0;
      i < adjustmentTargets.length && remainingAdjustment > 0;
      i++
    ) {
      const target = adjustmentTargets[i];
      const adjustment = difference > 0 ? 1 : -1;

      // Don't adjust below 0%
      if (roundedPercentages[target.index] + adjustment >= 0) {
        roundedPercentages[target.index] += adjustment;
        remainingAdjustment--;
      }
    }
  }

  // Convert to strings with appropriate precision
  return roundedPercentages.map((p, index) => {
    const raw = rawPercentages[index];
    // Use decimal precision for very small percentages
    if (raw > 0 && raw < 1 && p === 0) {
      return raw.toFixed(1) + '%';
    }
    return p + '%';
  });
}

/**
 * Alternative simpler approach - calculate percentage for single value
 * Use this if you don't need guaranteed 100% sum
 * @param value - The value to calculate percentage for
 * @param total - Total count
 * @returns Percentage as a string
 */
export function calculateSimplePercentage(
  value: number,
  total: number
): string {
  if (total === 0) return '0%';

  if (value < 0) {
    console.warn('calculateSimplePercentage: Negative value provided:', value);
    return '0%';
  }

  if (total < 0) {
    console.warn('calculateSimplePercentage: Negative total count:', total);
    return '0%';
  }

  const percent = (value / total) * 100;

  // For very small percentages, show one decimal place
  if (percent > 0 && percent < 1) {
    return percent.toFixed(1) + '%';
  }

  // For percentages less than 10%, show one decimal if it makes a difference
  if (percent < 10) {
    const rounded = Math.round(percent);
    const oneDecimal = Math.round(percent * 10) / 10;
    if (rounded !== oneDecimal) {
      return oneDecimal.toFixed(1) + '%';
    }
  }

  return Math.round(percent) + '%';
}

/**
 * Utility function to get all percentages that sum to 100%
 * Useful for legend display or validation
 * @param data - Array of chart data items
 * @param total - Total count
 * @returns Object with percentages and validation info
 */
export function getAllPercentagesWithValidation(
  data: DonutChartItem[],
  total: number
) {
  const percentages = calculateAllPercentages(data, total);

  // Extract numeric values for validation
  const numericPercentages = percentages.map((p) =>
    parseFloat(p.replace('%', ''))
  );
  const sum = numericPercentages.reduce((acc, p) => acc + p, 0);

  return {
    percentages,
    numericPercentages,
    sum,
    isValid: Math.abs(sum - 100) < 0.1, // Allow small floating point errors
    data: data.map((item, index) => ({
      ...item,
      percentage: percentages[index],
      numericPercentage: numericPercentages[index],
    })),
  };
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
