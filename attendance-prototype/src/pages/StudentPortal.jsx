
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      navigate('/login/student');
    }
    
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(true), 40);
      return () => clearTimeout(t);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div
      className={[
        'min-h-screen bg-gradient-to-br from-gray-950 via-purple-900 to-indigo-900 text-white px-4 py-8',
        'transition-colors',
      ].join(' ')}
      aria-label="Student portal"
    >
      <div
        className={[
          'max-w-7xl mx-auto',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          'transform transition-all duration-500 ease-out',
        ].join(' ')
      }
      >
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black text-2xl shadow-lg">
              🧑‍🎓
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Student Dashboard</h1>
              <p className="text-sm text-gray-300 mt-1">Welcome back — here's your attendance overview</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-300">Current Attendance</p>
              <p className="text-lg font-semibold text-green-300">{attendance} / 5</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition transform hover:-translate-y-0.5"
              aria-label="Logout"
            >
              🔓 Logout
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Summary + Today's classes (span 2 on large) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-purple-300">📊 Attendance Summary</h2>
                <div className="text-sm text-gray-300">Last updated: <span className="text-indigo-200">today</span></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all"
                      style={{ width: `${(attendance / 5) * 100}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="mt-3 text-sm text-gray-300">You’ve attended <strong className="text-white">{attendance}</strong> out of <strong>5</strong> classes today</div>
                </div>

                <div className="flex-shrink-0 flex gap-3">
                  <button
                    onClick={() => setAttendance((a) => Math.min(5, a + 1))}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white shadow-sm transition"
                    aria-label="Mark one attended"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => setAttendance((a) => Math.max(0, a - 1))}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white shadow-sm transition"
                    aria-label="Undo one attendance"
                  >
                    −1
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/6">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">📅 Today's Classes</h2>
              <ul className="grid gap-3">
                {[
                  { name: 'Physics', time: '9:00 AM', status: 'pending' },
                  { name: 'Maths', time: '11:00 AM', status: 'cancelled' },
                  { name: 'Chemistry', time: '1:00 PM', status: 'attended' },
                  { name: 'English', time: '3:00 PM', status: 'pending' },
                ].map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between bg-gradient-to-r from-gray-900/60 to-gray-900/40 px-4 py-3 rounded-lg border border-white/4"
                  >
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-gray-400">{c.time}</div>
                    </div>

                    <div className="text-sm font-semibold">
                      {c.status === 'pending' && <span className="text-yellow-300">Pending</span>}
                      {c.status === 'cancelled' && <span className="text-rose-400">Cancelled</span>}
                      {c.status === 'attended' && <span className="text-green-400">Attended</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Right: Scan / Quick actions */}
          <aside className="space-y-6">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/6 text-center">
              <h2 className="text-lg font-semibold text-purple-300 mb-3">📷 Attendance Scan</h2>
              <p className="text-gray-300 mb-4">Scan the QR code provided by your teacher to mark attendance.</p>

              <div className="mx-auto w-40 h-40 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/30 flex items-center justify-center mb-4 border border-white/6">
                {/* placeholder QR-like visual */}
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="opacity-70" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="15" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="2" y="15" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="11" y="11" width="2" height="2" fill="currentColor" />
                </svg>
              </div>

              <button
                onClick={() => navigate('/student/scan')}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-black font-semibold transition transform hover:-translate-y-0.5"
                aria-label="Scan QR code"
              >
                📷 Scan QR Code
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/4 text-sm text-gray-300">
              <h3 className="font-semibold text-purple-300 mb-2">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => alert('Attendance history coming soon')}
                  className="text-left px-3 py-2 rounded-lg hover:bg-white/6 transition"
                >
                  📜 View attendance history
                </button>
                <button
                  onClick={() => alert('Contacting teacher...')}
                  className="text-left px-3 py-2 rounded-lg hover:bg-white/6 transition"
                >
                  ✉️ Message teacher
                </button>
                <button
                  onClick={() => alert('Settings placeholder')}
                  className="text-left px-3 py-2 rounded-lg hover:bg-white/6 transition"
                >
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default StudentPortal;
