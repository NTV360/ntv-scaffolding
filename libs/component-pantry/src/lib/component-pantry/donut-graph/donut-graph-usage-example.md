# Donut Graph Component Usage

The `ntv-donut-graph` component displays data as an interactive donut chart with customizable appearance and behavior. It's designed to work seamlessly with API responses and automatically updates when data changes.

## Basic Usage

```html
<ntv-donut-graph [data]="donutData" [config]="donutConfig"> </ntv-donut-graph>
```

## Data Structure

The component accepts an array of `DonutChartItem` objects from your API:

```typescript
interface DonutChartItem {
  label: string; // Display label for the segment
  total: number; // Numeric value for this segment
  color?: string; // Optional custom color (for backward compatibility)
}
```

### Example API Response

```typescript
// Your API response should match this structure:
const apiResponse: DonutChartItem[] = [
  { label: 'Active Users', total: 1250 },
  { label: 'Inactive Users', total: 750 },
  { label: 'Pending Users', total: 300 },
];
```

**Note**: The component automatically assigns colors from `DONUT_GRAPH_DEFAULT_COLORS` without repetition. You don't need to provide colors in your API response unless you want specific custom colors.

## Working with API Data

### Component Integration

```typescript
import { Component, signal, OnInit } from '@angular/core';
import { DonutChartItem, DonutChartConfig } from './donut-graph.types';

@Component({
  selector: 'app-dashboard',
  template: ` <ntv-donut-graph [data]="chartData()" [config]="chartConfig"> </ntv-donut-graph> `,
})
export class DashboardComponent implements OnInit {
  // Use signals for reactive data
  chartData = signal<DonutChartItem[]>([]);

  chartConfig: DonutChartConfig = {
    title: 'User Statistics',
    size: 'medium',
    showLegend: true,
    legendPosition: 'right',
  };

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.loadChartData();
  }

  async loadChartData() {
    try {
      // Fetch data from your API
      const response = await this.apiService.getUserStats();

      // Transform API response if needed
      const transformedData: DonutChartItem[] = response.data.map((item) => ({
        label: item.categoryName,
        total: item.value,
        // color is optional - component will auto-assign colors
      }));

      // Update the signal - chart will automatically re-render
      this.chartData.set(transformedData);
    } catch (error) {
      console.error('Failed to load chart data:', error);
      // Handle error appropriately
    }
  }

  // Method to refresh data
  async refreshData() {
    await this.loadChartData();
  }
}
```

### Real-time Data Updates

The component automatically updates when data changes:

```typescript
// Component will re-render automatically when you update the signal
updateChartData(newData: DonutChartItem[]) {
  this.chartData.set(newData);
}

// For periodic updates
setInterval(async () => {
  await this.loadChartData();
}, 30000); // Refresh every 30 seconds
```

## Configuration Options

```typescript
interface DonutChartConfig {
  title?: string; // Chart title displayed in header
  subtitle?: string; // Chart subtitle
  totalCount?: number; // Override total count calculation
  icon?: string; // Icon to display next to title

  // Size options
  size?: 'small' | 'medium' | 'large' | 'fullscreen' | 'auto';
  customSize?: {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
  };

  // Appearance
  colors?: string[]; // Custom color palette
  strokeWidth?: number; // Border width around segments
  donutHoleSize?: number; // Size of center hole (percentage)

  // Legend and labels
  showLegend?: boolean; // Show/hide legend
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  showDataLabels?: boolean; // Show values on chart segments
}
```

## Usage Examples

### Basic Chart with API Data

```typescript
// Service method
async getProductSales(): Promise<DonutChartItem[]> {
  const response = await this.http.get<any[]>('/api/product-sales').toPromise();
  return response.map(item => ({
    label: item.productName,
    total: item.salesAmount
  }));
}

// Component
const salesData = signal<DonutChartItem[]>([]);
const salesConfig: DonutChartConfig = {
  title: 'Product Sales',
  subtitle: 'Last 30 days',
  size: 'medium',
  showLegend: true,
  legendPosition: 'right'
};

// Load data
this.productService.getProductSales().then(data => {
  salesData.set(data);
});
```

### Small Dashboard Widget

```typescript
const widgetData = signal<DonutChartItem[]>([]);
const widgetConfig: DonutChartConfig = {
  title: 'Server Status',
  icon: '🖥️',
  size: 'small',
  showLegend: true,
  legendPosition: 'bottom',
  colors: ['#10B981', '#EF4444', '#F59E0B'], // Green, Red, Yellow
};

// API call
this.monitoringService.getServerStatus().then((data) => {
  widgetData.set(data);
});
```

### Large Analytics Chart

```typescript
const analyticsData = signal<DonutChartItem[]>([]);
const analyticsConfig: DonutChartConfig = {
  title: 'Traffic Sources',
  subtitle: 'Website analytics for this month',
  size: 'large',
  showLegend: true,
  legendPosition: 'bottom',
  donutHoleSize: 60,
  strokeWidth: 2,
};

// Load from analytics API
this.analyticsService.getTrafficSources().then((data) => {
  analyticsData.set(data);
});
```

### Auto-Sized Container Chart

```typescript
const containerData = signal<DonutChartItem[]>([]);
const containerConfig: DonutChartConfig = {
  title: 'Resource Usage',
  size: 'auto', // Adapts to parent container size
  showLegend: true,
  // legendPosition: 'right', // Optional - will default to 'bottom' on mobile
};

// Perfect for responsive layouts
this.systemService.getResourceUsage().then((data) => {
  containerData.set(data);
});
```

**Auto Size Features:**

- **Parent Container Responsive**: Automatically adjusts chart size based on parent container dimensions
- **Dual ResizeObserver**: Observes both parent container and component for maximum responsiveness
- **Responsive Breakpoints**: Different chart sizes based on container dimensions:
  - Small containers (<300px): 250px width, 200px height
  - Medium containers (<500px): 350px width, 300px height
  - Large containers (<800px): 450px width, 400px height
  - Extra large containers (≥800px): 600px width, 500px height
- **Dynamic Sizing**: Chart dimensions update automatically when container resizes
- **Custom Legend Only**: Uses only the custom legend component - no built-in chart legend
- **Legend Adaptation**: Legend adjusts to available space and becomes scrollable if needed
- **Mobile Legend:**

- **Automatic Bottom Position**: Legend automatically moves to bottom on mobile devices (≤768px)
- **Scrollable Legend**: Legend becomes scrollable with reduced height (100px on mobile, 80px on extra small devices)
- **Smaller Chart Size**: Chart dimensions are significantly reduced for mobile:
  - Mobile (≤768px): 120-200px width, 100-160px height
  - Extra small (≤480px): 120px width, 100px height
- **Optimized Spacing**: Reduced padding and gaps for better mobile experience
- **Responsive Typography**: Smaller font sizes for titles and legend items on mobile

### Practical Auto Size Examples

#### Dashboard Widget

```html
<!-- Chart adapts to widget container -->
<div class="dashboard-widget" style="width: 300px; height: 250px;">
  <ntv-donut-graph [data]="widgetData" [config]="{ size: 'auto' }"></ntv-donut-graph>
</div>
```

#### Responsive Sidebar

```html
<!-- Chart adapts to sidebar width -->
<div class="sidebar" style="width: 250px; height: 100vh;">
  <ntv-donut-graph [data]="sidebarData" [config]="{ size: 'auto' }"></ntv-donut-graph>
</div>
```

#### Full-Width Container

```html
<!-- Chart fills entire container -->
<div class="full-width-container" style="width: 100%; height: 400px;">
  <ntv-donut-graph [data]="fullData" [config]="{ size: 'auto' }"></ntv-donut-graph>
</div>
```

### Custom Sized Chart

```typescript
const customData = signal<DonutChartItem[]>([]);
const customConfig: DonutChartConfig = {
  title: 'Custom Metrics',
  size: 'custom',
  customSize: {
    width: '400px',
    height: '300px',
    maxWidth: '100%',
  },
  showLegend: true,
};
```

## Data Transformation Examples

### Transform Complex API Response

```typescript
// If your API returns complex objects
interface ApiResponse {
  categories: {
    name: string;
    value: number;
    metadata: any;
  }[];
  total: number;
}

async loadComplexData() {
  const response: ApiResponse = await this.apiService.getComplexData();

  const chartData: DonutChartItem[] = response.categories.map(category => ({
    label: category.name,
    total: category.value
  }));

  const config: DonutChartConfig = {
    title: 'Category Breakdown',
    totalCount: response.total, // Use API-provided total
    size: 'medium'
  };

  this.chartData.set(chartData);
}
```

### Handle Empty or Error States

```typescript
async loadDataWithErrorHandling() {
  try {
    const data = await this.apiService.getData();

    if (!data || data.length === 0) {
      // Handle empty data
      this.chartData.set([
        { label: 'No data available', total: 1 }
      ]);
      return;
    }

    this.chartData.set(data);
  } catch (error) {
    console.error('Failed to load data:', error);
    // Show error state
    this.chartData.set([
      { label: 'Error loading data', total: 1 }
    ]);
  }
}
```

## Features

- **Reactive Data Binding**: Automatically updates when data changes using Angular signals
- **API-Ready**: Designed to work seamlessly with REST API responses
- **Responsive Design**: Automatically adapts to different screen sizes and container dimensions
- **Container Responsive**: Auto size mode uses ResizeObserver to adapt to container changes
- **Auto-Color Assignment**: Automatically assigns colors from a predefined palette
- **Custom Styling**: Support for custom colors, sizes, and appearance options
- **Interactive**: Hover effects and dynamic value display
- **Accessible**: Proper ARIA labels and keyboard navigation support
- **Performance Optimized**: Uses Angular signals for efficient change detection

## Error Handling

```typescript
// Handle API errors gracefully
async loadChartData() {
  try {
    const data = await this.apiService.getChartData();
    this.chartData.set(data);
    this.isLoading.set(false);
  } catch (error) {
    console.error('Chart data loading failed:', error);
    this.hasError.set(true);
    this.isLoading.set(false);

    // Optionally show fallback data
    this.chartData.set([
      { label: 'Unable to load data', total: 1 }
    ]);
  }
}
```

## Best Practices

1. **Use Signals**: Always use Angular signals for reactive data binding
2. **Handle Loading States**: Show loading indicators while fetching data
3. **Error Handling**: Implement proper error handling for API failures
4. **Data Validation**: Validate API responses before passing to the component
5. **Performance**: Consider caching frequently accessed data
6. **Accessibility**: Ensure meaningful labels for screen readers
