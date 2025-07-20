
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar.html',
  styleUrls: ['./recuperar.css']
})
export class RecuperarComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

   /**
   * @description Constructor que inicializa el formulario de recuperación.
   * @param fb - Inyector del FormBuilder para construir el formulario.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nuevaPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/)
      ]],
      confirmarPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  /**
   * @description Verifica si el campo de correo está inválido.
   * @param campo - El nombre del campo a validar.
   * @returns `true` si el campo está inválido y fue tocado.
   */
  passwordsIguales(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('nuevaPassword')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { notSame: true };
  }

  /**
   * @description Procesa la solicitud de recuperación. Si el correo existe,
   * muestra la contraseña y redirige al login. De lo contrario, alerta error.
   */
  recuperar() {
    if (this.form.invalid) return;

    const { email, nuevaPassword } = this.form.getRawValue();
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === email);

    if (index === -1) {
      alert('No se encontró ningún usuario con ese correo.');
      return;
    }
    // Actualizar la contraseña del usuario
    usuarios[index].password = nuevaPassword;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }
}