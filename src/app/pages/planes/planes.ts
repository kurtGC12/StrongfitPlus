import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

/**
 * @description Componente que muestra los planes del gym.
 */
@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.html',
  styleUrls: ['./planes.css']
})
export class PlanesComponent implements AfterViewInit {
  /**
   * @description Inicializa las animaciones de AOS (Animate On Scroll).
   * @returns {void}
   */
  ngAfterViewInit(): void {
    AOS.init(); // Inicializa animaciones
  }
  /**
   * @description Agrega un plan al carrito de compras.
   * @param nombre - Nombre del plan.
   * @param precio - Precio del plan.
   */
  agregarAlCarrito(nombre: string, precio: number) {
    alert(`Agregado: ${nombre} - $${precio.toLocaleString('es-CL')}`);
  }
}