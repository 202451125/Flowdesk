from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)


# -----------------------------
# Home
# -----------------------------
@app.route("/")
def home():
    return "FlowDesk API Running"


# -----------------------------
# Register
# -----------------------------
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO users (name,email,password)
    VALUES (%s,%s,%s)
    """

    cursor.execute(query,(name,email,password))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"User registered successfully"})


# -----------------------------
# Login (email OR username)
# -----------------------------
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    identifier = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT * FROM users
    WHERE (email=%s OR name=%s) AND password=%s
    """

    cursor.execute(query,(identifier,identifier,password))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return jsonify({
            "message":"Login successful",
            "user":user
        })

    return jsonify({"error":"Invalid email or password"}),401


# -----------------------------
# Add Employee
# -----------------------------
@app.route("/employees", methods=["POST"])
def add_employee():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    role = data.get("role")
    department = data.get("department")

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO employees (name,email,role,department)
    VALUES (%s,%s,%s,%s)
    """

    cursor.execute(query,(name,email,role,department))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Employee added"})


# -----------------------------

# -----------------------------

# -----------------------------
# Delete Employee
# -----------------------------
@app.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM employees WHERE id=%s",(id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Employee deleted"})



@app.route("/tasks", methods=["GET"])
def get_tasks():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        tasks.id,
        tasks.title,
        tasks.status,
        tasks.priority,
        tasks.deadline,
        employees.name AS employee_name
    FROM tasks
    LEFT JOIN employees
    ON tasks.assigned_to = employees.id
    """

    cursor.execute(query)

    tasks = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def add_task():

    data = request.json

    title = data.get("title")
    priority = data.get("priority")
    assigned_to = data.get("assigned_to")
    deadline = data.get("deadline")

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO tasks (title, status, priority, assigned_to, deadline)
    VALUES (%s,%s,%s,%s,%s)
    """

    cursor.execute(query,(title,"TO_DO",priority,assigned_to,deadline))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Task added"})

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):

    data = request.json
    status = data.get("status")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE tasks SET status=%s WHERE id=%s",
        (status, task_id)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Task updated"})
@app.route("/employees", methods=["GET"])
def get_employees():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT id,name,email,role,department FROM employees")

    employees = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(employees)
@app.route("/dashboard-stats")
def dashboard_stats():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM employees")
    employees = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM tasks")
    tasks = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM projects")
    projects = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM tasks WHERE status='DONE'")
    completed = cursor.fetchone()["total"]

    cursor.close()
    conn.close()

    return jsonify({
        "employees": employees,
        "tasks": tasks,
        "projects": projects,
        "completed": completed
    })


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)