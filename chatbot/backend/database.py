import sqlite3

def init_db():
    conn = sqlite3.connect('chatbot.db')
    c = conn.cursor()
    
    # Create table for Q&A
    c.execute('''
        CREATE TABLE IF NOT EXISTS knowledge_base (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            keywords TEXT
        )
    ''')

    # Create table for users
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    ''')
    
    # Insert some initial data for Q&A
    c.execute('SELECT count(*) FROM knowledge_base')
    if c.fetchone()[0] == 0:
        initial_data = [
            ("What are the admission procedures?", "Admission forms are available online. Fill the form, submit documents, and pay the fee.", "admission, procedure, apply"),
            ("What is the fee structure?", "The fee structure varies by course. Please check the 'Fees' section on our website for detailed breakdown.", "fee, cost, price"),
            ("Tell me about the courses offered.", "We offer B.Tech, M.Tech, MBA, and PhD programs in various specializations.", "courses, programs, degree"),
            ("Where is the campus located?", "Our campus is located at 123 Education Lane, Knowledge City.", "location, address, where"),
            ("Is there a hostel facility?", "Yes, we have separate hostels for boys and girls with all modern amenities.", "hostel, accommodation, stay")
        ]
        c.executemany('INSERT INTO knowledge_base (question, answer, keywords) VALUES (?, ?, ?)', initial_data)
        print("Knowledge base initialized.")

    # Insert initial users
    c.execute('SELECT count(*) FROM users')
    if c.fetchone()[0] == 0:
        users_data = [
            ("admin", "admin123", "admin"),
            ("staff", "staff123", "staff"),
            ("student", "student123", "student")
        ]
        c.executemany('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', users_data)
        conn.commit()
        print("Users initialized.")
        
    conn.close()

def get_db_connection():
    conn = sqlite3.connect('chatbot.db')
    conn.row_factory = sqlite3.Row
    return conn

if __name__ == '__main__':
    init_db()
