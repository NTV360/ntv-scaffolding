import type { Meta, StoryObj } from '@storybook/angular';
import { DonutGraphComponent } from './donut-graph';
import { DonutChartItem } from './donut-graph.types';
import { GRAPH_DEMO_DATA } from './donut-graph.constants';

const meta: Meta<DonutGraphComponent> = {
  title: 'Components/Donut Graph',
  component: DonutGraphComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of donut chart data items with label and total',
    },
    config: {
      control: 'object',
      description: 'Configuration for the donut chart',
    },
  },
};

export default meta;
type Story = StoryObj<DonutGraphComponent>;

// Helper function to get demo data
const getDemoData = (dataset: keyof typeof GRAPH_DEMO_DATA) =>
  GRAPH_DEMO_DATA[dataset].data as unknown as DonutChartItem[];

export const RaspberryPiVersions: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'auto',
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
      </div>
    `,
  }),
};

export const SmallDonutChart: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'small', // Now responsive to container
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
      </div>
    `,
  }),
};

export const MediumSizeManyLabelsDonutChart: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'medium', // Now responsive to container
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
      </div>
    `,
  }),
};

export const LargeSalesByCategory: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'large', // Now responsive to container
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'left',
    },
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
          <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
        </div>
      `,
  }),
};

export const FullscreenDonutChart: Story = {
  args: {
    data: GRAPH_DEMO_DATA.raspberryPiVersions
      .data as unknown as DonutChartItem[],
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'fullscreen', // Now responsive to container
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AutoSizedDonutChart: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'auto',
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
          <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
        </div>
      `,
  }),
};

export const ContainerResponsiveDonutChart: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'auto',
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);">
        <h3 style="text-align: center; margin-bottom: 1rem; color: #333;">Parent Container Responsive Demo</h3>
        <p style="text-align: center; margin-bottom: 2rem; color: #666;">The chart automatically adjusts to its parent container size</p>
        
        <!-- Small Container -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Small Container (400px width)</h4>
          <div style="width: 400px; height: 300px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Medium Container -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Medium Container (600px width)</h4>
          <div style="width: 600px; height: 400px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Large Container -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Large Container (800px width)</h4>
          <div style="width: 800px; height: 500px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Full Width Container -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #666;">Full Width Container</h4>
          <div style="width: 100%; height: 400px; border: 2px dashed #ccc; padding: 1rem; position: relative;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ResponsiveContainerDemo: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'auto',
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);">
        <h3 style="text-align: center; margin-bottom: 1rem; color: #333;">Responsive Container Demo</h3>
        <p style="text-align: center; margin-bottom: 2rem; color: #666;">Test different screen sizes to see the container adapt</p>
        
        <!-- Desktop Container -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Desktop (1200px+)</h4>
          <div style="width: 100%; height: 500px; border: 2px dashed #ccc; padding: 1rem; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Tablet Container -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Tablet (768px - 1024px)</h4>
          <div style="width: 800px; height: 400px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Mobile Container -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Mobile (<768px)</h4>
          <div style="width: 400px; height: 300px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Small Mobile Container -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #666;">Small Mobile (<480px)</h4>
          <div style="width: 300px; height: 250px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <div style="margin-top: 2rem; text-align: center; color: #666; font-size: 14px;">
          <p><strong>Responsive Features:</strong></p>
          <ul style="list-style: none; padding: 0; text-align: left; max-width: 600px; margin: 0 auto;">
            <li>• <strong>Container:</strong> Adapts padding, border-radius, and minimum dimensions</li>
            <li>• <strong>Typography:</strong> Font sizes scale with screen size</li>
            <li>• <strong>Layout:</strong> Chart and legend layout adjusts responsively</li>
            <li>• <strong>Auto Size:</strong> Chart fills available space in parent container</li>
            <li>• <strong>Touch Friendly:</strong> Optimized for mobile interactions</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const MobileLegendDemo: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'auto',
      showDataLabels: true,
      showLegend: true,
      // No legendPosition specified - will default to 'bottom' on mobile
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);">
        <h3 style="text-align: center; margin-bottom: 1rem; color: #333;">Mobile Legend Demo</h3>
        <p style="text-align: center; margin-bottom: 2rem; color: #666;">Legend automatically moves to bottom on mobile devices</p>
        
        <!-- Desktop View -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Desktop View (>768px)</h4>
          <p style="margin-bottom: 1rem; color: #888; font-size: 14px;">Legend appears on the right side</p>
          <div style="width: 800px; height: 400px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Mobile View -->
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 0.5rem; color: #666;">Mobile View (≤768px)</h4>
          <p style="margin-bottom: 1rem; color: #888; font-size: 14px;">Legend automatically moves to bottom</p>
          <div style="width: 400px; height: 500px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Small Mobile View -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #666;">Small Mobile View (≤480px)</h4>
          <p style="margin-bottom: 1rem; color: #888; font-size: 14px;">Legend remains at bottom with compact layout</p>
          <div style="width: 300px; height: 450px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto; position: relative; background: white;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <div style="margin-top: 2rem; text-align: center; color: #666; font-size: 14px;">
          <p><strong>Mobile Legend Features:</strong></p>
          <ul style="list-style: none; padding: 0; text-align: left; max-width: 600px; margin: 0 auto;">
            <li>• <strong>Auto Detection:</strong> Automatically detects mobile screen size (≤768px)</li>
            <li>• <strong>Bottom Position:</strong> Legend moves to bottom on mobile devices</li>
            <li>• <strong>Responsive Layout:</strong> Chart and legend stack vertically</li>
            <li>• <strong>Touch Friendly:</strong> Optimized spacing for mobile interactions</li>
            <li>• <strong>Real-time Updates:</strong> Responds to window resize events</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const MobileOptimizedDemo: Story = {
  args: {
    data: getDemoData('raspberryPiVersions'),
    config: {
      title: GRAPH_DEMO_DATA.raspberryPiVersions.title,
      totalCount: GRAPH_DEMO_DATA.raspberryPiVersions.totalCount,
      size: 'auto',
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'right', // Will be overridden to 'bottom' on mobile
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 1rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);">
        <h3 style="text-align: center; margin-bottom: 1rem; color: #333;">Mobile Optimized Demo</h3>
        <p style="text-align: center; margin-bottom: 1rem; color: #666;">Optimized for mobile devices with smaller chart and scrollable legend</p>
        
        <!-- Mobile Container Simulation -->
        <div style="margin-bottom: 1rem; padding: 0.5rem; border: 2px solid #ddd; border-radius: 8px;">
          <h4 style="margin-bottom: 0.5rem; color: #666; font-size: 14px;">Mobile View (≤768px)</h4>
          <div style="width: 100%; max-width: 400px; height: 300px; background: white; border-radius: 8px; padding: 0.5rem; margin: 0 auto;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <!-- Extra Small Mobile Container -->
        <div style="margin-bottom: 1rem; padding: 0.5rem; border: 2px solid #ddd; border-radius: 8px;">
          <h4 style="margin-bottom: 0.5rem; color: #666; font-size: 14px;">Extra Small Mobile (≤480px)</h4>
          <div style="width: 100%; max-width: 300px; height: 250px; background: white; border-radius: 8px; padding: 0.5rem; margin: 0 auto;">
            <ntv-donut-graph [data]="data" [config]="config"></ntv-donut-graph>
          </div>
        </div>
        
        <div style="margin-top: 1rem; text-align: center; color: #666; font-size: 12px;">
          <p><strong>Mobile Features:</strong></p>
          <ul style="list-style: none; padding: 0; text-align: left; max-width: 400px; margin: 0 auto; font-size: 11px;">
            <li>• <strong>Smaller Chart:</strong> Reduced dimensions for mobile screens</li>
            <li>• <strong>Bottom Legend:</strong> Legend automatically positioned at bottom</li>
            <li>• <strong>Scrollable:</strong> Legend scrolls when content exceeds height</li>
            <li>• <strong>Optimized Spacing:</strong> Reduced padding and gaps</li>
            <li>• <strong>Responsive Typography:</strong> Smaller fonts for mobile</li>
          </ul>
        </div>
      </div>
    `,
  }),
};
