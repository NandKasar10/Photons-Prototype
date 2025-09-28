import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [username, setUsername] = useState('student1');
  const [password, setPassword] = useState('1234');
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
      const defaultUsers = [
        { username: 'student1', password: '1234', role: 'student' },
        { username: 'teacher1', password: 'abcd', role: 'teacher' },
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const match = users.find(
      (u) => u.username === username && u.password === password && u.role === 'student'
    );

    if (match) {
      localStorage.setItem('user', JSON.stringify(match));
      navigate('/student');
    } else {
      alert('Invalid student credentials ❌');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Student Login</h2>
      <input
        type="text"
        id="student-username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-2 px-4 py-2 border rounded w-64"
      />
      <input
        type="password"
        id="student-password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 px-4 py-2 border rounded w-64"
      />
      <button
        type="button"
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login as Student
      </button>
    </div>
  );
};

export default StudentLogin;