document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-recuperar");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const nuevaPassword = document.getElementById("nuevaPassword").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;

    const emailInput = document.getElementById("email");
    const nuevaPasswordInput = document.getElementById("nuevaPassword");
    const confirmarPasswordInput = document.getElementById("confirmarPassword");

    // Limpiar clases anteriores
    emailInput.classList.remove("is-invalid");
    nuevaPasswordInput.classList.remove("is-invalid");
    confirmarPasswordInput.classList.remove("is-invalid");

    let valido = true;

    // Validar formato del correo
    if (!email) {
      emailInput.classList.add("is-invalid");
      valido = false;
    }

    // Validar coincidencia de contraseñas
    if (nuevaPassword !== confirmarPassword) {
      confirmarPasswordInput.classList.add("is-invalid");
      valido = false;
    }

    // Validar patrón de seguridad con RegExp (en caso de que pattern del HTML se omita en algunos navegadores)
    const patron = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
    if (!patron.test(nuevaPassword)) {
      nuevaPasswordInput.classList.add("is-invalid");
      valido = false;
    }

    if (!valido) return;

    // Recuperar usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const indice = usuarios.findIndex(u => u.email === email);

    if (indice === -1) {
      emailInput.classList.add("is-invalid");
      alert("No se encontró ningún usuario con ese correo.");
      return;
    }

    // Actualizar la contraseña
    usuarios[indice].password = nuevaPassword;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Contraseña actualizada correctamente. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  });
});