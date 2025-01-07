import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaCompra } from '../models/formacompra';
import { Observable } from 'rxjs';
import { environment } from '../../../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaCompraService {

  controllerName: string = "FormaCompra";
  urlFull: string = `${environment.apiUrl}/${this.controllerName}`;

  constructor(
    private httpClient: HttpClient   
  ) { }

  add(data: FormaCompra): Observable<any> {
    return this.httpClient.post(this.urlFull, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.urlFull}/${id}`, data);
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.urlFull);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.urlFull}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.urlFull}/${id}`);
  }
}
