import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin';
import { FormsModule } from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AdminComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;

    component.usuarios = [
      { nombre: 'Ana', usuario: 'ana123', email: 'ana@example.com', fechaNacimiento: '1990-01-01', rol: 'admin' },
      { nombre: 'Luis', usuario: 'luis321', email: 'luis@example.com', fechaNacimiento: '1985-05-12', rol: 'cliente' }
    ];

    fixture.detectChanges();
  });

  it('debería abrir modal de edición y establecer usuarioEditando', () => {
    component.abrirEditar(1);
    expect(component.usuarioEditando).toEqual(component.usuarios[1]);
  });


  it('debería eliminar el usuario seleccionado', () => {
    component.abrirEliminar(0);
    component.confirmarEliminar();
    expect(component.usuarios.length).toBe(1);
    expect(component.usuarios[0].nombre).toBe('Luis');
  });
});