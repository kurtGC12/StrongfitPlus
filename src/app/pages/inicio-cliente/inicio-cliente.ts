import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


/**
 * @description Componente de bienvenida para usuarios con rol cliente.
 * Muestra contenido informativo y acceso a las funcionalidades principales del sistema.
 */

@Component({
  selector: 'app-inicio-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-cliente.html',
  styleUrls: ['./inicio-cliente.css']
})
export class InicioClienteComponent implements OnInit {
  nombre: string = '';
  usuario: string = '';

  constructor(private router: Router) {}
  /**
   * @description Inicializa el componente verificando si el usuario está logueado.
   * Si no está logueado, redirige al login.
   */
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('usuarioActivo') || 'null');

    if (!user || !user.logueado) {
      alert('Debes iniciar sesión.');
      this.router.navigate(['/login']);
      return;
    }

    this.nombre = user.nombre;
    this.usuario = user.usuario;
  }
  /**
   * @description Cierra la sesión del usuario y redirige al login.
   */
  cerrarSesion(): void {
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['/login']);
  }
}