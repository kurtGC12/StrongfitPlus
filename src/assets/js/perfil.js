document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-perfil");

  const nombre = document.getElementById("nombre");
  const usuario = document.getElementById("usuario");
  const email = document.getElementById("email");
  const fechaNacimiento = document.getElementById("fechaNacimiento");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Si no hay sesión, redirige
  if (!usuarioActivo) {
    alert("Debes iniciar sesión.");
    window.location.href = "login.html";
    return;
  }

  // Cargar datos
  nombre.value = usuarioActivo.nombre;
  usuario.value = usuarioActivo.usuario;
  email.value = usuarioActivo.email;
  fechaNacimiento.value = usuarioActivo.fechaNacimiento;


  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar edad mínima
    const nacimiento = new Date(fechaNacimiento.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (edad < 13 || (edad === 13 && hoy < new Date(nacimiento.setFullYear(hoy.getFullYear())))) {
      fechaNacimiento.classList.add("is-invalid");
      return;
    } else {
      fechaNacimiento.classList.remove("is-invalid");
    }

    // Actualizar datos
    const index = usuarios.findIndex(u => u.email === usuarioActivo.email);
    if (index !== -1) {
      usuarios[index].nombre = nombre.value.trim();
      usuarios[index].usuario = usuario.value.trim();
      usuarios[index].fechaNacimiento = fechaNacimiento.value;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));

      alert("Perfil actualizado correctamente.");
    }
  });
});