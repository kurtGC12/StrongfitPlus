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

  ngAfterViewInit(): void {
    AOS.init(); // Inicializa animaciones
  }

  agregarAlCarrito(nombre: string, precio: number) {
    alert(`Agregado: ${nombre} - $${precio.toLocaleString('es-CL')}`);
  }
}