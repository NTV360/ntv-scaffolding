import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Custom color palette for Storybook controls
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
        {
          name: 'custom-yellow',
          value: '#f3ed2f',
        },
      ],
    },
  },
  tags: ['autodocs'],
};

export default preview;