
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @description Componente para la modificación del perfil de usuario.
 * Permite actualizar nombre, correo, fecha de nacimiento y contraseña.
 */
@Component({
  selector: 'app-perfil',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})

export class PerfilComponent implements OnInit {
  formulario: FormGroup;
  mensaje = '';
  perfilForm: any;

   /**
   * @description Constructor del componente. Carga el usuario activo y llena el formulario con sus datos.
   * @param fb - Inyector del FormBuilder para construir el formulario reactivo.
   */
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      fechaNacimiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    const datosUsuario = {
      nombre: 'Cristóbal Valenzuela',
      usuario: 'cvalenzuela',
      email: 'cristobal@example.com',
      fechaNacimiento: '1990-01-01'
    };

    this.formulario.patchValue(datosUsuario);
  }
  /**
   * @description Guarda los cambios realizados en el perfil del usuario.
   * Actualiza tanto `usuarioActivo` como la lista completa de usuarios en `localStorage`.
   */
  guardar() {
    if (this.formulario.valid) {
      const datos = this.formulario.getRawValue(); 

      this.http.post('/api/actualizar_perfil.php', datos).subscribe({
        next: () => this.mensaje = 'Perfil actualizado correctamente.',
        error: () => this.mensaje = 'Error al actualizar perfil.'
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
