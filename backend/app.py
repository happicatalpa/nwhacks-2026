from flask import Flask, jsonify, request
from gemini_client import request_key_points, compare_points_to_transcript
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # <-- This allows all origins by default

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

    return result


@app.route("/compare-scripts", methods=["POST"])
def compare_scripts():
    data = request.get_json()
    transcript = data.get("transcript")
    key_points = data.get("keyPoints")

    if not transcript or not key_points:
        return jsonify({"error": "Missing key points or transcription"}), 400

    result = compare_points_to_transcript(key_points=key_points, transcript=transcript)

    # If error happened inside send_to_gemini
    if "error" in result:
        return jsonify(result), 500

    return result

if __name__ == "__main__":
    app.run(port=3001, debug=True)
