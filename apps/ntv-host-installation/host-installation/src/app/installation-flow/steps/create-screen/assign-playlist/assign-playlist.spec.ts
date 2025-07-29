import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPlaylist } from './assign-playlist';

describe('AssignPlaylist', () => {
  let component: AssignPlaylist;
  let fixture: ComponentFixture<AssignPlaylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPlaylist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPlaylist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
