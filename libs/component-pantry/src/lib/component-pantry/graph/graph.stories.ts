import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { GraphComponent } from './graph';
import { FilterEvent, GraphConfig, GraphVariant } from './graph.types';
import { signal } from '@angular/core';
import { GRAPH_DEMO_DATA, getDynamicTimeFrames } from './graph.constants';
import { MonthKey } from './graph.types';
import { groupFlatDataByMonth } from './graph.utils';

const meta: Meta<GraphComponent> = {
  title: 'Components/Graph',
  component: GraphComponent,
  decorators: [
    moduleMetadata({
      imports: [GraphComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Graph Component

A versatile graph component with four main variants and multiple size options:

Variants:
1. Line Graph with Legends (no filters)
2. Line Graph with Legends and Filters
3. Bar Graph with Legends (no filters)
4. Bar Graph with Legends and Filters

Sizes:
- small (800px × 400px) - for standard graphs
- medium (1000px × 500px) - for detailed analysis
- large (1380px × 500px) - for full-width dashboards
- custom - for custom dimensions
- fullscreen - for full-width dashboards

All variants support switching between line and bar visualization.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<GraphComponent>;

// Helper function to get data for a specific year
const getYearData = (year: string) => {
  const yearData = GRAPH_DEMO_DATA[year];

  if (yearData) {
    const months: MonthKey[] = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];

    // Flat arrays (48 values)
    const activeFlat = months.flatMap(
      (month) =>
        (yearData['active'] as Record<MonthKey, number[]>)[month] || [
          0, 0, 0, 0,
        ]
    );
    const inactiveFlat = months.flatMap(
      (month) =>
        (yearData['inactive'] as Record<MonthKey, number[]>)[month] || [
          0, 0, 0, 0,
        ]
    );
    const downturnFlat = months.flatMap(
      (month) =>
        (yearData['downturn'] as Record<MonthKey, number[]>)[month] || [
          0, 0, 0, 0,
        ]
    );
    const additionalFlat = months.flatMap(
      (month) =>
        (yearData['additionalMark'] as Record<MonthKey, number[]>)[month] || [
          0, 0, 0, 0,
        ]
    );

    // Group into 12 monthly totals
    const active = groupFlatDataByMonth(activeFlat);
    const inactive = groupFlatDataByMonth(inactiveFlat);
    const downturn = groupFlatDataByMonth(downturnFlat);
    const additional = groupFlatDataByMonth(additionalFlat);

    return { active, inactive, downturn, additional };
  }

  return {
    active: Array(12).fill(0),
    inactive: Array(12).fill(0),
    downturn: Array(12).fill(0),
    additional: Array(12).fill(0),
  };
};

//     value: 'default',
//     label: 'Default',
//     categories: MONTH_CATEGORIES,
//   },
//   ...MONTH_CATEGORIES.map((month, index) => ({
//     value: (index + 1).toString(),
//     label: month,
//     categories: WEEK_CATEGORIES,
//   })),
// ];

// const YEARLY_TIMEFRAMES = [
//   {
//     value: '2022',
//     label: '2022',
//     categories: MONTH_CATEGORIES,
//   },
//   {
//     value: '2023',
//     label: '2023',
//     categories: MONTH_CATEGORIES,
//   },
//   {
//     value: '2024',
//     label: '2024',
//     categories: MONTH_CATEGORIES, // Show all months, data will be 0 for missing months
//   },
// ];

// Line Graph with Metrics (Full screen)
// export const LineGraphWithMetrics: Story = {
//   args: {
//     config: {
//       variant: GraphVariant.LineWithFilterLegend,
//       size: 'xlarge',
//       headerMetrics: [
//         { label: 'Online', value: 2778, color: '#8DCB2C' },
//         { label: 'Offline', value: 878, color: '#FF4444' },
//         { label: 'Pending', value: 3, color: '#FFA500' },
//         { label: 'Demo', value: 13, color: '#008FFB' },
//         { label: 'Inactive', value: 427, color: '#666666' },
//         { label: 'Assigned', value: 460, color: '#44B700' },
//         { label: 'Unassigned', value: 3665, color: '#999999' },
//       ],
//       series: [
//         {
//           name: 'Active',
//           data: [
//             // Jan
//             120, 130, 140, 150,
//             // Feb
//             160, 170, 180, 190,
//             // Mar
//             200, 210, 220, 230,
//             // Apr
//             240, 250, 260, 270,
//             // May
//             280, 290, 300, 310,
//             // Jun
//             320, 330, 340, 350,
//             // Jul
//             360, 370, 380, 390,
//             // Aug
//             400, 410, 420, 430,
//             // Sep
//             440, 450, 460, 470,
//             // Oct
//             480, 490, 500, 510,
//             // Nov
//             520, 530, 540, 550,
//             // Dec
//             560, 570, 580, 590,
//           ],
//         },
//         {
//           name: 'Inactive',
//           data: [
//             // Jan
//             20, 25, 30, 35,
//             // Feb
//             40, 45, 50, 55,
//             // Mar
//             60, 65, 70, 75,
//             // Apr
//             80, 85, 90, 95,
//             // May
//             100, 105, 110, 115,
//             // Jun
//             120, 125, 130, 135,
//             // Jul
//             140, 145, 150, 155,
//             // Aug
//             160, 165, 170, 175,
//             // Sep
//             180, 185, 190, 195,
//             // Oct
//             200, 205, 210, 215,
//             // Nov
//             220, 225, 230, 235,
//             // Dec
//             240, 245, 250, 255,
//           ],
//         },
//       ],
//       timeFrames: {
//         monthly: [
//           {
//             value: 'default',
//             label: 'Default',
//             categories: [
//               'Jan',
//               'Feb',
//               'Mar',
//               'Apr',
//               'May',
//               'Jun',
//               'Jul',
//               'Aug',
//               'Sep',
//               'Oct',
//               'Nov',
//               'Dec',
//             ],
//           },
//           {
//             value: '1',
//             label: 'January',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '2',
//             label: 'February',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '3',
//             label: 'March',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '4',
//             label: 'April',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '5',
//             label: 'May',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '6',
//             label: 'June',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '7',
//             label: 'July',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '8',
//             label: 'August',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '9',
//             label: 'September',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '10',
//             label: 'October',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '11',
//             label: 'November',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//           {
//             value: '12',
//             label: 'December',
//             categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           },
//         ],
//         yearly: [
//           {
//             value: '2023',
//             label: '2023',
//             categories: [
//               'Jan',
//               'Feb',
//               'Mar',
//               'Apr',
//               'May',
//               'Jun',
//               'Jul',
//               'Aug',
//               'Sep',
//               'Oct',
//               'Nov',
//               'Dec',
//             ],
//           },
//           { value: '2024', label: '2024', categories: ['Jan', 'Feb', 'Mar'] },
//         ],
//       },
//       selectedTimeFrame: 'month',
//       selectedMonth: 'default',
//       selectedYear: '2023',
//       colors: ['#8DCB2C', '#008FFB'],
//     },
//   },
//   render: (args) => ({
//     props: {
//       config: args.config,
//       onFilterChange: (event: FilterEvent) => {
//         args.config = {
//           ...args.config,
//           selectedTimeFrame: event.timeFrame,
//           selectedMonth: event.month,
//           selectedYear: event.year,
//         };
//       },
//     },
//     template: `
//       <div style="min-height: 100vh; padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex;">
//         <div style="flex: 1; min-height: 0;">
//           <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
//         </div>
//       </div>
//     `,
//   }),
// };

// Line Chart (Fixed container)
export const LineChart: Story = {
  args: {
    config: {
      variant: GraphVariant.LineWithLegend,
      size: 'small',
      graphData: GRAPH_DEMO_DATA,
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
      header: 'Total Licenses',
      subHeader: 'Monthly revenue and profit',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config"></ntv-graph>
      </div>
    `,
  }),
};

// Line Chart with Filters (Custom size)
export const LineChartWithMetrics: Story = {
  args: {
    config: {
      variant: GraphVariant.LineWithFilterLegend,
      size: 'large',
      headerMetrics: [
        { label: 'Online', value: 2778, color: '#8DCB2C' },
        { label: 'Offline', value: 878, color: '#FF4444' },
        { label: 'Pending', value: 3, color: '#FFA500' },
        { label: 'Demo', value: 13, color: '#008FFB' },
        { label: 'Inactive', value: 427, color: '#666666' },
        { label: 'Assigned', value: 427, color: '#666666' },
        { label: 'Unassigned', value: 427, color: '#666666' },
      ],
      graphData: GRAPH_DEMO_DATA,
      timeFrames: getDynamicTimeFrames(),
    },
  },
  render: (args) => ({
    props: {
      config: args.config,
      onFilterChange: (event: FilterEvent) => {
        args.config = {
          ...args.config,
          selectedTimeFrame: event.timeFrame,
          selectedMonth: event.month,
          selectedYear: event.year,
          graphData: GRAPH_DEMO_DATA,
        };
      },
    },
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
      </div>
    `,
  }),
};

//   args: {
//     config: {
//       variant: GraphVariant.LineWithFilterLegend,
//       size: 'large',
//       graphData: GRAPH_DEMO_DATA,
//       headerMetrics: [
//         { label: 'Online', value: 2778, color: '#8DCB2C' },
//         { label: 'Offline', value: 878, color: '#FF4444' },
//         { label: 'Pending', value: 3, color: '#FFA500' },
//         { label: 'Demo', value: 13, color: '#008FFB' },
//         { label: 'Inactive', value: 427, color: '#666666' },
//       ],
//       series: [
//         {
//           name: 'Active',
//           data: getYearData('2023').active,
//         },
//         {
//           name: 'Inactive',
//           data: getYearData('2023').inactive,
//         },
//         {
//           name: 'Downturn',
//           data: getYearData('2023').downturn || [],
//         },
//         {
//           name: 'Additional',
//           data: getYearData('2023').additional || [],
//         },
//       ],
//       timeFrames: getDynamicTimeFrames(), // <-- Use dynamic timeFrames here
//       selectedTimeFrame: 'month',
//       selectedMonth: '1',
//       selectedYear: '2023',
//     },
//   },
//   render: (args) => ({
//     props: {
//       config: args.config,
//       onFilterChange: (event: FilterEvent) => {
//         args.config = {
//           ...args.config,
//           selectedTimeFrame: event.timeFrame,
//           selectedMonth: event.month,
//           selectedYear: event.year,
//           series: [
//             {
//               name: 'Active',
//               data: getYearData(event.year || '2023').active,
//             },
//             {
//               name: 'Inactive',
//               data: getYearData(event.year || '2023').inactive,
//             },
//             {
//               name: 'Downturn',
//               data: getYearData(event.year || '2023').downturn || [],
//             },
//             {
//               name: 'Additional',
//               data: getYearData(event.year || '2023').additional || [],
//             },
//           ],
//         };
//       },
//     },
//     template: `
//       <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
//         <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
//       </div>
//     `,
//   }),
// };

// Story with structured data
export const LineChartWithFilters: Story = {
  args: {
    config: {
      variant: GraphVariant.LineWithFilterLegend,
      size: 'small',
      graphData: GRAPH_DEMO_DATA,
      timeFrames: getDynamicTimeFrames(),
      header: 'Total Licenses',
    },
  },
  render: (args) => ({
    props: {
      config: args.config,
      onFilterChange: (event: FilterEvent) => {
        args.config = {
          ...args.config,
          selectedTimeFrame: event.timeFrame,
          selectedMonth: event.month,
          selectedYear: event.year,
          graphData: GRAPH_DEMO_DATA,
        };
      },
    },
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
      </div>
    `,
  }),
};

// Bar Chart (Large size)
export const BarChart: Story = {
  args: {
    config: {
      variant: GraphVariant.BarWithLegend,
      size: 'small',
      graphData: GRAPH_DEMO_DATA,
      header: 'Total Hosts',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f3f6f9 0%, #e5edf5 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config"></ntv-graph>
      </div>
    `,
  }),
};

// Bar Chart with Filters (Small size)
export const BarChartWithFilters: Story = {
  args: {
    config: {
      variant: GraphVariant.BarWithFilterLegend,
      size: 'small',
      graphData: GRAPH_DEMO_DATA,
      timeFrames: getDynamicTimeFrames(),
      header: 'Total Hosts',
      colors: ['#8DCB2C', '#008FFB', '#FEB019', '#FF4560'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f6f8fb 0%, #e8eef5 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
      </div>
    `,
  }),
};

export const CustomizeChart: Story = {
  args: {
    config: {
      //LineFilterLegend to Use the Switch Button
      variant: GraphVariant.LineWithLegend,
      // size: 'medium',
      //can customize size here
      customSize: {
        width: '830px',
        height: '500px',
        maxWidth: '100%',
      },
      graphData: GRAPH_DEMO_DATA,
      //Can customize colors here
      colors: ['#8DCB2C', '#008FFB', '#FEB019', '#FF4560'],
      header: 'Total Licenses',
      subHeader: 'Monthly revenue and profit',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config"></ntv-graph>
      </div>
    `,
  }),
};

// Fullscreen Graph
export const FullscreenGraph: Story = {
  args: {
    config: {
      variant: GraphVariant.LineWithFilterLegend,
      size: 'fullscreen',
      headerMetrics: [
        { label: 'Total Revenue', value: 1250000, color: '#8DCB2C' },
        { label: 'Active Users', value: 15420, color: '#008FFB' },
        { label: 'Growth Rate', value: 23.5, color: '#FEB019' },
        { label: 'Conversion', value: 8.7, color: '#FF4560' },
      ],
      graphData: GRAPH_DEMO_DATA,
      timeFrames: getDynamicTimeFrames(),
      header: 'Fullscreen Analytics Dashboard',
      subHeader: 'Comprehensive data visualization in fullscreen mode',
    },
  },
  render: (args) => ({
    props: {
      config: args.config,
      onFilterChange: (event: FilterEvent) => {
        args.config = {
          ...args.config,
          selectedTimeFrame: event.timeFrame,
          selectedMonth: event.month,
          selectedYear: event.year,
          graphData: GRAPH_DEMO_DATA,
        };
      },
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; flex-direction: column;">
        <div style="flex: 1; min-height: 0;">
          <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
        </div>
      </div>
    `,
  }),
};

// Story with incomplete month data
export const IncompleteMonthData: Story = {
  args: {
    config: {
      variant: GraphVariant.LineWithFilterLegend,
      size: 'small',
      graphData: {
        '2024': {
          active: {
            jan: [10, 20, 30, 40],
            feb: [15, 25, 35, 45],
            mar: [20, 30, 40, 50],
            apr: [25, 35, 45, 55],
            may: [30, 40, 50, 60],
            // Missing jun, jul, aug, sep, oct, nov, dec
          },
          inactive: {
            jan: [5, 15, 25, 35],
            feb: [10, 20, 30, 40],
            mar: [15, 25, 35, 45],
            apr: [20, 30, 40, 50],
            may: [25, 35, 45, 55],
            // Missing jun, jul, aug, sep, oct, nov, dec
          },
          downturn: {
            jan: [2, 12, 22, 32],
            feb: [7, 17, 27, 37],
            mar: [12, 22, 32, 42],
            apr: [17, 27, 37, 47],
            may: [22, 32, 42, 52],
            // Missing jun, jul, aug, sep, oct, nov, dec
          },
          additionalMark: {
            jan: [1, 11, 21, 31],
            feb: [6, 16, 26, 36],
            mar: [11, 21, 31, 41],
            apr: [16, 26, 36, 46],
            may: [21, 31, 41, 51],
            // Missing jun, jul, aug, sep, oct, nov, dec
          },
        },
      },
      timeFrames: getDynamicTimeFrames(),
      header: 'Incomplete Data Example',
      subHeader: 'Shows only available months (Jan-May)',
      colors: ['#8DCB2C', '#008FFB', '#FEB019', '#FF4560'],
    },
  },
  render: (args) => ({
    props: {
      config: args.config,
      onFilterChange: (event: FilterEvent) => {
        args.config = {
          ...args.config,
          selectedTimeFrame: event.timeFrame,
          selectedMonth: event.month,
          selectedYear: event.year,
          graphData: args.config.graphData,
        };
      },
    },
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
      </div>
    `,
  }),
};

// Story with sparse month data
export const SparseMonthData: Story = {
  args: {
    config: {
      variant: GraphVariant.BarWithFilterLegend,
      size: 'medium',
      graphData: {
        '2024': {
          active: {
            jan: [100, 200, 300, 400],
            mar: [150, 250, 350, 450],
            jun: [200, 300, 400, 500],
            sep: [250, 350, 450, 550],
            dec: [300, 400, 500, 600],
            // Only 5 months of data
          },
          inactive: {
            jan: [50, 150, 250, 350],
            mar: [75, 175, 275, 375],
            jun: [100, 200, 300, 400],
            sep: [125, 225, 325, 425],
            dec: [150, 250, 350, 450],
            // Only 5 months of data
          },
        },
      },
      timeFrames: getDynamicTimeFrames(),
      header: 'Sparse Data Example',
      subHeader: 'Shows only months with data (Jan, Mar, Jun, Sep, Dec)',
      colors: ['#8DCB2C', '#008FFB'],
    },
  },
  render: (args) => ({
    props: {
      config: args.config,
      onFilterChange: (event: FilterEvent) => {
        args.config = {
          ...args.config,
          selectedTimeFrame: event.timeFrame,
          selectedMonth: event.month,
          selectedYear: event.year,
          graphData: args.config.graphData,
        };
      },
    },
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); display: flex; justify-content: center;">
        <ntv-graph [config]="config" (filterChange)="onFilterChange($event)"></ntv-graph>
      </div>
    `,
  }),
};
