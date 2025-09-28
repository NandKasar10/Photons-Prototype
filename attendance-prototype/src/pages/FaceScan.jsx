import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FaceScan = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      navigate('/login/student');
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Camera error:', err);
        alert('Camera access failed ❌');
      });
  }, []);

  const handleSave = () => {
    const sessionId = localStorage.getItem('scannedSession');
    const user = JSON.parse(localStorage.getItem('user'));
    const attendance = JSON.parse(localStorage.getItem(`attendance-${sessionId}`)) || [];

    attendance.push({
      name: user.username,
      time: new Date().toLocaleTimeString(),
    });

    localStorage.setItem(`attendance-${sessionId}`, JSON.stringify(attendance));
    alert('Attendance marked successfully ✅');
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">🧠 Face Scan</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-72 h-72 rounded shadow border border-gray-300 mb-4"
      />
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ✅ Mark Attendance
      </button>
    </div>
  );
};

export default FaceScan;