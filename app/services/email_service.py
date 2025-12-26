import smtplib
from email.message import EmailMessage

EMAIL_ORIGEN = "multiservicesmga@gmail.com"
EMAIL_PASSWORD = "Zxcvb1659"

def enviar_correo(destinatario, asunto, cuerpo):
    msg = EmailMessage()
    msg["From"] = EMAIL_ORIGEN
    msg["To"] = destinatario
    msg["Subject"] = asunto
    msg.set_content(cuerpo)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL_ORIGEN, EMAIL_PASSWORD)
        smtp.send_message(msg)
