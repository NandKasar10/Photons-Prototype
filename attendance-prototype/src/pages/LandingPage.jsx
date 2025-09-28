import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const LandingPage = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // Entrance animation
    gsap.from('.fade-in', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-white
 font-comic relative z-0">
      {/* Header */}
      <div className="text-center py-12 fade-in z-20 relative">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Photons Attendance Portal 🚀</h1>
        <p className="text-lg text-gray-600">Thrive Beyond Limits</p>
      </div>

      {/* Role Selection */}
      <div className="flex justify-center gap-8 mt-16 fade-in z-20 relative">
        <button
          onClick={() => navigate('/login/teacher')}
          className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          I'm a Teacher 👩‍🏫
        </button>
        <button
          onClick={() => navigate('/login/student')}
          className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          I'm a Student 🧑‍🎓
        </button>
      </div>
    </div>
  );
};

export default LandingPage;