import { Routes } from '@angular/router';

import { Publico } from './layouts/publico/publico';
import { Cliente} from './layouts/cliente/cliente';
import { Admin } from './layouts/admin/admin';


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
      { path: 'inicio', component: InicioClienteComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'carrito', component: CarritoComponent }
    ]
  },
 {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'admin', component: AdminComponent }
    ] 
  },
  // Fallback
  { path: '**', redirectTo: '' }
];

