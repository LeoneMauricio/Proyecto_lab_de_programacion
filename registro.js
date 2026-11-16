const formulario = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmarContrasena");

const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorContrasena = document.getElementById("errorContrasena");
const errorConfirmar = document.getElementById("errorConfirmar");


formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    // Limpiar errores anteriores
    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    errorContrasena.textContent = "";
    errorConfirmar.textContent = "";

    let valido = true;

    // Validar nombre
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "Ingresá tu nombre.";
        valido = false;
    }

    // Validar correo
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo.value.trim())) {
        errorCorreo.textContent = "Ingresá un correo válido.";
        valido = false;
    }

    // Validar contraseña
    if (contrasena.value.length < 8) {
        errorContrasena.textContent =
            "La contraseña debe tener al menos 8 caracteres.";
        valido = false;
    }

    // Confirmar contraseña
    if (confirmarContrasena.value !== contrasena.value ||
        confirmarContrasena.value === "") {

        errorConfirmar.textContent =
            "Las contraseñas no coinciden.";

        valido = false;
    }

    if (!valido) return;

    Swal.fire({
        title: "Hola pirata ",
        text: "¡Bienvenido a Mercado Pirata!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16a34a",
        allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        window.location.href = "index.html";

    }
});})

