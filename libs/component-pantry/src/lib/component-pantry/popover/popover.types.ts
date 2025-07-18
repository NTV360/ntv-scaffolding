export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface PopoverConfig {
  placement?: PopoverPlacement;
  offset?: number;
  arrow?: boolean;
  trigger?: 'click' | 'hover' | 'manual';
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  disabled?: boolean;
  maxWidth?: string;
  zIndex?: number;
}

export const DEFAULT_POPOVER_CONFIG: PopoverConfig = {
  placement: 'bottom',
  offset: 8,
  arrow: true,
  trigger: 'click',
  closeOnClickOutside: true,
  closeOnEscape: true,
  disabled: false,
  maxWidth: '320px',
  zIndex: 1000,
};