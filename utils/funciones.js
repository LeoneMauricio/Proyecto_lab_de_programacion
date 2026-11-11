
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
        const indice = carrito.findIndex(item => item.id === producto.id);
        carrito.splice(indice, 1);
    }

    actualizarContador(carrito);
    }

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function actualizarBoton(btn, carrito) {
    const producto = carrito.find(item => item.id === Number(btn.dataset.id));
    const cantidad = producto ? producto.cantidad : 0;

    btn.textContent = cantidad > 0 ? `Agregado` : "Agregar";
    btn.style.backgroundColor = cantidad > 0 ? "green" : "";
    btn.disabled = cantidad > 0? true : false;
}

export function debounce(funcion, time) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => funcion.apply(this, args), time);
    };
}
