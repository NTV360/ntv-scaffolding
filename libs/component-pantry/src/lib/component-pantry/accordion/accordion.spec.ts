import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Accordion } from './accordion';

@Component({
  template: `
    <ntv-accordion>
      <div header>Test Header</div>
      <div content>Test Content</div>
    </ntv-accordion>
  `,
  imports: [Accordion],
})
class TestHostComponent {}

describe('Accordion', () => {
  let component: Accordion;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    fixture = hostFixture;

    const accordionDebugElement = hostFixture.debugElement.query(
      (de) => de.componentInstance instanceof Accordion
    );
    component = accordionDebugElement.componentInstance;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
