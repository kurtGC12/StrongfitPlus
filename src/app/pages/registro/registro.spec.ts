import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro';
import { By } from '@angular/platform-browser';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('el formulario debería ser inválido si está vacío', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('el formulario debería ser válido si todos los campos están llenos correctamente', () => {
    component.registroForm.setValue({
      nombre: 'Juan',
      correo: 'juan@email.com',
      password: '123456'
    });
    expect(component.registroForm.valid).toBeTrue();
  });
  
   it('debería mostrar error si el campo nombre está vacío y fue tocado', () => {
    const nombreCtrl = component.registroForm.get('nombre');
    nombreCtrl?.markAsTouched();
    fixture.detectChanges();

    const errorDiv = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorDiv.nativeElement.textContent).toContain('Este campo es obligatorio');
  });
}); 

