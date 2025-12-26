/*************************************
 * MG&A Multiservicios
 * Cotizaciones - Frontend JS
 *************************************/

const WHATSAPP_EMPRESA = "18498795077";

/*************************************
 * UI - Selector de servicio
 *************************************/
document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".service-btn");
  const pvcForm = document.getElementById("pvc-form");
  const acForm = document.getElementById("ac-form");
  const result = document.getElementById("resultado");
  const visual = document.getElementById("roof-visual");

  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const service = btn.dataset.service;
      pvcForm.classList.toggle("hidden", service !== "pvc");
      acForm.classList.toggle("hidden", service !== "ac");

      result.classList.add("hidden");
      visual.classList.add("hidden");
    });
  });

  agregarAreaPVC(); // una por defecto
});

/*************************************
 * AGREGAR ÁREA PVC
 *************************************/
function agregarAreaPVC() {
  const container = document.getElementById("areasContainer");

  const area = document.createElement("div");
  area.className = "area-card";

  area.innerHTML = `
    <select class="area-nombre">
      <option>Sala</option>
      <option>Cocina</option>
      <option>Baño</option>
      <option>Habitación</option>
      <option>Pasillo</option>
      <option>Otro</option>
    </select>

    <input type="number" class="area-largo" placeholder="Largo (pies)" required>
    <input type="number" class="area-ancho" placeholder="Ancho (pies)" required>

    <button type="button" onclick="this.parentElement.remove()">✖</button>
  `;

  container.appendChild(area);
}

/*************************************
 * COTIZACIÓN PVC
 *************************************/
function calcularPVC() {
  const nombre = document.getElementById("pvc-nombre")?.value.trim();
  const correo = document.getElementById("pvc-correo")?.value.trim();
  const whatsapp = document.getElementById("pvc-whatsapp")?.value.trim();
  const tipoArea = document.getElementById("areaTipo")?.value;

  if (!nombre || !whatsapp) {
    alert("Por favor completa los datos de contacto");
    return;
  }

  const areaCards = document.querySelectorAll(".area-card");
  if (areaCards.length === 0) {
    alert("Agrega al menos un área a cotizar");
    return;
  }

  // ======================
  // CONSTANTES
  // ======================
  const DESPERDICIO = 1.08;

  const ANCHO_PANEL_PULGADAS = 10;
  const DISTANCIA_PARALES_PIES = 3.61; // 1.1 m
  const LARGO_PARAL_PIES = 10;
  const LARGO_MOLDURA_PIES = 21;

  const PRECIO_PANEL = 500;
  const PRECIO_PARAL = 300;
  const PRECIO_MOLDURA = 450;

  const MANO_OBRA_RES = 800;
  const MANO_OBRA_COM = 1000;

  const PIES_A_METROS = 0.3048;

  // ======================
  // ACUMULADORES
  // ======================
  let totalPaneles = 0;
  let totalParales = 0;
  let totalMolduras = 0;
  let totalAreaM2 = 0;

  const areas = [];

  // ======================
  // PROCESAR ÁREAS
  // ======================
  areaCards.forEach(card => {
    const nombreArea = card.querySelector(".area-nombre")?.value || "Área";
    const largo_pies = parseFloat(card.querySelector(".area-largo")?.value);
    const ancho_pies = parseFloat(card.querySelector(".area-ancho")?.value);

    if (isNaN(largo_pies) || isNaN(ancho_pies)) return;

    // Área m² (para mano de obra)
    const area_m2 =
      (largo_pies * PIES_A_METROS) * (ancho_pies * PIES_A_METROS);
    totalAreaM2 += area_m2;

    // ======================
    // PANELES PVC
    // largo * 12 / 10
    // ======================
    const panelesBase = (largo_pies * 12) / ANCHO_PANEL_PULGADAS;
    const paneles = Math.ceil(panelesBase * DESPERDICIO);
    totalPaneles += paneles;

    // ======================
    // PARALES (a TODO el largo)
    // ======================
    const paralesPorAncho = Math.ceil(ancho_pies / DISTANCIA_PARALES_PIES);
    const paralesPorLinea = Math.ceil(largo_pies / LARGO_PARAL_PIES);
    const parales = paralesPorAncho * paralesPorLinea;
    totalParales += parales;

    // ======================
    // MOLDURAS
    // ======================
    const perimetro = 2 * (largo_pies + ancho_pies);
    const molduras = Math.ceil(perimetro / LARGO_MOLDURA_PIES);
    totalMolduras += molduras;

    // Guardar área para esquema
    areas.push({
      nombre: nombreArea,
      largo_pies,
      ancho_pies
    });
  });

  if (areas.length === 0) {
    alert("Las áreas agregadas no tienen medidas válidas");
    return;
  }

  // ======================
  // COSTOS
  // ======================
  const costoPaneles = totalPaneles * PRECIO_PANEL;
  const costoParales = totalParales * PRECIO_PARAL;
  const costoMolduras = totalMolduras * PRECIO_MOLDURA;

  const manoObra =
    totalAreaM2 *
    (tipoArea === "comercial" ? MANO_OBRA_COM : MANO_OBRA_RES);

  const total =
    costoPaneles + costoParales + costoMolduras + manoObra;

  // ======================
  // UI RESULTADO
  // ======================
  const result = document.getElementById("resultado");
  result.innerHTML = `
    <h3>Resumen de Cotización PVC</h3>
    <ul>
      <li><strong>Áreas cotizadas:</strong> ${areas.length}</li>
      <li><strong>Paneles PVC:</strong> ${totalPaneles}</li>
      <li><strong>Parales:</strong> ${totalParales}</li>
      <li><strong>Molduras F:</strong> ${totalMolduras}</li>
      <li><strong>Mano de obra:</strong> RD$ ${manoObra.toLocaleString()}</li>
    </ul>
    <h2>Total estimado: RD$ ${total.toLocaleString()}</h2>
    <p class="note">*Cotización aproximada, sujeta a verificación técnica*</p>
  `;
  result.classList.remove("hidden");

  // ======================
  // ESQUEMA VISUAL POR ÁREAS
  // ======================
  generarEsquemaPVC(areas);

  // ======================
  // WHATSAPP INTERNO
  // ======================
  const mensaje = `
📌 COTIZACIÓN PVC MG&A

👤 Cliente: ${nombre}
📞 WhatsApp: ${whatsapp}
📧 Correo: ${correo}

🧱 Áreas: ${areas.length}
🟦 Paneles: ${totalPaneles}
🟧 Parales: ${totalParales}
📏 Molduras: ${totalMolduras}

💰 Total estimado: RD$ ${total.toLocaleString()}
`;

  window.open(
    `https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
}


/*************************************
 * ESQUEMA VISUAL PVC
 *************************************/
function generarEsquemaPVC(areas) {
  const diagram = document.getElementById("roofDiagram");
  const visual = document.getElementById("roof-visual");

  if (!diagram || !visual) return;

  diagram.innerHTML = "";
  visual.classList.remove("hidden");

  const PIES_A_METROS = 0.3048;
  const ANCHO_PANEL_M = 0.254; // 10 pulgadas
  const DISTANCIA_PARALES_M = 1.1;

  areas.forEach(area => {
    const largo_m = area.largo_pies * PIES_A_METROS;
    const ancho_m = area.ancho_pies * PIES_A_METROS;

    const totalPaneles = Math.ceil(largo_m / ANCHO_PANEL_M);
    const totalParales = Math.ceil(ancho_m / DISTANCIA_PARALES_M);

    // =========================
    // CONTENEDOR DEL ÁREA
    // =========================
    const areaBox = document.createElement("div");
    areaBox.className = "area-diagram";

    const title = document.createElement("h4");
    title.textContent = area.nombre;
    areaBox.appendChild(title);

    const areaDiagram = document.createElement("div");
    areaDiagram.className = "area-roof";

    // =========================
    // ALTURA DINÁMICA (AHORA SÍ)
    // =========================
    const ALTURA_BASE = 120;
    const ALTURA_POR_PARALE = 12;
    areaDiagram.style.height =
      `${ALTURA_BASE + totalParales * ALTURA_POR_PARALE}px`;

    areaBox.appendChild(areaDiagram);
    diagram.appendChild(areaBox);

    // =========================
    // PANELES (AL ANCHO)
    // =========================
    for (let i = 0; i < totalPaneles; i++) {
      const panel = document.createElement("div");
      panel.className = "panel";

      panel.style.left = `${(i / totalPaneles) * 100}%`;
      panel.style.width = `${100 / totalPaneles}%`;
      panel.style.top = "0";
      panel.style.bottom = "0";

      areaDiagram.appendChild(panel);
    }

    // =========================
    // PARALES (A TODO EL LARGO)
    // =========================
    for (let i = 1; i < totalParales; i++) {
      const paral = document.createElement("div");
      paral.className = "paral-horizontal";

      paral.style.top = `${(i / totalParales) * 100}%`;

      areaDiagram.appendChild(paral);
    }
  });
}



/*************************************
 * COTIZACIÓN AC
 *************************************/
function calcularAC() {
  const nombre = document.getElementById("ac-nombre").value.trim();
  const whatsapp = document.getElementById("ac-whatsapp").value.trim();
  const tipo = document.getElementById("acServicio").value;
  const cantidad = parseInt(document.getElementById("cantidadAC").value);

  if (!nombre || !whatsapp || cantidad <= 0) {
    alert("Completa los datos");
    return;
  }

  const precio = tipo === "instalacion" ? 5000 : 1500;
  const total = precio * cantidad;

  const result = document.getElementById("resultado");
  result.innerHTML = `
    <h3>Cotización AC</h3>
    <p>Servicio: ${tipo}</p>
    <p>Cantidad: ${cantidad}</p>
    <h2>Total: RD$ ${total.toLocaleString()}</h2>
  `;
  result.classList.remove("hidden");
}
