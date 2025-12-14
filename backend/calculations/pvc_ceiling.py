import math

PVC_PANEL_WIDTH = 0.25
PVC_PANEL_LENGTH = 6
PVC_PANEL_PRICE = 450
PROFILE_PRICE = 180
SCREW_PRICE = 5
LABOR_PER_M2 = 350
WASTE_PERCENTAGE = 0.08

def calculate_pvc(area_m2):
    panels = math.ceil(area_m2 / (PVC_PANEL_WIDTH * PVC_PANEL_LENGTH))
    panels = math.ceil(panels * (1 + WASTE_PERCENTAGE))
    profiles = math.ceil(area_m2 * 1.1)
    screws = math.ceil(area_m2 * 20)

    materials = panels * PVC_PANEL_PRICE + profiles * PROFILE_PRICE + screws * SCREW_PRICE
    labor = area_m2 * LABOR_PER_M2

    return {
        "panels": panels,
        "profiles_m": profiles,
        "screws": screws,
        "materials_cost": materials,
        "labor_cost": labor,
        "total": materials + labor
    }