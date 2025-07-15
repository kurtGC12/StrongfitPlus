import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientesGym } from '../models/clientes.js';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'https://kurtgc12.github.io/json-api/clientes.json;' 

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ClientesGym[]> {
    return this.http.get<ClientesGym[]>(this.apiUrl);
  }

  getCliente(id: number): Observable<ClientesGym> {
    return this.http.get<ClientesGym>(`${this.apiUrl}/${id}`);
  }

  addCliente(cliente: ClientesGym): Observable<ClientesGym> {
    return this.http.post<ClientesGym>(this.apiUrl, cliente);
  }

  updateCliente(cliente: ClientesGym): Observable<ClientesGym> {
    return this.http.put<ClientesGym>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
