import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
/**
 * @description Componente de login para usuarios.
 * Permite a los usuarios iniciar sesión con su correo y contraseña.
 * Si el usuario es administrador, redirige al panel de administración.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form: any;
  loginForm: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.crearAdminPorDefecto();
  }

  // Crear usuario admin si no existe
  crearAdminPorDefecto() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const existeAdmin = usuarios.some((user: any) => user.email === 'admin@strongfit.cl');

    if (!existeAdmin) {
      const admin = {
        nombre: 'Administrador',
        usuario: 'admin',
        email: 'admin@strongfit.cl',
        password: 'Admin123#',
        fechaNacimiento: '2004-03-12',
        rol: 'admin',
      };

      usuarios.push(admin);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('🛠 Usuario admin creado por defecto.');
    }
  }

  // Lógica de login
  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuario = usuarios.find((u: any) => u.email === email && u.password === password);

    if (usuario) {
      usuario.logueado = true;
      localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

      // Redirigir según rol
      if (usuario.rol === 'admin') {
        this.router.navigate(['/adminPanel']);
      } else {
        this.router.navigate(['/inicio-cliente']);
      }

    } else {
      alert('Correo o contraseña incorrectos.');
    }
    
  }
  /**
   * @description Inicializa el componente y agrega la clase 'login' al body.
   * Esto es útil para aplicar estilos específicos al login.
   */
  ngOnInit(): void {
  document.body.classList.add('login');
}
  /**
   * @description Elimina la clase 'login' del body al destruir el componente.
   * Esto es para evitar que los estilos del login afecten a otros componentes.
   */
ngOnDestroy(): void {
  document.body.classList.remove('login');
}
}
