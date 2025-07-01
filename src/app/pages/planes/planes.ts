import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
   * @description Componente que muestras los planes del gym.
   */
@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.html',
  styleUrls: ['./planes.css']
})
export class PlanesComponent {
  agregarAlCarrito(nombre: string, precio: number) {
    alert(`Agregado: ${nombre} - $${precio.toLocaleString('es-CL')}`);
  }
}