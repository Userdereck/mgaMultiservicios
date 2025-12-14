// ===============================
// COTIZADOR TECHOS PVC
// ===============================

document.getElementById("quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const areaType = document.getElementById("areaType").value;

  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        length: length,
        width: width,
        area_type: areaType
      })
    });

    if (!response.ok) {
      throw new Error("Error al calcular la cotización");
    }

    const data = await response.json();

    // ===============================
    // MOSTRAR RESULTADOS
    // ===============================

    document.getElementById("area").textContent = data.area_m2;

    document.getElementById("panels").textContent =
      `${data.panels.quantity} unidades (RD$ ${data.panels.cost.toLocaleString("es-DO")})`;

    document.getElementById("molduras").textContent =
      `${data.moldura_f.quantity} unidades (RD$ ${data.moldura_f.cost.toLocaleString("es-DO")})`;

    document.getElementById("parales").textContent =
      `${data.parales.quantity} unidades (RD$ ${data.parales.cost.toLocaleString("es-DO")})`;

    document.getElementById("materialsCost").textContent =
      data.materials_cost.toLocaleString("es-DO");

    document.getElementById("laborCost").textContent =
      data.labor_cost.toLocaleString("es-DO");

    document.getElementById("total").textContent =
      data.total.toLocaleString("es-DO");

    document.getElementById("quoteResult").classList.remove("hidden");

  } catch (error) {
    alert("No se pudo calcular la cotización. Intenta nuevamente.");
    console.error(error);
  }
});

// ===============================
// MENÚ HAMBURGUESA
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  });
}
