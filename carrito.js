import { agregar_carrito, restar_carrito, guardarCarrito, actualizarContador,
    leerCarrito}
from './utils/funciones.js'
import { productos } from './utils/datos.js'

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("listaCarrito");
    const subtotalElem = document.getElementById("subtotal");
    const ivaElem = document.getElementById("iva");
    const totalElem = document.getElementById("total");
    const carritoVacio = document.getElementById("carritoVacio");
    const btnVaciar = document.getElementById("btnVaciar");
    const btnCompra = document.getElementById("btnComprar");

    let carrito = leerCarrito();

    function renderCarrito() {
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            carritoVacio.style.display = "block";
        } else {
            carritoVacio.style.display = "none";

            carrito.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("carrito__item");
                div.innerHTML = `
                    <span>${item.nombre}</span>
                    <span> x ${item.cantidad} = </span>
                    <span>$${item.cantidad * item.precio}</span>
                    <span><button class="btn btn--sumar" data-id="${item.id}">➕</button></span>
                    <span><button class="btn btn--restar" data-id="${item.id}">➖</button></span>
                    <span><button class="btn btn--borrar" data-id="${item.id}">🗑️</button></span>
                `;
                listaCarrito.appendChild(div);
            });
        }


        const subtotal = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
        const iva = subtotal * 0.21;
        const total = subtotal + iva;

        subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        ivaElem.textContent = `$${iva.toFixed(2)}`;
        totalElem.textContent = `$${total.toFixed(2)}`;

        actualizarContador(carrito);
    }

    function btnComprar() {

    if (carrito.length === 0) {
        Swal.fire({
        title: "¡Tu carrito está vacío!",
        text: "Todavía no agregaste ningún producto. ¡Explorá nuestro bazar!",
        icon: "info",
        confirmButtonText: "Ver productos",
        confirmButtonColor: "#2563eb",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "bazar.html";
        }
    });

    return;
    }

    Swal.fire({
    title: "¿Finalizar compra?",
    text: "¿Deseás finalizar tu compra?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, finalizar compra",
    cancelButtonText: "Seguir comprando",
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#6b7280",
    reverseButtons: true
}).then((result) => {
    if (!result.isConfirmed) return;
guardarCarrito([]);

        carrito = [];

        renderCarrito([]);

        actualizarContador([]);

        Swal.fire({
            title: "¡Compra realizada!",
            text: "Gracias por comprar en Mercado Pirata.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });

    });
}
    btnCompra.addEventListener("click", btnComprar);


    listaCarrito.addEventListener("click", (e) => {
        const btnSumar = e.target.closest(".btn--sumar");
        const btnRestar = e.target.closest(".btn--restar");
        const btnBorrar = e.target.closest(".btn--borrar");

        if (btnSumar) {
            agregar_carrito(productos, carrito, Number(btnSumar.dataset.id));
        } else if (btnRestar) {
            restar_carrito(productos, carrito, Number(btnRestar.dataset.id));
        } else if (btnBorrar) {
            const id = Number(btnBorrar.dataset.id);
            carrito = carrito.filter(item => Number(item.id) !== id);
        } else {
            return;
        }

        guardarCarrito(carrito);
        renderCarrito();
    });


    btnVaciar.addEventListener("click", () => {

    if (carrito.length === 0) return;

    Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se eliminarán todos los productos del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        reverseButtons: true
    }).then((result) => {

        if (!result.isConfirmed) return;

        carrito = [];

        guardarCarrito(carrito);

        renderCarrito();

        actualizarContador([]);

        Swal.fire({
            title: "¡Carrito vacío!",
            text: "Se eliminaron todos los productos.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });

    });

});
    renderCarrito();
});