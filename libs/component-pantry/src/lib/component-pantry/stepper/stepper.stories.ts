import type { Meta, StoryObj } from '@storybook/angular';
import { Stepper } from './stepper';
import { StepData, StepperConfig } from './stepper.types';
import { signal } from '@angular/core';

const meta: Meta<Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A dynamic stepper component that supports multiple variants and styles.

## Features
- Multiple variants: default, progress, detailed, panel, vertical, vertical-reverse, breadcrumb, form
- Customizable colors and sizes
- Clickable steps with event handling
- Support for step descriptions
- Completed/active/disabled states
- Responsive design

## Usage
\`\`\`typescript
const steps: StepData[] = [
  { id: '1', label: 'Personal Info', description: 'Enter your details' },
  { id: '2', label: 'Account Setup', description: 'Create your account' },
  { id: '3', label: 'Confirmation', description: 'Review and confirm' }
];
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'progress',
        'detailed',
        'panel',
        'vertical',
        'vertical-reverse',
        'breadcrumb',
        'form',
      ],
      description: 'Visual style variant of the stepper',
    },

    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of step indicators',
    },
    stepperColor: {
      control: { type: 'select' },
      options: [
        'primary',
        'accent',
        'success',
        'warning',
        'danger',
        'info',
        'white',
        'neutral',
        'neutral-dark',
      ],
      description: 'Color theme for the stepper',
    },
    labelColor: {
      control: { type: 'select' },
      options: [
        'primary',
        'accent',
        'success',
        'warning',
        'danger',
        'info',
        'white',
        'neutral',
        'neutral-dark',
      ],
      description: 'Color theme for step labels',
    },
    descriptionColor: {
      control: { type: 'select' },
      options: [
        'primary',
        'accent',
        'success',
        'warning',
        'danger',
        'info',
        'white',
        'neutral',
        'neutral-dark',
      ],
      description: 'Color theme for step descriptions',
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Currently active step index',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether steps can be clicked',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show step labels',
    },
    showDescriptions: {
      control: 'boolean',
      description: 'Show step descriptions',
    },
    allowSkipping: {
      control: 'boolean',
      description: 'Allow skipping to future steps',
    },
  },
};

export default meta;
type Story = StoryObj<Stepper>;

const defaultSteps: StepData[] = [
  {
    id: '1',
    label: 'Personal Info',
    description: 'Enter your personal details and contact information',
    completed: true,
  },
  {
    id: '2',
    label: 'Account Setup',
    description: 'Create your account credentials and preferences',
    error: true,
  },
  {
    id: '3',
    label: 'Billing Info',
    description: 'Add payment method and billing address',
  },
  {
    id: '4',
    label: 'Confirmation',
    description: 'Review and confirm your information',
  },
];

const workflowSteps: StepData[] = [
  {
    id: '1',
    label: 'Create Account',
    description: 'Sign up for a new account',
  },
  {
    id: '2',
    label: 'Verify Email',
    description: 'Check your email and verify',
  },
  {
    id: '3',
    label: 'Complete Profile',
    description: 'Fill out your profile information',
  },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    variant: 'default',
    size: 'md',
    stepperColor: 'accent',
    labelColor: 'accent',
    descriptionColor: 'accent',
    clickable: false,
    showLabels: true,
    showDescriptions: false,
    allowSkipping: false,
  },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-12">
        <div>
          <h3 class="text-lg font-semibold mb-4">Default Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="default" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Progress Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="progress" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Detailed Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="detailed" [showLabels]="true" [showDescriptions]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Panel Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="panel" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Vertical Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="vertical" [showLabels]="true" [showDescriptions]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Vertical Reverse Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="vertical-reverse" [showLabels]="true" [showDescriptions]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Breadcrumb Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="breadcrumb" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Form Stepper</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" variant="form" [showLabels]="true"></ntv-stepper>
        </div>
      </div>
    `,
  }),
  args: {
    steps: defaultSteps,
    currentStep: 2,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const currentStepIndex = signal(0);

    return {
      props: {
        steps: args.steps,
        variant: args.variant,
        showLabels: args.showLabels,
        showDescriptions: args.showDescriptions,
        currentStepIndex,
        onStepClick: (event: { step: StepData; index: number }) => {
          currentStepIndex.set(event.index);
        },
        nextStep: () => {
          if (currentStepIndex() < (args.steps?.length || 0) - 1) {
            currentStepIndex.update((val: number) => val + 1);
          }
        },
        prevStep: () => {
          if (currentStepIndex() > 0) {
            currentStepIndex.update((val: number) => val - 1);
          }
        },
      },
      template: `
      <div class="max-w-4xl mx-auto p-6">
        <ntv-stepper 
          [steps]="steps"
          [currentStep]="currentStepIndex()"
          [variant]="variant"
          [clickable]="true"
          [allowSkipping]="true"
          [showLabels]="showLabels"
          [showDescriptions]="showDescriptions"
          (stepClick)="onStepClick($event)"
        ></ntv-stepper>
        
        <div class="mt-8 flex justify-between">
          <button 
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            [disabled]="currentStepIndex() === 0"
            (click)="prevStep()">
            Previous
          </button>
          <span class="self-center text-sm text-gray-600">
            Step {{ (currentStepIndex() || 0) + 1 }} of {{ steps.length }}
          </span>
          <button 
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            [disabled]="currentStepIndex() === steps.length - 1"
            (click)="nextStep()">
            Next
          </button>
        </div>
      </div>
    `,
    };
  },
  args: {
    steps: defaultSteps,
    variant: 'default',
    showLabels: true,
    showDescriptions: false,
  },
};

export const DryConfigPattern: Story = {
  render: (args) => ({
    props: {
      ...args,
      // DRY Configuration Objects
      basicConfig: {
        variant: 'default',
        size: 'md',
        stepperColor: 'primary',
        showLabels: true,
        showDescriptions: false,
        clickable: false,
        allowSkipping: false,
      } as Partial<StepperConfig>,
      
      detailedConfig: {
        variant: 'detailed',
        size: 'lg',
        stepperColor: 'accent',
        labelColor: 'success',
        descriptionColor: 'info',
        showLabels: true,
        showDescriptions: true,
        clickable: true,
        allowSkipping: true,
      } as Partial<StepperConfig>,
      
      verticalConfig: {
        variant: 'vertical',
        size: 'md',
        stepperColor: 'warning',
        labelColor: 'danger',
        descriptionColor: 'neutral',
        showLabels: true,
        showDescriptions: true,
        clickable: true,
        allowSkipping: false,
      } as Partial<StepperConfig>,
    },
    template: `
      <div class="space-y-12">
        <div>
          <h3 class="text-lg font-semibold mb-4">DRY Config Pattern - Basic Configuration</h3>
          <p class="text-sm text-gray-600 mb-4">
            Using a single config object instead of multiple individual properties:
          </p>
          <div class="bg-gray-100 p-4 rounded-lg mb-4">
            <code class="text-sm">
              &lt;ntv-stepper [steps]="steps" [currentStep]="1" [config]="basicConfig"&gt;&lt;/ntv-stepper&gt;
            </code>
          </div>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="1" 
            [config]="basicConfig">
          </ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">DRY Config Pattern - Detailed Configuration</h3>
          <p class="text-sm text-gray-600 mb-4">
            Complex configuration with multiple colors and interactive features:
          </p>
          <div class="bg-gray-100 p-4 rounded-lg mb-4">
            <code class="text-sm">
              &lt;ntv-stepper [steps]="steps" [currentStep]="2" [config]="detailedConfig"&gt;&lt;/ntv-stepper&gt;
            </code>
          </div>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="2" 
            [config]="detailedConfig">
          </ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">DRY Config Pattern - Vertical Layout</h3>
          <p class="text-sm text-gray-600 mb-4">
            Vertical stepper with custom color scheme:
          </p>
          <div class="bg-gray-100 p-4 rounded-lg mb-4">
            <code class="text-sm">
              &lt;ntv-stepper [steps]="steps" [currentStep]="0" [config]="verticalConfig"&gt;&lt;/ntv-stepper&gt;
            </code>
          </div>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="0" 
            [config]="verticalConfig">
          </ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Mixed Pattern - Config + Individual Override</h3>
          <p class="text-sm text-gray-600 mb-4">
            Using config as base with individual property overrides:
          </p>
          <div class="bg-gray-100 p-4 rounded-lg mb-4">
            <code class="text-sm">
              &lt;ntv-stepper [steps]="steps" [currentStep]="3" [config]="basicConfig" variant="progress" stepperColor="success"&gt;&lt;/ntv-stepper&gt;
            </code>
          </div>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="3" 
            [config]="basicConfig" 
            variant="progress" 
            stepperColor="success">
          </ntv-stepper>
        </div>
      </div>
    `,
  }),
  args: {
    steps: defaultSteps,
  },
};

export const DifferentSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Small Size</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" size="sm" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Medium Size (Default)</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" size="md" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Large Size</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" size="lg" [showLabels]="true"></ntv-stepper>
        </div>
      </div>
    `,
  }),
  args: {
    steps: workflowSteps,
    currentStep: 2,
    variant: 'default',
  },
};

export const DifferentColors: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Primary Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="primary" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Accent Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="accent" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Success Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="success" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Warning Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="warning" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Danger Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="danger" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Info Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="info" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">White Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="white" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Neutral Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="neutral" [showLabels]="true"></ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Neutral Dark Color</h3>
          <ntv-stepper [steps]="steps" [currentStep]="currentStep" [variant]="variant" stepperColor="neutral-dark" [showLabels]="true"></ntv-stepper>
        </div>
      </div>
    `,
  }),
  args: {
    steps: workflowSteps,
    currentStep: 2,
    variant: 'progress',
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 3,
    variant: 'detailed',
    showLabels: true,
    showDescriptions: true,
    clickable: true,
    allowSkipping: true,
  },
};

export const VerticalLayout: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Project Setup',
        description: 'Initialize your project and configure basic settings',
      },
      {
        id: '2',
        label: 'Development',
        description: 'Write code and implement features',
      },
      {
        id: '3',
        label: 'Testing',
        description: 'Run tests and ensure quality',
      },
      {
        id: '4',
        label: 'Deployment',
        description: 'Deploy to production environment',
      },
    ],
    currentStep: 2,
    variant: 'vertical',
    showLabels: true,
    showDescriptions: true,
    clickable: true,
  },
};

export const VerticalReverseLayout: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Project Setup',
        description: 'Initialize your project and configure basic settings',
      },
      {
        id: '2',
        label: 'Development',
        description: 'Write code and implement features',
      },
      {
        id: '3',
        label: 'Testing',
        description: 'Run tests and ensure quality',
      },
      {
        id: '4',
        label: 'Deployment',
        description: 'Deploy to production environment',
      },
    ],
    currentStep: 2,
    variant: 'vertical-reverse',
    showLabels: true,
    showDescriptions: true,
    clickable: true,
  },
};

export const CustomColors: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Custom Label and Description Colors</h3>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="currentStep" 
            variant="detailed" 
            stepperColor="primary"
            labelColor="success"
            descriptionColor="warning"
            [showLabels]="true" 
            [showDescriptions]="true">
          </ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Vertical with Different Colors</h3>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="currentStep" 
            variant="vertical" 
            stepperColor="accent"
            labelColor="info"
            descriptionColor="neutral"
            [showLabels]="true" 
            [showDescriptions]="true">
          </ntv-stepper>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">All Different Colors</h3>
          <ntv-stepper 
            [steps]="steps" 
            [currentStep]="currentStep" 
            variant="default" 
            stepperColor="danger"
            labelColor="white"
            descriptionColor="neutral-dark"
            [showLabels]="true" 
            [showDescriptions]="false">
          </ntv-stepper>
        </div>
      </div>
    `,
  }),
  args: {
    steps: defaultSteps,
    currentStep: 2,
  },
};

export const VerticalStepperHeights: Story = {
  render: (args) => ({
    props: {
      ...args,
      shortSteps: [
        { id: '1', label: 'Start', description: 'Begin the process' },
        { id: '2', label: 'Complete', description: 'Finish the task' },
      ],
      longSteps: [
        {
          id: '1',
          label: 'Planning',
          description: 'Define project scope and requirements',
        },
        {
          id: '2',
          label: 'Design',
          description: 'Create wireframes and mockups',
        },
        {
          id: '3',
          label: 'Development',
          description: 'Write code and implement features',
        },
        {
          id: '4',
          label: 'Testing',
          description: 'Run tests and quality assurance',
        },
        { id: '5', label: 'Review', description: 'Code review and feedback' },
        {
          id: '6',
          label: 'Deployment',
          description: 'Deploy to production environment',
        },
        {
          id: '7',
          label: 'Monitoring',
          description: 'Monitor performance and usage',
        },
      ],
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Small Height (200px) - Few Steps</h3>
          <div class="h-48 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <ntv-stepper 
              [steps]="shortSteps" 
              [currentStep]="1" 
              variant="vertical" 
              [showLabels]="true" 
              [showDescriptions]="true"
              class="h-full">
            </ntv-stepper>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Medium Height (400px) - Standard Steps</h3>
          <div class="h-96 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <ntv-stepper 
              [steps]="steps" 
              [currentStep]="2" 
              variant="vertical" 
              [showLabels]="true" 
              [showDescriptions]="true"
              class="h-full">
            </ntv-stepper>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Large Height (600px) - Many Steps</h3>
          <div class="h-[600px] border-2 border-dashed border-gray-300 rounded-lg p-4">
            <ntv-stepper 
              [steps]="longSteps" 
              [currentStep]="3" 
              variant="vertical" 
              [showLabels]="true" 
              [showDescriptions]="true"
              class="h-full">
            </ntv-stepper>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Full Screen Height - Adaptive</h3>
          <div class="h-screen border-2 border-dashed border-gray-300 rounded-lg p-4">
            <ntv-stepper 
              [steps]="steps" 
              [currentStep]="1" 
              variant="vertical" 
              [showLabels]="true" 
              [showDescriptions]="true"
              class="h-full">
            </ntv-stepper>
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    steps: defaultSteps,
  },
};

export const FormWizard: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentStepIndex: 0,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
      },
      stepErrors: [
        false, // Step 1 (Personal Info)
        false, // Step 2 (Account Info)
        false, // Step 3 (Confirmation)
      ],
      updateSteps: function () {
        // Update steps with error state
        this['steps'] = [
          { id: '1', label: 'Personal Info', error: this['stepErrors'][0] },
          { id: '2', label: 'Account Info', error: this['stepErrors'][1] },
          { id: '3', label: 'Confirmation', error: this['stepErrors'][2] },
        ];
      },
      updateStepErrorState: function () {
        // Check if current step has any errors
        let hasErrors = false;

        if (this['currentStepIndex'] === 0) {
          // Check Personal Information fields
          hasErrors = !!(
            this['errors']['firstName'] ||
            this['errors']['lastName'] ||
            this['errors']['email']
          );
          this['stepErrors'][0] = hasErrors;
        } else if (this['currentStepIndex'] === 1) {
          // Check Account Information fields
          hasErrors = !!(
            this['errors']['username'] || this['errors']['password']
          );
          this['stepErrors'][1] = hasErrors;
        }

        // Update steps with new error state
        this['updateSteps']();
      },
      validateStep: function () {
        let isValid = true;

        // Validate current step
        if (this['currentStepIndex'] === 0) {
          // Validate Personal Information
          if (!this['formData']['firstName']) {
            this['errors']['firstName'] = 'First name is required';
            isValid = false;
          } else {
            this['errors']['firstName'] = '';
          }

          if (!this['formData']['lastName']) {
            this['errors']['lastName'] = 'Last name is required';
            isValid = false;
          } else {
            this['errors']['lastName'] = '';
          }

          if (!this['formData']['email']) {
            this['errors']['email'] = 'Email is required';
            isValid = false;
          } else if (!/^\S+@\S+\.\S+$/.test(this['formData']['email'])) {
            this['errors']['email'] = 'Please enter a valid email address';
            isValid = false;
          } else {
            this['errors']['email'] = '';
          }

          // Update step error state
          this['stepErrors'][0] = !isValid;
        } else if (this['currentStepIndex'] === 1) {
          // Validate Account Information
          if (!this['formData']['username']) {
            this['errors']['username'] = 'Username is required';
            isValid = false;
          } else if (this['formData']['username'].length < 4) {
            this['errors']['username'] =
              'Username must be at least 4 characters';
            isValid = false;
          } else {
            this['errors']['username'] = '';
          }

          if (!this['formData']['password']) {
            this['errors']['password'] = 'Password is required';
            isValid = false;
          } else if (this['formData']['password'].length < 6) {
            this['errors']['password'] =
              'Password must be at least 6 characters';
            isValid = false;
          } else {
            this['errors']['password'] = '';
          }

          // Update step error state
          this['stepErrors'][1] = !isValid;
        }

        // Update steps with error state
        this['updateSteps']();

        return isValid;
      },
      nextStep: function () {
        if (this['currentStepIndex'] < this['steps'].length - 1) {
          // Validate current step before proceeding
          if (this['validateStep']()) {
            this['currentStepIndex']++;
            // Don't show errors for the next step's fields until user interacts with them
            if (this['currentStepIndex'] === 1) {
              // Moving to Account Info step - initialize fields but don't show errors yet
              this['errors']['username'] = '';
              this['errors']['password'] = '';
            }
            // Update step error state for the new step
            this['updateStepErrorState']();
          }
        }
      },
      prevStep: function () {
        if (this['currentStepIndex'] > 0) {
          this['currentStepIndex']--;
        }
      },
      updateField: function (field: string, value: string) {
        this['formData'][field] = value;

        // Validate the specific field as the user types
        if (field === 'email') {
          // For email, validate format
          if (!value) {
            this['errors'][field] = 'Email is required';
          } else if (!/^\S+@\S+\.\S+$/.test(value)) {
            this['errors'][field] = 'Please enter a valid email address';
          } else {
            this['errors'][field] = '';
          }
        } else if (field === 'username') {
          // For username, validate length
          if (!value) {
            this['errors'][field] = 'Username is required';
          } else if (value.length < 4) {
            this['errors'][field] = 'Username must be at least 4 characters';
          } else {
            this['errors'][field] = '';
          }
        } else if (field === 'password') {
          // For password, validate length
          if (!value) {
            this['errors'][field] = 'Password is required';
          } else if (value.length < 6) {
            this['errors'][field] = 'Password must be at least 6 characters';
          } else {
            this['errors'][field] = '';
          }
        } else {
          // For other fields, validate not empty
          if (!value) {
            this['errors'][field] =
              field.charAt(0).toUpperCase() + field.slice(1) + ' is required';
          } else {
            this['errors'][field] = '';
          }
        }

        // Update step error state based on current field errors
        this['updateStepErrorState']();
      },
    },
    template: `
      <div class="max-w-2xl mx-auto">
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Stepper with Form Validation</h2>
          <p class="text-gray-600 mb-2">This example demonstrates how to use the error state in a form wizard:</p>
          <ul class="list-disc pl-5 text-sm text-gray-600 mb-4">
            <li>Steps with validation errors will show a red indicator</li>
            <li>Input fields with errors will have red borders and error messages</li>
            <li>Users cannot proceed to the next step until all errors are fixed</li>
          </ul>
        </div>
        
        <ntv-stepper 
          [steps]="steps" 
          [currentStep]="currentStepIndex" 
          variant="form"
          [showLabels]="true">
        </ntv-stepper>
        
        <div class="mt-8 p-6 bg-white border rounded-lg shadow-sm">
          <div *ngIf="currentStepIndex === 0">
            <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name <span class="text-red-500">*</span></label>
                <input 
                  type="text" 
                  [value]="formData['firstName']"
                  (input)="updateField('firstName', $event.target.value)"
                  [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' + (errors['firstName'] ? 'border-red-500' : 'border-gray-300')"
                >
                <p *ngIf="errors['firstName']" class="mt-1 text-sm text-red-600">{{ errors['firstName'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name <span class="text-red-500">*</span></label>
                <input 
                  type="text" 
                  [value]="formData['lastName']"
                  (input)="updateField('lastName', $event.target.value)"
                  [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' + (errors['lastName'] ? 'border-red-500' : 'border-gray-300')"
                >
                <p *ngIf="errors['lastName']" class="mt-1 text-sm text-red-600">{{ errors['lastName'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                <input 
                  type="email" 
                  [value]="formData['email']"
                  (input)="updateField('email', $event.target.value)"
                  [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' + (errors['email'] ? 'border-red-500' : 'border-gray-300')"
                >
                <p *ngIf="errors['email']" class="mt-1 text-sm text-red-600">{{ errors['email'] }}</p>
              </div>
            </div>
          </div>
          
          <div *ngIf="currentStepIndex === 1">
            <h3 class="text-lg font-semibold mb-4">Account Information</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Username <span class="text-red-500">*</span></label>
                <input 
                  type="text" 
                  [value]="formData['username']"
                  (input)="updateField('username', $event.target.value)"
                  [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' + (errors['username'] ? 'border-red-500' : 'border-gray-300')"
                >
                <p *ngIf="errors['username']" class="mt-1 text-sm text-red-600">{{ errors['username'] }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password <span class="text-red-500">*</span></label>
                <input 
                  type="password" 
                  [value]="formData['password']"
                  (input)="updateField('password', $event.target.value)"
                  [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' + (errors['password'] ? 'border-red-500' : 'border-gray-300')"
                >
                <p *ngIf="errors['password']" class="mt-1 text-sm text-red-600">{{ errors['password'] }}</p>
              </div>
            </div>
          </div>
          
          <div *ngIf="currentStepIndex === 2">
            <h3 class="text-lg font-semibold mb-4">Confirmation</h3>
            <div class="space-y-2">
              <p class="text-sm text-gray-600">Please review your information:</p>
              <div class="bg-gray-50 p-4 rounded-md">
                <p class="text-sm"><strong>Name:</strong> {{ formData['firstName'] }} {{ formData['lastName'] }}</p>
                <p class="text-sm"><strong>Email:</strong> {{ formData['email'] }}</p>
                <p class="text-sm"><strong>Username:</strong> {{ formData['username'] }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between mt-6">
            <button 
              (click)="prevStep()"
              [disabled]="currentStepIndex === 0"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button 
              (click)="nextStep()"
              [disabled]="currentStepIndex === steps.length - 1"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ currentStepIndex === steps.length - 1 ? 'Complete' : 'Next' }}
            </button>
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    steps: [
      { id: '1', label: 'Personal Info', error: false },
      { id: '2', label: 'Account Info', error: false },
      { id: '3', label: 'Confirmation', error: false },
    ],
  },
};
