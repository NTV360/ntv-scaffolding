import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private http = inject(HttpClient);

  /**
   * Generic GET request method
   * @param url - The complete URL for the request
   * @param headers - Optional headers object
   * @param withCredentials - Whether to include credentials
   * @param retryOnError - Whether to retry on error
   * @param suppressErrorHandling - Whether to suppress default error handling
   * @returns Observable of the response
   */
  protected getRequest<T>(
    url: string,
    headers: { [key: string]: string } = {},
    withCredentials = false
  ): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders(headers),
      withCredentials,
    };

    const request = this.http.get<T>(url, httpOptions);

    return request;
  }

  /**
   * Generic POST request method
   * @param url - The complete URL for the request
   * @param body - The request body
   * @param headers - Optional headers object
   * @param withCredentials - Whether to include credentials
   * @returns Observable of the response
   */
  protected postRequest<T>(
    url: string,
    body: unknown,
    headers: { [key: string]: string } = {},
    withCredentials = false
  ): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...headers,
      }),
      withCredentials,
    };

    return this.http
      .post<T>(url, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic PUT request method
   * @param url - The complete URL for the request
   * @param body - The request body
   * @param headers - Optional headers object
   * @param withCredentials - Whether to include credentials
   * @returns Observable of the response
   */
  protected putRequest<T>(
    url: string,
    body: unknown,
    headers: { [key: string]: string } = {},
    withCredentials = false
  ): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...headers,
      }),
      withCredentials,
    };

    return this.http
      .put<T>(url, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic DELETE request method
   * @param url - The complete URL for the request
   * @param headers - Optional headers object
   * @param withCredentials - Whether to include credentials
   * @returns Observable of the response
   */
  protected deleteRequest<T>(
    url: string,
    headers: { [key: string]: string } = {},
    withCredentials = false
  ): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders(headers),
      withCredentials,
    };

    return this.http
      .delete<T>(url, httpOptions)
      .pipe(catchError(this.handleError));
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
