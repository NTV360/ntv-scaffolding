import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentPantry } from './component-pantry';
import { expect } from 'storybook/test';

const meta: Meta<ComponentPantry> = {
  component: ComponentPantry,
  title: 'ComponentPantry',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ComponentPantry>;

export const Default: Story = {
  args: {},
};

export const TailwindTest: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(/Tailwind CSS is working perfectly!/gi)
    ).toBeTruthy();
    await expect(canvas.getByText(/ComponentPantry/gi)).toBeTruthy();
  },
};

export const InteractiveDemo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates Tailwind CSS integration with gradient backgrounds, responsive design, and hover effects.',
      },
    },
  },
};

// Font test story
export const FontTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px; font-family: 'Nunito', sans-serif;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem; font-weight: 700;">Font Test - Nunito</h1>
        <p style="font-size: 1rem; margin-bottom: 0.5rem; font-weight: 400;">Regular text in Nunito font (400)</p>
        <p style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Semi-bold text in Nunito font (600)</p>
        <p style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Bold text in Nunito font (700)</p>
        <p style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem;">Extra-bold text in Nunito font (800)</p>
        <p style="font-size: 0.875rem; font-style: italic; font-weight: 400;">Italic text in Nunito font</p>
        <p style="font-size: 0.875rem; font-style: italic; font-weight: 600;">Italic semi-bold text in Nunito font</p>
      </div>
    `,
  }),
};
