
document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tabla = document.getElementById("tabla-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const contenedorVacio = document.getElementById("carrito-vacio");
  const contenedorContenido = document.getElementById("carrito-contenido");

  function actualizarVista() {
    tabla.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
      contenedorVacio.classList.remove("d-none");
      contenedorContenido.classList.add("d-none");
      return;
    }

    contenedorVacio.classList.add("d-none");
    contenedorContenido.classList.remove("d-none");

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toLocaleString()}</td>
        <td>$${subtotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-index="${index}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });

    totalCarrito.textContent = total.toLocaleString();
  }

  tabla.addEventListener("click", (e) => {
    if (e.target.matches(".btn-danger")) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarVista();
    }
  });

  document.getElementById("vaciarCarrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    carrito.length = 0;
    actualizarVista();
  });

  document.getElementById("finalizarCompra").addEventListener("click", () => {
    alert("✅ ¡Gracias por tu compra!");
    localStorage.removeItem("carrito");
    carrito.length = 0;
    actualizarVista();
  });

  // Manejar botones de contratar desde otras páginas
  const botonesContratar = document.querySelectorAll(".agregar-carrito, .buy-btn");
  botonesContratar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));
      if (!sesion || !sesion.logueado) {
        alert("Debes iniciar sesión para contratar un plan.");
        localStorage.setItem("redirigirDespues", "carrito.html");
        window.location.href = "login.html";
        return;
      }

    const contenedor = btn.closest(".pricing-item, .card-body");
    const nombre = contenedor.querySelector("h3").textContent;
    const precioTexto = contenedor.querySelector("h4").textContent;
    const precio = parseInt(precioTexto.replace(/\D/g, ""));


      const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
      const existente = carritoActual.find(p => p.nombre === nombre);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carritoActual.push({ nombre, precio, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carritoActual));
      window.location.href = "carrito.html";
    });
  });

  actualizarVista();
});
