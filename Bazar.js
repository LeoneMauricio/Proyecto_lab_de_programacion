import {agregar_carrito,restar_carrito, btnBorrar, btnRestar, guardarCarrito, actualizarBoton, actualizarContador, btnStyle, btnSum} from './utils/funciones.js'   
const productos = [
    {
        id: 1,
        imagen: "🧭",
        nombre: "Brújula",
        categoria: "Navegación",
        descripcion: "Apunta siempre al norte - Hierro dulce - Aguja de latón",
        precio: 50.00
    },
    {
        id: 2,
        imagen: "🗡️",
        nombre: "Daga",
        categoria: "Armas",
        descripcion: "Daga de bolsillo- Hierro",
        precio: 15.00
    },
    {
        id: 3,
        imagen: "🔭",
        nombre: "Catalejo",
        categoria: "Navegación",
        descripcion: "Visión clara - rango de 1500 millas nauticas",
        precio: 25.00
    },
    {
        id: 4,
        imagen: "🍺",
        nombre: "Cerveza",
        categoria: "Bebidas",
        descripcion: "El 2° brebaje más elegido por los piratas",
        precio: 3.00
    },
    {
        id: 5,
        imagen: "⚓",
        nombre: "Ancla",
        categoria: "Navegación",
        descripcion: "Ancla de hierro 60 kg",
        precio: 400.00
    },
    {
        id: 6,
        imagen: "🪎",
        nombre: "Cofre",
        categoria: "Almacenamiento",
        descripcion: "Cofre(vacio) - 30 cm x 20 cm x 21,5 cm",
        precio: 120.00
    }
]

const grilla_prod = document.getElementById("grillaProducto")
grilla_prod.innerHTML = productos.map(producto=>`<article class="producto" data-id= "${producto.id}" data-categoria="navegacion">
                    <div class="producto__img">${producto.imagen}</div>
                    <div class="producto__cuerpo">
                        <span class="producto__categoria">${producto.categoria}</span>
                    <h3 class="producto__nombre">${producto.nombre}</h3>
                    <p class="producto__descripcion"> ${producto.descripcion}</p>
                    <div class="producto__footer">
                        <span class="producto__precio" data-precio=${producto.precio}>${producto.precio} Doblones</span>
                        <button class="btn--agregar" data-id="${producto.id}">Agregar</button>
                        <button class="btn--sumar" data-id="${producto.id}">➕</button>
                        <button class="btn--restar" data-id="${producto.id}">➖</button>
                        <button class="btn--borrar" data-id="${producto.id}">🗑️</button>
                    </div>
                    </div>
                </article>`).join("")

// Lógica del carrito

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
