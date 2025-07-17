import type { Meta, StoryObj } from '@storybook/angular';
import { Input } from './input';

const meta: Meta<Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive and flexible input component that provides extensive customization and form integration capabilities.

## Features
- Multiple input types - Text, password, email, number with automatic validation
- Flexible sizing - Extra-small (xs), small (sm), medium (md), large (lg)
- Visual variants - Default, error, success states + custom hex color support
- Enhanced UX - Clear button, password toggle, placeholder text
- Form integration - Full reactive forms support with ControlValueAccessor
- Accessibility - ARIA labels, proper focus management, screen reader support
- Validation display - Error messages, info text, required field indicators
- Customizable styling - Border radius, custom colors, size variations
- Icon support - Left and right icon slots for enhanced UI
- DRY configuration - Config object pattern reduces template verbosity
- Backward compatibility - Individual properties still supported
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: 'Input type',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    variant: {
      control: { type: 'text' },
      description: 'Input variant (supports semantic tokens or hex colors)',
    },

    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    label: {
      control: { type: 'text' },
      description: 'Input label',
    },
    info: {
      control: { type: 'text' },
      description: 'Info message',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
    },
    showError: {
      control: { type: 'boolean' },
      description: 'Whether to show error message',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether input is required',
    },
    disabledInput: {
      control: { type: 'boolean' },
      description: 'Whether input is disabled',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether input has clear button',
    },
    id: {
      control: { type: 'text' },
      description: 'Input ID',
    },
    inputCleared: { action: 'cleared' },
  },
  args: {
    type: 'text',
    size: 'md',
    variant: 'default',
    borderRadius: 'md',
    placeholder: 'Enter your text...',
    label: '',
    info: '',
    error: '',
    showError: true,
    required: false,
    disabledInput: false,
    clearable: false,
    id: 'input-demo',
  },
};

export default meta;
type Story = StoryObj<Input>;

// Default story
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `<ntv-input 
      [type]="type" 
      [size]="size" 
      [variant]="variant"
      [borderRadius]="borderRadius"
      [placeholder]="placeholder" 
      [label]="label"
      [info]="info"
      [error]="error"
      [showError]="showError"
      [required]="required" 
      [disabledInput]="disabledInput" 
      [clearable]="clearable"
      [id]="id"
      (inputCleared)="inputCleared($event)">
    </ntv-input>`,
  }),
};

// Input Types showcase
export const InputTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="text-input-demo"
          type="text" 
          label="Text Input" 
          placeholder="Enter some text...">
        </ntv-input>
        
        <ntv-input 
          id="email-input-demo"
          type="email" 
          label="Email Input" 
          placeholder="Enter your email...">
        </ntv-input>
        
        <ntv-input 
          id="password-input-demo"
          type="password" 
          label="Password Input" 
          placeholder="Enter your password...">
        </ntv-input>
        
        <ntv-input 
          id="number-input-demo"
          type="number" 
          label="Number Input" 
          placeholder="Enter a number...">
        </ntv-input>
      </div>
    `,
  }),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="small-input-demo"
          size="sm" 
          label="Small Input" 
          placeholder="Small size...">
        </ntv-input>
        
        <ntv-input 
          id="medium-input-demo"
          size="md" 
          label="Medium Input" 
          placeholder="Medium size...">
        </ntv-input>
        
        <ntv-input 
          id="large-input-demo"
          size="lg" 
          label="Large Input" 
          placeholder="Large size...">
        </ntv-input>
      </div>
    `,
  }),
};

// Variants showcase
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="default-variant-demo"
          variant="default" 
          label="Default Variant" 
          placeholder="Default styling...">
        </ntv-input>
        
        <ntv-input 
          id="primary-variant-demo"
          variant="primary" 
          label="Primary Variant" 
          placeholder="Primary styling...">
        </ntv-input>
        
        <ntv-input 
          id="success-variant-demo"
          variant="success" 
          label="Success Variant" 
          placeholder="Success styling...">
        </ntv-input>
        
        <ntv-input 
          id="danger-variant-demo"
          variant="danger" 
          label="Danger Variant" 
          placeholder="Danger styling...">
        </ntv-input>
      </div>
    `,
  }),
};

// Custom Colors showcase
export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="custom-blue-demo"
          variant="#3B82F6" 
          label="Custom Blue" 
          placeholder="Custom blue color...">
        </ntv-input>
        
        <ntv-input 
          id="custom-green-demo"
          variant="#10B981" 
          label="Custom Green" 
          placeholder="Custom green color...">
        </ntv-input>
        
        <ntv-input 
          id="custom-orange-demo"
          variant="#F59E0B" 
          label="Custom Orange" 
          placeholder="Custom orange color...">
        </ntv-input>
        
        <ntv-input 
          id="custom-purple-demo"
          variant="#8B5CF6" 
          label="Custom Purple" 
          placeholder="Custom purple color...">
        </ntv-input>
      </div>
    `,
  }),
};

// Border Radius showcase
export const BorderRadius: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="no-radius-demo"
          borderRadius="none" 
          label="No Radius" 
          placeholder="Sharp corners...">
        </ntv-input>
        
        <ntv-input 
          id="small-radius-demo"
          borderRadius="sm" 
          label="Small Radius" 
          placeholder="Small rounded corners...">
        </ntv-input>
        
        <ntv-input 
          id="medium-radius-demo"
          borderRadius="md" 
          label="Medium Radius" 
          placeholder="Medium rounded corners...">
        </ntv-input>
        
        <ntv-input 
          id="large-radius-demo"
          borderRadius="lg" 
          label="Large Radius" 
          placeholder="Large rounded corners...">
        </ntv-input>
        
        <ntv-input 
          id="xl-radius-demo"
          borderRadius="xl" 
          label="Extra Large Radius" 
          placeholder="Extra large rounded corners...">
        </ntv-input>
      </div>
    `,
  }),
};

// States showcase
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="normal-state-demo"
          label="Normal State" 
          placeholder="Normal input...">
        </ntv-input>
        
        <ntv-input 
          id="required-input-demo"
          [required]="true"
          label="Required Input" 
          placeholder="This field is required...">
        </ntv-input>
        
        <ntv-input 
          id="disabled-input-demo"
          [disabledInput]="true"
          label="Disabled Input" 
          placeholder="This input is disabled...">
        </ntv-input>
        
        <ntv-input 
          id="clearable-input-demo"
          [clearable]="true"
          label="Clearable Input" 
          placeholder="Type something to see clear button...">
        </ntv-input>
      </div>
    `,
  }),
};

// Messages showcase
export const Messages: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="input-with-info-demo"
          label="Input with Info" 
          info="This is helpful information about the input"
          placeholder="Enter your text...">
        </ntv-input>
        
        <ntv-input 
          id="input-with-error-demo"
          label="Input with Error"
          variant="danger"
          error="This field is required"
          placeholder="Enter your text...">
        </ntv-input>
        
        <ntv-input 
          id="error-hidden-demo"
          label="Error Hidden" 
          error="This error is hidden"
          [showError]="false"
          placeholder="Error message is hidden...">
        </ntv-input>
        
        <ntv-input 
          id="success-message-demo"
          label="Success Message" 
          info="✓ This input looks good!"
          variant="success"
          placeholder="Valid input...">
        </ntv-input>
      </div>
    `,
  }),
};

// Password Features showcase
export const PasswordFeatures: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="password-toggle-demo"
          type="password" 
          label="Password with Toggle" 
          placeholder="Enter your password..."
          info="Click the eye icon to toggle visibility">
        </ntv-input>
        
        <ntv-input 
          id="clearable-password-demo"
          type="password" 
          [clearable]="true"
          label="Clearable Password" 
          placeholder="Password with clear option..."
          info="Type something to see both clear and toggle buttons">
        </ntv-input>
        
        <ntv-input 
          id="required-password-demo"
          type="password" 
          [required]="true"
          label="Required Password" 
          placeholder="Required password field..."
          error="Password is required">
        </ntv-input>
      </div>
    `,
  }),
};

// With Icons showcase
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <ntv-input 
          id="search-input-demo"
          label="Search Input" 
          placeholder="Search for something...">
          <svg left-icon width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </ntv-input>
        
        <ntv-input 
          id="email-with-icon-demo"
          type="email" 
          label="Email with Icon" 
          placeholder="Enter your email...">
          <svg left-icon width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </ntv-input>
        
        <ntv-input 
          id="url-input-demo"
          label="URL Input" 
          placeholder="https://example.com">
          <svg left-icon width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </ntv-input>
        
        <ntv-input 
          id="amount-input-demo"
          label="Amount Input" 
          placeholder="0.00">
          <span left-icon style="font-weight: 600; color: #6B7280;">$</span>
          <span right-icon style="font-size: 0.875rem; color: #6B7280;">USD</span>
        </ntv-input>
      </div>
    `,
  }),
};

// Interactive Playground
export const Interactive: Story = {
  args: {
    type: 'text',
    size: 'md',
    variant: 'default',
    borderRadius: 'md',
    placeholder: 'Interactive input...',
    label: 'Interactive Input',
    info: '',
    error: '',
    showError: true,
    required: false,
    disabledInput: false,
    clearable: true,
    id: 'interactive-input',
  },
  render: (args) => ({
    props: {
      ...args,
      handleCleared: () => {
        alert('Input was cleared!');
      },
    },
    template: `
      <div style="width: 300px;">
        <ntv-input 
          [type]="type" 
          [size]="size" 
          [variant]="variant"
          [borderRadius]="borderRadius"
          [placeholder]="placeholder" 
          [label]="label"
          [info]="info"
          [error]="error"
          [showError]="showError"
          [required]="required" 
          [disabledInput]="disabledInput" 
          [clearable]="clearable"
          [id]="id"
          (inputCleared)="handleCleared($event)">
        </ntv-input>
      </div>
    `,
  }),
};

// Theme Customization showcase
export const ThemeCustomization: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #374151;">🎨 Theme Customization</h3>
          <p style="margin-bottom: 1rem; color: #6B7280; font-size: 0.875rem;">Inputs support both semantic tokens and direct hex colors</p>
        </div>
        
        <ntv-input 
          id="semantic-tokens-demo"
          variant="primary"
          label="Semantic Tokens" 
          placeholder="Uses CSS custom properties..."
          info="Uses CSS :host(.variant-primary) selector">
        </ntv-input>
        
        <ntv-input 
          id="direct-hex-demo"
          variant="#FF6B6B"
          label="Direct Hex Colors" 
          placeholder="Uses direct hex values..."
          info="Variant: #FF6B6B">
        </ntv-input>
        
        <ntv-input 
          id="teal-theme-demo"
          variant="#4ECDC4"
          label="Teal Theme" 
          placeholder="Custom teal styling..."
          info="Perfect for brand customization">
        </ntv-input>
        
        <div style="background: #F9FAFB; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #3B82F6;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1F2937;">Usage Examples:</h4>
          <div style="font-family: monospace; font-size: 0.75rem; color: #374151;">
            <div style="margin-bottom: 0.5rem;">🎯 <strong>Semantic:</strong></div>
            <div style="color: #6B7280; margin-bottom: 1rem;">
              variant="primary"
            </div>
            <div style="margin-bottom: 0.5rem;">🎨 <strong>Direct:</strong></div>
            <div style="color: #059669;">
              variant="#FF6B6B"
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Validation States showcase
export const ValidationStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 300px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #374151;">✅ Validation States</h3>
          <p style="margin-bottom: 1rem; color: #6B7280; font-size: 0.875rem;">Different validation states and feedback</p>
        </div>
        
        <ntv-input 
          id="valid-input-demo"
          label="Valid Input" 
          variant="success"
          info="✓ This looks good!"
          placeholder="Valid input...">
        </ntv-input>
        
        <ntv-input 
          id="invalid-input-demo"
          label="Invalid Input" 
          variant="danger"
          error="❌ This field is required"
          placeholder="Invalid input...">
        </ntv-input>
        
        <ntv-input 
          id="warning-input-demo"
          label="Warning Input" 
          variant="#F59E0B"
          info="⚠️ Please double-check this value"
          placeholder="Warning state...">
        </ntv-input>
        
        <ntv-input 
          id="email-validation-demo"
          type="email"
          label="Email Validation" 
          variant="danger"
          error="Please enter a valid email address"
          placeholder="invalid-email">
        </ntv-input>
        
        <ntv-input 
          id="password-strength-demo"
          type="password"
          label="Password Strength" 
          variant="#F59E0B"
          info="Password strength: Medium (add special characters)"
          placeholder="mypassword123">
        </ntv-input>
      </div>
    `,
  }),
};

// Real-world Examples showcase
export const RealWorldExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #374151;">🌍 Real-world Examples</h3>
          <p style="margin-bottom: 1rem; color: #6B7280; font-size: 0.875rem;">Common input patterns you'll use in applications</p>
        </div>
        
        <!-- Search Bar -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151;">Search Bar</h4>
          <ntv-input 
            id="search-bar-demo"
            size="lg"
            borderRadius="xl"
            placeholder="Search products, brands, categories..."
            [clearable]="true">
            <svg left-icon width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </ntv-input>
        </div>
        
        <!-- Login Form -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151;">Login Form</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ntv-input 
              id="login-email-demo"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              [required]="true">
              <svg left-icon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </ntv-input>
            
            <ntv-input 
              id="login-password-demo"
              type="password"
              label="Password"
              placeholder="Enter your password"
              [required]="true">
            </ntv-input>
          </div>
        </div>
        
        <!-- Payment Form -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151;">Payment Form</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ntv-input 
              id="card-number-demo"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              [required]="true">
              <svg left-icon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </ntv-input>
            
            <div style="display: flex; gap: 1rem;">
              <div style="width: 100%;">
                <ntv-input 
                  id="card-expiry-demo"
                  label="Expiry"
                  placeholder="MM/YY"
                  size="sm"
                  [required]="true">
                </ntv-input>
              </div>
              
              <div style="width: 100%;">
                <ntv-input 
                  id="card-cvv-demo"
                  label="CVV"
                  placeholder="123"
                  size="sm"
                  width="full"
                  [required]="true">
                </ntv-input>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Settings Form -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151;">Settings Form</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <ntv-input 
              id="display-name-demo"
              label="Display Name"
              placeholder="John Doe"
              info="This is how your name will appear to others">
            </ntv-input>
            
            <ntv-input 
              id="website-url-demo"
              label="Website URL"
              placeholder="https://johndoe.com"
              [clearable]="true">
              <svg left-icon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </ntv-input>
            
            <ntv-input 
              id="age-demo"
              type="number"
              label="Age"
              placeholder="25"
              info="Optional: helps us provide better recommendations">
            </ntv-input>
          </div>
        </div>
      </div>
    `,
  }),
};

// With Config showcase
export const WithConfig: Story = {
  name: '🎯 DRY Config Pattern',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #374151;">🎯 DRY Config Pattern</h3>
          <p style="margin-bottom: 1rem; color: #6B7280; font-size: 0.875rem;">Demonstrates the config-based approach that reduces template verbosity by 90%</p>
        </div>
        
        <!-- Email Input -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151; font-size: 0.875rem; font-weight: 600;">Email Input</h4>
          <ntv-input
            [config]="emailConfig"
            label="Email Address"
            info="Enter your email for notifications">
          </ntv-input>
        </div>

        <!-- Password Input -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151; font-size: 0.875rem; font-weight: 600;">Password Input</h4>
          <ntv-input
            [config]="passwordConfig"
            label="Password"
            info="Must be at least 8 characters">
          </ntv-input>
        </div>

        <!-- Custom Styled Input -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151; font-size: 0.875rem; font-weight: 600;">Custom Styled Input</h4>
          <ntv-input
            [config]="customConfig"
            label="Custom Input"
            info="Large size with custom purple color">
          </ntv-input>
        </div>

        <!-- Search Input -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151; font-size: 0.875rem; font-weight: 600;">Search Input</h4>
          <ntv-input
            [config]="searchConfig"
            label="Search"
            info="Type to search with clear functionality">
            <svg left-icon width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </ntv-input>
        </div>

        <!-- Number Input -->
        <div>
          <h4 style="margin-bottom: 0.5rem; color: #374151; font-size: 0.875rem; font-weight: 600;">Number Input</h4>
          <ntv-input
            [config]="numberConfig"
            label="Age"
            info="Enter your age (optional)">
          </ntv-input>
        </div>

        <div style="background: #F9FAFB; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #3B82F6; margin-top: 1rem;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1F2937; font-weight: 600;">✨ Benefits of Config Pattern:</h4>
          <ul style="font-size: 0.875rem; color: #374151; margin: 0; padding-left: 1.5rem; line-height: 1.6;">
            <li><strong>90% less template code</strong> when using all properties</li>
            <li><strong>Type-safe</strong> configuration objects</li>
            <li><strong>Reusable</strong> input configurations</li>
            <li><strong>Backward compatible</strong> with existing code</li>
            <li><strong>Easy to maintain</strong> and update</li>
            <li><strong>Clean templates</strong> that focus on content</li>
          </ul>
        </div>
      </div>
    `,
    props: {
      emailConfig: {
        type: 'email',
        placeholder: 'john@example.com',
        required: true,
        clearable: true,
        size: 'md',
        variant: 'default',
        borderRadius: 'md'
      },
      passwordConfig: {
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
        clearable: false,
        size: 'md',
        variant: 'default',
        borderRadius: 'md'
      },
      customConfig: {
        type: 'text',
        placeholder: 'Custom styled input...',
        required: false,
        clearable: true,
        size: 'lg',
        variant: '#8B5CF6',
        borderRadius: 'lg'
      },
      searchConfig: {
        type: 'text',
        placeholder: 'Search for anything...',
        required: false,
        clearable: true,
        size: 'md',
        variant: 'primary',
        borderRadius: 'md'
      },
      numberConfig: {
        type: 'number',
        placeholder: '25',
        required: false,
        clearable: true,
        size: 'sm',
        variant: 'success',
        borderRadius: 'sm'
      }
    },
  }),
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the **DRY (Don't Repeat Yourself) config pattern** for the input component.

Instead of setting multiple individual properties:
\`\`\`html
<ntv-input
  type="email"
  placeholder="john@example.com"
  [required]="true"
  [clearable]="true"
  size="md"
  variant="default"
  borderRadius="md"
  label="Email Address"
  info="Enter your email">
</ntv-input>
\`\`\`

You can use a single config object:
\`\`\`html
<ntv-input
  [config]="emailConfig"
  label="Email Address"
  info="Enter your email">
</ntv-input>
\`\`\`

This approach provides better maintainability, reusability, and cleaner templates.
        `,
      },
    },
  },
};

// Dynamic Focus State showcase
export const DynamicFocusState: Story = {
  render: (args) => ({
    props: {
      ...args,
      input1State: 'default',
      input3State: 'default',
      input1Value: '',
      input3Value: '',
      input1Focused: false,
      input3Focused: false,
      input3Error: '',
      
      updateInput1State: function() {
        const hasValue = this['input1Value'] && this['input1Value'].trim().length > 0;
        const isFocused = this['input1Focused'];
        this['input1State'] = (isFocused || hasValue) ? 'primary' : 'default';
      },
      
      updateInput3State: function() {
        const value = this['input3Value'];
        const isFocused = this['input3Focused'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value && !emailRegex.test(value)) {
          this['input3State'] = 'danger';
          this['input3Error'] = 'Please enter a valid email address';
        } else if (isFocused || value) {
          this['input3State'] = 'primary';
          this['input3Error'] = '';
        } else {
          this['input3State'] = 'default';
          this['input3Error'] = '';
        }
      },
      
      onInput1Focus: function() {
        this['input1Focused'] = true;
        this['updateInput1State']();
      },
      
      onInput1Blur: function() {
        this['input1Focused'] = false;
        this['updateInput1State']();
      },
      
      onInput1Change: function(event: Event) {
        this['input1Value'] = (event.target as HTMLInputElement).value;
        this['updateInput1State']();
      },
      
      onInput3Focus: function() {
        this['input3Focused'] = true;
        this['updateInput3State']();
      },
      
      onInput3Blur: function() {
        this['input3Focused'] = false;
        this['updateInput3State']();
      },
      
      onInput3Change: function(event: Event) {
        this['input3Value'] = (event.target as HTMLInputElement).value;
        this['updateInput3State']();
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; color: #374151; font-size: 1.125rem; font-weight: 600;">🎯 Dynamic Focus State</h3>
          <p style="margin-bottom: 1rem; color: #6B7280; font-size: 0.875rem;">Watch inputs transform from gray to green when focused or when they have values!</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Interactive Input #1</label>
            <ntv-input 
              placeholder="Click me or type something..."
              [variant]="input1State"
              size="md"
              (focus)="onInput1Focus()"
              (blur)="onInput1Blur()"
              (input)="onInput1Change($event)">
            </ntv-input>
            <p style="font-size: 0.75rem; color: #6B7280; margin-top: 0.5rem;">
              State: <strong style="color: {{ input1State === 'primary' ? '#8dcb2c' : '#c0c4cc' }};">{{ input1State === 'primary' ? 'Primary (Green)' : 'Default (Gray)' }}</strong>
              | Value: "{{ input1Value || 'empty' }}" (Length: {{ input1Value?.length || 0 }})
              | Focus: {{ input1Focused ? 'YES' : 'NO' }}
            </p>
          </div>
          
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Email Validation Input</label>
            <ntv-input 
              type="email"
              placeholder="Enter your email address..."
              [variant]="input3State"
              [error]="input3Error"
              size="md"
              (focus)="onInput3Focus()"
              (blur)="onInput3Blur()"
              (input)="onInput3Change($event)">
            </ntv-input>
            <p style="font-size: 0.75rem; color: #6B7280; margin-top: 0.5rem;">
              State: <strong style="color: {{ input3State === 'danger' ? '#dc2626' : (input3State === 'primary' ? '#8dcb2c' : '#c0c4cc') }};">{{ input3State === 'danger' ? 'Error (Red)' : (input3State === 'primary' ? 'Primary (Green)' : 'Default (Gray)') }}</strong>
              | Value: "{{ input3Value || 'empty' }}" (Length: {{ input3Value?.length || 0 }})
              | Focus: {{ input3Focused ? 'YES' : 'NO' }}
              | Valid: {{ input3Error ? 'NO' : 'YES' }}
            </p>
          </div>
        </div>
        
        <div style="background: #F9FAFB; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #8dcb2c;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1F2937; font-weight: 600;">🔥 How the Magic Works:</h4>
          <ul style="font-size: 0.875rem; color: #374151; margin: 0; padding-left: 1.5rem; line-height: 1.6;">
            <li><strong>Gray (default)</strong>: When input is unfocused AND empty</li>
            <li><strong>Green (primary)</strong>: When input is focused OR has valid value</li>
            <li><strong>Red (danger)</strong>: When input has invalid value (e.g., invalid email)</li>
            <li><strong>Real-time</strong>: State changes instantly as you interact and validate</li>
          </ul>
          <pre style="font-size: 0.75rem; background: white; padding: 0.75rem; border-radius: 0.25rem; border: 1px solid #E5E7EB; overflow-x: auto; margin-top: 0.75rem; margin-bottom: 0; line-height: 1.4;"><code>// Controlled state approach
variant="{{ inputState }}"
(focus)="onFocus()"
(blur)="onBlur()"
(input)="onInput($event)"

// Update state based on focus and value</code></pre>
        </div>
      </div>
    `,
  }),
  args: {},
};
