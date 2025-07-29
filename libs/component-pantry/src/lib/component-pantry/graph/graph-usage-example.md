# Angular Graph Component Usage Examples

This guide demonstrates how to use the `ntv-graph` component in your Angular applications with various data structures and configurations.

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Simple Series Data](#simple-series-data)
3. [Hierarchical Data Structure](#hierarchical-data-structure)
4. [Dynamic Data Loading](#dynamic-data-loading)
5. [Real-time Updates](#real-time-updates)
6. [Custom Styling & Colors](#custom-styling--colors)
7. [Interactive Filters](#interactive-filters)
8. [Header Metrics](#header-metrics)
9. [Complete Examples](#complete-examples)

## Basic Setup

First, ensure you have the component imported in your module or standalone component:

```typescript
// app.component.ts or your feature component
import { Component } from '@angular/core';
import { GraphComponent, GraphConfig, GraphVariant } from './path-to-graph';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GraphComponent],
  template: ` <ntv-graph [config]="graphConfig" (filterChange)="onFilterChange($event)"> </ntv-graph> `,
})
export class ExampleComponent {
  // Your configuration will go here
}
```

## Simple Series Data

### Basic Line Chart

Perfect for simple data visualization with 2-3 data series:

```typescript
export class SimpleLineChartComponent {
  graphConfig: GraphConfig = {
    variant: GraphVariant.LineWithLegend,
    size: 'medium',
    header: 'Monthly Sales Performance',
    series: [
      {
        name: 'Revenue',
        data: [12000, 14000, 11000, 18000, 16000, 20000, 19000, 21000, 18000, 22000, 24000, 26000],
      },
      {
        name: 'Profit',
        data: [4000, 6000, 3000, 8000, 6000, 10000, 9000, 11000, 8000, 12000, 14000, 16000],
      },
    ],
    colors: ['#10B981', '#3B82F6'],
    headerMetrics: [
      { label: 'Total Revenue', value: 221000 },
      { label: 'Total Profit', value: 107000 },
      { label: 'Profit Margin', value: 48.4 },
    ],
  };

  onFilterChange(event: any) {
    console.log('Filter changed:', event);
  }
}
```

### Basic Bar Chart

Same data structure, different visualization:

```typescript
export class SimpleBarChartComponent {
  graphConfig: GraphConfig = {
    variant: GraphVariant.BarWithLegend,
    size: 'large',
    header: 'Department Performance Comparison',
    series: [
      {
        name: 'Sales',
        data: [850, 920, 880, 1200, 1100, 1350, 1280, 1400, 1320, 1500, 1450, 1600],
      },
      {
        name: 'Marketing',
        data: [450, 520, 480, 650, 600, 750, 720, 800, 760, 850, 820, 900],
      },
      {
        name: 'Support',
        data: [250, 280, 260, 350, 320, 400, 380, 420, 400, 450, 430, 480],
      },
    ],
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
  };
}
```

## Hierarchical Data Structure

For complex data with multiple years, categories, and weekly breakdowns:

```typescript
export class HierarchicalDataComponent {
  // Complex data structure: Year -> Category -> Month -> Weekly Data
  private salesData = {
    '2024': {
      sales: {
        jan: [2100, 2200, 2300, 2400], // Week 1-4 of January
        feb: [2200, 2300, 2400, 2500],
        mar: [2300, 2400, 2500, 2600],
        apr: [2400, 2500, 2600, 2700],
        may: [2500, 2600, 2700, 2800],
        jun: [2600, 2700, 2800, 2900],
        jul: [2700, 2800, 2900, 3000],
        aug: [2800, 2900, 3000, 3100],
        sep: [2900, 3000, 3100, 3200],
        oct: [3000, 3100, 3200, 3300],
        nov: [3100, 3200, 3300, 3400],
        dec: [3200, 3300, 3400, 3500],
      },
      marketing: {
        jan: [800, 850, 900, 950],
        feb: [850, 900, 950, 1000],
        mar: [900, 950, 1000, 1050],
        apr: [950, 1000, 1050, 1100],
        may: [1000, 1050, 1100, 1150],
        jun: [1050, 1100, 1150, 1200],
        jul: [1100, 1150, 1200, 1250],
        aug: [1150, 1200, 1250, 1300],
        sep: [1200, 1250, 1300, 1350],
        oct: [1250, 1300, 1350, 1400],
        nov: [1300, 1350, 1400, 1450],
        dec: [1350, 1400, 1450, 1500],
      },
      support: {
        jan: [400, 420, 440, 460],
        feb: [420, 440, 460, 480],
        mar: [440, 460, 480, 500],
        apr: [460, 480, 500, 520],
        may: [480, 500, 520, 540],
        jun: [500, 520, 540, 560],
        jul: [520, 540, 560, 580],
        aug: [540, 560, 580, 600],
        sep: [560, 580, 600, 620],
        oct: [580, 600, 620, 640],
        nov: [600, 620, 640, 660],
        dec: [620, 640, 660, 680],
      },
    },
    '2023': {
      sales: {
        jan: [1800, 1900, 2000, 2100],
        feb: [1900, 2000, 2100, 2200],
        // ... rest of months for 2023
      },
      marketing: {
        jan: [700, 750, 800, 850],
        feb: [750, 800, 850, 900],
        // ... rest of months for 2023
      },
      support: {
        jan: [350, 370, 390, 410],
        feb: [370, 390, 410, 430],
        // ... rest of months for 2023
      },
    },
  };

  graphConfig: GraphConfig = {
    variant: GraphVariant.BarWithFilterLegend,
    size: 'large',
    header: 'Department Performance Analytics',
    graphData: this.salesData,
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
    headerMetrics: this.calculateMetrics(),
  };

  private calculateMetrics() {
    // Calculate metrics from the hierarchical data
    const currentYear = this.salesData['2024'];
    const totalSales = this.sumDepartmentData(currentYear.sales);
    const totalMarketing = this.sumDepartmentData(currentYear.marketing);
    const totalSupport = this.sumDepartmentData(currentYear.support);

    return [
      { label: 'Total Sales', value: totalSales },
      { label: 'Total Marketing', value: totalMarketing },
      { label: 'Total Support', value: totalSupport },
      { label: 'Combined Total', value: totalSales + totalMarketing + totalSupport },
    ];
  }

  private sumDepartmentData(deptData: any): number {
    return Object.values(deptData).reduce((total: number, monthData: any) => {
      return total + (monthData as number[]).reduce((sum, val) => sum + val, 0);
    }, 0);
  }

  onFilterChange(event: any) {
    console.log('Hierarchical filter changed:', event);
    // Handle year/month filter changes
    if (event.year !== this.currentYear) {
      this.updateMetricsForYear(event.year);
    }
  }
}
```

## Dynamic Data Loading

Load data from APIs or services dynamically:

```typescript
export class DynamicDataComponent implements OnInit {
  graphConfig: GraphConfig = {
    variant: GraphVariant.LineWithFilterLegend,
    size: 'medium',
    header: 'Loading...',
    series: [],
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
  };

  isLoading = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadGraphData();
  }

  async loadGraphData() {
    try {
      this.isLoading = true;

      // Simulate API call (replace with your actual service)
      const response = await this.dataService.getPerformanceData();

      // Transform API response to graph format
      this.graphConfig = {
        ...this.graphConfig,
        header: 'Performance Dashboard',
        graphData: this.transformApiData(response.data),
        headerMetrics: this.calculateMetricsFromApi(response.data),
      };

      this.isLoading = false;
    } catch (error) {
      this.error = 'Failed to load graph data';
      this.isLoading = false;
      console.error('Graph data loading error:', error);
    }
  }

  private transformApiData(apiData: any): any {
    // Transform your API response to the expected graph data structure
    const transformedData: any = {};

    apiData.years.forEach((yearData: any) => {
      transformedData[yearData.year] = {};

      yearData.departments.forEach((dept: any) => {
        transformedData[yearData.year][dept.name] = {};

        dept.months.forEach((month: any) => {
          transformedData[yearData.year][dept.name][month.name] = month.weeklyData;
        });
      });
    });

    return transformedData;
  }

  private calculateMetricsFromApi(data: any) {
    // Calculate metrics from API data
    return [
      { label: 'Total Records', value: data.totalRecords },
      { label: 'Active Departments', value: data.activeDepartments },
      { label: 'Growth Rate', value: data.growthRate },
    ];
  }

  async refreshData() {
    await this.loadGraphData();
  }
}
```

## Real-time Updates

For live dashboards and monitoring systems:

```typescript
export class RealTimeComponent implements OnInit, OnDestroy {
  graphConfig: GraphConfig = {
    variant: GraphVariant.LineWithLegend,
    size: 'medium',
    header: 'System Performance Monitor',
    series: [
      { name: 'CPU Usage', data: [] },
      { name: 'Memory Usage', data: [] },
      { name: 'Network I/O', data: [] },
    ],
    colors: ['#EF4444', '#3B82F6', '#10B981'],
    headerMetrics: [],
  };

  private updateInterval: any;
  private maxDataPoints = 12; // Keep last 12 data points

  ngOnInit() {
    this.startRealTimeUpdates();
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private startRealTimeUpdates() {
    // Update every 5 seconds
    this.updateInterval = setInterval(() => {
      this.updateRealTimeData();
    }, 5000);

    // Initial data load
    this.updateRealTimeData();
  }

  private updateRealTimeData() {
    // Simulate real-time data (replace with actual monitoring API)
    const cpuUsage = this.generateMetricValue(20, 80);
    const memoryUsage = this.generateMetricValue(30, 70);
    const networkIO = this.generateMetricValue(10, 90);

    // Update series data
    this.graphConfig.series = this.graphConfig.series.map((series, index) => {
      const newValue = [cpuUsage, memoryUsage, networkIO][index];
      const updatedData = [...series.data, newValue];

      // Keep only the last N data points
      if (updatedData.length > this.maxDataPoints) {
        updatedData.shift();
      }

      return { ...series, data: updatedData };
    });

    // Update header metrics
    this.updateRealTimeMetrics(cpuUsage, memoryUsage, networkIO);
  }

  private generateMetricValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private updateRealTimeMetrics(cpu: number, memory: number, network: number) {
    const systemHealth = this.calculateSystemHealth(cpu, memory, network);

    this.graphConfig.headerMetrics = [
      { label: 'CPU Usage', value: cpu },
      { label: 'Memory Usage', value: memory },
      { label: 'Network I/O', value: network },
      { label: 'System Health', value: systemHealth },
    ];
  }

  private calculateSystemHealth(cpu: number, memory: number, network: number): number {
    // Simple health calculation (inverse of average usage)
    const averageUsage = (cpu + memory + network) / 3;
    return Math.round(100 - averageUsage);
  }
}
```

## Custom Styling & Colors

Customize the appearance to match your brand:

```typescript
export class CustomStyledComponent {
  // Custom color schemes
  private brandColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

  graphConfig: GraphConfig = {
    variant: GraphVariant.BarWithLegend,
    size: 'large',
    header: 'Brand Performance Metrics',
    customSize: {
      width: '800px',
      height: '400px',
      maxWidth: '100%',
    },
    series: [
      { name: 'Product A', data: [120, 140, 110, 180, 160, 200, 190, 210, 180, 220, 240, 260] },
      { name: 'Product B', data: [80, 100, 90, 130, 120, 150, 140, 160, 140, 170, 180, 190] },
      { name: 'Product C', data: [60, 80, 70, 100, 90, 120, 110, 130, 120, 140, 150, 160] },
      { name: 'Product D', data: [40, 60, 50, 80, 70, 100, 90, 110, 100, 120, 130, 140] },
      { name: 'Product E', data: [30, 50, 40, 70, 60, 90, 80, 100, 90, 110, 120, 130] },
    ],
    colors: this.brandColors,
    headerMetrics: [
      { label: 'Best Performer', value: 'Product A' },
      { label: 'Total Sales', value: 2485 },
      { label: 'Growth Rate', value: 23.5 },
    ],
  };

  // Method to switch color themes
  switchColorTheme(theme: 'brand' | 'dark' | 'pastel' | 'vibrant') {
    const colorThemes = {
      brand: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'],
      dark: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7'],
      pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFD1FF'],
      vibrant: ['#FF0080', '#00FF80', '#8000FF', '#FF8000', '#0080FF'],
    };

    this.graphConfig.colors = colorThemes[theme];
  }
}
```

## Interactive Filters

Handle filter changes and update data accordingly:

```typescript
export class InteractiveFiltersComponent {
  graphConfig: GraphConfig = {
    variant: GraphVariant.LineWithFilterLegend,
    size: 'medium',
    header: 'Sales Analytics with Filters',
    graphData: this.getSalesData(),
    colors: ['#10B981', '#3B82F6'],
  };

  currentFilters = {
    year: '2024',
    month: 'default',
    timeFrame: 'year',
  };

  onFilterChange(event: any) {
    console.log('Filter change:', event);

    this.currentFilters = {
      year: event.year || this.currentFilters.year,
      month: event.month || this.currentFilters.month,
      timeFrame: event.timeFrame || this.currentFilters.timeFrame,
    };

    // Update header based on current view
    this.updateHeaderForCurrentView();

    // Optionally load new data based on filters
    this.loadDataForFilters();
  }

  private updateHeaderForCurrentView() {
    const { year, month, timeFrame } = this.currentFilters;

    if (timeFrame === 'month' && month !== 'default') {
      // Weekly view
      const monthName = this.getMonthName(month);
      this.graphConfig.header = `${monthName} ${year} - Weekly Breakdown`;
    } else {
      // Monthly view
      this.graphConfig.header = `${year} - Monthly Overview`;
    }
  }

  private getMonthName(monthIndex: string): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[parseInt(monthIndex) - 1] || 'Unknown';
  }

  private async loadDataForFilters() {
    // Simulate loading new data based on current filters
    try {
      const newData = await this.dataService.getDataForPeriod(this.currentFilters.year, this.currentFilters.month);

      // Update graph data
      this.graphConfig.graphData = newData;
    } catch (error) {
      console.error('Failed to load filtered data:', error);
    }
  }

  private getSalesData() {
    // Return your sales data structure
    return {
      '2024': {
        revenue: {
          jan: [2800, 2900, 3000, 3100],
          feb: [2900, 3000, 3100, 3200],
          // ... more months
        },
        profit: {
          jan: [800, 900, 1000, 1100],
          feb: [900, 1000, 1100, 1200],
          // ... more months
        },
      },
    };
  }
}
```

## Header Metrics

Dynamic metrics that update with your data:

```typescript
export class HeaderMetricsComponent {
  graphConfig: GraphConfig = {
    variant: GraphVariant.BarWithFilterLegend,
    size: 'large',
    header: 'Performance Dashboard',
    series: [
      { name: 'Sales', data: [1200, 1400, 1100, 1800, 1600, 2000, 1900, 2100, 1800, 2200, 2400, 2600] },
      { name: 'Marketing', data: [800, 900, 850, 1200, 1100, 1400, 1300, 1500, 1200, 1600, 1800, 2000] },
    ],
    colors: ['#10B981', '#3B82F6'],
    headerMetrics: [],
  };

  ngOnInit() {
    this.calculateDynamicMetrics();
  }

  private calculateDynamicMetrics() {
    const salesData = this.graphConfig.series[0].data;
    const marketingData = this.graphConfig.series[1].data;

    // Calculate various metrics
    const totalSales = salesData.reduce((sum, val) => sum + val, 0);
    const totalMarketing = marketingData.reduce((sum, val) => sum + val, 0);
    const avgSales = Math.round(totalSales / salesData.length);
    const avgMarketing = Math.round(totalMarketing / marketingData.length);
    const growthRate = this.calculateGrowthRate(salesData);
    const efficiency = Math.round((totalSales / totalMarketing) * 100) / 100;

    this.graphConfig.headerMetrics = [
      {
        label: 'Total Sales',
        value: totalSales.toLocaleString(),
        subValue: `Avg: ${avgSales.toLocaleString()}/month`,
      },
      {
        label: 'Total Marketing',
        value: totalMarketing.toLocaleString(),
        subValue: `Avg: ${avgMarketing.toLocaleString()}/month`,
      },
      {
        label: 'Growth Rate',
        value: `${growthRate}%`,
        subValue: 'Year over year',
      },
      {
        label: 'Efficiency Ratio',
        value: `${efficiency}:1`,
        subValue: 'Sales to Marketing',
      },
    ];
  }

  private calculateGrowthRate(data: number[]): number {
    if (data.length < 2) return 0;

    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));

    const firstHalfAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;

    return Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100);
  }

  // Update metrics when filters change
  onFilterChange(event: any) {
    // Recalculate metrics based on current view
    setTimeout(() => {
      this.calculateDynamicMetrics();
    }, 100);
  }
}
```

## Complete Examples

### E-commerce Dashboard

```typescript
@Component({
  selector: 'app-ecommerce-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>E-commerce Performance Dashboard</h1>

      <div class="graph-section">
        <ntv-graph [config]="salesConfig" (filterChange)="onSalesFilterChange($event)"> </ntv-graph>
      </div>

      <div class="graph-section">
        <ntv-graph [config]="conversionConfig" (filterChange)="onConversionFilterChange($event)"> </ntv-graph>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .graph-section {
        margin-bottom: 40px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }
    `,
  ],
})
export class EcommerceDashboardComponent {
  salesConfig: GraphConfig = {
    variant: GraphVariant.LineWithFilterLegend,
    size: 'large',
    header: 'Sales Performance',
    graphData: {
      '2024': {
        revenue: {
          jan: [45000, 47000, 49000, 51000],
          feb: [48000, 50000, 52000, 54000],
          mar: [51000, 53000, 55000, 57000],
          apr: [54000, 56000, 58000, 60000],
          may: [57000, 59000, 61000, 63000],
          jun: [60000, 62000, 64000, 66000],
          jul: [63000, 65000, 67000, 69000],
          aug: [66000, 68000, 70000, 72000],
          sep: [69000, 71000, 73000, 75000],
          oct: [72000, 74000, 76000, 78000],
          nov: [75000, 77000, 79000, 81000],
          dec: [78000, 80000, 82000, 84000],
        },
        orders: {
          jan: [1200, 1250, 1300, 1350],
          feb: [1280, 1330, 1380, 1430],
          mar: [1360, 1410, 1460, 1510],
          apr: [1440, 1490, 1540, 1590],
          may: [1520, 1570, 1620, 1670],
          jun: [1600, 1650, 1700, 1750],
          jul: [1680, 1730, 1780, 1830],
          aug: [1760, 1810, 1860, 1910],
          sep: [1840, 1890, 1940, 1990],
          oct: [1920, 1970, 2020, 2070],
          nov: [2000, 2050, 2100, 2150],
          dec: [2080, 2130, 2180, 2230],
        },
      },
    },
    colors: ['#10B981', '#3B82F6'],
    headerMetrics: [
      { label: 'Total Revenue', value: '$780,000' },
      { label: 'Total Orders', value: '21,450' },
      { label: 'Avg Order Value', value: '$36.36' },
      { label: 'Growth Rate', value: '15.2%' },
    ],
  };

  conversionConfig: GraphConfig = {
    variant: GraphVariant.BarWithLegend,
    size: 'medium',
    header: 'Conversion Metrics',
    series: [
      {
        name: 'Conversion Rate (%)',
        data: [2.4, 2.6, 2.8, 3.1, 3.3, 3.5, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2],
      },
      {
        name: 'Cart Abandonment (%)',
        data: [68, 67, 65, 63, 61, 59, 62, 60, 58, 56, 54, 52],
      },
    ],
    colors: ['#10B981', '#EF4444'],
    headerMetrics: [
      { label: 'Avg Conversion', value: '3.2%' },
      { label: 'Avg Abandonment', value: '60.4%' },
    ],
  };

  onSalesFilterChange(event: any) {
    console.log('Sales filter changed:', event);
    // Handle sales graph filter changes
  }

  onConversionFilterChange(event: any) {
    console.log('Conversion filter changed:', event);
    // Handle conversion graph filter changes
  }
}
```

### System Monitoring Dashboard

```typescript
@Component({
  selector: 'app-monitoring-dashboard',
  template: `
    <div class="monitoring-dashboard">
      <div class="status-indicator" [class.healthy]="systemHealth > 80" [class.warning]="systemHealth <= 80 && systemHealth > 60" [class.critical]="systemHealth <= 60">System Health: {{ systemHealth }}%</div>

      <ntv-graph [config]="performanceConfig"></ntv-graph>

      <div class="controls">
        <button (click)="toggleRealTime()">{{ isRealTime ? 'Stop' : 'Start' }} Real-time Updates</button>
        <button (click)="resetData()">Reset Data</button>
      </div>
    </div>
  `,
  styles: [
    `
      .monitoring-dashboard {
        padding: 20px;
        background: #1a1a1a;
        color: white;
        min-height: 100vh;
      }
      .status-indicator {
        padding: 10px 20px;
        border-radius: 5px;
        margin-bottom: 20px;
        font-weight: bold;
        text-align: center;
      }
      .healthy {
        background: #10b981;
      }
      .warning {
        background: #f59e0b;
      }
      .critical {
        background: #ef4444;
      }
      .controls {
        margin-top: 20px;
        text-align: center;
      }
      button {
        margin: 0 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background: #3b82f6;
        color: white;
        cursor: pointer;
      }
    `,
  ],
})
export class MonitoringDashboardComponent implements OnInit, OnDestroy {
  performanceConfig: GraphConfig = {
    variant: GraphVariant.LineWithLegend,
    size: 'large',
    header: 'System Performance Monitor',
    series: [
      { name: 'CPU Usage (%)', data: [] },
      { name: 'Memory Usage (%)', data: [] },
      { name: 'Disk I/O (MB/s)', data: [] },
      { name: 'Network (Mbps)', data: [] },
    ],
    colors: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'],
    headerMetrics: [],
  };

  systemHealth = 100;
  isRealTime = false;
  private updateInterval: any;

  ngOnInit() {
    this.initializeData();
  }

  ngOnDestroy() {
    this.stopRealTimeUpdates();
  }

  toggleRealTime() {
    if (this.isRealTime) {
      this.stopRealTimeUpdates();
    } else {
      this.startRealTimeUpdates();
    }
    this.isRealTime = !this.isRealTime;
  }

  private initializeData() {
    // Initialize with some baseline data
    for (let i = 0; i < 12; i++) {
      this.addDataPoint();
    }
    this.updateMetrics();
  }

  private startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.addDataPoint();
      this.updateMetrics();
    }, 2000); // Update every 2 seconds
  }

  private stopRealTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private addDataPoint() {
    // Generate realistic system metrics
    const cpuUsage = this.generateRealisticMetric(20, 80, 'cpu');
    const memoryUsage = this.generateRealisticMetric(30, 70, 'memory');
    const diskIO = this.generateRealisticMetric(5, 50, 'disk');
    const networkUsage = this.generateRealisticMetric(10, 100, 'network');

    const newValues = [cpuUsage, memoryUsage, diskIO, networkUsage];

    this.performanceConfig.series = this.performanceConfig.series.map((series, index) => {
      const updatedData = [...series.data, newValues[index]];

      // Keep only last 20 data points for real-time view
      if (updatedData.length > 20) {
        updatedData.shift();
      }

      return { ...series, data: updatedData };
    });
  }

  private generateRealisticMetric(min: number, max: number, type: string): number {
    // Add some randomness with trending for realistic system metrics
    const baseValue = Math.random() * (max - min) + min;

    // Add some system-specific behavior
    switch (type) {
      case 'cpu':
        // CPU tends to spike occasionally
        return Math.random() > 0.9 ? Math.min(95, baseValue + 20) : baseValue;
      case 'memory':
        // Memory tends to gradually increase
        return Math.min(max, baseValue + (Math.random() - 0.3) * 5);
      case 'disk':
        // Disk I/O can be very sporadic
        return Math.random() > 0.8 ? baseValue * 2 : baseValue * 0.5;
      case 'network':
        // Network usage varies widely
        return Math.random() * (max - min) + min;
      default:
        return baseValue;
    }
  }

  private updateMetrics() {
    const series = this.performanceConfig.series;

    if (series[0].data.length === 0) return;

    // Get latest values
    const latestCPU = series[0].data[series[0].data.length - 1] || 0;
    const latestMemory = series[1].data[series[1].data.length - 1] || 0;
    const latestDisk = series[2].data[series[2].data.length - 1] || 0;
    const latestNetwork = series[3].data[series[3].data.length - 1] || 0;

    // Calculate averages
    const avgCPU = this.calculateAverage(series[0].data);
    const avgMemory = this.calculateAverage(series[1].data);
    const avgDisk = this.calculateAverage(series[2].data);
    const avgNetwork = this.calculateAverage(series[3].data);

    // Update system health
    this.systemHealth = Math.round(100 - (latestCPU + latestMemory) / 2);

    this.performanceConfig.headerMetrics = [
      {
        label: 'CPU Usage',
        value: `${Math.round(latestCPU)}%`,
        subValue: `Avg: ${Math.round(avgCPU)}%`,
      },
      {
        label: 'Memory Usage',
        value: `${Math.round(latestMemory)}%`,
        subValue: `Avg: ${Math.round(avgMemory)}%`,
      },
      {
        label: 'Disk I/O',
        value: `${Math.round(latestDisk)} MB/s`,
        subValue: `Avg: ${Math.round(avgDisk)} MB/s`,
      },
      {
        label: 'Network',
        value: `${Math.round(latestNetwork)} Mbps`,
        subValue: `Avg: ${Math.round(avgNetwork)} Mbps`,
      },
    ];
  }

  private calculateAverage(data: number[]): number {
    if (data.length === 0) return 0;
    return data.reduce((sum, val) => sum + val, 0) / data.length;
  }

  resetData() {
    this.performanceConfig.series = this.performanceConfig.series.map((series) => ({
      ...series,
      data: [],
    }));
    this.performanceConfig.headerMetrics = [];
    this.systemHealth = 100;
    this.initializeData();
  }
}
```

## Advanced Usage Patterns

### Custom Data Transformers

Create reusable data transformation utilities:

```typescript
// data-transformers.service.ts
@Injectable({
  providedIn: 'root',
})
export class DataTransformersService {
  // Transform API response to graph series format
  transformToSeries(apiData: any[], seriesConfig: { name: string; dataField: string }[]): any[] {
    return seriesConfig.map((config) => ({
      name: config.name,
      data: apiData.map((item) => item[config.dataField] || 0),
    }));
  }

  // Transform flat array to hierarchical graph data
  transformToHierarchical(flatData: any[], yearField: string, categoryField: string, monthField: string, valueField: string): any {
    const result: any = {};

    flatData.forEach((item) => {
      const year = item[yearField];
      const category = item[categoryField];
      const month = item[monthField];
      const value = item[valueField];

      if (!result[year]) result[year] = {};
      if (!result[year][category]) result[year][category] = {};
      if (!result[year][category][month]) result[year][category][month] = [];

      result[year][category][month].push(value);
    });

    return result;
  }

  // Calculate metrics from series data
  calculateSeriesMetrics(series: any[]): any[] {
    return series.map((s) => {
      const total = s.data.reduce((sum: number, val: number) => sum + val, 0);
      const average = total / s.data.length;
      const max = Math.max(...s.data);
      const min = Math.min(...s.data);

      return {
        name: s.name,
        total,
        average: Math.round(average),
        max,
        min,
        growth: this.calculateGrowth(s.data),
      };
    });
  }

  private calculateGrowth(data: number[]): number {
    if (data.length < 2) return 0;
    const first = data[0];
    const last = data[data.length - 1];
    return Math.round(((last - first) / first) * 100);
  }
}

// Usage in component
export class TransformDataComponent {
  constructor(private transformer: DataTransformersService) {}

  ngOnInit() {
    // Transform API data to graph format
    this.apiService.getData().subscribe((apiData) => {
      const series = this.transformer.transformToSeries(apiData, [
        { name: 'Revenue', dataField: 'revenue' },
        { name: 'Profit', dataField: 'profit' },
      ]);

      const metrics = this.transformer.calculateSeriesMetrics(series);

      this.graphConfig = {
        variant: GraphVariant.LineWithLegend,
        size: 'medium',
        header: 'Transformed Data',
        series,
        headerMetrics: this.createMetricsFromCalculated(metrics),
      };
    });
  }
}
```

### Responsive Graph Configurations

Handle different screen sizes and devices:

```typescript
@Component({
  selector: 'app-responsive-graphs',
  template: `
    <div class="responsive-container">
      <ntv-graph [config]="responsiveConfig"></ntv-graph>
    </div>
  `,
  styles: [
    `
      .responsive-container {
        width: 100%;
        padding: 10px;
      }

      @media (max-width: 768px) {
        .responsive-container {
          padding: 5px;
        }
      }
    `,
  ],
})
export class ResponsiveGraphsComponent implements OnInit {
  responsiveConfig: GraphConfig = {
    variant: GraphVariant.LineWithLegend,
    size: 'medium',
    header: 'Responsive Graph',
    series: [],
    colors: ['#10B981', '#3B82F6'],
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateConfigForScreenSize();
  }

  ngOnInit() {
    this.loadData();
    this.updateConfigForScreenSize();
  }

  private updateConfigForScreenSize() {
    const width = window.innerWidth;

    if (width < 480) {
      // Mobile
      this.responsiveConfig.customSize = {
        width: '100%',
        height: '250px',
      };
      this.responsiveConfig.variant = GraphVariant.LineWithLegend; // Simpler variant
    } else if (width < 768) {
      // Tablet
      this.responsiveConfig.customSize = {
        width: '100%',
        height: '300px',
      };
      this.responsiveConfig.variant = GraphVariant.LineWithFilterLegend;
    } else {
      // Desktop
      this.responsiveConfig.customSize = {
        width: '100%',
        height: '400px',
      };
      this.responsiveConfig.variant = GraphVariant.BarWithFilterLegend;
    }
  }

  private loadData() {
    // Load appropriate data based on screen size
    const isMobile = window.innerWidth < 768;

    this.responsiveConfig.series = [
      {
        name: 'Sales',
        data: isMobile
          ? [1200, 1400, 1600, 1800, 2000, 2200] // Fewer data points for mobile
          : [1200, 1400, 1100, 1800, 1600, 2000, 1900, 2100, 1800, 2200, 2400, 2600],
      },
      {
        name: 'Profit',
        data: isMobile ? [400, 600, 800, 900, 1100, 1200] : [400, 600, 300, 800, 600, 1000, 900, 1100, 800, 1200, 1400, 1600],
      },
    ];
  }
}
```

### Multi-Graph Dashboard

Coordinate multiple graphs with shared filters:

```typescript
@Component({
  selector: 'app-multi-graph-dashboard',
  template: `
    <div class="dashboard">
      <div class="filter-bar">
        <select (change)="onGlobalFilterChange('year', $event)">
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select (change)="onGlobalFilterChange('department', $event)">
          <option value="all">All Departments</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="support">Support</option>
        </select>
      </div>

      <div class="graphs-grid">
        <div class="graph-item">
          <ntv-graph [config]="revenueConfig" (filterChange)="onRevenueFilter($event)"></ntv-graph>
        </div>

        <div class="graph-item">
          <ntv-graph [config]="performanceConfig" (filterChange)="onPerformanceFilter($event)"></ntv-graph>
        </div>

        <div class="graph-item">
          <ntv-graph [config]="trendsConfig" (filterChange)="onTrendsFilter($event)"></ntv-graph>
        </div>

        <div class="graph-item">
          <ntv-graph [config]="comparisonConfig" (filterChange)="onComparisonFilter($event)"></ntv-graph>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .filter-bar {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
      }

      .filter-bar select {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
      }

      .graphs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }

      .graph-item {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        min-height: 400px;
      }

      @media (max-width: 1024px) {
        .graphs-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class MultiGraphDashboardComponent {
  globalFilters = {
    year: '2024',
    department: 'all',
  };

  revenueConfig: GraphConfig = {
    variant: GraphVariant.LineWithFilterLegend,
    size: 'medium',
    header: 'Revenue Trends',
    graphData: this.getRevenueData(),
    colors: ['#10B981', '#3B82F6'],
  };

  performanceConfig: GraphConfig = {
    variant: GraphVariant.BarWithLegend,
    size: 'medium',
    header: 'Performance Metrics',
    series: [
      { name: 'Efficiency', data: [85, 87, 89, 91, 93, 95, 92, 94, 96, 98, 97, 99] },
      { name: 'Quality', data: [92, 93, 91, 95, 94, 96, 97, 95, 98, 99, 97, 98] },
    ],
    colors: ['#F59E0B', '#8B5CF6'],
  };

  trendsConfig: GraphConfig = {
    variant: GraphVariant.LineWithLegend,
    size: 'medium',
    header: 'Growth Trends',
    series: [
      { name: 'Customer Growth', data: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42] },
      { name: 'Market Share', data: [12, 13, 14, 15, 16, 18, 19, 20, 22, 23, 24, 26] },
    ],
    colors: ['#EF4444', '#06B6D4'],
  };

  comparisonConfig: GraphConfig = {
    variant: GraphVariant.BarWithFilterLegend,
    size: 'medium',
    header: 'Department Comparison',
    graphData: this.getComparisonData(),
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
  };

  onGlobalFilterChange(filterType: string, event: any) {
    const value = event.target.value;
    this.globalFilters[filterType as keyof typeof this.globalFilters] = value;

    // Update all graphs based on global filter
    this.updateAllGraphsForGlobalFilter();
  }

  private updateAllGraphsForGlobalFilter() {
    const { year, department } = this.globalFilters;

    // Update each graph configuration
    if (department !== 'all') {
      // Filter data to show only selected department
      this.filterGraphsByDepartment(department);
    } else {
      // Show all departments
      this.resetGraphsToShowAll();
    }

    // Update year for all graphs that support it
    this.updateGraphsForYear(year);
  }

  private filterGraphsByDepartment(department: string) {
    // Update revenue config to show only selected department
    if (this.revenueConfig.graphData && this.revenueConfig.graphData[this.globalFilters.year]) {
      const yearData = this.revenueConfig.graphData[this.globalFilters.year];
      const filteredData = {
        [this.globalFilters.year]: {
          [department]: yearData[department],
        },
      };
      this.revenueConfig.graphData = filteredData;
    }
  }

  private resetGraphsToShowAll() {
    // Reset to show all data
    this.revenueConfig.graphData = this.getRevenueData();
    this.comparisonConfig.graphData = this.getComparisonData();
  }

  private updateGraphsForYear(year: string) {
    // Update graphs that have year-based data
    this.revenueConfig.selectedYear = year;
    this.comparisonConfig.selectedYear = year;
  }

  // Individual graph filter handlers
  onRevenueFilter(event: any) {
    console.log('Revenue filter:', event);
    // Handle revenue-specific filters
  }

  onPerformanceFilter(event: any) {
    console.log('Performance filter:', event);
    // Handle performance-specific filters
  }

  onTrendsFilter(event: any) {
    console.log('Trends filter:', event);
    // Handle trends-specific filters
  }

  onComparisonFilter(event: any) {
    console.log('Comparison filter:', event);
    // Handle comparison-specific filters
  }

  private getRevenueData() {
    return {
      '2024': {
        sales: {
          jan: [15000, 16000, 17000, 18000],
          feb: [16000, 17000, 18000, 19000],
          // ... more months
        },
        marketing: {
          jan: [8000, 8500, 9000, 9500],
          feb: [8500, 9000, 9500, 10000],
          // ... more months
        },
        support: {
          jan: [3000, 3200, 3400, 3600],
          feb: [3200, 3400, 3600, 3800],
          // ... more months
        },
      },
      '2023': {
        // Previous year data...
      },
    };
  }

  private getComparisonData() {
    return {
      '2024': {
        sales: {
          jan: [12000, 13000, 14000, 15000],
          feb: [13000, 14000, 15000, 16000],
          // ... more months
        },
        marketing: {
          jan: [6000, 6500, 7000, 7500],
          feb: [6500, 7000, 7500, 8000],
          // ... more months
        },
        support: {
          jan: [2500, 2700, 2900, 3100],
          feb: [2700, 2900, 3100, 3300],
          // ... more months
        },
      },
    };
  }
}
```

## Testing Your Graph Component

### Unit Testing Examples

```typescript
// graph.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphComponent } from './graph.component';
import { GraphConfig, GraphVariant } from './graph.types';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle simple series data', () => {
    const config: GraphConfig = {
      variant: GraphVariant.LineWithLegend,
      size: 'medium',
      header: 'Test Graph',
      series: [{ name: 'Test Series', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }],
    };

    component.config = signal(config);
    fixture.detectChanges();

    expect(component.chartOptions().series).toEqual(config.series);
  });

  it('should emit filter changes', () => {
    spyOn(component.filterChange, 'emit');

    const config: GraphConfig = {
      variant: GraphVariant.LineWithFilterLegend,
      size: 'medium',
      header: 'Test Graph',
      series: [],
    };

    component.config = signal(config);

    const mockEvent = { target: { value: '2024' } } as any;
    component.onYearChange(mockEvent);

    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should calculate metrics correctly', () => {
    const config: GraphConfig = {
      variant: GraphVariant.LineWithLegend,
      size: 'medium',
      header: 'Test Graph',
      series: [{ name: 'Revenue', data: [100, 200, 300] }],
      headerMetrics: [{ label: 'Total', value: 600 }],
    };

    component.config = signal(config);
    fixture.detectChanges();

    expect(config.headerMetrics[0].value).toBe(600);
  });
});
```

### Integration Testing

```typescript
// dashboard.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EcommerceDashboardComponent } from './ecommerce-dashboard.component';

describe('EcommerceDashboardComponent Integration', () => {
  let component: EcommerceDashboardComponent;
  let fixture: ComponentFixture<EcommerceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceDashboardComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EcommerceDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should display multiple graphs', () => {
    fixture.detectChanges();

    const graphElements = fixture.nativeElement.querySelectorAll('ntv-graph');
    expect(graphElements.length).toBeGreaterThan(1);
  });

  it('should handle filter synchronization', () => {
    const filterEvent = {
      year: '2023',
      month: 'jan',
      timeFrame: 'month',
    };

    component.onSalesFilterChange(filterEvent);

    // Verify that other graphs are updated accordingly
    expect(component.salesConfig.selectedYear).toBe('2023');
  });
});
```

## Performance Optimization

### Lazy Loading Graphs

```typescript
// lazy-graph.component.ts
@Component({
  selector: 'app-lazy-graph',
  template: `
    <div class="graph-container" [class.loading]="isLoading">
      <div *ngIf="isLoading" class="loading-spinner">Loading graph data...</div>

      <ntv-graph *ngIf="!isLoading && graphConfig" [config]="graphConfig" (filterChange)="onFilterChange($event)"> </ntv-graph>
    </div>
  `,
})
export class LazyGraphComponent implements OnInit {
  @Input() dataSource!: string;

  graphConfig: GraphConfig | null = null;
  isLoading = true;

  ngOnInit() {
    // Simulate lazy loading
    setTimeout(() => {
      this.loadGraphData();
    }, 1000);
  }

  private async loadGraphData() {
    try {
      const data = await this.dataService.loadLargeDataset(this.dataSource);

      this.graphConfig = {
        variant: GraphVariant.LineWithFilterLegend,
        size: 'large',
        header: `Data from ${this.dataSource}`,
        graphData: data,
        colors: ['#10B981', '#3B82F6', '#F59E0B'],
      };
    } catch (error) {
      console.error('Failed to load graph data:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
```

## Best Practices

### 1. Data Structure Consistency

- Always ensure your data arrays have consistent lengths
- Use padding with zeros for missing data points
- Validate data before passing to the component

### 2. Performance Considerations

- Limit real-time updates to reasonable intervals (2-5 seconds minimum)
- Use pagination or data windowing for large datasets
- Implement lazy loading for non-visible graphs

### 3. User Experience

- Provide loading states for dynamic data
- Show meaningful error messages for data loading failures
- Use appropriate chart types for your data (line for trends, bar for comparisons)

### 4. Accessibility

- Ensure proper contrast ratios for colors
- Provide alternative text descriptions for screen readers
- Make interactive elements keyboard accessible

### 5. Responsive Design

- Test on various screen sizes
- Adjust graph complexity based on screen size
- Consider mobile-first approaches for touch interfaces

This comprehensive guide should help you implement the `ntv-graph` component effectively in your Angular applications, from simple use cases to complex dashboard scenarios!s
