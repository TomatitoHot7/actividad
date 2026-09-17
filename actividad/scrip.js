document.addEventListener("DOMContentLoaded", () => {
  // 1. Auto-asignar fecha actual al selector de fecha si existe
  const inputFecha = document.getElementById("fecha_retiro");
  if (inputFecha && !inputFecha.value) {
    const hoy = new Date().toISOString().split("T")[0];
    inputFecha.value = hoy;
    inputFecha.max = hoy; // Evita seleccionar fechas futuras para el retiro
  }

  // 2. Resaltar stock crítico en la tabla de inventario
  const filasTabla = document.querySelectorAll("tbody tr");
  filasTabla.forEach((fila) => {
    const celdaStock = fila.querySelector("td:nth-child(4)");
    if (celdaStock) {
      const stock = parseInt(celdaStock.textContent.trim(), 10);
      if (stock === 0) {
        celdaStock.style.color = "#dc2626";
        celdaStock.style.fontWeight = "bold";
        celdaStock.textContent += " (Agotado)";
      } else if (stock <= 2) {
        celdaStock.style.color = "#d97706";
        celdaStock.style.fontWeight = "bold";
        celdaStock.textContent += " (Bajo)";
      }
    }
  });

  // 3. Confirmación previa al guardar el préstamo
  const formPrestamo = document.querySelector('form[action="/nuevo_prestamo"]');
  if (formPrestamo) {
    formPrestamo.addEventListener("submit", (e) => {
      const selectAlumno = document.getElementById("alumno");
      const selectComp = document.getElementById("componente");
      
      const alumnoTexto = selectAlumno.options[selectAlumno.selectedIndex].text;
      const compTexto = selectComp.options[selectComp.selectedIndex].text;

      const confirmar = confirm(
        `¿Confirmar el préstamo de "${compTexto}" a ${alumnoTexto}?`
      );

      if (!confirmar) {
        e.preventDefault();
      }
    });
  }
});
