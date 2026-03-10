import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="dbmslab",
        database="flowdesk",
        auth_plugin='mysql_native_password'
    )
    return connection