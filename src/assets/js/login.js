document.addEventListener("DOMContentLoaded", () => {
  // Verifica si ya existe un usuario administrador, si no, lo crea por defecto
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existeAdmin = usuarios.some(user => user.email === "admin@strongfit.cl");

  if (!existeAdmin) {
    const admin = {
      nombre: "Administrador",
      usuario: "admin",
      email: "admin@strongfit.cl",
      password: "Admin123#",
      fechaNacimiento: "2004-03-12",
      rol: "admin",
    };

    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("🛠 Usuario admin creado por defecto.");
  }

  // Manejo del formulario de login
  const form = document.getElementById("form-login");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
      usuario.logueado = true;
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

      // Redirección por rol
      if (usuario.rol === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "inicio-cliente.html";
      }
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});