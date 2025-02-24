import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/api/v1/brands`);
  }

  getBrandsPaginated(page: number, limit: number): Observable<any> {
    return this.httpClient.get(
      `${environments.baseUrl}/api/v1/brands?page=${page}&limit=${limit}`
    );
  }
}
