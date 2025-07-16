export type AccordionVariant = 'default' | 'bordered' | 'flush';

export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionConfig {
  variant?: AccordionVariant;
  size?: AccordionSize;
  animated?: boolean;
  showIcons?: boolean;
  initialOpen?: boolean;
  disabled?: boolean;
}

export const DEFAULT_ACCORDION_CONFIG: AccordionConfig = {
  variant: 'default',
  size: 'md',
  animated: true,
  showIcons: true,
  initialOpen: false,
  disabled: false,
};