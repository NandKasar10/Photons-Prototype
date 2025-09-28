import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic
    localStorage.setItem('user', JSON.stringify({ role: 'teacher', username: form.username }));
    navigate('/teacher');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center font-comic text-white">
      <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-purple-300 mb-6 text-center">👩‍🏫 Teacher Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 text-center">
          Not registered?{" "}
          <button onClick={() => navigate('/register')} className="text-purple-300 hover:underline">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;