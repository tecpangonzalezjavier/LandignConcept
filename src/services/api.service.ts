import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand} from "../app/brand/brand.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://eland-dk.humaneland.net/Examen/AngularApi';

  constructor(private http: HttpClient) { }

  getBrands(idMenu: number): Observable<{ error: boolean, codigo: string, menuItems: Brand[] }> {
    const url = `${this.baseUrl}/Marcas?idMenu=${idMenu}`;
    return this.http.get<{ error: boolean, codigo: string, menuItems: Brand[] }>(url);
  }

  get<T>(url: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    // Si hay parámetros, agregarlos a HttpParams
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    // Realiza la solicitud HTTP GET y devuelve un Observable
    return this.http.get<T>(url, { params: httpParams });
  }

  // Puedes agregar otros métodos como post, put, delete, etc.
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
