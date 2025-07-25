/**
 * Defines the available size variants for the modal component.
 * Each size is designed for specific use cases and has predefined dimensions.
 */
export type ModalSizeVariant =
  | 'small' // 400px - for confirmations, alerts
  | 'medium' // 600px - for forms, dialogs
  | 'large' // 800px - for complex forms, wizards
  | 'xlarge' // 1000px - for dashboards, detailed views
  | 'confirmation' // 475px - for confirmation dialogs
  | 'success' // 400px - for success messages
  | 'error'; // 400px - for error messages

/**
 * Defines the visual and behavioral variants of the modal.
 * Each variant has specific styling and interaction patterns.
 */
export type ModalVariant =
  | 'default'
  | 'form'
  | 'confirmation'
  | 'alert'
  | 'info'
  | 'success'
  | 'error';

/**
 * Defines the types of alerts that can be displayed in the modal.
 */
export type AlertType = 'success' | 'error';

/**
 * Defines the vertical positioning of the modal on the screen.
 */
export type ModalPosition = 'center' | 'top' | 'bottom';

/**
 * Defines the backdrop styles available for the modal.
 * Controls the visual appearance of the overlay behind the modal.
 */
export type ModalBackdrop = 'blur' | 'dark' | 'none' | 'glass' | 'gradient';

/**
 * Interface for custom modal sizing and spacing configuration.
 * Allows fine-grained control over modal dimensions.
 */
export interface ModalStyleConfig {
  /** Modal width (e.g., '400px', '50%') */
  width?: string;
  /** Modal height */
  height?: string;
  /** Maximum width constraint */
  maxWidth?: string;
  /** Maximum height constraint */
  maxHeight?: string;
  /** Minimum width constraint */
  minWidth?: string;
  /** Minimum height constraint */
  minHeight?: string;
  /** Padding around modal content */
  padding?: string;
}

/**
 * Predefined size configurations for different modal variants.
 * Provides consistent sizing across the application.
 */
export const MODAL_SIZE_PRESETS: Record<ModalSizeVariant, ModalStyleConfig> = {
  small: {
    width: '400px',
    maxWidth: '90vw',
    padding: '20px',
  },
  medium: {
    width: '600px',
    maxWidth: '90vw',
    padding: '20px',
  },
  large: {
    width: '800px',
    maxWidth: '90vw',
    padding: '20px',
  },
  xlarge: {
    width: '1000px',
    maxWidth: '90vw',
    padding: '20px',
  },
  confirmation: {
    width: '475px',
    maxWidth: '90vw',
    padding: '20px',
  },
  success: {
    width: '400px',
    maxWidth: '90vw',
    padding: '20px',
  },
  error: {
    width: '400px',
    maxWidth: '90vw',
    padding: '20px',
  },
};

/**
 * Base configuration interface for the modal component.
 * Defines all available configuration options.
 */
export interface ModalConfig {
  // Appearance
  /** Visual variant of the modal */
  variant?: ModalVariant;
  /** Size preset for the modal */
  size?: ModalSizeVariant;
  /** Vertical position on screen */
  position?: ModalPosition;
  /** Backdrop style */
  backdrop?: ModalBackdrop;
  /** Custom size configuration */
  customSize?: ModalStyleConfig;
  /** Additional CSS classes */
  customClass?: string;
  /** Whether to show animations */
  animation?: boolean;

  // Behavior
  /** Whether the modal can be closed */
  closable?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;
  /** Whether to prevent all closing actions */
  preventClose?: boolean;
  /** Whether to show in fullscreen */
  fullscreen?: boolean;
  /** Whether content is scrollable */
  scrollable?: boolean;
  /** Whether to center vertically */
  centered?: boolean;

  // Header
  /** Whether to show the header */
  showHeader?: boolean;
  /** Header title text */
  headerTitle?: string;
  /** Header subtitle text */
  headerSubtitle?: string;

  // Footer
  /** Whether to show the footer */
  showFooter?: boolean;
}

/**
 * Configuration interface for form modals.
 * Extends base config with form-specific options.
 */
export interface ModalFormConfig extends ModalConfig {
  variant: 'form';
  showFooter: true;
  /** Label for submit button */
  submitLabel?: string;
  /** Label for cancel button */
  cancelLabel?: string;
  /** Handler for form submission */
  onSubmit?: () => void;
  /** Handler for form cancellation */
  onCancel?: () => void;
  /** Handler for form completion */
  onComplete?: () => void;
}

/**
 * Configuration interface for alert modals.
 * Extends base config with alert-specific options.
 */
export interface ModalAlertConfig extends ModalConfig {
  variant: 'alert';
  /** Type of alert (success/error) */
  alertType: AlertType;
  showHeader: false;
  showFooter: false;
  /** Alert message text */
  message: string;
  /** Label for action button */
  buttonLabel?: string;
  /** Handler for alert closure */
  onClose?: () => void;
}

/**
 * Default configuration for the modal component.
 * Provides sensible defaults for all options.
 */
export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  variant: 'default',
  size: 'medium',
  position: 'center',
  backdrop: 'blur',
  animation: true,
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  preventClose: false,
  fullscreen: false,
  scrollable: false,
  centered: true,
  showHeader: true,
  showFooter: true,
};

/**
 * Default configuration for success alert modals.
 * Optimized for success message display.
 */
export const DEFAULT_ALERT_SUCCESS_CONFIG: ModalAlertConfig = {
  ...DEFAULT_MODAL_CONFIG,
  variant: 'alert',
  alertType: 'success',
  size: 'small',
  showHeader: false,
  showFooter: false,
  message: 'Operation completed successfully',
  buttonLabel: 'OK',
  closable: false,
  closeOnBackdrop: false,
  centered: true,
};

/**
 * Default configuration for error alert modals.
 * Optimized for error message display.
 */
export const DEFAULT_ALERT_ERROR_CONFIG: ModalAlertConfig = {
  ...DEFAULT_MODAL_CONFIG,
  variant: 'alert',
  alertType: 'error',
  size: 'small',
  showHeader: false,
  showFooter: false,
  message: 'Failed to save changes. Please try again.',
  buttonLabel: 'OK',
  closable: false,
  closeOnBackdrop: false,
  centered: true,
};
