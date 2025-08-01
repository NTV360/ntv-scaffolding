import {
  Component,
  signal,
  inject,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime } from 'rxjs';

// GLOBAL
import { Autocomplete, Searchbar } from '@ntv-scaffolding/component-pantry';

// LOCAL
import {
  Fastedge,
  HostInstallationApi,
  InstallationDraftApiService,
} from '../../../../services';
import { CityState } from '../../../../interfaces';

/**
 * Interface for search result data structure
 * Contains all original data from Google Business Profile API
 */
interface SearchResultData {
  id: string;
  title: string;
  description: string;
  additionalData: {
    type: string;
    thumbnail: string;
    latitude: number;
    longitude: number;
  };
}

const components = [Autocomplete, Searchbar] as const;

/**
 * Component for searching and selecting host places with Google Maps integration
 * Provides functionality to search for business locations and pin them on a map
 */
@Component({
  selector: 'ntv-search-host-place',
  imports: [GoogleMap, ReactiveFormsModule, components],
  templateUrl: './search-host-place.html',
  styleUrl: './search-host-place.css',
})
export class SearchHostPlace implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchbarRef') searchbarRef!: Searchbar;
  /** Service for making API calls to get business profile data */
  private readonly fastedgeService = inject(Fastedge);

  private readonly installationAPI = inject(HostInstallationApi);

  /** Service for managing installation flow state and auto-save */
  private readonly installationDraft = inject(InstallationDraftApiService);

  /** Subject for handling component destruction and unsubscribing from observables */
  private readonly destroy$ = new Subject<void>();

  /** Center coordinates for the Google Map */
  public center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };

  /** Zoom level for the Google Map */
  public zoom = 4;

  /** Display coordinates for the current location */
  public display: google.maps.LatLngLiteral = { lat: 24, lng: 12 };

  /** Reference to the red pin marker on the map */
  public redPinMarker: google.maps.Marker | null = null;

  /** Reference to the Google Maps instance */
  public mapInstance: google.maps.Map | null = null;

  /** Signal for storing the current search keyword */
  public readonly searchKeyword = signal<string>('');

  /** Signal for storing search results */
  public readonly searchResults = signal<{ value: string; label: string }[]>(
    []
  );

  /** Signal for tracking loading state */
  public readonly isLoading = signal<boolean>(false);

  /** Configuration options for the Google Map */
  public readonly mapOptions: google.maps.MapOptions = {
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

  /**
   * SAMPLE ONLY
   * Available dealer options for the autocomplete dropdown
   * */
  public readonly options: { value: string; label: string }[] = [
    { value: 'dealer1', label: 'Dealer 1' },
    { value: 'dealer2', label: 'Dealer 2' },
    { value: 'dealer3', label: 'Dealer 3' },
    { value: 'dealer4', label: 'Dealer 4' },
    { value: 'dealer5', label: 'Dealer 5' },
  ];

  /** Array containing search result data for the searchbar component */
  public data: SearchResultData[] = [];

  /** Form control for managing the search input value */
  public readonly searchControl = new FormControl<string>('');

  /** Signal for storing the selected place data */
  public readonly selectedPlace = signal<{
    name: string;
    value: string;
    id: string;
  } | null>(null);

  // Store pending location data to pin when map is ready
  private pendingLocationPin: { address: string; title: string } | null = null;

  /** Stores the cities and states data from the API */
  private citiesStateData: { data: CityState[] } = { data: [] };

  isCanada = false;

  constructor() {
    // Subscribe to search control changes for auto-save
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // Short debounce for search input
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        if (value) {
          this.onSearchValueChange(value);
        }
      });
  }

  ngOnInit(): void {
    this.getAllCitiesState();
  }

  ngAfterViewInit(): void {
    const draft = this.installationDraft.getDraftState()();

    if (draft.createHost?.searchHostPlace) {
      const searchHostPlace = draft.createHost.searchHostPlace;

      // Restore the selected place data
      this.selectedPlace.set(searchHostPlace);

      // Set the search control value to trigger the search
      this.searchControl.setValue(searchHostPlace.name, { emitEvent: false });

      // Set the search keyword signal for the button click
      this.searchKeyword.set(searchHostPlace.name);

      // Set the searchbar input value directly
      if (this.searchbarRef) {
        this.searchbarRef.searchValue.set(searchHostPlace.name);
      }

      // Trigger the button click to populate search results
      this.onButtonClick();

      // Re-pin the location on the map when returning to this step
      this.pinLocationOnMap(searchHostPlace.value, searchHostPlace.name);
    }
  }

  /**
   * Pins a location on the map using geocoding
   * @param address - The address to geocode and pin
   * @param title - The title for the marker
   */
  private pinLocationOnMap(address: string, title: string): void {
    if (!address) {
      console.warn('Invalid address provided');
      return;
    }

    if (!this.mapInstance) {
      // Store the location data to pin when map becomes ready
      this.pendingLocationPin = { address, title };
      console.log('Map not ready, storing location for later pinning');
      return;
    }

    // Use Google Geocoding service to get coordinates from address
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;

        // Remove existing marker if any
        if (this.redPinMarker) {
          this.redPinMarker.setMap(null);
        }

        // Create new marker at the geocoded location
        this.redPinMarker = new google.maps.Marker({
          position: location,
          map: this.mapInstance,
          title: title || 'Selected Location',
        });

        // Update display coordinates
        this.display = location.toJSON();

        // Center the map on the selected location
        if (this.mapInstance) {
          this.mapInstance.setCenter(location);
          this.mapInstance.setZoom(20); // Zoom in to show the location clearly
        }
      } else {
        console.error('Geocoding failed:', status);
      }
    });
  }

  /**
   * Clears the map pin and resets the map to default view
   */
  private clearMapPin(): void {
    // Remove existing marker if any
    if (this.redPinMarker) {
      this.redPinMarker.setMap(null);
      this.redPinMarker = null;
    }

    // Reset map to default center and zoom
    if (this.mapInstance) {
      this.mapInstance.setCenter(this.center);
      this.mapInstance.setZoom(this.zoom);
    }

    // Reset display coordinates
    this.display = { ...this.center };

    // Clear any pending location pin
    this.pendingLocationPin = null;
  }

  /**
   * Angular lifecycle hook called when the component is destroyed
   * Cleans up subscriptions to prevent memory leaks
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Adds a marker to the map at the specified location
   * Removes any existing marker before adding the new one
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
   * Handles map initialization event to store map reference
   * Called when the Google Map component is ready for use
   * @param event - Map initialization event containing the Google Maps instance
   */
  public onMapReady(event: google.maps.Map): void {
    // Store map reference for marker creation
    this.mapInstance = event;

    // If there's a pending location to pin, do it now that the map is ready
    if (this.pendingLocationPin) {
      this.pinLocationOnMap(
        this.pendingLocationPin.address,
        this.pendingLocationPin.title
      );
      this.pendingLocationPin = null;
    }
  }

  /**
   * Handles selection of a location from the search results
   * Geocodes the selected address and pins it on the map with a marker
   * @param event - Selected location event containing title and description
   */
  public selectedValue(event: SearchResultData): void {
    this.getStoreHours(event.id);
    this.splitLocationAddress(event.description);

    console.log(event, 'babababba');

    if (event && event.description) {
      // Save selected place data and trigger auto-save
      const selectedPlaceData = {
        name: event.title || 'Selected Location',
        value: event.description,
        id: event.id.toString(),
      };

      this.selectedPlace.set(selectedPlaceData);

      // Update installation flow state with selected place
      this.installationDraft.updateStepState('createHost', {
        searchHostPlace: selectedPlaceData,
      });

      // Pin the location on the map
      this.pinLocationOnMap(
        event.description,
        event.title || 'Selected Location'
      );

      // Log the current draft state
      console.log(
        'Draft state after place selection:',
        this.installationDraft.getDraftState()()
      );
    } else {
      console.warn('Invalid event data:', event);
    }
  }

  /**
   * Handles search button click event
   * Makes API call to get Google business profile data based on search query
   * Updates the data array with search results for the searchbar component
   */
  public onButtonClick(): void {
    const searchQuery = this.searchKeyword();
    let country = 'United States';

    if (this.isCanada) country = 'Canada';

    if (!searchQuery.trim()) {
      console.warn('Search query is empty');
      return;
    }

    this.isLoading.set(true);

    this.fastedgeService
      .get_google_business_profile(searchQuery + ', ' + country)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(response, 'uhu');
          if (response?.google_search && response.google_search.length > 0) {
            // Map the API response to the data array structure

            const mappedResults: SearchResultData[] =
              response.google_search.map((item: any): SearchResultData => {
                return {
                  id: item.placeId,
                  title: item.title,
                  description: item.address,
                  additionalData: {
                    type: item.type,
                    thumbnail: item.thumbnail,
                    latitude: item.latitude,
                    longitude: item.longitude,
                  },
                };
              });

            // Replace data array with new results
            this.data = mappedResults;

            // Note: Map will only center when user selects a specific result
          } else {
            this.searchResults.set([]);
            // Clear data array when no results
            this.data = [];
          }

          this.isLoading.set(false);
        },
        error: (error: Error) => {
          console.error('Error searching places:', error);
          this.searchResults.set([]);
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Handles search input value changes
   * Updates the search keyword signal with the new value
   * @param value - The new search input value
   */
  public onSearchValueChange(value: string): void {
    this.searchKeyword.set(value);

    // Save search keyword to installation flow state (including empty values)
    if (value.trim()) {
      this.installationDraft.updateStepState('createHost', {
        searchHostPlace: {
          ...this.selectedPlace(),
          name: value,
          value: value,
          id: 'search-' + Date.now().toString(),
        },
      });
    } else {
      // Remove the search host place property when input is empty
      this.installationDraft.removeStepProperty(
        'createHost',
        'searchHostPlace'
      );
      this.selectedPlace.set(null);

      // Clear the map pin when input is empty
      this.clearMapPin();
    }

    // Log the current draft state
    console.log(
      'Draft state after search input:',
      this.installationDraft.getDraftState()()
    );
  }

  /**
   * Retrieves store hours information for a given place ID.
   *
   * @private
   * @param {string} placeId - The unique identifier for the place whose store hours are being requested.
   * @returns {void}
   *
   * @remarks
   * This method makes an HTTP request to fetch store hours using the installationAPI service.
   * It logs the response or errors to the console.
   */
  private getStoreHours(placeId: string): void {
    this.installationAPI.getStoreHoursInfo(placeId).subscribe({
      next: (response: any) => {
        console.log(response, 'uhu');
      },
      error: (error: Error) => {
        console.error('Error getting store hours:', error);
      },
    });
  }

  /**
   * Splits a full address string into its components: street address, city, state, and ZIP code.
   * Now includes improved city search functionality.
   *
   * @private
   * @param {string} address - The full address string (expected format: "Street, City, State ZIP").
   * @example
   * // For US address:
   * splitLocationAddress("123 Main St, Toronto, ON M5H 2N2")
   *
   * // Returns:
   * {
   *   address: "123 Main St",
   *   city: "Toronto",
   *   state: "ON",
   *   zip: "M5H2N2",
   *   isCanada: true,
   *   cityData: CityState | undefined
   * }
   *
   * @remarks
   * Assumes that Canadian ZIP codes have a space and require concatenation,
   * whereas other addresses (e.g., US) may have simpler format.
   * Now includes improved city search to find matching city data.
   */
  private splitLocationAddress(address: string) {
    const sliced_address = address.split(', ');
    const isCanada = address.includes('Canada');
    const [addressPart, city, stateZip] = sliced_address;
    const zipState = stateZip.split(' ');
    const state = zipState[0];
    const zip = isCanada ? `${zipState[1]}${zipState[2]}` : zipState[1];

    // Use the improved city search functionality
    const cityData = this.findCityData({ city, state });

    const result = {
      address: addressPart,
      city: city,
      state: state,
      zip: zip,
      isCanada: isCanada,
      cityData: cityData,
    };

    console.log('Address parsing result:', result);

    if (cityData) {
      console.log('Found matching city data:', {
        id: cityData.id,
        city: cityData.city,
        state: cityData.state,
        abbreviation: cityData.abbreviation,
        country: cityData.country,
      });
    } else {
      console.warn('No matching city data found for:', { city, state });
    }

    return result;
  }

  /**
   * Fetches a list of all cities and states from the backend service.
   *
   * @private
   * @returns {void}
   *
   * @remarks
   * This method calls the `installationAPI.getAllCitiesState()` method, subscribes to the result,
   * and stores the response for city search functionality.
   */
  private getAllCitiesState(): void {
    this.installationAPI.getAllCitiesState().subscribe({
      next: (response: CityState[]) => {
        this.citiesStateData = { data: response };
        console.log(response, 'all cities state');
      },
      error: (error: Error) => {
        console.error('Error getting cities state:', error);
      },
    });
  }

  /**
   * Improved city search functionality that efficiently finds matching cities
   * with better performance and cleaner logic.
   *
   * @private
   * @param {object} data - Object containing city and state information
   * @param {string} data.city - The city name to search for
   * @param {string} data.state - The state abbreviation to match
   * @returns {CityState | undefined} The matched city data or undefined if not found
   *
   * @remarks
   * This method implements optimized search logic:
   * 1. Uses case-insensitive comparison for better matching
   * 2. Tries multiple matching strategies in order of specificity
   * 3. Falls back to state abbreviation matching for disambiguation
   * 4. Uses early return for better performance
   */
  private findCityData(data: {
    city: string;
    state: string;
  }): CityState | undefined {
    if (!this.citiesStateData.data.length || !data.city) {
      return undefined;
    }

    const cityLower = data.city.toLowerCase().trim();
    const stateLower = data.state?.toLowerCase().trim();

    // Strategy 1: Find exact city name matches
    const exactMatches = this.citiesStateData.data.filter(
      (cityData) => cityData.city.toLowerCase() === cityLower
    );

    console.log(exactMatches, 'exact');

    // If only one exact match, return it
    if (exactMatches.length === 1) {
      return exactMatches[0];
    }

    // Strategy 2: If multiple matches, try to disambiguate by state
    if (exactMatches.length > 1 && stateLower) {
      const stateMatch = exactMatches.find(
        (city) => city.abbreviation.toLowerCase() === stateLower
      );
      if (stateMatch) {
        return stateMatch;
      }
    }

    // Strategy 3: Try "City, State" format matching
    const cityStateFormats = [
      `${cityLower}, ${stateLower}`,
      `${cityLower},${stateLower}`, // Without space
    ];

    for (const format of cityStateFormats) {
      const formatMatch = this.citiesStateData.data.find(
        (cityData) =>
          `${cityData.city.toLowerCase()}, ${cityData.state.toLowerCase()}` ===
            format ||
          `${cityData.city.toLowerCase()},${cityData.state.toLowerCase()}` ===
            format
      );
      if (formatMatch) {
        return formatMatch;
      }
    }

    // Strategy 4: Fallback to first exact city match if no state disambiguation worked
    if (exactMatches.length > 0) {
      return exactMatches[0];
    }

    // No match found
    return undefined;
  }

  /**
   * Fetches a list of all categories from the backend service.
   *
   * @private
   * @returns {void}
   *
   * @remarks
   * This method calls the `installationAPI.getCategoryGeneral()` method, subscribes to the result,
   * and stores the response for category search functionality.
   */
  private getAllCategories(category: string): void {
    this.installationAPI.getCategoryGeneral(category).subscribe({
      next: (response: any[]) => {
        console.log(response, 'categories');
      },
      error: (error: Error) => {
        console.error('Error getting categories:', error);
      },
    });
  }
}
