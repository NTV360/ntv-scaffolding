import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInstallation } from './set-installation';

describe('SetInstallation', () => {
  let component: SetInstallation;
  let fixture: ComponentFixture<SetInstallation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetInstallation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetInstallation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
