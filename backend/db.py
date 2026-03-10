import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="127.0.0.1",   # IMPORTANT (not localhost)
        user="root",
        password="dbmslab",
        database="flowdesk",
        auth_plugin='mysql_native_password'
    )
    return connection
