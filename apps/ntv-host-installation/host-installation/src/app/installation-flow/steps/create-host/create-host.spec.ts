import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHost } from './create-host';

describe('CreateHost', () => {
  let component: CreateHost;
  let fixture: ComponentFixture<CreateHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
