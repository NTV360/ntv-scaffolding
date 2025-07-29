import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTemplate } from './choose-template';

describe('ChooseTemplate', () => {
  let component: ChooseTemplate;
  let fixture: ComponentFixture<ChooseTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
