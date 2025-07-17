import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states.

## Features
- Multiple variants - Primary, secondary, success, warning, danger, outline, accent, description, info
- Flexible sizing - Small (sm), medium (md), large (lg), extra-large (xl)
- Color customization - Built-in color palette + custom hex color support
- Loading states - Built-in spinner and loading text support
- Accessibility - Full ARIA support and keyboard navigation
- Form integration - Submit, reset, and button types
- Visual enhancements - Shadows, rounded corners, full-width options
- Event handling - Click events with disabled state management
- DRY configuration - Config object pattern reduces template verbosity
- Backward compatibility - Individual properties still supported
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'outline',
        'accent',
        'description',
        'info',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'select' },
      options: [
        'blue',
        'green',
        'red',
        'yellow',
        'purple',
        'gray',
        'indigo',
        'pink',
        'custom',
      ],
      description: 'Button color (use "custom" to enable hex color input)',
    },
    customColor: {
      control: { type: 'color' },
      description:
        'Custom hex color (only works when color is set to "custom")',
      if: { arg: 'color', eq: 'custom' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    shadow: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    buttonClick: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    color: 'blue',
    customColor: '#3B82F6',
    disabled: false,
    loading: false,
    fullWidth: false,
    rounded: 'md',
    shadow: true,
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<Button>;

// Default story
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `<ntv-button 
      [variant]="variant" 
      [size]="size" 
      [color]="color" 
      [customColor]="customColor"
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [rounded]="rounded" 
      [shadow]="shadow" 
      [type]="type"
      (buttonClick)="buttonClick($event)">
      Click me
    </ntv-button>`,
  }),
};

// Variants showcase
export const Variants: Story = {
  args: {
    variant: 'secondary',
  },

  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button variant="primary">Primary (#091635)</ntv-button>
        <ntv-button variant="accent">Accent (#8DCB2C)</ntv-button>
        <ntv-button variant="success">Success (#3ADB30)</ntv-button>
        <ntv-button variant="warning">Warning (#FFA500)</ntv-button>
        <ntv-button variant="danger">Danger (#E73535)</ntv-button>
        <ntv-button variant="info">Info (#095AF3)</ntv-button>
        <ntv-button variant="description">Description</ntv-button>
        <ntv-button variant="secondary">Secondary</ntv-button>
        <ntv-button variant="outline">Outline</ntv-button>
      </div>
    `,
  }),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem;">
        <ntv-button size="sm" color="blue">Small</ntv-button>
        <ntv-button size="md" color="blue">Medium</ntv-button>
        <ntv-button size="lg" color="blue">Large</ntv-button>
        <ntv-button size="xl" color="blue">Extra Large</ntv-button>
      </div>
    `,
  }),
};

// New Color Palette Showcase
export const NewColorPalette: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Semantic Variants (Using New Color Palette)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <ntv-button variant="primary">Primary (#091635)</ntv-button>
            <ntv-button variant="accent">Accent (#8DCB2C)</ntv-button>
            <ntv-button variant="success">Success (#3ADB30)</ntv-button>
            <ntv-button variant="warning">Warning (#FFA500)</ntv-button>
            <ntv-button variant="danger">Danger (#E73535)</ntv-button>
            <ntv-button variant="info">Info (#095AF3)</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Custom Colors (Legacy Support)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <ntv-button color="custom" customColor="#26A69A">Info Alert (#26A69A)</ntv-button>
            <ntv-button color="blue">Blue</ntv-button>
            <ntv-button color="green">Green</ntv-button>
            <ntv-button color="red">Red</ntv-button>
            <ntv-button color="purple">Purple</ntv-button>
            <ntv-button color="gray">Gray</ntv-button>
          </div>
        </div>
      </div>
    `,
  }),
};

// Color Shades Showcase - Demonstrating the full color palette
export const ColorShades: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 1200px;">
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Primary Color Shades (#091635 Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#f0f2f9" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#d9e0f0" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#b3c1e1" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#8ca2d2" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#6683c3" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#4064b4" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#091635" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#071229" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#050e1d" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#030a11" size="sm">900</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Accent Color Shades (#8DCB2C Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#f7fcf0" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#e8f5d1" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#d1eba3" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#bae175" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#a3d747" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#8dcb2c" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#71a223" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#55791a" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#395011" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#1d2808" size="sm">900</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Success Color Shades (#3ADB30 Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#f0fdf4" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#dcfce7" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#bbf7d0" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#86efac" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#4ade80" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#3adb30" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#16a34a" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#15803d" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#166534" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#14532d" size="sm">900</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Danger Color Shades (#E73535 Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#fef2f2" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#fee2e2" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#fecaca" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#fca5a5" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#f87171" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#e73535" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#dc2626" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#b91c1c" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#991b1b" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#7f1d1d" size="sm">900</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Info Color Shades (#095AF3 Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#f0f6ff" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#d1e7ff" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#a3cfff" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#75b7ff" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#479fff" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#095af3" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#0748c2" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#053691" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#032460" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#011230" size="sm">900</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Warning Color Shades (#FFA500 Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#fffbeb" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#fef3c7" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#fde68a" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#fcd34d" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#fbbf24" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#ffa500" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#d97706" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#b45309" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#92400e" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#78350f" size="sm">900</ntv-button>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; font-weight: bold;">Info Alert Color Shades (#26A69A Base)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <ntv-button color="custom" customColor="#f0fdfc" size="sm">50</ntv-button>
            <ntv-button color="custom" customColor="#ccfbf1" size="sm">100</ntv-button>
            <ntv-button color="custom" customColor="#99f6e4" size="sm">200</ntv-button>
            <ntv-button color="custom" customColor="#5eead4" size="sm">300</ntv-button>
            <ntv-button color="custom" customColor="#2dd4bf" size="sm">400</ntv-button>
            <ntv-button color="custom" customColor="#26a69a" size="sm">500</ntv-button>
            <ntv-button color="custom" customColor="#0d9488" size="sm">600</ntv-button>
            <ntv-button color="custom" customColor="#0f766e" size="sm">700</ntv-button>
            <ntv-button color="custom" customColor="#115e59" size="sm">800</ntv-button>
            <ntv-button color="custom" customColor="#134e4a" size="sm">900</ntv-button>
          </div>
        </div>
      </div>
    `,
  }),
};

// Legacy Colors showcase (for backward compatibility)
export const LegacyColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button color="blue">Blue</ntv-button>
        <ntv-button color="green">Green</ntv-button>
        <ntv-button color="red">Red</ntv-button>
        <ntv-button color="yellow">Yellow</ntv-button>
        <ntv-button color="purple">Purple</ntv-button>
        <ntv-button color="gray">Gray</ntv-button>
        <ntv-button color="indigo">Indigo</ntv-button>
        <ntv-button color="pink">Pink</ntv-button>
      </div>
    `,
  }),
};

// Loading states
export const LoadingStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <ntv-button [loading]="true" color="blue">Loading...</ntv-button>
        <ntv-button [loading]="true" variant="outline" color="green">Processing</ntv-button>
        <ntv-button [loading]="true" size="lg" color="purple">Please wait</ntv-button>
      </div>
    `,
  }),
};

// Disabled states
export const DisabledStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button [disabled]="true" color="blue">Disabled</ntv-button>
        <ntv-button [disabled]="true" variant="outline" color="red">Disabled Outline</ntv-button>
        <ntv-button [disabled]="true" variant="secondary">Disabled Secondary</ntv-button>
      </div>
    `,
  }),
};

// Full width
export const FullWidth: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button [fullWidth]="true" color="blue">Full Width Primary</ntv-button>
        <ntv-button [fullWidth]="true" variant="outline" color="green">Full Width Outline</ntv-button>
        <ntv-button [fullWidth]="true" variant="secondary">Full Width Secondary</ntv-button>
      </div>
    `,
  }),
};

// With icons (using ng-content)
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button color="blue">
          <div style="display: flex; align-items: center;">
            <svg style="width: 16px; height: 16px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add Item</span>
          </div>
        </ntv-button>
        
        <ntv-button variant="outline" color="red">
          <div style="display: flex; align-items: center;">
            <svg style="width: 16px; height: 16px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>Delete</span>
          </div>
        </ntv-button>
        
        <ntv-button variant="success" color="green">
          <div style="display: flex; align-items: center;">
            <span>Save Changes</span>
            <svg style="width: 16px; height: 16px; margin-left: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </ntv-button>
      </div>
    `,
  }),
};

// Rounded options
export const RoundedOptions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button rounded="none" color="blue">None</ntv-button>
        <ntv-button rounded="sm" color="green">Small</ntv-button>
        <ntv-button rounded="md" color="purple">Medium</ntv-button>
        <ntv-button rounded="lg" color="red">Large</ntv-button>
        <ntv-button rounded="xl" color="yellow">Extra Large</ntv-button>
        <ntv-button rounded="full" color="indigo">Full</ntv-button>
      </div>
    `,
  }),
};

// DRY Config Object Usage (NEW!)
export const ConfigObjectUsage: Story = {
  render: () => ({
    props: {
      // Define button configurations as objects
      primaryConfig: {
        variant: 'primary' as const,
        size: 'lg' as const,
        color: 'blue' as const,
        shadow: true,
        rounded: 'lg' as const,
        fullWidth: false,
      },
      customConfig: {
        variant: 'primary' as const,
        size: 'md' as const,
        color: 'custom' as const,
        customColor: '#ff6b35',
        shadow: true,
        rounded: 'md' as const,
        loading: false,
      },
      outlineConfig: {
        variant: 'outline' as const,
        size: 'sm' as const,
        color: 'green' as const,
        shadow: false,
        rounded: 'full' as const,
        disabled: false,
      },
      handleClick: (event: Event, buttonType: string) => {
        console.log(`${buttonType} button clicked!`, event);
        alert(`${buttonType} button was clicked!`);
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #374151;">✨ NEW: DRY Config Object Usage</h3>
          <p style="margin-bottom: 1rem; color: #6b7280; font-size: 0.875rem;">Instead of binding each property individually, use a single config object!</p>
        </div>
        
        <!-- DRY Usage Examples -->
        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <ntv-button 
            [config]="primaryConfig" 
            (buttonClick)="handleClick($event, 'Primary')">
            Primary Config
          </ntv-button>
          
          <ntv-button 
            [config]="customConfig" 
            (buttonClick)="handleClick($event, 'Custom')">
            Custom Color Config
          </ntv-button>
          
          <ntv-button 
            [config]="outlineConfig" 
            (buttonClick)="handleClick($event, 'Outline')">
            Outline Config
          </ntv-button>
        </div>
        
        <!-- Comparison -->
        <div style="background: #f9fafb; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #3b82f6;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1f2937;">Code Comparison:</h4>
          <div style="font-family: monospace; font-size: 0.75rem; color: #374151;">
            <div style="margin-bottom: 0.5rem;">❌ <strong>Before (10+ lines):</strong></div>
            <div style="color: #6b7280; margin-bottom: 1rem;">
              &lt;ntv-button [variant]="config.variant" [size]="config.size" [color]="config.color" ... &gt;
            </div>
            <div style="margin-bottom: 0.5rem;">✅ <strong>After (3 lines):</strong></div>
            <div style="color: #059669;">
              &lt;ntv-button [config]="config"&gt;Button&lt;/ntv-button&gt;
            </div>
          </div>
        </div>
        
        <!-- Mixed Usage -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151;">Mixed Usage (Config + Individual Override):</h4>
          <ntv-button 
            [config]="primaryConfig" 
            variant="danger"
            color="red"
            (buttonClick)="handleClick($event, 'Mixed')">
            Config + Override
          </ntv-button>
        </div>
      </div>
    `,
  }),
};

// Interactive example
export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    color: 'blue',
    disabled: false,
    loading: false,
    fullWidth: false,
    rounded: 'md',
    shadow: true,
    type: 'button',
  },
  render: (args) => ({
    props: {
      ...args,
      handleClick: (event: Event) => {
        console.log('Button clicked!', event);
        alert('Button was clicked!');
      },
    },
    template: `
      <ntv-button 
        [variant]="variant" 
        [size]="size" 
        [color]="color" 
        [disabled]="disabled" 
        [loading]="loading" 
        [fullWidth]="fullWidth" 
        [rounded]="rounded" 
        [shadow]="shadow" 
        [type]="type"
        (buttonClick)="handleClick($event)">
        Interactive Button
      </ntv-button>
    `,
  }),
};

// Custom Hex Color
export const CustomHexColor: Story = {
  args: {
    color: 'custom',
    customColor: '#f3ed2f',
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<ntv-button 
      [variant]="variant" 
      [size]="size" 
      [color]="color" 
      [customColor]="customColor"
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [rounded]="rounded" 
      [shadow]="shadow" 
      [type]="type">
      Custom Yellow (#f3ed2f)
    </ntv-button>`,
  }),
};

// Custom Color Outline
export const CustomColorOutline: Story = {
  args: {
    color: 'custom',
    customColor: '#e91e63',
    variant: 'outline',
  },
  render: (args) => ({
    props: args,
    template: `<ntv-button 
      [variant]="variant" 
      [size]="size" 
      [color]="color" 
      [customColor]="customColor"
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [rounded]="rounded" 
      [shadow]="shadow" 
      [type]="type">
      Custom Pink Outline
    </ntv-button>`,
  }),
};

// Multiple Custom Colors Showcase
export const MultipleCustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <ntv-button color="custom" customColor="#ff6b6b" variant="primary">
          Red (#ff6b6b)
        </ntv-button>
        <ntv-button color="custom" customColor="#4ecdc4" variant="primary">
          Teal (#4ecdc4)
        </ntv-button>
        <ntv-button color="custom" customColor="#45b7d1" variant="primary">
          Blue (#45b7d1)
        </ntv-button>
        <ntv-button color="custom" customColor="#f9ca24" variant="primary">
          Yellow (#f9ca24)
        </ntv-button>
        <ntv-button color="custom" customColor="#6c5ce7" variant="outline">
          Purple Outline
        </ntv-button>
        <ntv-button color="custom" customColor="#2d3436" variant="primary">
          Dark (#2d3436)
        </ntv-button>
      </div>
    `,
  }),
};

// Interactive Color Picker
export const InteractiveColorPicker: Story = {
  args: {
    color: 'custom',
    customColor: '#f3ed2f',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <label for="colorPicker" style="font-weight: 500;">Choose your color:</label>
          <input 
            id="colorPicker" 
            type="color" 
            [value]="customColor" 
            (input)="customColor = $any($event.target).value"
            style="width: 50px; height: 40px; border: none; border-radius: 4px; cursor: pointer;"
          />
          <span style="font-family: monospace; background: #f5f5f5; padding: 4px 8px; border-radius: 4px;">
            {{customColor}}
          </span>
        </div>
        <ntv-button 
          [color]="color" 
          [customColor]="customColor"
          [variant]="variant"
          size="lg">
          Dynamic Color Button
        </ntv-button>
      </div>
    `,
  }),
};
