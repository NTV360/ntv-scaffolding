import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { GoogleBusinessProfileResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Fastedge extends BaseService {
  /**
   * Searches for Google Places using the FastEdge API
   *
   * @param data - The place search query (e.g., "Jolli, United States")
   * @returns Observable<any> - An observable containing Google Places search results with business information
   *
   * @example
   * ```typescript
   * this.fastedgeService.get_google_business_profile('Jolli, United States')
   *   .subscribe(results => {
   *     console.log('Places found:', results.google_search);
   *     // Each result contains: placeId, title, type, address, thumbnail, latitude, longitude
   *   });
   * ```
   *
   * @description
   * This method makes a GET request to the FastEdge API endpoint:
   * `https://fastedgeapidev.n-compass.online/nc/googleapi/searchplaces?place={data}`
   *
   * The response includes an array of places with detailed information including:
   * - placeId: Google Place ID
   * - title: Business name
   * - type: Business category
   * - address: Full address
   * - thumbnail: Business image URL
   * - latitude/longitude: Geographic coordinates
   */
  public get_google_business_profile(
    data: string
  ): Observable<GoogleBusinessProfileResponse> {
    const key = 'kIwFkm6nVF5qYvAQfYKjB6h516yA918w5m1COWZA';

    return this.getRequest(
      `${this.fastEdgeUrl}${data}`,
      {
        'x-api-key': key,
      },
      false,
      true
    );
  }
}
