import { useEffect, useRef, useState } from 'react';

const BiometricMock = ({ onVerify }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera access failed:', err);
        alert('Camera access denied ❌');
      }
    };

    startCamera();
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    localStorage.setItem('faceImage', imageData); // ✅ Save to localStorage

    setVerified(true);
    onVerify(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Biometric Verification (Live Scan)</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-64 h-48 rounded shadow border mb-4"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button
        onClick={handleCapture}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        OK / Scan Face
      </button>
      {verified && (
        <p className="mt-4 text-green-600 font-semibold">Verified & Saved ✅</p>
      )}
    </div>
  );
};

export default BiometricMock;