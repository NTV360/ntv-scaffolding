import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

//GLOBAL
import { Autocomplete, Searchbar } from '@ntv-scaffolding/component-pantry';

const components = [Autocomplete, Searchbar];
@Component({
  selector: 'app-search-host-place',
  imports: [GoogleMap, components],
  templateUrl: './search-host-place.html',
  styleUrl: './search-host-place.css',
})
export class SearchHostPlace {
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  display: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  redPinMarker: google.maps.Marker | null = null;
  mapInstance: google.maps.Map | null = null;

  mapOptions: google.maps.MapOptions = {
    minZoom: 2,
    maxZoom: 20,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      },
      strictBounds: true,
    },
    gestureHandling: 'cooperative',
    scrollwheel: true,
    disableDoubleClickZoom: false,
    draggable: true,
  };

  options = [
    { value: 'dealer1', label: 'Dealer 1' },
    { value: 'dealer2', label: 'Dealer 2' },
    { value: 'dealer3', label: 'Dealer 3' },
    { value: 'dealer4', label: 'Dealer 4' },
    { value: 'dealer5', label: 'Dealer 5' },
  ];

  data = [
    {
      id: 1,
      name: 'London1',
      country: 'United States',
    },
    {
      id: 1,
      name: 'London1',
      country: 'United States',
    },
  ];

  /**
   * Adds a marker to the map at the specified location
   * @public
   * @param event - Google Maps mouse event containing coordinates
   */
  public addMarker(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      // Remove existing marker if any
      if (this.redPinMarker) {
        this.redPinMarker.setMap(null);
      }

      // Update display coordinates
      this.display = event.latLng.toJSON();
    }
  }

  /**
   * Handles map ready event to store map reference
   * @public
   * @param map - Google Maps instance
   */
  public onMapReady(map: google.maps.Map): void {
    // Store map reference for marker creation
    this.mapInstance = map;
  }

  /**
   * Creates a marker at the clicked location
   * @public
   * @param event - Google Maps mouse event containing coordinates
   */
  public onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng && this.mapInstance) {
      // Remove existing marker if any
      if (this.redPinMarker) {
        this.redPinMarker.setMap(null);
      }

      // Create new marker
      this.redPinMarker = new google.maps.Marker({
        position: event.latLng,
        map: this.mapInstance,
        title: 'Selected Location',
      });

      // Update display coordinates
      this.display = event.latLng.toJSON();
    }
  }

  public selectedValue(event: any) {
    console.log(event);
  }
}
