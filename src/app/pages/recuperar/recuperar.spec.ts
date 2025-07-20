import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarComponent } from './recuperar';
import { By } from '@angular/platform-browser';

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería marcar error si las contraseñas no coinciden', () => {
    component.form.setValue({
      email: 'test@example.com',
      nuevaPassword: 'Password123!',
      confirmarPassword: 'OtraClave123!'
    });
    fixture.detectChanges();

    expect(component.form.hasError('notSame')).toBeTrue();
  });

  it('debería llamar al método recuperar() si el formulario es válido', () => {
    spyOn(component, 'recuperar');

    component.form.setValue({
      email: 'user@example.com',
      nuevaPassword: 'Valid123!',
      confirmarPassword: 'Valid123!'
    });

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit');

    expect(component.recuperar).toHaveBeenCalled();
  });
});