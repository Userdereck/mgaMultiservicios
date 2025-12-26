from flask import Blueprint, render_template, request, jsonify
from .services.email_service import enviar_correo
from .services.pvc_calculator import calcular_pvc

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/cotizar', methods=['GET', 'POST'])
def cotizar():
    resultado = None
    if request.method == 'POST':
        largo = float(request.form['largo'])
        ancho = float(request.form['ancho'])
        resultado = calcular_pvc(largo, ancho)
    return render_template('quote.html', resultado=resultado)

@main.route("/enviar-cotizacion", methods=["POST"])
def enviar_cotizacion():
    data = request.json

    mensaje = f"""
Nueva cotización MG&A Multiservicios

Cliente: {data['nombre']}
Correo: {data['correo']}
WhatsApp: {data['whatsapp']}

Servicio: {data['tipo']}
Total estimado: RD$ {data['total']}
"""

    # Correo al cliente
    enviar_correo(
        destinatario=data['correo'],
        asunto="Tu cotización - MG&A Multiservicios",
        cuerpo=mensaje
    )

    # Correo al administrador
    enviar_correo(
        destinatario="admin@mga.com",
        asunto="Nueva cotización recibida",
        cuerpo=mensaje
    )

    return jsonify({"ok": True})