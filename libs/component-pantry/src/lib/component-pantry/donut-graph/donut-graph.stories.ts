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
