import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand} from "../app/brand/brand.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://eland-dk.humaneland.net/Examen/AngularApi/';

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: any): Observable<T> {
    let fullUrl = this.baseUrl + url;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    if (httpParams.toString()) {
      fullUrl = `${fullUrl}?${httpParams.toString()}`;
    }

    return this.http.get<T>(fullUrl);
  }

  post<T>(url: string, body: any, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.post<T>(url, body, { params: httpParams });
  }

  put<T>(url: string, body: any, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.put<T>(url, body, { params: httpParams });
  }

  delete<T>(url: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.delete<T>(url, { params: httpParams });
  }
}
