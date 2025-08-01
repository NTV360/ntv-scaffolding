import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment, API_ENDPOINTS } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private http = inject(HttpClient);
  protected baseUrl = environment.base_uri;
  protected fastEdgeUrl = environment.fastedge;
  protected apiEndpoints = API_ENDPOINTS;

  protected headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      credentials: 'include',
      Accept: 'application/json',
    }),
    withCredentials: true,
  };

  protected applicationOnlyHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: false,
  };

  /**
   * Generic GET request method
   * @param endpoint - The API endpoint (will be appended to base URL unless plain is true)
   * @param options - Optional options object
   * @param isApplicationRequestOnly - Whether to use application-only headers (no credentials)
   * @param plain - Whether to use the endpoint as-is without prepending base URL (default: false)
   * @returns Observable of the response
   */
  protected getRequest<T>(
    endpoint: string,
    options: any = null,
    isApplicationRequestOnly = false,
    plain = false
  ): Observable<T> {
    const baseOptions = isApplicationRequestOnly ? this.applicationOnlyHeaders : this.headers;
    
    if (plain) return this.http.get<T>(endpoint);
    
    let headers = baseOptions.headers;
    if (options) {
      // Add new headers from options
      Object.keys(options).forEach(key => {
        headers = headers.set(key, options[key]);
      });
    }
    
    const httpOptions = {
      headers,
      withCredentials: baseOptions.withCredentials || false
    };
    
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<T>(url, httpOptions).pipe(catchError(this.handleError));
  }

  /**
   * Generic POST request method
   * @param endpoint - The API endpoint (will be appended to base URL unless plain is true)
   * @param body - The request body
   * @param options - Optional options object
   * @param isApplicationRequestOnly - Whether to use application-only headers (no credentials)
   * @param plain - Whether to use the endpoint as-is without prepending base URL (default: false)
   * @returns Observable of the response
   */
  protected postRequest<T>(
    endpoint: string,
    body: unknown,
    options: any = null,
    isApplicationRequestOnly = false,
    plain = false
  ): Observable<T> {
    const baseOptions = !isApplicationRequestOnly ? this.headers : this.applicationOnlyHeaders;
    
    let headers = baseOptions.headers;
    if (options) {
      // Add new headers from options
      Object.keys(options).forEach(key => {
        headers = headers.set(key, options[key]);
      });
    }
    
    const httpOptions = {
      headers,
      withCredentials: baseOptions.withCredentials || false
    };
    
    const url = plain ? endpoint : `${this.baseUrl}${endpoint}`;
    return this.http
      .post<T>(url, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic PUT request method
   * @param endpoint - The API endpoint (will be appended to base URL unless plain is true)
   * @param body - The request body
   * @param options - Optional options object
   * @param isApplicationRequestOnly - Whether to use application-only headers (no credentials)
   * @param plain - Whether to use the endpoint as-is without prepending base URL (default: false)
   * @returns Observable of the response
   */
  protected putRequest<T>(
    endpoint: string,
    body: unknown,
    options: any = null,
    isApplicationRequestOnly = false,
    plain = false
  ): Observable<T> {
    const baseOptions = !isApplicationRequestOnly ? this.headers : this.applicationOnlyHeaders;
    
    let headers = baseOptions.headers;
    if (options) {
      // Add new headers from options
      Object.keys(options).forEach(key => {
        headers = headers.set(key, options[key]);
      });
    }
    
    const httpOptions = {
      headers,
      withCredentials: baseOptions.withCredentials || false
    };
    
    const url = plain ? endpoint : `${this.baseUrl}${endpoint}`;
    return this.http
      .put<T>(url, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic DELETE request method
   * @param endpoint - The API endpoint (will be appended to base URL unless plain is true)
   * @param options - Optional options object
   * @param isApplicationRequestOnly - Whether to use application-only headers (no credentials)
   * @param plain - Whether to use the endpoint as-is without prepending base URL (default: false)
   * @returns Observable of the response
   */
  protected deleteRequest<T>(
    endpoint: string,
    options: any = null,
    isApplicationRequestOnly = false,
    plain = false
  ): Observable<T> {
    const baseOptions = !isApplicationRequestOnly ? this.headers : this.applicationOnlyHeaders;
    
    let headers = baseOptions.headers;
    if (options) {
      // Add new headers from options
      Object.keys(options).forEach(key => {
        headers = headers.set(key, options[key]);
      });
    }
    
    const httpOptions = {
      headers,
      withCredentials: baseOptions.withCredentials || false
    };
    
    const url = plain ? endpoint : `${this.baseUrl}${endpoint}`;
    return this.http.delete<T>(url, httpOptions).pipe(catchError(this.handleError));
  }



  /**
   * Check if the application is running in production mode
   * @returns boolean indicating if in production
   */
  protected isProduction(): boolean {
    return environment.production;
  }

  /**
   * Handle HTTP errors
   * @param error - The HTTP error response
   * @returns Observable that throws an error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
