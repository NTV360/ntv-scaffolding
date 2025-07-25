import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHostPlace } from './search-host-place';

describe('SearchHostPlace', () => {
  let component: SearchHostPlace;
  let fixture: ComponentFixture<SearchHostPlace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHostPlace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHostPlace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
