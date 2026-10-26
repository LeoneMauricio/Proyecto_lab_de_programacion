import {actualizarContador} from './utils/funciones.js'

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("listaCarrito");
    const subtotalElem = document.getElementById("subtotal");
    const ivaElem = document.getElementById("iva");
    const totalElem = document.getElementById("total");
    const carritoVacio = document.getElementById("carritoVacio");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
    } else {
        carritoVacio.style.display = "none";

        carrito.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("carrito__item");
            div.innerHTML = `
                <span>${item.nombre}</span>
                <span>${item.imagen}</span>
                <span> x ${item.cantidad} = </span>
                <span>$${item.cantidad * item.precio}</span>
            `;
            listaCarrito.appendChild(div);
        });


        const subtotal = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
        const iva = subtotal * 0.21;
        const total = subtotal + iva;

        subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        ivaElem.textContent = `$${iva.toFixed(2)}`;
        totalElem.textContent = `$${total.toFixed(2)}`;
    }
});
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];




document.getElementById("btnVaciar").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    location.reload(); 
});

// const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//actualizarContador(carrito);