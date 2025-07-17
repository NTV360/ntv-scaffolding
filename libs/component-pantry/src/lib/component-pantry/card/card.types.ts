export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardConfig {
  variant?: CardVariant;
  rounded?: CardRounded;
  shadow?: CardShadow;
  backgroundColor?: string;
  borderColor?: string;
  gradient?: string;
  hoverEffect?: boolean;
  clickable?: boolean;
  fullWidth?: boolean;
  adaptToTheme?: boolean;
}

export const DEFAULT_CARD_CONFIG: CardConfig = {
  variant: 'default',
  rounded: 'md',
  shadow: 'sm',
  backgroundColor: '',
  borderColor: '',
  gradient: '',
  hoverEffect: false,
  clickable: false,
  fullWidth: false,
  adaptToTheme: true,
};