import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from calculations.pvc_ceiling import calculate_pvc

app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route("/api/quote", methods=["POST"])
def quote():
    data = request.json
    area = data["length"] * data["width"]
    result = calculate_pvc(area)
    return jsonify(result)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)