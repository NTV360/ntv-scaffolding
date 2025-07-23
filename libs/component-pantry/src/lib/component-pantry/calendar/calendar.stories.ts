import type { Meta, StoryObj } from '@storybook/angular';
import { Calendar } from './calendar';

const meta: Meta<Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
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
type Story = StoryObj<Calendar>;
export const Default: Story = {
  render: () => ({
    args: {},
    template: `<ntv-calendar />`,
  }),
};

export const WithCard: Story = {
  render: () => ({
    args: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
          <ntv-calendar />
      </div>
    `,
  }),
};
