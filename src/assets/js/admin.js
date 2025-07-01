document.addEventListener("DOMContentLoaded", function () {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!usuarioActivo || usuarioActivo.rol !== "admin") {
    alert("Acceso denegado. Solo administradores pueden ingresar.");
    window.location.href = "login.html";
    return;
  }

  const tbody = document.querySelector("#tabla-usuarios tbody");
  const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
  let indexParaEliminar = null;

  function cargarUsuarios() {
    tbody.innerHTML = "";
    usuarios.forEach((usuario, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.usuario}</td>
        <td>${usuario.email}</td>
        <td>${usuario.fechaNacimiento}</td>
        <td>${usuario.rol}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2 editar-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
          <button class="btn btn-sm btn-danger eliminar-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  cargarUsuarios();

  // Abrir modal de edición
  tbody.addEventListener("click", function (e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("editar-btn")) {
      const usuario = usuarios[index];
      document.getElementById("editarNombre").value = usuario.nombre;
      document.getElementById("editarUsuario").value = usuario.usuario;
      document.getElementById("editarFechaNacimiento").value = usuario.fechaNacimiento;
      document.getElementById("editarRol").value = usuario.rol;
      document.getElementById("editarEmail").value = usuario.email;
      document.getElementById("formEditarUsuario").dataset.index = index;
    }

    // Modal eliminar
    if (e.target.classList.contains("eliminar-btn")) {
      indexParaEliminar = index;
      document.getElementById("nombreEliminar").textContent = usuarios[index].nombre;
      modalEliminar.show();
    }
  });

  // Guardar edición
  document.getElementById("formEditarUsuario").addEventListener("submit", function (e) {
    e.preventDefault();
    const index = this.dataset.index;

    usuarios[index].nombre = document.getElementById("editarNombre").value.trim();
    usuarios[index].usuario = document.getElementById("editarUsuario").value.trim();
    usuarios[index].fechaNacimiento = document.getElementById("editarFechaNacimiento").value;
    usuarios[index].rol = document.getElementById("editarRol").value;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Si está editando su propia cuenta, actualizar también usuarioActivo
    if (usuarios[index].email === usuarioActivo.email) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));
    }

    alert("Usuario actualizado correctamente.");
    cargarUsuarios();
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditar"));
    modal.hide();
  });

  // Confirmar eliminación
  document.getElementById("confirmarEliminar").addEventListener("click", function () {
    if (indexParaEliminar !== null) {
      const eliminado = usuarios.splice(indexParaEliminar, 1)[0];
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Si el admin elimina su propia cuenta, cerrar sesión
      if (eliminado.email === usuarioActivo.email) {
        alert("Tu cuenta ha sido eliminada.");
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
        return;
      }

      cargarUsuarios();
      modalEliminar.hide();
    }
  });
});