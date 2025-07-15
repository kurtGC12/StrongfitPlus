import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  form!: FormGroup;
  usuarioOriginal: any = null;
  perfilForm: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('usuarioActivo');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (!user) {
      alert('Debes iniciar sesión.');
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioOriginal = JSON.parse(user);

    this.form = this.fb.group({
      nombre: [this.usuarioOriginal.nombre, Validators.required],
      usuario: [this.usuarioOriginal.usuario, Validators.required],
      email: [{ value: this.usuarioOriginal.email, disabled: true }],
      fechaNacimiento: [this.usuarioOriginal.fechaNacimiento, [Validators.required, this.validarEdadMinima]]
    });
  }

  validarEdadMinima(control: any) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const cumpleAñosEsteAño = new Date(fecha.setFullYear(hoy.getFullYear())) <= hoy;

    return (edad > 13 || (edad === 13 && cumpleAñosEsteAño)) ? null : { edadMinima: true };
  }

  guardar() {
    if (this.form.invalid) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === this.usuarioOriginal.email);

    if (index !== -1) {
      usuarios[index] = {
        ...usuarios[index],
        nombre: this.form.value.nombre,
        usuario: this.form.value.usuario,
        fechaNacimiento: this.form.value.fechaNacimiento
      };

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarios[index]));

      alert('Perfil actualizado correctamente.');
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['/login']);
  }
}