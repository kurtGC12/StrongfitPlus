

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @description Componente para la vista de administrador.
 * Permite visualizar y gestionar funciones administrativas del sistema.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  
})
export class AdminComponent implements OnInit {
  usuarios = [
    {
      id: 1,
      nombre: 'Cristóbal Valenzuela',
      usuario: 'cvalenzuela',
      correo: 'cristobal@example.com',
      fechaNacimiento: '1990-01-01',
      rol: 'cliente'
    },
    {
      id: 2,
      nombre: 'Administrador',
      usuario: 'admin',
      correo: 'admin@strongfit.cl',
      fechaNacimiento: '1992-05-21',
      rol: 'admin'
    }
  ];

  ngOnInit(): void {

  }

  eliminar(id: number) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
  }
}
