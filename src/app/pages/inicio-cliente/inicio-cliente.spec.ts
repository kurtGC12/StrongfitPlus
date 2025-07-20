import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioClienteComponent } from './inicio-cliente';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('InicioClienteComponent', () => {
  let component: InicioClienteComponent;
  let fixture: ComponentFixture<InicioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioClienteComponent, DummyComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'inicio/perfil', component: DummyComponent },
        { path: 'planes', component: DummyComponent },
        { path: 'inicio/carrito', component: DummyComponent },
      ])]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioClienteComponent);
    component = fixture.componentInstance;

    // Simula valores
    component.nombre = 'Carlos';
    component.usuario = 'carlos123';

    fixture.detectChanges();
  });

  it('debería mostrar el nombre de usuario en la esquina inferior', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-end span')?.textContent).toContain('carlos123');
  });

  it('debería tener botón de cerrar sesión con método asociado', () => {
    spyOn(component, 'cerrarSesion');
    const button = fixture.nativeElement.querySelector('button.btn-secondary');
    button.click();
    expect(component.cerrarSesion).toHaveBeenCalled();
  });
});