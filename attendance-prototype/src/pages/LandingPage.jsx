import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const LandingPage = () => {
  const navigate = useNavigate();
  const marqueeRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      
      gsap.from('.fade-in', {
        opacity: 0,
        y: 28,
        duration: prefersReduced ? 0.01 : 0.9,
        stagger: 0.15,
        ease: 'power2.out',
      });

      if (!prefersReduced && marqueeRef.current) {
        
        const marqueeEl = marqueeRef.current;
        const marqueeWidth = marqueeEl.getBoundingClientRect().width / 2;

        
        gsap.to(marqueeEl, {
          x: -marqueeWidth,
          duration: 14,
          ease: 'linear',
          repeat: -1,
          force3D: true,
        });
      }
    }, rootRef); 

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen relative overflow-hidden text-white bg-gradient-to-br from-neutral-900 via-purple-900 to-indigo-900 font-sans"
      aria-label="Photons landing page"
    >
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 blur-3xl mix-blend-screen" />
      <div className="pointer-events-none absolute -right-28 bottom-20 w-96 h-96 rounded-full bg-gradient-to-l from-indigo-400 to-blue-500 opacity-20 blur-3xl mix-blend-screen" />

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 py-4 bg-black/30 backdrop-blur-sm shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 rounded-xl z-50 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 fade-in">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-300 to-indigo-300 flex items-center justify-center text-black text-xl shadow-sm">
            📡
          </div>
          <div>
            <h1 className="text-lg font-semibold text-purple-100 leading-none">Photons</h1>
            <p className="text-xs text-purple-200/80 -mt-0.5">Attendance Portal</p>
          </div>
        </div>

        <div className="hidden md:flex gap-6 text-gray-200 font-medium fade-in">
          <button onClick={() => navigate('/login/teacher')} className="px-4 py-2 rounded-full bg-white/6 hover:bg-white/10 transition transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Teacher
          </button>
          <button onClick={() => navigate('/login/student')} className="px-4 py-2 rounded-full bg-white/6 hover:bg-white/10 transition transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-300">
            Student
          </button>
          <button onClick={() => navigate('/register')} className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow hover:brightness-105 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300">
            Register
          </button>
        </div>

        {/* Mobile actions */}
        <div className="md:hidden fade-in">
          <button onClick={() => navigate('/login/student')} className="px-3 py-2 rounded-md bg-white/8 hover:bg-white/12 transition">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20">
        <section className="text-center pt-32 pb-6 fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
            Photons Attendance Portal <span className="inline-block ml-2">🚀</span>
          </h1>
          <p className="text-base md:text-lg text-purple-200 max-w-2xl mx-auto">
            Think beyond limits — simple, secure, and smart attendance for teachers and students.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => navigate('/login/teacher')}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-xl transform transition hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              I'm a Teacher <span className="opacity-90 text-lg">👨‍🏫</span>
            </button>

            <button
              onClick={() => navigate('/login/student')}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-xl transform transition hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              I'm a Student <span className="opacity-90 text-lg">👨‍🎓</span>
            </button>
          </div>
        </section>

        {/* Marquee Section */}
        <div className="mt-10 relative w-full h-24 md:h-28 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div
            ref={marqueeRef}
            className="flex items-center h-full whitespace-nowrap gap-10 px-6 text-xl md:text-2xl font-semibold text-purple-100/90"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          >
            {[...Array(16)].map((_, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-purple-300/95 tracking-wide">THRIVE BEYOND LIMITS</span>
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            ))}
            {[...Array(16)].map((_, i) => (
              <span key={`b-${i}`} className="flex items-center gap-3">
                <span className="text-purple-300/95 tracking-wide">THRIVE BEYOND LIMITS</span>
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
