

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/**
 * @description  Componente que permite gestionar usuarios dentro del panel de administración.
 * Muestra una tabla con la lista de usuarios, con opciones para editar o eliminar.
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
   /**
   * Lista de usuarios disponibles en el sistema.
   */
  usuarios: Usuario[] = [];
  usuarioActivo: Usuario | null = null;
  usuarioEditando: Usuario | null = null;
  indexEditando: number | null = null;
  indexParaEliminar: number | null = null;

  constructor(private router: Router) {}
  /**
   * Inicializa el componente y verifica si el usuario activo es un administrador.
   * Si no es administrador, redirige al login.
   */
  ngOnInit(): void {
    this.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || 'null');

    if (!this.usuarioActivo || this.usuarioActivo.rol !== 'admin') {
      alert('Acceso denegado. Solo administradores pueden ingresar.');
      this.router.navigate(['/login']);
      return;
    }

    this.cargarUsuarios();
  }
  /**
   * Carga la lista de usuarios desde el localStorage.
   * Si no hay usuarios, inicializa con un array vacío.
   */
  cargarUsuarios() {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }
  /**
   * Abre el modal de edición para el usuario en la posición indicada.
   * @param index Índice del usuario dentro del array `usuarios`
   */
  abrirEditar(index: number) {
    this.indexEditando = index;
    this.usuarioEditando = { ...this.usuarios[index] };
  }
    /**
   * Guarda los cambios realizados en el usuario editado y actualiza la lista.
   */
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
  /**
   * Abre el modal de confirmación para eliminar un usuario.
   * @param index Índice del usuario a eliminar
   */
  abrirEliminar(index: number) {
    this.indexParaEliminar = index;
  }
  /**
   * Confirma la eliminación del usuario seleccionado.
   * Si el usuario eliminado es el activo, redirige al login.
   */
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