document.getElementById("quoteForm").addEventListener("submit", async e => {
  e.preventDefault();

  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);

  const response = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ length, width })
  });

  const data = await response.json();

  document.getElementById("panels").textContent = data.panels;
  document.getElementById("profiles").textContent = data.profiles_m;
  document.getElementById("screws").textContent = data.screws;
  document.getElementById("materialsCost").textContent = data.materials_cost.toLocaleString("es-DO");
  document.getElementById("laborCost").textContent = data.labor_cost.toLocaleString("es-DO");
  document.getElementById("total").textContent = data.total.toLocaleString("es-DO");

  document.getElementById("quoteResult").classList.remove("hidden");
});