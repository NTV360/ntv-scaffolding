import type { Meta, StoryObj } from '@storybook/angular';
import { DatePicker } from './date-picker';

const meta: Meta<DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states.

## Features
- Multiple variants - Primary, secondary, success, warning, danger, outline, accent, description, info
- Flexible sizing - Small (sm), medium (md), large (lg), extra-large (xl)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<DatePicker>;

export const Event: Story = {
  args: {},
  render: () => ({
    template: `<ntv-date-picker />`,
  }),
};

export const BirthdayPicker: Story = {
  args: {},
  render: () => ({
    template: `<ntv-date-picker variant="birthday"  />`,
  }),
};

const inputDate = new Date();
inputDate.setDate(inputDate.getDate());

// export const DateRange: Story = {
//   args: {
//     startDate: inputDate,
//   },
//   render: (args) => ({
//     props: {
//       ...args,
//       selectedStartDate: null as Date | null,
//       onSelectDate: function (date: Date) {
//         console.log('selected date as start date', date);
//         this['selectedStartDate'] = date;
//       },
//     },
//     template: `
//     <div class="flex gap-14">

//       <ntv-date-picker variant="date-range" [startDate]="selectedStartDate || startDate"  />
//     </div>`,
//   }),
// };
