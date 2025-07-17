import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentPantry } from './component-pantry';

describe('ComponentPantry', () => {
  let component: ComponentPantry;
  let fixture: ComponentFixture<ComponentPantry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPantry],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentPantry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
