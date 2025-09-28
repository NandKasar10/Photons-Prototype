import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const LandingPage = () => {
  const navigate = useNavigate();
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    // Hero + Navbar entrance animation
    gsap.from('.fade-in', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });

    // Marquee scroll animation
    const marqueeWidth = marqueeRef.current.scrollWidth / 2;
    gsap.to(marqueeRef.current, {
      x: -marqueeWidth,
      duration: 12,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 font-comic relative overflow-hidden text-white">
      
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-purple-300">📡 Photons</h1>
        <div className="flex gap-6 text-gray-200 font-medium">
          <button onClick={() => navigate('/login/teacher')} className="hover:text-purple-400 transition">Teacher</button>
          <button onClick={() => navigate('/login/student')} className="hover:text-purple-400 transition">Student</button>
          <button onClick={() => navigate('/register')} className="hover:text-purple-400 transition">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center pt-32 pb-16 fade-in">
        <h1 className="text-5xl font-bold mb-4">
          Photons Attendance Portal 🚀
        </h1>
        <p className="text-lg text-purple-300">Think Beyond Limits</p>
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => navigate('/login/teacher')}
            className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
          >
            I'm a Teacher 👨‍🏫
          </button>
          <button
            onClick={() => navigate('/login/student')}
            className="px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
          >
            I'm a Student 👨‍🎓
          </button>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full h-[100px] overflow-hidden bg-white text-purple-700 border-t border-b">
        <div
          ref={marqueeRef}
          className="flex gap-12 px-6 whitespace-nowrap h-full items-center text-2xl font-bold"
          style={{ willChange: 'transform' }}
        >
          {[...Array(12)].map((_, i) => (
            <span key={i} className="mx-4">
              THRIVE BEYOND LIMITS →
            </span>
          ))}
          {[...Array(12)].map((_, i) => (
            <span key={`b-${i}`} className="mx-4">
              THRIVE BEYOND LIMITS →
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;