export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';

export type PopoverVariant = 'default' | 'bordered' | 'shadow' | 'minimal';

export type PopoverSize = 'sm' | 'md' | 'lg' | 'xl';

export interface PopoverConfig {
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  variant?: PopoverVariant;
  size?: PopoverSize;
  showArrow?: boolean;
  offset?: number;
  delay?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  disabled?: boolean;
}

export const DEFAULT_POPOVER_CONFIG: PopoverConfig = {
  placement: 'bottom',
  trigger: 'click',
  variant: 'default',
  size: 'md',
  showArrow: true,
  offset: 8,
  delay: 0,
  closeOnClickOutside: true,
  closeOnEscape: true,
  disabled: false,
};

export interface PopoverPosition {
  top: number;
  left: number;
  arrowTop?: number;
  arrowLeft?: number;
  arrowClass?: string;
}