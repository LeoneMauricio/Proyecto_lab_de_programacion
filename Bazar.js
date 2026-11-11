import {agregar_carrito, guardarCarrito, actualizarBoton,
    actualizarContador,debounce} 
from './utils/funciones.js'  
import {productos} from './utils/datos.js'  


const grilla_prod = document.getElementById("grillaProducto");
function renderProductos(productos) {
    if (productos.length === 0) {
        grilla_prod.innerHTML = `<p class="sin-resultados">No se encontraron productos.</p>`;
        return;
    }

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
            </div>
        </div>
    </div>
</article>`).join("")
    }

renderProductos(productos);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarContador(carrito);

document.querySelectorAll(".btn--agregar").forEach(btn => {
    actualizarBoton(btn, carrito);
});

grilla_prod.addEventListener("click", (e) => {
    const btnAgregar = e.target.closest(".btn--agregar");

    if (btnAgregar) {
        const id = Number(btnAgregar.dataset.id);

        agregar_carrito(productos, carrito, id);
        guardarCarrito(carrito);
        actualizarBoton(btnAgregar, carrito);
    }
});

actualizarContador(carrito);

document.querySelectorAll(".btn--agregar").forEach(btn => {
    actualizarBoton(btn, carrito);
});

// Buscador productos con debounce

const buscador = document.getElementById("buscador");
const normalizar = (s) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

let categoria = "todos";

const buscarProductos = (e) => {
    const busqueda = normalizar(e.target.value);

    const filtrados = productos.filter(p => {
        const coincideCategoria = categoria === "todos" || normalizar(p.categoria) === categoria;
        const coincideNombre = normalizar(p.nombre).includes(busqueda);
        return coincideCategoria && coincideNombre;
    });
    renderProductos(filtrados);
};
document.querySelectorAll(".filtro").forEach(btn => {
    btn.addEventListener("click", () => {
        categoria = normalizar(btn.dataset.categoria);
        buscarProductos({ target: buscador }); // reaplica categoría + texto actual
    });
});


buscador.addEventListener(
    "input",
    debounce(buscarProductos, 300)
);

