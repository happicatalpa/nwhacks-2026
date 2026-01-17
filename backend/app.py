from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Hello from Flask!"})

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
