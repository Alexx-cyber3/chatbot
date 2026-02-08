# chatbot
 cd backend
   2 python -m venv venv
   3 venv\Scripts\activate
   4 pip install -r requirements.txt
   5 python app.py
  The backend will start at http://localhost:5000.


  2. Start the Frontend (UI)
  In a new terminal window:
   1 cd frontend
   2 npm install
   3 npm run dev
  The frontend will start at http://localhost:5173
..............................................................
     1. Backend Auth:
       * Added a users table in the SQLite database.
       * Created a /api/login endpoint to verify credentials and return the user's role.
   2. Unified Login Page:
       * Created a modern, responsive login interface (Login.jsx) with branding and role icons.
       * Handles authentication and persists the session using localStorage.
   3. Role-Based Routing:
       * Students: Redirected to the Chat Interface after login.
       * Staff/Admin: Redirected to the Knowledge Base Management dashboard.
       * Protected Routes: Users cannot access the chat or admin panel without logging in.
   4. UI Enhancements:
       * Added personalized greetings (e.g., "Hello student!").
       * Added logout functionality in both the Chat and Admin headers.
       * Role labels in the Admin panel to distinguish between Admin and Staff logins.


  Login Credentials (Demo):
   * Admin: admin / admin123
   * Staff: staff / staff123
   * Student: student / student123


  How to Use:
   1. Restart the backend: cd backend && python app.py
   2. The app will now automatically redirect you to /login.
   3. Enter the credentials above to access the respective sections.
