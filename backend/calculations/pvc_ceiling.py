import math

PVC_PANEL_WIDTH = 0.25
PVC_PANEL_LENGTH = 6
PVC_PANEL_PRICE = 450
PROFILE_PRICE = 180
SCREW_PRICE = 5
LABOR_PER_M2 = 350
WASTE_PERCENTAGE = 0.08

def calculate_pvc(length_m, width_m, area_type="residential"):
    """
    Calcula cotización estimada para techos PVC
    """

    import math

    # ===============================
    # CONFIGURACIÓN
    # ===============================
    PVC_PANEL_WIDTH_M = 0.254
    PVC_PANEL_LENGTH_M = 6.40
    PVC_PANEL_PRICE = 500

    MOLDURA_F_LENGTH_M = 6.40
    MOLDURA_F_PRICE = 450

    PARAL_LENGTH_M = 3.048
    PARAL_PRICE = 300
    PARAL_SPACING_M = 0.60

    LABOR_PER_M2 = 700

    WASTE = 0.10 if area_type == "commercial" else 0.08

    # ===============================
    # ÁREA
    # ===============================
    area_m2 = length_m * width_m

    # ===============================
    # LÁMINAS PVC
    # ===============================
    panel_area = PVC_PANEL_WIDTH_M * PVC_PANEL_LENGTH_M
    panels = math.ceil(area_m2 / panel_area)
    panels = math.ceil(panels * (1 + WASTE))
    panels_cost = panels * PVC_PANEL_PRICE

    # ===============================
    # MOLDURA F
    # ===============================
    perimeter = 2 * (length_m + width_m)
    molduras = math.ceil(perimeter / MOLDURA_F_LENGTH_M)
    molduras = math.ceil(molduras * 1.05)
    molduras_cost = molduras * MOLDURA_F_PRICE

    # ===============================
    # PARALES
    # ===============================
    paral_lines = math.ceil(width_m / PARAL_SPACING_M)
    paral_total_m = paral_lines * length_m
    parales = math.ceil(paral_total_m / PARAL_LENGTH_M)
    parales = math.ceil(parales * (1 + WASTE))
    parales_cost = parales * PARAL_PRICE

    # ===============================
    # COSTOS
    # ===============================
    materials_cost = panels_cost + molduras_cost + parales_cost
    labor_cost = area_m2 * LABOR_PER_M2
    total = materials_cost + labor_cost

    return {
        "area_m2": round(area_m2, 2),

        "panels": {
            "quantity": panels,
            "cost": panels_cost
        },
        "moldura_f": {
            "quantity": molduras,
            "cost": molduras_cost
        },
        "parales": {
            "quantity": parales,
            "cost": parales_cost
        },

        "materials_cost": materials_cost,
        "labor_cost": labor_cost,
        "total": total
    }
