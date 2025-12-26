"""
Lógica de cotización para Techos PVC
MG&A Multiservicios
"""

def calcular_pvc(
    largo: float,
    ancho: float,
    tipo_area: str = "residencial"
) -> dict:
    """
    Calcula una cotización estimada para techo PVC.

    Parámetros:
    - largo (m)
    - ancho (m)
    - tipo_area: residencial | comercial

    Retorna:
    Diccionario con desglose de materiales y total
    """

    # =========================
    # Validaciones básicas
    # =========================
    if largo <= 0 or ancho <= 0:
        raise ValueError("Las medidas deben ser mayores que cero")

    # =========================
    # Cálculo de área
    # =========================
    area = round(largo * ancho, 2)

    # =========================
    # Dimensiones reales de materiales
    # =========================
    PANEL_ANCHO_M = 0.254      # 10 pulgadas
    PANEL_LARGO_M = 6.40       # 21 pies

    # =========================
    # Precios (RD$)
    # =========================
    PRECIO_PANEL = 500
    PRECIO_MOLDURA = 450
    PRECIO_PARAL = 300

    MANO_OBRA_RESIDENCIAL = 800
    MANO_OBRA_COMERCIAL = 1000

    DESPERDICIO = 1.08  # 8%

    # =========================
    # Cálculo de materiales
    # =========================
    paneles_base = ancho / PANEL_ANCHO_M
    paneles = int(paneles_base * DESPERDICIO) + 1

    molduras = int((largo * 2) / PANEL_LARGO_M) + 1

    parales = int((area / 3.05) * DESPERDICIO) + 1

    # =========================
    # Mano de obra
    # =========================
    if tipo_area == "comercial":
        mano_obra = area * MANO_OBRA_COMERCIAL
    else:
        mano_obra = area * MANO_OBRA_RESIDENCIAL

    # =========================
    # Totales
    # =========================
    total_paneles = paneles * PRECIO_PANEL
    total_molduras = molduras * PRECIO_MOLDURA
    total_parales = parales * PRECIO_PARAL

    total = round(
        total_paneles +
        total_molduras +
        total_parales +
        mano_obra,
        2
    )

    # =========================
    # Respuesta estructurada
    # =========================
    return {
        "area_m2": area,
        "materiales": {
            "paneles_pvc": {
                "cantidad": paneles,
                "precio_unitario": PRECIO_PANEL,
                "total": total_paneles
            },
            "molduras_f": {
                "cantidad": molduras,
                "precio_unitario": PRECIO_MOLDURA,
                "total": total_molduras
            },
            "parales": {
                "cantidad": parales,
                "precio_unitario": PRECIO_PARAL,
                "total": total_parales
            }
        },
        "mano_obra": mano_obra,
        "total_estimado": total,
        "nota": (
            "Esta cotización es una estimación aproximada. "
            "El precio final puede variar tras visita técnica."
        )
    }
