import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SearchHostPlace } from './search-host-place';

// Mock Google Maps API
/* eslint-disable @typescript-eslint/no-empty-function */
(global as any).google = {
  maps: {
    Map: class {
      constructor() { /* Mock constructor */ }
      setCenter() { /* Mock method */ }
      setZoom() { /* Mock method */ }
    },
    Marker: class {
      constructor() { /* Mock constructor */ }
      setMap() { /* Mock method */ }
      setPosition() { /* Mock method */ }
    },
    LatLng: class {
      constructor(public lat: number, public lng: number) { /* Mock constructor */ }
    },
    MapTypeId: {
      ROADMAP: 'roadmap'
    }
  }
};
/* eslint-enable @typescript-eslint/no-empty-function */

describe('SearchHostPlace', () => {
  let component: SearchHostPlace;
  let fixture: ComponentFixture<SearchHostPlace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHostPlace],
      providers: [provideHttpClient(), provideHttpClientTesting()]
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
