import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


/**
 * @description Intenta iniciar sesión con los datos ingresados en el formulario.
 * @param {string} email Correo electrónico del usuario.
 * @param {string} password Contraseña del usuario.
 * @returns {boolean} Retorna true si la autenticación fue exitosa.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  authService: any;
login() {
  const usuario = this.loginForm.get('usuario')?.value;
  const password = this.loginForm.get('password')?.value;

  
  this.authService.login(usuario, password);
}

  loginForm: FormGroup;
 /**
   * @description Constructor del componente.
   * @param fb - Inyección del FormBuilder para crear el formulario reactivo.
   * @param router - Inyección del Router para redirección posterior al login.
   */
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
/**
   * @description Función que se ejecuta al enviar el formulario.
   * Valida los datos y redirige al usuario si son correctos.
   */
  enviar() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;
      console.log('Enviando login con:', correo, contrasena);
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}