

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/**
 * @description Componente para la vista de administrador.
 * Permite visualizar y gestionar funciones administrativas del sistema.
 */


interface Usuario {
  nombre: string;
  usuario: string;
  email: string;
  fechaNacimiento: string;
  rol: string;
  logueado?: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
    imports: [CommonModule, FormsModule]
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioActivo: Usuario | null = null;
  usuarioEditando: Usuario | null = null;
  indexEditando: number | null = null;
  indexParaEliminar: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || 'null');

    if (!this.usuarioActivo || this.usuarioActivo.rol !== 'admin') {
      alert('Acceso denegado. Solo administradores pueden ingresar.');
      this.router.navigate(['/login']);
      return;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  abrirEditar(index: number) {
    this.indexEditando = index;
    this.usuarioEditando = { ...this.usuarios[index] };
  }

  guardarEdicion() {
    if (this.indexEditando !== null && this.usuarioEditando) {
      this.usuarios[this.indexEditando] = this.usuarioEditando;
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

      if (this.usuarioEditando.email === this.usuarioActivo?.email) {
        localStorage.setItem('usuarioActivo', JSON.stringify(this.usuarioEditando));
      }

      this.usuarioEditando = null;
      this.indexEditando = null;
      alert('Usuario actualizado correctamente.');
    }
  }

  abrirEliminar(index: number) {
    this.indexParaEliminar = index;
  }

  confirmarEliminar() {
    if (this.indexParaEliminar !== null) {
      const eliminado = this.usuarios.splice(this.indexParaEliminar, 1)[0];
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

      if (eliminado.email === this.usuarioActivo?.email) {
        alert('Tu cuenta ha sido eliminada.');
        localStorage.removeItem('usuarioActivo');
        this.router.navigate(['/login']);
        return;
      }

      this.indexParaEliminar = null;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['/login']);
  }
}