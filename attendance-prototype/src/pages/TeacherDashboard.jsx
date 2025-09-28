
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'teacher') {
      navigate('/login/teacher');
    }

    
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(true), 30);
      return () => clearTimeout(t);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-neutral-900 via-purple-900 to-indigo-900 text-white font-sans p-6"
      aria-label="Teacher dashboard"
    >
      <div
        className={[
          'max-w-7xl mx-auto transition-transform duration-500 ease-out',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
      >
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-black text-2xl shadow-lg">
              👩‍🏫
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Teacher Dashboard</h1>
              <p className="text-sm text-gray-300 mt-1">Manage sessions, generate QR codes and review recent classes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="hidden sm:flex flex-col text-right mr-4">
              <span className="text-sm text-gray-300">Active Sessions</span>
              <span className="text-lg font-semibold text-green-300">0</span>
            </div>

            <button
              onClick={() => navigate('/teacher/qr')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg text-white font-semibold shadow-md transition transform hover:-translate-y-0.5"
              aria-label="Generate QR for attendance"
            >
              🎯 Generate QR
            </button>

            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition transform hover:-translate-y-0.5"
              aria-label="Logout"
            >
              🔓 Logout
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Session / Controls (span 2) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-purple-300 mb-2">🎯 Active Session</h2>
                  <p className="text-gray-200">No active session right now.</p>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => navigate('/teacher/create-session')}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-black font-semibold transition"
                    aria-label="Create session"
                  >
                    + Create session
                  </button>
                  <button
                    onClick={() => alert('Start session feature coming soon')}
                    className="px-3 py-2 bg-white/6 hover:bg-white/10 rounded-lg text-white transition"
                    aria-label="Start session"
                  >
                    ▶ Start
                  </button>
                </div>
              </div>

              {/* subtle info row */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-gradient-to-r from-gray-900/40 to-gray-900/30 rounded-lg border border-white/4">
                  <div className="text-sm text-gray-400">Today</div>
                  <div className="text-lg font-semibold text-white">0 sessions</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-gray-900/40 to-gray-900/30 rounded-lg border border-white/4">
                  <div className="text-sm text-gray-400">Students Present</div>
                  <div className="text-lg font-semibold text-white">—</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-gray-900/40 to-gray-900/30 rounded-lg border border-white/4">
                  <div className="text-sm text-gray-400">Last QR</div>
                  <div className="text-lg font-semibold text-white">—</div>
                </div>
              </div>
            </div>

            {/* Recent Classes */}
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-purple-300">📅 Recent Classes</h2>
                <button
                  onClick={() => navigate('/teacher/classes')}
                  className="text-sm text-indigo-200 hover:underline"
                >
                  View all
                </button>
              </div>

              <ul className="space-y-3">
                <li className="flex flex-col sm:flex-row sm:justify-between bg-gradient-to-r from-gray-900/60 to-gray-900/40 px-4 py-3 rounded-lg border border-white/4">
                  <div>
                    <div className="font-medium">Physics</div>
                    <div className="text-sm text-gray-400">9:00 AM · 30 students</div>
                  </div>
                  <div className="mt-3 sm:mt-0 text-sm font-semibold text-green-400">Completed</div>
                </li>

                <li className="flex flex-col sm:flex-row sm:justify-between bg-gradient-to-r from-gray-900/60 to-gray-900/40 px-4 py-3 rounded-lg border border-white/4">
                  <div>
                    <div className="font-medium">Maths</div>
                    <div className="text-sm text-gray-400">11:00 AM · 28 students</div>
                  </div>
                  <div className="mt-3 sm:mt-0 text-sm font-semibold text-green-400">Completed</div>
                </li>

                <li className="flex flex-col sm:flex-row sm:justify-between bg-gradient-to-r from-gray-900/60 to-gray-900/40 px-4 py-3 rounded-lg border border-white/4">
                  <div>
                    <div className="font-medium">Chemistry</div>
                    <div className="text-sm text-gray-400">1:00 PM · 32 students</div>
                  </div>
                  <div className="mt-3 sm:mt-0 text-sm font-semibold text-yellow-300">Ongoing</div>
                </li>
              </ul>
            </div>
          </section>

          {/* Right column: Quick actions / Stats */}
          <aside className="space-y-6">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/6 text-center">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">📈 Quick Stats</h3>
              <div className="text-2xl font-bold text-indigo-200 mb-2">--</div>
              <p className="text-sm text-gray-300 mb-4">Overall attendance this week</p>
              <button
                onClick={() => alert('Exporting CSV...')}
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition"
                aria-label="Export attendance CSV"
              >
                ⤓ Export CSV
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/4 text-sm text-gray-300">
              <h4 className="font-semibold text-purple-300 mb-2">Shortcuts</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/teacher/create-session')} className="text-left px-3 py-2 rounded-lg hover:bg-white/6 transition">➕ Create session</button>
                <button onClick={() => navigate('/teacher/qr')} className="text-left px-3 py-2 rounded-lg hover:bg-white/6 transition">📷 Generate QR</button>
                <button onClick={() => navigate('/teacher/students')} className="text-left px-3 py-2 rounded-lg hover:bg-white/6 transition">👥 Manage students</button>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
