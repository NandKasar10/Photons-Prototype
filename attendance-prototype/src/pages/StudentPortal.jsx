import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(3);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      navigate('/login/student');
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
        <h1 className="text-3xl font-bold text-green-300">🧑‍🎓 Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
        >
          🔓 Logout
        </button>
      </div>

      {/* Attendance Summary */}
      <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-300 mb-2">📊 Attendance Summary</h2>
        <p>
          You’ve attended <strong>{attendance}</strong> out of <strong>5</strong> classes today ✅
        </p>
      </div>

      {/* Today’s Classes */}
      <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-300 mb-4">📅 Today’s Classes</h2>
        <ul className="space-y-3">
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">
            Physics - 9:00 AM <span className="text-yellow-300">Pending</span>
          </li>
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">
            Maths - 11:00 AM <span className="text-red-400">Cancelled</span>
          </li>
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">
            Chemistry - 1:00 PM <span className="text-green-400">Attended</span>
          </li>
          <li className="flex justify-between bg-gray-800 px-4 py-2 rounded">
            English - 3:00 PM <span className="text-yellow-300">Pending</span>
          </li>
        </ul>
      </div>

      {/* Scan QR Option */}
      <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-semibold text-purple-300 mb-4">📷 Attendance Scan</h2>
        <p className="text-gray-300 mb-4">Scan the QR code provided by your teacher to mark attendance.</p>
        <button
          onClick={() => navigate('/student/scan')}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded text-white font-semibold transition"
        >
          📷 Scan QR Code
        </button>
      </div>
    </div>
  );
};

export default StudentPortal;