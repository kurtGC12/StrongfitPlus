
 document.addEventListener("DOMContentLoaded", () => {
      const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      if (!usuario || !usuario.logueado) {
        alert("Debes iniciar sesión.");
        window.location.href = "login.html";
        return;
      }
      document.getElementById("nombreBienvenida").textContent = usuario.nombre;
      document.getElementById("nombreUsuario").textContent = usuario.usuario;
    });
