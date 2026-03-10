from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "FlowDesk API Running"


# REGISTER USER
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO users (name, email, password, role)
        VALUES (%s, %s, %s, %s)
        """

        cursor.execute(query, (name, email, password, role))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# LOGIN USER
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM users WHERE email=%s AND password=%s"
        cursor.execute(query, (email, password))

        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "role": user["role"]
                }
            }), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
