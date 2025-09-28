
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(true);
      return;
    }
    const id = window.setTimeout(() => setMounted(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic (kept intact)
    localStorage.setItem('user', JSON.stringify({ role: 'teacher', username: form.username }));
    navigate('/teacher');
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-gradient-to-br from-neutral-900 via-purple-900 to-indigo-900 flex items-center justify-center font-sans px-4 py-12"
      aria-label="Teacher login page"
    >
      {/* subtle decorative accent */}
      <div className="pointer-events-none absolute right-8 top-8 w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 opacity-20 blur-2xl mix-blend-screen" />

      <div
        className={[
          'w-full max-w-md bg-black/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/6 transition-transform duration-500 ease-out',
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.995]',
        ].join(' ')}
        role="region"
        aria-live="polite"
      >
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow">
            <span className="text-2xl" aria-hidden>👩‍🏫</span>
            <h2 className="text-lg sm:text-2xl font-semibold text-white leading-tight">Teacher Login</h2>
          </div>
          <p className="mt-3 text-sm text-indigo-200/80">Secure portal for teachers — fast and reliable.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Teacher login form">
          <label className="block">
            <span className="sr-only">Username</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              aria-label="Username"
              required
            />
          </label>

          <label className="block relative">
            <span className="sr-only">Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition pr-12"
              aria-label="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-200/80 px-2 py-1 rounded-md hover:bg-white/6 transition"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </label>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg transform transition hover:-translate-y-0.5 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-400"
            aria-label="Login"
          >
            <span>Login</span>
            <svg className="w-5 h-5 opacity-90" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <button
            onClick={() => navigate('/register')}
            className="text-indigo-200 hover:underline"
            aria-label="Create an account"
          >
            Create an account
          </button>

          <button
            onClick={() => alert('If you forgot your password, contact admin.')}
            className="text-gray-300/80 hover:underline"
            aria-label="Forgot password"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
