
const formulario = document.getElementById("formLogin");

const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");

const errorCorreo = document.getElementById("errorCorreo");
const errorContrasena = document.getElementById("errorContrasena");


formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    errorCorreo.textContent = "";
    errorContrasena.textContent = "";

    let valido = true;

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo.value.trim())) {

        errorCorreo.textContent = "Ingresá un correo válido.";
        valido = false;
    }

    if (contrasena.value.trim() === "") {

        errorContrasena.textContent = "Ingresá tu contraseña.";
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
