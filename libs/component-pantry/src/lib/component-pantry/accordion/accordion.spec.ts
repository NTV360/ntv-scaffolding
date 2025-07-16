import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Accordion } from './accordion';
import { AccordionConfig } from './accordion.types';

@Component({
  template: `
    <ntv-accordion
      [variant]="variant"
      [size]="size"
      [config]="config"
      [showIcons]="showIcons"
      [group]="group"
    >
      <div slot="header">Test Header</div>
      <div slot="body">Test Content</div>
    </ntv-accordion>
  `,
  standalone: true,
  imports: [Accordion],
})
class TestHostComponent {
  variant: 'default' | 'bordered' | 'flush' = 'default';
  size: 'sm' | 'md' | 'lg' = 'md';
  config?: AccordionConfig;
  showIcons = true;
  group?: string;
}

describe('Accordion', () => {
  let component: Accordion;
  let fixture: ComponentFixture<Accordion>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accordion, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Accordion);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    compiled = hostFixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render accordion with projected content', () => {
    hostFixture.detectChanges();

    const accordion = compiled.querySelector('ntv-accordion');
    expect(accordion).toBeTruthy();

    const header = compiled.querySelector('[slot="header"]');
    const body = compiled.querySelector('[slot="body"]');
    expect(header?.textContent?.trim()).toBe('Test Header');
    expect(body?.textContent?.trim()).toBe('Test Content');
  });

  it('should apply correct CSS classes based on variant', () => {
    hostComponent.variant = 'bordered';
    hostFixture.detectChanges();

    const accordion = compiled.querySelector('.accordion');
    expect(accordion?.classList.contains('accordion--bordered')).toBeTruthy();
  });

  it('should apply correct CSS classes based on size', () => {
    hostComponent.size = 'lg';
    hostFixture.detectChanges();

    const accordion = compiled.querySelector('.accordion');
    expect(accordion?.classList.contains('accordion--lg')).toBeTruthy();
  });

  it('should show icons by default', () => {
    hostFixture.detectChanges();

    const icon = compiled.querySelector('.accordion__icon');
    expect(icon).toBeTruthy();
  });

  it('should hide icons when showIcons is false', () => {
    hostComponent.showIcons = false;
    hostFixture.detectChanges();

    const icon = compiled.querySelector('.accordion__icon');
    expect(icon).toBeFalsy();
  });

  it('should initialize with closed state by default', () => {
    hostFixture.detectChanges();

    expect(component.isOpen()).toBeFalsy();
    const content = compiled.querySelector('.accordion__content');
    expect(content?.classList.contains('accordion__content--open')).toBeFalsy();
  });

  it('should toggle accordion state when clicked', () => {
    hostFixture.detectChanges();

    const initialState = component.isOpen();
    const header = compiled.querySelector('.accordion__header') as HTMLElement;
    header.click();
    hostFixture.detectChanges();

    expect(component.isOpen()).toBe(!initialState);
  });

  it('should initialize with initial open state when configured', () => {
    hostComponent.config = { initialOpen: true };
    hostFixture.detectChanges();

    // Create a new component instance to test initialization
    const newFixture = TestBed.createComponent(TestHostComponent);
    newFixture.componentInstance.config = { initialOpen: true };
    newFixture.detectChanges();

    const accordionComponent = newFixture.debugElement.query(
      By.css('ntv-accordion')
    )?.componentInstance;
    expect(accordionComponent?.isOpen()).toBeTruthy();
  });

  it('should work with exclusive groups', () => {
    // Create two accordions in the same group
    const firstFixture = TestBed.createComponent(TestHostComponent);
    firstFixture.componentInstance.group = 'test-group';
    firstFixture.detectChanges();

    const secondFixture = TestBed.createComponent(TestHostComponent);
    secondFixture.componentInstance.group = 'test-group';
    secondFixture.detectChanges();

    const firstAccordion = firstFixture.debugElement.query(
      By.css('ntv-accordion')
    )?.componentInstance;
    const secondAccordion = secondFixture.debugElement.query(
      By.css('ntv-accordion')
    )?.componentInstance;

    // Open the first accordion
    firstAccordion?.toggle();
    expect(firstAccordion?.isOpen()).toBeTruthy();

    // Opening the second should close the first
    secondAccordion?.toggle();
    expect(firstAccordion?.isOpen()).toBeFalsy();
    expect(secondAccordion?.isOpen()).toBeTruthy();
  });

  it('should emit accordionToggle event', () => {
    hostFixture.detectChanges();

    spyOn(component.accordionToggle, 'emit');

    component.toggle();

    expect(component.accordionToggle.emit).toHaveBeenCalledWith(true);
  });

  it('should emit toggle event when clicked', () => {
    hostFixture.detectChanges();

    spyOn(component.accordionToggle, 'emit');

    const header = compiled.querySelector('.accordion__header') as HTMLElement;
    header.click();

    expect(component.accordionToggle.emit).toHaveBeenCalledWith(true);
  });

  it('should apply config properties correctly', () => {
    const config: AccordionConfig = {
      variant: 'flush',
      size: 'sm',
      animated: false,
      showIcons: false,
    };

    hostComponent.config = config;
    hostFixture.detectChanges();

    expect(component.mergedVariant()).toBe('flush');
    expect(component.mergedSize()).toBe('sm');
    expect(component.mergedAnimated()).toBeFalsy();
    expect(component.mergedShowIcons()).toBeFalsy();
  });

  it('should prioritize individual properties over config', () => {
    const config: AccordionConfig = {
      variant: 'flush',
      size: 'sm',
    };

    hostComponent.config = config;
    hostComponent.variant = 'bordered';
    hostComponent.size = 'lg';
    hostFixture.detectChanges();

    expect(component.mergedVariant()).toBe('bordered');
    expect(component.mergedSize()).toBe('lg');
  });

  it('should apply correct CSS classes when open', () => {
    hostFixture.detectChanges();

    // Open the accordion
    component.toggle();
    hostFixture.detectChanges();

    const accordion = compiled.querySelector('.accordion');
    const header = compiled.querySelector('.accordion__header');
    const content = compiled.querySelector('.accordion__content');

    expect(accordion?.classList.contains('accordion--open')).toBeTruthy();
    expect(header?.classList.contains('accordion__header--open')).toBeTruthy();
    expect(
      content?.classList.contains('accordion__content--open')
    ).toBeTruthy();
  });

  it('should apply correct CSS classes when closed', () => {
    hostFixture.detectChanges();

    const accordion = compiled.querySelector('.accordion');
    const header = compiled.querySelector('.accordion__header');
    const content = compiled.querySelector('.accordion__content');

    expect(accordion?.classList.contains('accordion--open')).toBeFalsy();
    expect(header?.classList.contains('accordion__header--open')).toBeFalsy();
    expect(content?.classList.contains('accordion__content--open')).toBeFalsy();
  });

  it('should handle click events on header', () => {
    hostFixture.detectChanges();

    spyOn(component, 'toggle');

    const header = compiled.querySelector('.accordion__header') as HTMLElement;
    header.click();

    expect(component.toggle).toHaveBeenCalled();
  });

  it('should set proper ARIA attributes', () => {
    hostFixture.detectChanges();

    const header = compiled.querySelector('.accordion__header');
    const content = compiled.querySelector('.accordion__content');

    // Check aria-expanded when closed
    expect(header?.getAttribute('aria-expanded')).toBe('false');

    // Open the accordion
    component.toggle();
    hostFixture.detectChanges();

    // Check aria-expanded when open
    expect(header?.getAttribute('aria-expanded')).toBe('true');

    // Check aria-controls and aria-labelledby
    const headerId = header?.getAttribute('id');
    const contentId = content?.getAttribute('id');
    expect(header?.getAttribute('aria-controls')).toBe(contentId);
    expect(content?.getAttribute('aria-labelledby')).toBe(headerId);
  });
});
