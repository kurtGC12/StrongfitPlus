import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería agregar un producto al carrito', () => {
    const productoMock = { id: 1, nombre: 'Producto 1', precio: 5000,cantidad: 1 };
    component.agregarAlCarrito(productoMock);
    expect(component.carrito.length).toBe(1);
    expect(component.carrito[0]).toEqual(productoMock);
  });
});
 