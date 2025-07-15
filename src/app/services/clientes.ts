import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientesGym } from '../models/clientes.js';

@Injectable({ providedIn: 'root' })
export class ClienteService {

   // URL base del archivo JSON donde se encuentran los datos de los clientes
  private apiUrl = 'https://kurtgc12.github.io/json-api/clientes.json;' 


  constructor(private http: HttpClient) {}

  
  /**
   * Obtiene la lista completa de clientes desde el archivo JSON.
   * @returns Un observable con un array de objetos ClientesGym.
   */
  getClientes(): Observable<ClientesGym[]> {
    return this.http.get<ClientesGym[]>(this.apiUrl);
  }
  /**
   * Obtiene la lista completa de clientes  en base a su id desde el archivo JSON
   * @returns Un observable con un array de objetos ClientesGym.
   */
  getCliente(id: number): Observable<ClientesGym> {
    return this.http.get<ClientesGym>(`${this.apiUrl}/${id}`);
  }
 /**
   * Agrega un nuevo cliente al sistema.
   * @param cliente - Objeto cliente que se desea agregar.
   * @returns Un observable con el cliente agregado.
   */
  addCliente(cliente: ClientesGym): Observable<ClientesGym> {
    return this.http.post<ClientesGym>(this.apiUrl, cliente);
  }
 /**
   * Actualiza los datos de un cliente existente.
   * @param cliente - Objeto cliente con los datos actualizados.
   * @returns Un observable con el cliente actualizado.
   */
  updateCliente(cliente: ClientesGym): Observable<ClientesGym> {
    return this.http.put<ClientesGym>(`${this.apiUrl}/${cliente.id}`, cliente);
  }
  /**
   * Elimina un cliente del sistema usando su ID.
   * @param id - ID del cliente a eliminar.
   * @returns Un observable con la respuesta del servidor.
   */
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
