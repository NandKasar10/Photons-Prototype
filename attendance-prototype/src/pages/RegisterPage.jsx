import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get('role');

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      alert('Username and password required ❌');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ username, password, role }));
    alert('Registered successfully ✅');
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Register as {role}</h2>
      <input
        type="text"
        placeholder="Choose username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 border rounded mb-2 w-64"
      />
      <input
        type="password"
        placeholder="Choose password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 border rounded mb-4 w-64"
      />
      <button
        onClick={handleRegister}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;