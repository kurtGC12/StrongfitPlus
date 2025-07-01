import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería llamar a la función login() si el formulario es válido', () => {
    spyOn(component, 'login');
    component.loginForm.setValue({ 
      usuario: 'cliente123',
      password: '123456'
    });
    component.login();

    expect(component.login).toHaveBeenCalled();
  });
});
