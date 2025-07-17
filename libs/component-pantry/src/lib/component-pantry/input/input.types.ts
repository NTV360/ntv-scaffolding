export type InputType = 'text' | 'password' | 'email' | 'number';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'error' | 'success' | string;

export interface InputConfig {
  type?: InputType;
  size?: InputSize;
  variant?: InputVariant;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  borderRadius?: string;
  id?: string;
  label?: string | null;
  info?: string | null;
  error?: string | null;
  showError?: boolean;
}

export const DEFAULT_INPUT_CONFIG: InputConfig = {
  type: 'text',
  size: 'md',
  variant: 'default',
  placeholder: 'Enter your text...',
  required: false,
  disabled: false,
  clearable: false,
  borderRadius: 'md',
  showError: true,
};
