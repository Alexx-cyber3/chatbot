import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, GraduationCap, ShieldCheck, Briefcase } from 'lucide-react';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        // Save to localStorage for persistence
        localStorage.setItem('chat_user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'student') {
          navigate('/chat');
        } else {
          navigate('/admin');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <GraduationCap size={80} className="mb-6" />
          <h1 className="text-3xl font-bold mb-4">College Chatbot Portal</h1>
          <p className="text-blue-100 mb-8">Access the intelligent enquiry system and knowledge management dashboard.</p>
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 p-2 rounded-lg mb-2">
                <User size={20} />
              </div>
              <span className="text-xs">Student</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 p-2 rounded-lg mb-2">
                <Briefcase size={20} />
              </div>
              <span className="text-xs">Staff</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 p-2 rounded-lg mb-2">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs">Admin</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Demo Credentials:<br/>
              <span className="font-mono bg-gray-100 px-1">admin / admin123</span> | 
              <span className="font-mono bg-gray-100 px-1 ml-1">staff / staff123</span> | 
              <span className="font-mono bg-gray-100 px-1 ml-1">student / student123</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
