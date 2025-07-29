import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScreenInfo } from './create-screen-info';

describe('CreateScreenInfo', () => {
  let component: CreateScreenInfo;
  let fixture: ComponentFixture<CreateScreenInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScreenInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateScreenInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
