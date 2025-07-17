import { InstallationStep } from '../interfaces';
import { StepperConfig } from '@ntv-scaffolding/component-pantry';

export const INSTALLATION_STEPS: InstallationStep[] = [
  {
    id: 'step1',
    label: 'Create a Host',
    description: 'Step 1',
  },
  {
    id: 'step2',
    label: 'Create Screen',
    description: 'Step 2',
  },
  {
    id: 'step3',
    label: 'Set Installation Date',
    description: 'Step 3',
  },
  {
    id: 'step4',
    label: 'Review Information',
    description: 'Step 4',
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
