import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(3);
  const [cancelled, setCancelled] = useState(['Maths - 11 AM']);
  const [todayClasses, setTodayClasses] = useState([
    { time: '09:00 AM', subject: 'Physics', status: 'pending' },
    { time: '11:00 AM', subject: 'Maths', status: 'cancelled' },
    { time: '01:00 PM', subject: 'Chemistry', status: 'attended' },
    { time: '03:00 PM', subject: 'English', status: 'pending' },
  ]);

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
    <div className="min-h-screen bg-white p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">🧑‍🎓 Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔓 Logout
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Schedule + Attendance */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">📊 Attendance Summary</h2>
            <p className="text-gray-700">You’ve attended <strong>{attendance}</strong> out of <strong>5</strong> classes today ✅</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">📅 Today's Classes</h2>
            <div className="space-y-3">
              {todayClasses.map((cls, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg border ${
                    cls.status === 'attended'
                      ? 'bg-green-100 border-green-300'
                      : cls.status === 'cancelled'
                      ? 'bg-red-100 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <span className="font-medium text-gray-700">{cls.subject}</span>
                  <span className="text-sm text-gray-500">{cls.time}</span>
                  <span className="text-xs font-semibold text-gray-600 capitalize">{cls.status}</span>
                </div>
              ))}
            </div>
          </div>

          {cancelled.length > 0 && (
            <div className="bg-red-50 border border-red-300 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-red-600 mb-2">❌ Cancelled Classes</h2>
              <ul className="list-disc list-inside text-gray-700">
                {cancelled.map((cls, i) => (
                  <li key={i}>{cls}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">🎯 Actions</h2>
          <button
            onClick={() => navigate('/student/scan')}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📷 Scan QR to Mark Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;