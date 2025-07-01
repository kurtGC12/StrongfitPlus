import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente',
  imports: [RouterModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente {
 nombreUsuario = localStorage.getItem('nombre') || 'Usuario';

}
