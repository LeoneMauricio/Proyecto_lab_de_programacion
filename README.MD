Proyecto para Laboratorio de programación con carrito funcional.

▎ Me gustó mucho la temática y que hayas sumado login y registro. Para dejarlo completo para el final, necesito que hagas estos cambios y los subas con commits claros. Te dejo ejemplos para orientarte, pero adaptalos a tu código con tus palabras:
▎
▎ 1️⃣ Filtro por categorías y búsqueda con debounce
▎ • Ya tenés categoria en cada producto. Agregá botones arriba del catálogo (Todos + cada categoría) con data-categoria, y filtrá con filter():
▎ const filtrados = productos.filter(p => categoria === "todos" || p.categoria === categoria);
▎ • Agregá un campo de búsqueda por nombre con debounce:
▎ let temporizador;
▎ buscador.addEventListener("input", (e) => {
▎   clearTimeout(temporizador);
▎   temporizador = setTimeout(() => {
▎     // filtrar por nombre y dibujar la grilla
▎   }, 300);
▎ });
▎ • Si no hay resultados, mostrá un mensaje "No encontramos productos". Búsqueda y categoría tienen que funcionar juntas.✅
▎
▎ 2️⃣ try/catch en localStorage
▎ Hoy tenés JSON.parse(localStorage.getItem("carrito")) || [] en Bazar.js y carrito.js. Si el dato está dañado, la página se rompe. Armá una función segura:
▎ export function leerCarrito() {
▎   try {
▎     return JSON.parse(localStorage.getItem("carrito")) || [];
▎   } catch (error) {
▎     return [];
▎   }
▎ }
▎ Usala en los dos archivos y hacé lo mismo al guardar.
▎
▎ 3️⃣ Corregir un error al restar 🐞
▎ Agregá un producto, restalo hasta 0 y andá a la página del carrito. Fijate qué aparece. Revisá utils/funciones.js, función restar_carrito, líneas 28 a 31:
▎ existente.cantidad--;
▎     if (existente.cantidad<=0){
▎         existente.cantidad = 0;
▎ }
▎ Pensá: cuando la cantidad llega a 0, ¿el producto debería quedarse en el carrito? Cuando lo arregles, explicame con tus palabras cuál era el error y cómo lo resolviste.✅
▎
▎ 4️⃣ Botón "Comprar" y validación en JS
▎ • El botón btnComprar de carrito.html no tiene ninguna función. Hacé que, al hacer clic, vacíe el carrito y avise al usuario.
▎ • En login.html y registro.html, usá preventDefault() en el submit y validá en JS con un mensaje de error debajo de cada campo:
▎ form.addEventListener("submit", (e) => {
▎   e.preventDefault();
▎   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
▎     errorCorreo.textContent = "Ingresá un correo válido.";
▎     return;
▎   }
▎ });
▎
▎ 5️⃣ Un detalle en index.html
▎ En la línea 5 tenés <meta name="descripción" content="width=device-width, initial-scale=1.0">. Compará con bazar.html y fijate cuál es la diferencia. En el celular, ¿cómo se ve tu portada?