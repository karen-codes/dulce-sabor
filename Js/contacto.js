document.addEventListener("DOMContentLoaded", () => {
  const resumenCompra = document.getElementById("resumen-compra");
  const form = document.getElementById("form-contacto");
  const panel = document.getElementById("panel-confirmacion");
  const datosFinales = document.getElementById("datos-finales");
  const btnOK = document.getElementById("btn-ok");

  // Mostrar resumen del carrito desde localStorage
  const carritoGuardado = localStorage.getItem("carritoDetalle");

  if (carritoGuardado) {
    const data = JSON.parse(carritoGuardado);
    let html = "<h3>Resumen de tu compra</h3><ul>";

    data.productos.forEach((item) => {
      html += `<li>${item.nombre} x ${item.cantidad} = $${item.total}</li>`;
    });

    html += `</ul>
      <p><strong>Subtotal:</strong> $${data.subtotal}</p>
      <p><strong>IVA (15%):</strong> $${data.iva}</p>
      <p><strong>Total:</strong> $${data.total}</p>`;

    resumenCompra.innerHTML = html;
    resumenCompra.style.display = "block";
  }

  // Manejar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const comentarios = document.getElementById("comentarios").value;

    let mensaje = `
      <p><strong>¡Gracias, ${nombre}!</strong></p>
      <p>Hemos recibido tu solicitud y pronto nos pondremos en contacto al correo <strong>${email}</strong> o al número <strong>${telefono}</strong>.</p>
      <p><strong>Comentarios:</strong> ${comentarios || "(Sin comentarios)"}</p>
      <br><h4>Resumen de tu pedido:</h4>`;

    if (carritoGuardado) {
      const data = JSON.parse(carritoGuardado);
      mensaje += "<ul>";
      data.productos.forEach((item) => {
        mensaje += `<li>${item.nombre} x ${item.cantidad} = $${item.total}</li>`;
      });
      mensaje += `</ul>
        <p><strong>Total:</strong> $${data.total}</p>`;
    }

    datosFinales.innerHTML = mensaje;
    form.style.display = "none";
    panel.style.display = "block";
    resumenCompra.style.display = "none";
   // Limpiar almacenamiento y formulario
    localStorage.removeItem("carritoDetalle");
    form.reset();
  });

  // Botón OK: volver a mostrar formulario vacío
  btnOK.addEventListener("click", () => {
    form.style.display = "block";
    panel.style.display = "none";
    datosFinales.innerHTML = "";
  });
});

form.addEventListener("reset", () => {
  resumenCompra.innerHTML = "";
  resumenCompra.style.display = "none";
  localStorage.removeItem("carritoDetalle");

  const mensajeReset = document.getElementById("mensaje-reset");
  mensajeReset.textContent = "Formulario y resumen restablecidos correctamente.";
  mensajeReset.style.display = "block";

  setTimeout(() => {
    mensajeReset.style.display = "none";
    mensajeReset.textContent = "";
  }, 3000);
});


