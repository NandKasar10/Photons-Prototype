import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'teacher') {
      navigate('/login/teacher');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white font-comic p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-300">👩‍🏫 Teacher Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
        >
          🔓 Logout
        </button>
      </div>

      {/* Active Session */}
      <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-300 mb-2">🎯 Active Session</h2>
        <p className="text-gray-200">No active session right now.</p>
        <button
          onClick={() => navigate('/teacher/qr')}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition"
        >
          Generate QR for Attendance
        </button>
      </div>

      {/* Recent Classes */}
      <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-purple-300 mb-4">📅 Recent Classes</h2>
        <ul className="space-y-3">
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">Physics - 9:00 AM <span className="text-green-400">Completed</span></li>
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">Maths - 11:00 AM <span className="text-green-400">Completed</span></li>
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">Chemistry - 1:00 PM <span className="text-yellow-300">Ongoing</span></li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;