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
     * Verifies modal open behavior including animation and event emission
     */
    it('should open modal correctly', () => {
      spyOn(component.modalOpen, 'emit');
      spyOn(window, 'setTimeout').and.callFake((fn: any) => fn());

      component.open();

      expect(component.isVisible()).toBe(true);
      expect(component.isAnimating()).toBe(true);
      expect(component.modalOpen.emit).toHaveBeenCalled();
    });

    /**
     * Verifies modal close behavior including animation and event emission
     */
    it('should close modal correctly', () => {
      component.open();
      spyOn(component.modalClose, 'emit');
      spyOn(window, 'setTimeout').and.callFake((fn: any) => fn());

      component.close();

      expect(component.isVisible()).toBe(false);
      expect(component.isAnimating()).toBe(true);
      expect(component.modalClose.emit).toHaveBeenCalled();
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
      spyOn(component, 'close');
      spyOn(component.backdropClick, 'emit');

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: event.currentTarget });
      component.onBackdropClick(event);

      expect(component.backdropClick.emit).toHaveBeenCalled();
      expect(component.close).toHaveBeenCalled();
    });

    /**
     * Verifies escape key behavior when closeOnEscape is enabled
     */
    it('should handle escape key when closeOnEscape is true and modal is visible', () => {
      component.open();
      spyOn(component, 'close');
      spyOn(component.escapeKey, 'emit');

      component.onEscapeKey();

      expect(component.escapeKey.emit).toHaveBeenCalled();
      expect(component.close).toHaveBeenCalled();
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
      const config = {
        variant: 'alert',
        alertType: 'success',
      } as ModalAlertConfig;
      (component as any).config = config;
      fixture.detectChanges();

      expect(component.isAlertVariant()).toBe(true);
      expect(component.alertType()).toBe('success');
      expect(component.showLottieAnimation()).toBe(true);
    });

    /**
     * Verifies error alert variant behavior
     */
    it('should handle alert variant with error type', () => {
      const config = {
        variant: 'alert',
        alertType: 'error',
      } as ModalAlertConfig;
      (component as any).config = config;
      fixture.detectChanges();

      expect(component.isAlertVariant()).toBe(true);
      expect(component.alertType()).toBe('error');
      expect(component.showLottieAnimation()).toBe(true);
    });

    /**
     * Verifies Lottie animation path generation
     */
    it('should provide correct Lottie animation path', () => {
      const config = {
        variant: 'alert',
        alertType: 'success',
      } as ModalAlertConfig;
      (component as any).config = config;
      fixture.detectChanges();

      const path = component.lottieAnimationPath();
      expect(path).toBeTruthy();
    });
  });
});
