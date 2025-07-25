import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHostPlace } from './create-host-place';

describe('CreateHostPlace', () => {
  let component: CreateHostPlace;
  let fixture: ComponentFixture<CreateHostPlace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHostPlace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHostPlace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
