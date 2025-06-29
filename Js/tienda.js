const productos = [
  { id: 1, nombre: "Pastel de Chocolate", precio: 15.0 },
  { id: 2, nombre: "Pastel de Vainilla", precio: 13.5 },
  { id: 3, nombre: "Pastel de Frutas", precio: 16.0 },
  { id: 4, nombre: "Red Velvet", precio: 17.0 },
  { id: 5, nombre: "Pastel de Zanahoria", precio: 14.0 },
  { id: 6, nombre: "Cheesecake", precio: 18.5 },
];

let carrito = {};

const carritoHTML = document.querySelector(".carrito-items");
const subtotalEl = document.querySelector(".subtotal");
const ivaEl = document.querySelector(".iva");
const totalEl = document.querySelector(".total");

document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".producto button");
  botonesAgregar.forEach((btn, index) => {
    btn.addEventListener("click", () => agregarProducto(productos[index]));
  });

  document.querySelector(".btn-comprar").addEventListener("click", () => {
    if (Object.keys(carrito).length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const detalle = Object.values(carrito).map(item => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precio,
      total: (item.precio * item.cantidad).toFixed(2),
    }));

    const subtotal = detalle.reduce((sum, item) => sum + parseFloat(item.total), 0);
    const iva = subtotal * 0.15;
    const total = subtotal + iva;

    // Guardar en localStorage
    localStorage.setItem("carritoDetalle", JSON.stringify({
      productos: detalle,
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      total: total.toFixed(2),
    }));

     // Redirigir al formulario
    window.location.href = "contacto.html";
  });
});

function agregarProducto(producto) {
  if (carrito[producto.id]) {
    carrito[producto.id].cantidad += 1;
  } else {
    carrito[producto.id] = {
      ...producto,
      cantidad: 1,
    };
  }

  actualizarCarrito();
}
function actualizarCarrito() {
  carritoHTML.innerHTML = "";
  let subtotal = 0;

  const items = Object.values(carrito);
  if (items.length === 0) {
    carritoHTML.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    items.forEach((item) => {
      const totalItem = item.precio * item.cantidad;
      subtotal += totalItem;

      const div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `<p>${item.nombre} x ${item.cantidad} = $${totalItem.toFixed(2)}</p>`;
      carritoHTML.appendChild(div);
    });
  }

  const iva = subtotal * 0.15;
  const total = subtotal + iva;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  ivaEl.textContent = `$${iva.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;

}

