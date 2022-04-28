import { environment } from '../../../environments/environment';
import { Brands } from '../../core/models/brands';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { max, Observable } from 'rxjs';

@Injectable()
export class BrandsService {
  private readonly brandsPath: string = '/brands';

  constructor(private _http: HttpClient) {}

  get(): Observable<Brands[]> {
    return this._http.get<Brands[]>(
      `${environment.apiBaseUrl}${this.brandsPath}`
    );
  }

  getById(id: number): Observable<Brands> {
    return this._http.get<Brands>(
      `${environment.apiBaseUrl}${this.brandsPath}/${id}`
    );
  }

  create(brands: Brands): Observable<string> {
    return this._http.post<string>(
      `${environment.apiBaseUrl}${this.brandsPath}`,
      brands
    );
  }

  update(brands: Brands): Observable<string> {
    return this._http.put<string>(
      `${environment.apiBaseUrl}${this.brandsPath}/${brands.id}`,
      brands
    );
  }

  delete(id: number): Observable<string> {
    return this._http.delete<string>(
      `${environment.apiBaseUrl}${this.brandsPath}/${id}`
    );
  }
}
