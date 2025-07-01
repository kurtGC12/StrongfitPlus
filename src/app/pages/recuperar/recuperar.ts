import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/**
 * @description Componente para recuperar la contraseña de un usuario
 * mediante el correo electrónico previamente registrado.
 */
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.html',
  imports: [CommonModule , ReactiveFormsModule]
})
export class RecuperarComponent {
  formulario: FormGroup;
  mensaje = '';


  /**
   * @description Constructor que inicializa el formulario de recuperación.
   * @param fb - Inyector del FormBuilder para construir el formulario.
   */
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/)
      ]],
      confirmar: ['']
    }, { validators: this.coincidenPasswords });
  }
/**
   * @description Verifica si el campo de correo está inválido.
   * @param campo - El nombre del campo a validar.
   * @returns `true` si el campo está inválido y fue tocado.
   */
  coincidenPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirmar = group.get('confirmar')?.value;
    return pass === confirmar ? null : { noCoinciden: true };
  }
/**
   * @description Procesa la solicitud de recuperación. Si el correo existe,
   * muestra la contraseña y redirige al login. De lo contrario, alerta error.
   */
  recuperar() {
    if (this.formulario.valid) {
      const data = {
        correo: this.formulario.value.correo,
        password: this.formulario.value.password
      };

      this.http.post('/api/recuperar.php', data).subscribe({
        next: () => this.mensaje = 'Contraseña actualizada correctamente.',
        error: () => this.mensaje = 'Hubo un problema. Intenta nuevamente.'
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}