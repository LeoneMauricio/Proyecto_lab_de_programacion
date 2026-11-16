
const formulario = document.getElementById("formLogin");

const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");

const errorCorreo = document.getElementById("errorCorreo");
const errorContrasena = document.getElementById("errorContrasena");


formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    // Limpiar errores anteriores
    errorCorreo.textContent = "";
    errorContrasena.textContent = "";

    let valido = true;

    // Validar correo
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo.value.trim())) {

        errorCorreo.textContent = "Ingresá un correo válido.";
        valido = false;
    }

    // Validar contraseña
    if (contrasena.value.trim() === "") {

        errorContrasena.textContent = "Ingresá tu contraseña.";
        valido = false;
    }

    if (!valido) return;

    alert("¡Cuenta creada correctamente!");

    window.location.href = "index.html";

});
