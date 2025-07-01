document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario-inscripcion");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;
    const rol = document.getElementById("rol").value;

    let valido = true;

    // Verificar edad mínima
    const edadMinima = 13;
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (edad < edadMinima || (edad === edadMinima && hoy < new Date(nacimiento.setFullYear(hoy.getFullYear())))) {
      document.getElementById("fechaNacimiento").classList.add("is-invalid");
      valido = false;
    } else {
      document.getElementById("fechaNacimiento").classList.remove("is-invalid");
    }

    // Verificar coincidencia de contraseñas
    if (password !== confirmarPassword) {
      document.getElementById("confirmarPassword").classList.add("is-invalid");
      valido = false;
    } else {
      document.getElementById("confirmarPassword").classList.remove("is-invalid");
    }

    // Validar duplicado de correo
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert("El correo ya está registrado.");
      return;
    }

    if (!valido) return;

    // Crear usuario
    const nuevoUsuario = {
      nombre,
      usuario,
      email,
      fechaNacimiento,
      password,
      rol
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  });
});