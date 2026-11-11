import { agregar_carrito, restar_carrito, guardarCarrito, actualizarContador } from './utils/funciones.js'
import { productos } from './utils/datos.js'

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("listaCarrito");
    const subtotalElem = document.getElementById("subtotal");
    const ivaElem = document.getElementById("iva");
    const totalElem = document.getElementById("total");
    const carritoVacio = document.getElementById("carritoVacio");
    const btnVaciar = document.getElementById("btnVaciar");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
        carrito = [];
        guardarCarrito(carrito);
        renderCarrito();
    });

    renderCarrito();
});