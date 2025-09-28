import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentScan = () => {
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setSessionId(decodedText);
        localStorage.setItem('scannedSession', decodedText);
        scanner.clear();
      },
      (error) => {
        console.warn('QR scan error:', error);
      }
    );

    return () => scanner.clear();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Html5Qrcode.getCameras().then(() => {
        const qr = new Html5Qrcode('qr-reader');
        qr.scanFile(file, true)
          .then((decodedText) => {
            setSessionId(decodedText);
            localStorage.setItem('scannedSession', decodedText);
          })
          .catch((err) => console.error('Image scan error:', err));
      });
    }
  };

  const handleNext = () => {
    if (!sessionId) return alert('Scan QR first ❌');
    navigate('/student/face');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📷 Scan QR Code</h2>
      <div id="qr-reader" className="w-72 h-72 mb-4" />
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {sessionId && <p className="text-green-700 font-semibold mb-2">Session ID: {sessionId}</p>}
      <button
        onClick={handleNext}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Next: Face Scan
      </button>
    </div>
  );
};

export default StudentScan;