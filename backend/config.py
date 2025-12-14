# ===============================
# CONFIGURACIÓN GENERAL MG&A
# ===============================

# Conversión de medidas
FEET_TO_METER = 0.3048
INCH_TO_METER = 0.0254

# ===============================
# TECHOS PVC
# ===============================

PVC_PANEL = {
    "width_m": 0.254,     # 10 pulgadas
    "length_m": 6.40,     # 21 pies
    "price": 500          # RD$
}

MOLDURA_F = {
    "length_m": 6.40,     # 21 pies
    "price": 450
}

PARAL = {
    "length_m": 3.048,    # 10 pies
    "price": 300,
    "spacing_m": 0.60     # 60 cm
}

# ===============================
# MANO DE OBRA
# ===============================

LABOR_COST = {
    "residential": 700,   # RD$ / m²
    "commercial": 850
}

# ===============================
# DESPERDICIO
# ===============================

WASTE = {
    "residential": 0.08,
    "commercial": 0.10
}
