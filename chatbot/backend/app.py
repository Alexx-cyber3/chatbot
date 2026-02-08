from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db_connection
import difflib

app = Flask(__name__)
CORS(app)

# Initialize database on startup
init_db()

def find_best_match(user_query):
    conn = get_db_connection()
    questions = conn.execute('SELECT question, answer, keywords FROM knowledge_base').fetchall()
    conn.close()

    best_ratio = 0
    best_answer = "I'm sorry, I don't understand that question. Please contact the administration office."

    # Simple fuzzy matching
    for row in questions:
        # Check against question text
        ratio_q = difflib.SequenceMatcher(None, user_query.lower(), row['question'].lower()).ratio()
        
        # Check against keywords (if any)
        ratio_k = 0
        if row['keywords']:
            keywords = [k.strip() for k in row['keywords'].split(',')]
            for keyword in keywords:
                if keyword.lower() in user_query.lower():
                    ratio_k = 0.8 # Boost score if keyword matches
        
        current_score = max(ratio_q, ratio_k)
        
        if current_score > best_ratio:
            best_ratio = current_score
            best_answer = row['answer']
    
    if best_ratio < 0.4: # Threshold
        return "I'm sorry, I'm not sure about that. Could you please rephrase or contact support?"
    
    return best_answer

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password)).fetchone()
    conn.close()
    
    if user:
        return jsonify({
            'status': 'success',
            'user': {
                'username': user['username'],
                'role': user['role']
            }
        })
    else:
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    response = find_best_match(user_message)
    return jsonify({'response': response})

@app.route('/api/admin/questions', methods=['GET', 'POST'])
def manage_questions():
    conn = get_db_connection()
    
    if request.method == 'GET':
        questions = conn.execute('SELECT * FROM knowledge_base').fetchall()
        conn.close()
        return jsonify([dict(row) for row in questions])
    
    if request.method == 'POST':
        data = request.json
        conn.execute('INSERT INTO knowledge_base (question, answer, keywords) VALUES (?, ?, ?)',
                     (data['question'], data['answer'], data.get('keywords', '')))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Question added successfully'})

@app.route('/api/admin/questions/<int:id>', methods=['DELETE'])
def delete_question(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM knowledge_base WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success', 'message': 'Question deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
