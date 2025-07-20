import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
/**
 * @description Componente que sirve como layout para el cliente.
 * Contiene la estructura básica y las rutas del cliente.
 */
@Component({
  selector: 'app-cliente',
  imports: [RouterModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente {
 nombreUsuario = localStorage.getItem('nombre') || 'Usuario';

}
