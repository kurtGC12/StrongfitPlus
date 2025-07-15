import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  
})
export class HomeComponent implements OnInit {

  /**
   * @description Inicializa el componente Home. Carga el nombre del usuario para mostrarlo en la vista.
   * @returns {void}
   */
  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    const span = document.getElementById('nombreBienvenida');
    if (span && usuario?.nombre) {
      span.textContent = usuario.nombre;
    }
  }

   /**
   * @description Inicializa la animaciones de AOS (Animate On Scroll).
   * @returns {void}

   */
  ngAfterViewInit(): void {
      AOS.init(); // Inicializa animaciones
    }
}
