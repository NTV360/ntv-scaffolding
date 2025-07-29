/**
 * Test suite for ModalComponent.
 * Verifies the functionality of the modal dialog component including:
 * - Component initialization
 * - State management
 * - User interactions
 * - DOM rendering
 * - Accessibility features
 * - Alert variants with animations
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal';
import { ModalAlertConfig } from './modal.types';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Tests for component initialization and default values
   */
  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    /**
     * Verifies all default input values match expected initial state
     */
    it('should have default values', () => {
      expect(component.size()).toBe('medium');
      expect(component.variant()).toBe('default');
      expect(component.position()).toBe('center');
      expect(component.backdrop()).toBe('blur');
      expect(component.closable()).toBe(true);
      expect(component.closeOnBackdrop()).toBe(true);
      expect(component.closeOnEscape()).toBe(true);
      expect(component.fullscreen()).toBe(false);
      expect(component.scrollable()).toBe(false);
      expect(component.centered()).toBe(true);
      expect(component.showHeader()).toBe(true);
      expect(component.showFooter()).toBe(false);
      expect(component.headerTitle()).toBe('');
      expect(component.headerSubtitle()).toBe('');
      expect(component.customClass()).toBe('');
      expect(component.animation()).toBe(true);
      expect(component.preventClose()).toBe(false);
    });
  });

  /**
   * Tests for modal visibility and animation state management
   */
  describe('Modal State Management', () => {
    it('should start with modal closed', () => {
      expect(component.isVisible()).toBe(false);
      expect(component.isAnimating()).toBe(false);
    });

    /**
     * Verifies modal open behavior
     */
    it('should open modal correctly', () => {
      component.open();
      expect(component.isVisibleSignal()).toBe(true);
    });

    /**
     * Verifies modal close behavior
     */
    it('should close modal correctly', () => {
      component.open();
      component.close();
      expect(component.isVisibleSignal()).toBe(false);
    });
  });

  /**
   * Tests for user interaction handling (clicks, keyboard events)
   */
  describe('User Interactions', () => {
    /**
     * Verifies backdrop click behavior when closeOnBackdrop is enabled
     */
    it('should handle backdrop click when closeOnBackdrop is true', () => {
      component.open();
      const initialState = component.isVisibleSignal();

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: event.currentTarget });
      component.onBackdropClick(event);

      // Modal should be closed after backdrop click
      expect(component.isVisibleSignal()).toBe(false);
    });

    /**
     * Verifies escape key behavior when closeOnEscape is enabled
     */
    it('should handle escape key when closeOnEscape is true and modal is visible', () => {
      component.open();
      component.onEscapeKey();

      // Modal should be closed after escape key
      expect(component.isVisibleSignal()).toBe(false);
    });
  });

  /**
   * Tests for CSS class generation and DOM structure
   */
  describe('CSS Classes', () => {
    /**
     * Verifies modal wrapper classes are correctly generated
     */
    it('should generate correct modal classes', () => {
      component.open();
      fixture.detectChanges();

      const classes = component.modalClasses();
      expect(classes).toContain('modal');
      expect(classes).toContain('modal--medium');
      expect(classes).toContain('modal--default');
      expect(classes).toContain('modal--center');
      expect(classes).toContain('modal--backdrop-blur');
      expect(classes).toContain('modal--centered');
      expect(classes).toContain('modal--animated');
      expect(classes).toContain('modal--visible');
    });

    /**
     * Verifies modal content classes are correctly generated
     */
    it('should generate correct modal content classes', () => {
      const classes = component.modalContentClasses();
      expect(classes).toContain('modal__content');
      expect(classes).toContain('modal__content--medium');
      expect(classes).toContain('modal__content--default');
    });
  });

  /**
   * Tests for alert variant functionality including Lottie animations
   */
  describe('Alert Variants', () => {
    /**
     * Verifies success alert variant behavior
     */
    it('should handle alert variant with success type', () => {
      const alertConfig = {
        variant: 'alert' as const,
        alertType: 'success' as const,
      };
      fixture.componentRef.setInput('config', alertConfig);

      // Don't call detectChanges to avoid triggering Lottie script loading
      expect(component.isAlertVariant()).toBe(true);
      expect(component.alertType()).toBe('success');
    });

    /**
     * Verifies error alert variant behavior
     */
    it('should handle alert variant with error type', () => {
      const alertConfig = {
        variant: 'alert' as const,
        alertType: 'error' as const,
      };
      fixture.componentRef.setInput('config', alertConfig);

      // Don't call detectChanges to avoid triggering Lottie script loading
      expect(component.isAlertVariant()).toBe(true);
      expect(component.alertType()).toBe('error');
    });
  });
});
