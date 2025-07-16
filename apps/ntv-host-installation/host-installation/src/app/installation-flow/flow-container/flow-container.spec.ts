import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowContainer } from './flow-container';

describe('FlowContainer', () => {
  let component: FlowContainer;
  let fixture: ComponentFixture<FlowContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
