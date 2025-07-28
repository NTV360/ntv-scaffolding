import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class HostInstallationApiService extends BaseService {
  get_google_business_profile(data: string): Observable<any> {
    let key = 'kIwFkm6nVF5qYvAQfYKjB6h516yA918w5m1COWZA';

    return this.getRequest(`${environment.fastedge}${data}`, {
      'x-api-key': key,
    });
  }
}
