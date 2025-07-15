import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/clientes';
import { ClientesGym } from '../../models/clientes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes-gym',
  templateUrl: './clientes-gym.html',
  styleUrls: ['./clientes-gym.css'],
   imports: [CommonModule, FormsModule],
 
})
export class ClienteFormComponent implements OnInit {
  cliente: ClientesGym = { id: 0, nombre: '', edad: 0, email: '', plan: '', estado: '' };
  clientes: ClientesGym[] = [];
  editMode = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe((data: ClientesGym[]) => {
      this.clientes = data;
    });
  }

  crearCliente() {
    this.clienteService.addCliente(this.cliente).subscribe(() => {
      alert('Cliente creado exitosamente');
      this.limpiarFormulario();
      this.cargarClientes(); // recarga la lista
    });
  }

  actualizarCliente() {
    this.clienteService.updateCliente(this.cliente).subscribe(() => {
      alert('Cliente actualizado exitosamente');
      this.limpiarFormulario();
      this.cargarClientes();
    });
  }

  eliminarCliente() {
    if (this.cliente.id) {
      this.clienteService.deleteCliente(this.cliente.id).subscribe(() => {
        alert('Cliente eliminado exitosamente');
        this.limpiarFormulario();
        this.cargarClientes();
      });
    }
  }

  buscarCliente() {
    if (this.cliente.id) {
      this.clienteService.getCliente(this.cliente.id).subscribe((data: any) => {
        this.cliente = data;
        this.editMode = true;
      });
    }
  }

  limpiarFormulario() {
    this.cliente = { id: 0, nombre: '', edad: 0, email: '', plan: '', estado: '' };
    this.editMode = false;
  }
}