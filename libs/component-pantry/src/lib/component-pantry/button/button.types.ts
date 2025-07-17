export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'accent'
  | 'description'
  | 'info';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonColor =
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'gray'
  | 'indigo'
  | 'pink'
  | 'custom';

export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ButtonConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  customColor?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: ButtonRounded;
  shadow?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const DEFAULT_BUTTON_CONFIG: ButtonConfig = {
  variant: 'primary',
  size: 'md',
  color: 'blue',
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: 'md',
  shadow: true,
  type: 'button',
};