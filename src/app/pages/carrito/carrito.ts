import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @description Componente que representa el carrito de compras.
 * Permite ver, eliminar y calcular el total de los productos seleccionados.
 */

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './carrito.html',
  
})
export class CarritoComponent implements OnInit {
  agregarAlCarrito(productoMock: { id: number; nombre: string; precio: number; }) {
    throw new Error('Method not implemented.');
  }
  carrito: Producto[] = [];
  total: number = 0;
  formularioPago!: FormGroup;
  pagoExitoso = false;

  constructor(private fb: FormBuilder) {}
 /**
   * @description Inicializa el componente cargando los productos del carrito desde localStorage.
   */
  ngOnInit(): void {
    const data = localStorage.getItem('carrito');
    this.carrito = data ? JSON.parse(data) : [];
    this.calcularTotal();

    this.formularioPago = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      medioPago: ['', Validators.required]
    });
  }
 /**
   * @description Calcula el precio total del carrito multiplicando precio por cantidad de cada producto.
   * @returns El precio total del carrito.
   */
  calcularTotal() {
    this.total = this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }
/**
   * @description Elimina un producto del carrito por su índice.
   * @param index - Índice del producto a eliminar.
   */
  eliminar(index: number) {
    this.carrito.splice(index, 1);
    this.actualizarCarrito();
  }
/**
   * @description Vacía el carrito y actualiza el localStorage.
   */
  vaciarCarrito() {
    this.carrito = [];
    this.actualizarCarrito();
  }
/**
   * @description Finaliza la compra, reseteando el formulario y mostrando un mensaje de éxito.
   */
  finalizarCompra() {
    this.pagoExitoso = false;
  }
 /**
   * @description Simula el proceso de pago. Muestra un mensaje de éxito y limpia el carrito.
   */
  pagar() {
    if (this.formularioPago.invalid) return;

    setTimeout(() => {
      this.pagoExitoso = true;
      this.vaciarCarrito();
      this.formularioPago.reset();
    }, 1000);
  }

  actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.calcularTotal();
  }
}