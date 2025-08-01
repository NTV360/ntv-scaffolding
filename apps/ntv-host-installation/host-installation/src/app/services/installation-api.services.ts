import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import { API_ENDPOINTS } from '../../environments';
import { StoreHoursInfo, CityState } from '../interfaces';

interface ApiResponse<T> {
  data: T;
}

interface CategoryInfo {
  categoryId: string;
  gcid: string;
  category: string;
  generalCategory: string;
}

@Injectable({
  providedIn: 'root',
})
export class HostInstallationApi extends BaseService {
  /**
   * Retrieves store hours information for a given Google Place ID.
   *
   * @param placeId - The unique identifier for the place from the Google Places API.
   * @returns An observable that emits the `StoreHoursInfo` for the specified place.
   */
  public getStoreHoursInfo(placeId: string): Observable<StoreHoursInfo> {
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
  public getAllCitiesState(page = 1, search = ''): Observable<CityState[]> {
    return this.getRequest<ApiResponse<CityState[]>>(
      `${API_ENDPOINTS.get_all_cities_state}?pageSize=31515&search=${search}&page=${page}`
    ).pipe(map((d) => d.data));
  }

  /**
   * Fetches a list of general categories from the API.
   *
   * @returns An Observable emitting an array of `CategoryInfo` objects.
   */
  public getCategoryGeneral(category: string): Observable<CategoryInfo[]> {
    return this.getRequest<ApiResponse<CategoryInfo[]>>(
      `${API_ENDPOINTS.get_category_general}${category}`
    ).pipe(map((d) => d.data));
  }
}
