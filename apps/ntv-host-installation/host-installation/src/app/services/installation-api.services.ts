import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import { API_ENDPOINTS } from '../../environments';
import { StoreHoursInfo, CityState } from '../interfaces';

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class InstallationApi extends BaseService {
  /**
   * Retrieves store hours information for a given Google Place ID.
   *
   * @param placeId - The unique identifier for the place from the Google Places API.
   * @returns An observable that emits the `StoreHoursInfo` for the specified place.
   */
  getStoreHoursInfo(placeId: string): Observable<StoreHoursInfo> {
    return this.getRequest<ApiResponse<StoreHoursInfo>>(
      `${API_ENDPOINTS.get_google_store_hours}${placeId}`
    ).pipe(map((d) => d.data));
  }

  /**
   * Fetches a list of cities and their corresponding states.
   *
   * @returns An observable that emits an array of `CityState` objects.
   * Each object contains information about a city and its associated state.
   */
  getCitiesState(): Observable<CityState[]> {
    return this.getRequest<ApiResponse<CityState[]>>(
      `${API_ENDPOINTS.get_all_cities_state}`
    ).pipe(map((d) => d.data));
  }
}
