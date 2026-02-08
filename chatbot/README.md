# Smart Chatbot for College Enquiries

A full-stack web application designed to handle college-related queries using an intelligent chatbot and an admin panel for managing the knowledge base.

## Features

- **Student Interface:**
  - Real-time chat with instant responses.
  - Fuzzy matching for natural language queries (e.g., "fee structure" matches "What is the fee?").
  - Clean, responsive UI built with React and Tailwind CSS.

- **Admin Dashboard:**
  - Manage the chatbot's knowledge base (Q&A pairs).
  - Add, view, and delete questions without coding.
  - Secure and easy-to-use interface.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Lucide React (Icons), React Router.
- **Backend:** Python (Flask), SQLite, Difflib (for NLP matching).

## Setup & Running

### Prerequisites
- Node.js & npm
- Python 3.8+

### 1. Start the Backend (API)

Open a terminal in the root folder:

```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
The server will start at `http://localhost:5000`.

### 2. Start the Frontend (UI)

Open a **new** terminal window in the root folder:

```bash
cd frontend
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```
The application will be available at `http://localhost:5173`.

## Usage

1. **Chat:** Open `http://localhost:5173` to chat with the bot. Try asking:
   - "What are the fees?"
   - "Tell me about courses"
   - "Where is the hostel?"

2. **Admin:** Click "Admin Login" or go to `http://localhost:5173/admin` to manage questions.
