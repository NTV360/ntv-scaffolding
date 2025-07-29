import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Import jest spyOn
const { spyOn } = jest;

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.variant()).toBe('primary');
    expect(component.size()).toBe('md');
    expect(component.color()).toBe('blue');
    expect(component.disabled()).toBe(false);
    expect(component.loading()).toBe(false);
    expect(component.fullWidth()).toBe(false);
    expect(component.rounded()).toBe('md');
    expect(component.shadow()).toBe(true);
    expect(component.type()).toBe('button');
  });

  it('should apply correct CSS classes', () => {
    const classes = component.buttonClasses();
    expect(classes).toContain('btn');
    expect(classes).toContain('btn--primary');
    expect(classes).toContain('btn--md');
    expect(classes).toContain('btn--blue');
    expect(classes).toContain('btn--rounded-md');
    expect(classes).toContain('btn--shadow');
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const classes = component.buttonClasses();
    expect(classes).toContain('btn--disabled');
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should apply loading class when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const classes = component.buttonClasses();
    expect(classes).toContain('btn--loading');
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should apply full width class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    const classes = component.buttonClasses();
    expect(classes).toContain('btn--full-width');
  });

  it('should emit buttonClick event when clicked and not disabled', () => {
    spyOn(component.buttonClick, 'emit');

    buttonElement.nativeElement.click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should not emit buttonClick event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    spyOn(component.buttonClick, 'emit');

    buttonElement.nativeElement.click();

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should not emit buttonClick event when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    spyOn(component.buttonClick, 'emit');

    buttonElement.nativeElement.click();

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should show loading spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.btn__spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should hide loading spinner when not loading', () => {
    const spinner = fixture.debugElement.query(By.css('.btn__spinner'));
    expect(spinner).toBeFalsy();
  });

  it('should apply correct variant classes', () => {
    const variants = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'outline',
    ] as const;

    variants.forEach((variant) => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      const classes = component.buttonClasses();
      expect(classes).toContain(`btn--${variant}`);
    });
  });

  it('should apply correct size classes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();

      const classes = component.buttonClasses();
      expect(classes).toContain(`btn--${size}`);
    });
  });

  it('should apply correct color classes', () => {
    const colors = [
      'blue',
      'green',
      'red',
      'yellow',
      'purple',
      'gray',
      'indigo',
      'pink',
    ] as const;

    colors.forEach((color) => {
      fixture.componentRef.setInput('color', color);
      fixture.detectChanges();

      const classes = component.buttonClasses();
      expect(classes).toContain(`btn--${color}`);
    });
  });

  it('should set correct button type', () => {
    const types = ['button', 'submit', 'reset'] as const;

    types.forEach((type) => {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();

      expect(buttonElement.nativeElement.type).toBe(type);
    });
  });
});
