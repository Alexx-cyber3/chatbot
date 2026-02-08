import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, ArrowLeft, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = ({ user, onLogout }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', keywords: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.question || !newQuestion.answer) return;

    try {
      const response = await fetch('http://localhost:5000/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
      });
      
      if (response.ok) {
        setNewQuestion({ question: '', answer: '', keywords: '' });
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Q&A pair?")) return;
    
    try {
      await fetch(`http://localhost:5000/api/admin/questions/${id}`, {
        method: 'DELETE'
      });
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Knowledge Base Management</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UserIcon size={14} />
                <span>Logged in as: <span className="font-semibold text-blue-600 uppercase">{user?.role}</span> ({user?.username})</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition border border-red-100"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Add New Question Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Q&A Pair</h2>
          <form onSubmit={handleAddQuestion} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Question</label>
              <input
                type="text"
                placeholder="e.g. What is the fee structure?"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Keywords (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. fee, cost, price"
                value={newQuestion.keywords}
                onChange={(e) => setNewQuestion({ ...newQuestion, keywords: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-600">Answer</label>
              <textarea
                placeholder="e.g. The fee structure varies by course..."
                value={newQuestion.answer}
                onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none h-24"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button 
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
              >
                <Plus size={18} /> Add to Knowledge Base
              </button>
            </div>
          </form>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">Current Questions ({questions.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase">
                  <tr>
                    <th className="p-4 font-medium w-1/4">Question</th>
                    <th className="p-4 font-medium w-1/4">Answer</th>
                    <th className="p-4 font-medium w-1/6">Keywords</th>
                    <th className="p-4 font-medium w-20 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {questions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-500">No questions found. Add some above!</td>
                    </tr>
                  ) : (
                    questions.map((q) => (
                      <tr key={q.id} className="hover:bg-gray-50">
                        <td className="p-4 align-top text-gray-800 font-medium">{q.question}</td>
                        <td className="p-4 align-top text-gray-600">{q.answer}</td>
                        <td className="p-4 align-top text-blue-600 italic">{q.keywords}</td>
                        <td className="p-4 align-top text-right">
                          <button 
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
