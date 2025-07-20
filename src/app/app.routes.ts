import { Routes } from '@angular/router';

import { Publico } from './layouts/publico/publico';
import { Cliente} from './layouts/cliente/cliente';
import { AdminPanel } from './layouts/admin-panel/admin-panel';


import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { RecuperarComponent } from './pages/recuperar/recuperar';
import { InicioClienteComponent } from './pages/inicio-cliente/inicio-cliente';
import { PerfilComponent } from './pages/perfil/perfil';
import { PlanesComponent } from './pages/planes/planes';
import { CarritoComponent } from './pages/carrito/carrito';
import { AdminComponent } from './pages/admin/admin';
import { ServiciosComponent } from './pages/servicios/servicios';
import {  ClienteFormComponent } from './pages/clientes-gym/clientes-gym';


export const routes: Routes = [
  {
    path: '',
    component: Publico,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'planes', component: PlanesComponent },
      { path: 'recuperar', component: RecuperarComponent },
      {path: 'servicios', component: ServiciosComponent}
    ]
  },
  {
    path: 'inicio',
    component: Cliente,
    children: [
      { path: 'iniciocliente', component: InicioClienteComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'carrito', component: CarritoComponent }
    ]
  },
 {
    path: 'adminPanel',
    component: AdminPanel,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'clientes', component: ClienteFormComponent }
    ] 
  },
  // Fallback
  { path: '**', redirectTo: '' }
];

