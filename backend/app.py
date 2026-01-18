from flask import Flask, jsonify, request
from gemini_client import request_key_points

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Hello from Flask!"})

@app.route("/get-key-points", methods=["POST"])
def get_key_points():
    data = request.get_json()
    script = data.get('script')
    if not script:
        return jsonify({"error": "Missing script"}), 400

    result = request_key_points(script)

    # If error happened inside send_to_gemini
    if "error" in result:
        return jsonify(result), 500

    return jsonify(result)


@app.route("/compare-scripts", methods=["POST"])
def compare_scripts():
    data = request.get_json()
    transcript = data.get("transcript", "")
    initial_script = data.get("initialScript", "")
    # For now just echo back the inputs
    return jsonify({
        "transcript": transcript,
        "initial_script": initial_script,
        "message": "Compare logic to be added"
    })

if __name__ == "__main__":
    app.run(port=3001, debug=True)
