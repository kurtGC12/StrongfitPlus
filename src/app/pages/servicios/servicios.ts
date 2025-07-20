import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * @description Componente que muestra los servicios disponibles en la aplicación.
 * Permite a los usuarios explorar y acceder a diferentes servicios ofrecidos.
 */
@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class ServiciosComponent {}