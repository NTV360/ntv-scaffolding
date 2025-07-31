import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoneComponent, ZoneData } from './zone.component';
import { By } from '@angular/platform-browser';

describe('ZoneComponent', () => {
  let component: ZoneComponent;
  let fixture: ComponentFixture<ZoneComponent>;
  const mockZone: ZoneData = {
    backgroundColor: '#123456',
    height: 540,
    width: 960,
    xPos: 100,
    yPos: 200,
    zIndex: 2,
    containerHeight: 1080,
    containerWidth: 1920,
    name: 'Test Zone',
    playlistId: 'abc',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoneComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('zoneData', mockZone);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
