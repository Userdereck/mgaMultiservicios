import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from calculations.pvc_ceiling import calculate_pvc

app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)

# ===============================
# API COTIZADOR PVC (PRIMERO)
# ===============================

@app.route("/api/quote", methods=["POST"])
def quote():
    try:
        data = request.get_json()

        length = float(data.get("length"))
        width = float(data.get("width"))
        area_type = data.get("area_type", "residential")

        result = calculate_pvc(
            length_m=length,
            width_m=width,
            area_type=area_type
        )

        return jsonify(result), 200

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "error": "Error al calcular la cotización",
            "details": str(e)
        }), 500


# ===============================
# FRONTEND
# ===============================

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)


# ===============================
# RUN
# ===============================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
