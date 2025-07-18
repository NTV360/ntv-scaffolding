import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInformation } from './review-information';

describe('ReviewInformation', () => {
  let component: ReviewInformation;
  let fixture: ComponentFixture<ReviewInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
