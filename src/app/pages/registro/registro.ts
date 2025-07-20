
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


/**
 * @description Componente de registro de usuarios.
 * Este script gestiona el formulario de inscripción para nuevos usuarios,
 * incluyendo validaciones de edad mínima, coincidencia de contraseñas y
 * verificación de correos duplicados.

 */
@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.css'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FormBuilder]
})
export class RegistroComponent {
  /**
   * @description Formulario de registro con validaciones.
   */ 
  registroForm: FormGroup;
  /**
   * @description Constructor que inicializa el formulario de registro.
   * Incluye validaciones para los campos requeridos y patrones específicos.
   */
  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}/)
      ]],
      confirmarPassword: ['', Validators.required],
      rol: ['cliente']
    }, {
      validators: this.passwordsIguales
    });
  }
  /**
   * @description Valida que la fecha de nacimiento sea mayor a 13 años.
   * @param control - Control del formulario que contiene la fecha de nacimiento.
   * @returns Un objeto de error si la edad es menor a 13 años, o null si es válida.
   */
  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { notSame: true };
  }
  /**
   * @description Valida que la fecha de nacimiento sea mayor a 13 años.
   * @param control - Control del formulario que contiene la fecha de nacimiento.
   * @returns Un objeto de error si la edad es menor a 13 años, o null si es válida.
   */
  enviar() {
    if (this.registroForm.valid) {
      console.log('Datos enviados:', this.registroForm.value);
      // Aquí puedes enviar los datos al backend
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}