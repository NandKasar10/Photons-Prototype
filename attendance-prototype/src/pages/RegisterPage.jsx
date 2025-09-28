
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [params] = useSearchParams();
  const role = params.get('role') || 'user';
  const navigate = useNavigate();

  
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loginChoiceOpen, setLoginChoiceOpen] = useState(false);

  useEffect(() => {
    
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(true);
    } else {
      const id = window.setTimeout(() => setMounted(true), 30);
      return () => window.clearTimeout(id);
    }
  }, []);

  const handleRegister = () => {
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    
    localStorage.setItem('user', JSON.stringify({ username, password, role }));

    
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 via-purple-900 to-indigo-900 px-4 py-12 font-sans">
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute -left-24 top-10 w-64 h-64 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-20 blur-3xl mix-blend-screen" />
      <div className="pointer-events-none absolute right-8 bottom-10 w-48 h-48 rounded-full bg-gradient-to-bl from-indigo-400 to-blue-500 opacity-12 blur-3xl mix-blend-screen" />

      <main
        className={[
          'w-full max-w-md bg-black/50 backdrop-blur-md border border-white/6 rounded-2xl p-8 shadow-2xl transition-transform duration-500 ease-out',
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.995]',
        ].join(' ')}
        role="region"
        aria-label={`Register as ${role}`}
      >
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow">
            <span className="text-2xl" aria-hidden>✳️</span>
            <h1 className="text-lg sm:text-xl font-semibold text-white">Register as {role}</h1>
          </div>
          <p className="mt-3 text-sm text-indigo-200/80">Create your account to continue — quick and secure.</p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="space-y-4"
          aria-label="Register form"
        >
          <label className="block">
            <span className="text-sm text-gray-300 mb-1 inline-block">Username</span>
            <input
              type="text"
              inputMode="text"
              autoComplete="username"
              placeholder="Choose username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              aria-label="Choose username"
            />
          </label>

          <label className="block relative">
            <span className="text-sm text-gray-300 mb-1 inline-block">Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Choose password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition pr-12"
              aria-label="Choose password"
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

          {error && (
            <div className="text-sm text-rose-400 bg-rose-900/20 p-2 rounded-md" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className={[
                'flex-1 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition transform',
                username.trim() && password.trim()
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.01] focus:ring-4 focus:ring-green-300'
                  : 'bg-green-700/60 cursor-not-allowed opacity-70',
              ].join(' ')}
              disabled={!username.trim() || !password.trim()}
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => setLoginChoiceOpen(true)}
              className="px-4 py-3 rounded-lg bg-white/6 text-white hover:bg-white/10 transition"
              aria-label="Go to login"
            >
              Login
            </button>
          </div>
        </form>

        <footer className="mt-5 text-center text-sm text-gray-300">
          <p>
            By registering you agree to the <button className="underline" onClick={() => alert('Terms placeholder')} aria-label="Read terms">terms</button>.
          </p>
        </footer>
      </main>

      {/* Success modal */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSuccessModalOpen(false)} />
          <div className="relative max-w-sm w-full bg-black/50 backdrop-blur-md border border-white/6 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-2">You Have Registered Succesfully</h3>
            <p className="text-sm text-gray-300 mb-4">Your account has been created. You can now login.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSuccessModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/10 transition"
                aria-label="Close success dialog"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSuccessModalOpen(false);
                  setLoginChoiceOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold transition"
              >
                Login now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login choice modal */}
      {loginChoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setLoginChoiceOpen(false)} />
          <div className="relative max-w-sm w-full bg-black/50 backdrop-blur-md border border-white/6 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-3">Choose login type</h3>
            <p className="text-sm text-gray-300 mb-4">Select whether you want to login as a teacher or a student.</p>
            <div className="grid gap-3">
              <button
                onClick={() => navigate('/login/student')}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold transition"
                aria-label="Student login"
              >
                Student Login
              </button>
              <button
                onClick={() => navigate('/login/teacher')}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold transition"
                aria-label="Teacher login"
              >
                Teacher Login
              </button>
              <button
                onClick={() => setLoginChoiceOpen(false)}
                className="w-full px-4 py-3 rounded-lg bg-white/6 text-white hover:bg-white/10 transition"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
