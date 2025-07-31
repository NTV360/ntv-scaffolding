import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonutGraphComponent } from './donut-graph';
import { DonutChartItem, DonutChartConfig } from './donut-graph.types';
import { GRAPH_DEMO_DATA } from './donut-graph.constants';
import { signal } from '@angular/core';

describe('DonutGraphComponent', () => {
  let component: DonutGraphComponent;
  let fixture: ComponentFixture<DonutGraphComponent>;

  const mockData: DonutChartItem[] = [
    { label: 'Segment 1', total: 30 },
    { label: 'Segment 2', total: 25 },
    { label: 'Segment 3', total: 20 },
    { label: 'Segment 4', total: 15 },
    { label: 'Segment 5', total: 10 },
    { label: 'Segment 6', total: 8 },
    { label: 'Segment 7', total: 6 },
    { label: 'Segment 8', total: 4 },
    { label: 'Segment 9', total: 3 },
    { label: 'Segment 10', total: 2 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutGraphComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply auto size class when size is auto', () => {
    // Set the input signals using the correct syntax
    (component as any).data = signal(mockData);
    (component as any).config = signal({ size: 'auto' });
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.donut-graph-container'
    );
    expect(container.classList.contains('donut-graph-auto')).toBe(true);
  });

  it('should make legend scrollable in auto size mode', () => {
    (component as any).data = signal(mockData);
    (component as any).config = signal({
      size: 'auto',
      showLegend: true,
      legendPosition: 'right',
    });
    fixture.detectChanges();

    const legend = fixture.nativeElement.querySelector('.donut-legend');
    expect(legend).toBeTruthy();
    expect(legend.style.overflowY).toBe('auto');
    expect(legend.style.maxHeight).toBe('350px');
    // Check that scrollbar is hidden
    expect(legend.style.scrollbarWidth).toBe('none');
  });

  it('should not apply auto size class for other sizes', () => {
    (component as any).data = signal(mockData);
    (component as any).config = signal({ size: 'medium' });
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.donut-graph-container'
    );
    expect(container.classList.contains('donut-graph-auto')).toBe(false);
  });

  it('should have correct computed properties for auto size', () => {
    (component as any).data = signal(mockData);
    (component as any).config = signal({ size: 'auto' });
    fixture.detectChanges();

    expect(component.isAuto()).toBe(true);
    expect(component.isSmall()).toBe(false);
    expect(component.isLarge()).toBe(false);
    expect(component.isFullscreen()).toBe(false);
  });

  it('should render legend items correctly in auto size mode', () => {
    (component as any).data = signal(mockData);
    (component as any).config = signal({
      size: 'auto',
      showLegend: true,
      legendPosition: 'right',
    });
    fixture.detectChanges();

    const legendItems = fixture.nativeElement.querySelectorAll('.legend-item');
    expect(legendItems.length).toBe(mockData.length);

    // Check that legend items have proper styling
    legendItems.forEach((item: HTMLElement) => {
      expect(item.style.padding).toBe('6px 0px');
      expect(item.style.marginBottom).toBe('2px');
    });
  });
});
