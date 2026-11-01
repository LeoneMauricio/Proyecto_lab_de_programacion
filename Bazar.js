import {agregar_carrito, restar_carrito, guardarCarrito, actualizarBoton, actualizarContador} 
from './utils/funciones.js'  
import {productos} from './utils/datos.js'  


const grilla_prod = document.getElementById("grillaProducto") 
    grilla_prod.innerHTML = productos.map(producto => 
        `<article class="producto" data-id="${producto.id}" data-categoria="navegacion">
    <div class="producto__img">  
        <img src="${producto.imagen}" alt="${producto.nombre}">
    </div>
    <div class="producto__cuerpo">
        <span class="producto__categoria">${producto.categoria}</span>
        <h3 class="producto__nombre">${producto.nombre}</h3>
        <p class="producto__descripcion">${producto.descripcion}</p>
        <div class="producto__footer">
            <span class="producto__precio" data-precio="${producto.precio}">${producto.precio} Doblones</span>
            <div class="producto__acciones">
                <button class="btn btn--agregar" data-id="${producto.id}">Agregar</button>
                <button class="btn btn--sumar" data-id="${producto.id}">➕</button>
                <button class="btn btn--restar" data-id="${producto.id}">➖</button>
                <button class="btn btn--borrar" data-id="${producto.id}">🗑️</button>
            </div>
        </div>
    </div>
</article>`).join("")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarContador(carrito);

document.querySelectorAll(".btn--agregar").forEach(btn => {
    actualizarBoton(btn, carrito);
});

grilla_prod.addEventListener("click", (e) => {
    const btnAgregar = e.target.closest(".btn--agregar");
    const btnSumar = e.target.closest(".btn--sumar");
    const btnRestar = e.target.closest(".btn--restar");
    const btnBorrar = e.target.closest(".btn--borrar");

    if (btnAgregar) {
        const id = Number(btnAgregar.dataset.id);

        agregar_carrito(productos, carrito, id);
        guardarCarrito(carrito);
        actualizarBoton(btnAgregar, carrito);
    }

    if (btnSumar) {
        const id = Number(btnSumar.dataset.id);

        agregar_carrito(productos, carrito, id);
        guardarCarrito(carrito);

        document.querySelectorAll(".btn--agregar").forEach(btn => {
            actualizarBoton(btn, carrito);
        });
    }

    if (btnRestar) {
        const id = Number(btnRestar.dataset.id);

        restar_carrito(productos, carrito, id);
        guardarCarrito(carrito);

        document.querySelectorAll(".btn--agregar").forEach(btn => {
            actualizarBoton(btn, carrito);
        });
    }

    if (btnBorrar) {
        const id = Number(btnBorrar.dataset.id);

        carrito = carrito.filter(item => Number(item.id) !== id);

        guardarCarrito(carrito);
        actualizarContador(carrito);

        document.querySelectorAll(".btn--agregar").forEach(btn => {
            actualizarBoton(btn, carrito);
        });
    }
});

actualizarContador(carrito);

document.querySelectorAll(".btn--agregar").forEach(btn => {
    actualizarBoton(btn, carrito);
});
