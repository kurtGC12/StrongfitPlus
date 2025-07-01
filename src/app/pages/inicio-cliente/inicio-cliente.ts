import { Component, OnInit } from '@angular/core';


/**
 * @description Componente de bienvenida para usuarios con rol cliente.
 * Muestra contenido informativo y acceso a las funcionalidades principales del sistema.
 */
@Component({
  selector: 'app-inicio-cliente',
  imports: [],
  templateUrl: './inicio-cliente.html',
  styleUrl: './inicio-cliente.css'
})


export class InicioClienteComponent implements OnInit {
  nombreUsuario = 'Cristóbal'; // 

  ngOnInit(): void {

  }
}