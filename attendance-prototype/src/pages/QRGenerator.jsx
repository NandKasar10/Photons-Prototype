import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useNavigate } from 'react-router-dom';

const QRGenerator = () => {
  const [sessionId, setSessionId] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const navigate = useNavigate();

  const generateSession = () => {
    const id = `session-${Date.now()}`;
    setSessionId(id);
    localStorage.setItem('activeSession', id);
    setTimeLeft(120);
  };

  useEffect(() => {
    generateSession();

    const qrInterval = setInterval(generateSession, 2 * 60 * 1000);
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(qrInterval);
      clearInterval(countdown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">🎯 QR Generator</h1>

      <QRCode
        value={sessionId}
        size={220}
        logoImage="/logo.jpg"
        logoWidth={40}
        logoHeight={40}
        bgColor="#ffffff"
        fgColor="#000000"
      />

      <p className="mt-4 text-green-700 font-semibold">Session ID: {sessionId}</p>
      <p className="text-red-600 text-sm mt-1">QR expires in: {timeLeft}s</p>

      <button
        onClick={generateSession}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        🔄 Refresh QR Manually
      </button>

      <button
        onClick={() => navigate('/teacher')}
        className="mt-4 px-4 py-2 text-indigo-600 underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default QRGenerator;