import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from '../models/livro';
import { Observable } from 'rxjs';
import { environment } from '../../../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  controllerName: string = "Livro";
  urlFull: string = `${environment.apiUrl}/${this.controllerName}`;

  constructor(
    private httpClient: HttpClient   
  ) { }

  add(data: Livro): Observable<any> {    
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
