import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Servicio {
  usuarioLogueado: any = null;

  setUsuario(data: any) {
    this.usuarioLogueado = data;
  }

  getUsuario() {
    return this.usuarioLogueado;
  }
}