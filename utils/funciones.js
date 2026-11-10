
export function actualizarContador(carrito) {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById("contadorCarrito");

    if (contador) contador.textContent = total;
}

export function agregar_carrito(arr_productos, carrito, id) {
    const producto = arr_productos.find(item => item.id === Number(id));
    if (!producto) return;

    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarContador(carrito);
}

export function restar_carrito(arr_productos, carrito, id) {
    const producto = arr_productos.find(item => item.id === Number(id));
    if (!producto) return;
    const existente = carrito.find(item => item.id === producto.id);
    if (!existente) return;
    existente.cantidad--;
        if (existente.cantidad<=0){
            existente.cantidad = 0;
    }
    actualizarContador(carrito);
    }

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function actualizarBoton(btn, carrito) {
    const producto = carrito.find(item => item.id === Number(btn.dataset.id));
    const cantidad = producto ? producto.cantidad : 0;

    btn.textContent = cantidad > 0 ? `Agregado ${cantidad}` : "Agregar";
    btn.style.backgroundColor = cantidad > 0 ? "green" : "";
}

export function btnStyle(e) {
    const btn = e.target.closest(".btn--agregar");
    if (!btn) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarBoton(btn, carrito);
}

export function btnSum(e){
    const btn = e.target.closest(".btn--sumar");
    if (!btn) return;

    const tarjeta = btn.closest(".producto");
    const btn2 =tarjeta.querySelector(".btn--agregar");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(item => item.id === Number(btn.dataset.id));
    const cantidad = producto ? producto.cantidad : 0;

    btn2.textContent = cantidad > 0 ? `Agregado ${cantidad}` : "Agregar";
    btn2.style.backgroundColor = cantidad > 0 ? "green" : "";
}

export function btnRestar(e) {
    const btn = e.target.closest(".btn--restar");
    if (!btn) return;

    const tarjeta = btn.closest(".producto");
    const btn2 = tarjeta.querySelector(".btn--agregar");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(item => item.id === Number(btn.dataset.id));
    const cantidad = producto ? producto.cantidad : 0;

    btn2.textContent = cantidad > 0
        ? `Agregado ${cantidad}`
        : "Agregar";

    btn2.style.backgroundColor = cantidad > 0 ? "green" : "";

    btn2.disabled = cantidad === 0;
}

export function btnBorrar(e) {
    const btn = e.target.closest(".btn--borrar");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const tarjeta = btn.closest(".producto");
    const btnAgregar = tarjeta.querySelector(".btn--agregar");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const nuevoCarrito = carrito.filter(
        item => Number(item.id) !== id
    );

    guardarCarrito(nuevoCarrito);
    actualizarContador(nuevoCarrito);
    actualizarBoton(btnAgregar, nuevoCarrito);
}

export function debounce(funcion, time) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => funcion.apply(this, args), time);
    };
}
