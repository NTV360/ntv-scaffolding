export interface StepData {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export type StepperVariant =
  | 'default'
  | 'progress'
  | 'detailed'
  | 'panel'
  | 'vertical'
  | 'vertical-reverse'
  | 'breadcrumb'
  | 'form'
  | 'icon'
  | 'numbered';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type ColorVariant =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'white'
  | 'neutral'
  | 'neutral-dark';

export interface StepClickEvent {
  step: StepData;
  index: number;
}

export interface StepperConfig {
  variant?: StepperVariant;
  size?: StepperSize;
  stepperColor?: ColorVariant;
  labelColor?: ColorVariant;
  descriptionColor?: ColorVariant;
  clickable?: boolean;
  showLabels?: boolean;
  showDescriptions?: boolean;
  allowSkipping?: boolean;
}

export const DEFAULT_STEPPER_CONFIG: StepperConfig = {
  variant: 'default',
  size: 'md',
  stepperColor: 'accent',
  labelColor: 'accent',
  descriptionColor: 'accent',
  clickable: false,
  showLabels: true,
  showDescriptions: false,
  allowSkipping: false,
};

// Legacy alias for backward compatibility
export type StepperStep = StepData;
