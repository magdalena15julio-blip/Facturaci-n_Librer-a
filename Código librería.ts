// Vectores paralelos
let productos = [];
let precios = [];

// Agregar producto
function agregarProducto() {
  let nombre = document.getElementById("nombreProducto").value.trim();
  let precio = parseFloat(document.getElementById("precioProducto").value);
  let mensaje = document.getElementById("mensaje");
  mensaje.textContent = "";

  // Validaciones
  if (nombre === "" || isNaN(precio)) {
    mensaje.textContent = "⚠️ Debe ingresar un nombre y un precio válido.";
    return;
  }

  if (precio < 0) {
    mensaje.textContent = "⚠️ El precio no puede ser negativo.";
    return;
  }

  if (productos.includes(nombre)) {
    mensaje.textContent = "⚠️ El producto ya fue ingresado.";
    return;
  }

  // Guardar datos en vectores
  productos.push(nombre);
  precios.push(precio);

  // Limpiar campos
  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";

  mostrarLista();
}

// Mostrar lista de productos
function mostrarLista() {
  let lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  for (let i = 0; i < productos.length; i++) {
    lista.innerHTML += `
      <li class="flex justify-between">
        <span>${i + 1}. ${productos[i]}</span>
        <span>$${precios[i].toFixed(2)}</span>
      </li>
    `;
  }
}

// Generar factura
function generarFactura() {
  if (productos.length === 0) {
    alert("No hay productos registrados.");
    return;
  }

  let subtotal = 0;
  let maxPrecio = precios[0];
  let productoCaro = productos[0];

  // Calcular subtotal y producto más caro
  for (let i = 0; i < precios.length; i++) {
    subtotal += precios[i];
    if (precios[i] > maxPrecio) {
      maxPrecio = precios[i];
      productoCaro = productos[i];
    }
  }

  let iva = subtotal * 0.15;
  let total = subtotal + iva;
  let promedio = subtotal / precios.length;

  // Mostrar resultados
  document.getElementById("resultados").innerHTML = `
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>IVA (15%):</strong> $${iva.toFixed(2)}</p>
    <p><strong>Total a pagar:</strong> $${total.toFixed(2)}</p>
    <hr class="my-2">
    <p><strong>Cantidad de productos:</strong> ${productos.length}</p>
    <p><strong>Producto más caro:</strong> ${productoCaro} ($${maxPrecio.toFixed(2)})</p>
    <p><strong>Promedio de precios:</strong> $${promedio.toFixed(2)}</p>
  `;
}
