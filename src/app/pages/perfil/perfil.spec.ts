import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería marcar como inválido si el correo no tiene formato válido', () => {
    component.perfilForm.setValue({
      nombre: 'Pedro',
      correo: 'correo-no-valido',  
      telefono: '123456789'
    });
    expect(component.perfilForm.valid).toBeFalse();
  });
});