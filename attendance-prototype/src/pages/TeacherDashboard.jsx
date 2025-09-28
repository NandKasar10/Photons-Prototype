import { useNavigate } from 'react-router-dom';
import TodaySchedule from '../components/TodaySchedule';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem('user')) || { username: 'Teacher' };

  const handleLogout = () => {
  localStorage.removeItem('user');
  navigate('/');
};


  return (
    <>
    

    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">📚 Teacher Dashboard</h1>
        <p className="text-md text-gray-600 font-medium">Welcome, {teacher.username} 👋</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Schedule */}
        <div className="md:col-span-1">
          <TodaySchedule />
        </div>

        {/* Right: Actions */}
        <div className="md:col-span-2 flex flex-col justify-start items-center bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Actions</h2>
          <div className='flex gap-30'>


          <button
            onClick={() => navigate('/teacher/qr')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
            🎯 Generate QR for Current Class
          </button>
          <button
  onClick={handleLogout}
  className=" px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
>
  🔓 Logout
</button>
              </div>

          {/* Future options */}
          <div className="mt-6 space-y-2 w-full text-left text-gray-600">
            <p>📊 View Attendance Summary</p>
            <p>📝 Upload Class Notes</p>
            <p>📥 Download Student List</p>
          </div>
        </div>
      </div>
    </div>
            </>
  );
};

export default TeacherDashboard;