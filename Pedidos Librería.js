// Vectores paralelos
let productos = [];
let precios = [];
let cantidades = [];

// Mostrar precio según selección
function mostrarPrecio() {
  let select = document.getElementById("productoSelect");
  let precio = select.options[select.selectedIndex].getAttribute("data-precio");
  document.getElementById("precioProducto").value = precio ? parseFloat(precio).toFixed(2) : "";
}

// Agregar producto a la lista
function agregarProducto() {
  let select = document.getElementById("productoSelect");
  let nombre = select.value;
  let precio = parseFloat(document.getElementById("precioProducto").value);
  let cantidad = parseInt(document.getElementById("cantidadProducto").value);
  let mensaje = document.getElementById("mensaje");
  mensaje.textContent = "";

  // Validaciones
  if (nombre === "" || isNaN(precio) || isNaN(cantidad)) {
    mensaje.textContent = "⚠️ Debe seleccionar un producto y cantidad válida.";
    return;
  }

  if (cantidad <= 0) {
    mensaje.textContent = "⚠️ La cantidad debe ser mayor a cero.";
    return;
  }

  // Si el producto ya existe, acumula la cantidad
  let index = productos.indexOf(nombre);
  if (index !== -1) {
    cantidades[index] += cantidad;
  } else {
    productos.push(nombre);
    precios.push(precio);
    cantidades.push(cantidad);
  }

  // Limpiar campos
  select.value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("cantidadProducto").value = "";

  mostrarLista();
}

// Mostrar lista de productos agregados
function mostrarLista() {
  let lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  for (let i = 0; i < productos.length; i++) {
    let subtotal = precios[i] * cantidades[i];
    lista.innerHTML += `
      <li class="flex justify-between">
        <span>${i + 1}. ${productos[i]} (x${cantidades[i]})</span>
        <span>$${subtotal.toFixed(2)}</span>
      </li>
    `;
  }
}

// Generar factura
function generarFactura() {
  if (productos.length === 0) {
    alert("No hay productos en la factura.");
    return;
  }

  let subtotal = 0;
  let productoCaro = productos[0];
  let maxPrecio = precios[0];

  for (let i = 0; i < productos.length; i++) {
    subtotal += precios[i] * cantidades[i];
    if (precios[i] > maxPrecio) {
      maxPrecio = precios[i];
      productoCaro = productos[i];
    }
  }

  let iva = subtotal * 0.15;
  let total = subtotal + iva;

  // Promedio de precios unitarios
  let sumaPrecios = precios.reduce((a, b) => a + b, 0);
  let promedio = sumaPrecios / precios.length;

  document.getElementById("resultados").innerHTML = `
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>IVA (15%):</strong> $${iva.toFixed(2)}</p>
    <p><strong>Total a pagar:</strong> $${total.toFixed(2)}</p>
    <hr class="my-2">
    <p><strong>Cantidad total de productos:</strong> ${cantidades.reduce((a,b)=>a+b,0)}</p>
    <p><strong>Producto más caro:</strong> ${productoCaro} ($${maxPrecio.toFixed(2)})</p>
    <p><strong>Promedio de precios:</strong> $${promedio.toFixed(2)}</p>
  `;
}
