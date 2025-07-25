import { InstallationStep } from '../interfaces';
import { StepperConfig } from '@ntv-scaffolding/component-pantry';

export const INSTALLATION_STEPS: InstallationStep[] = [
  {
    id: 'step1',
    subtitle: 'Step 1',
    label: 'Create a Host',
    description: 'You can fill on the forms manually or search a business',
  },
  {
    id: 'step2',
    subtitle: 'Step 2',
    label: 'Create Screen',
    description: 'Define screen layout and display configuration',
  },
  {
    id: 'step3',
    subtitle: 'Step 3',
    label: 'Set Installation Date',
    description: 'Schedule when the installation should take place',
  },
  {
    id: 'step4',
    subtitle: 'Step 4',
    label: 'Review Information',
    description: 'Verify all settings before finalizing the installation',
  },
];

export const DEFAULT_STEPPER_CONFIG: StepperConfig = {
  variant: 'vertical-reverse',
  stepperColor: 'accent',
  labelColor: 'white',
  descriptionColor: 'neutral',
  showLabels: true,
  showDescriptions: true,
  clickable: true,
  allowSkipping: true,
};

// Additional stepper configurations for different use cases
export const STEPPER_CONFIGS = {
  default: DEFAULT_STEPPER_CONFIG,
  compact: {
    ...DEFAULT_STEPPER_CONFIG,
    showDescriptions: false,
  },
  interactive: {
    ...DEFAULT_STEPPER_CONFIG,
    clickable: true,
  },
};
