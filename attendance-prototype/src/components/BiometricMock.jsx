import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const BiometricMock = ({ onVerify }) => {
  const videoRef = useRef(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // place models in public/models
      try {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
} catch (err) {
  console.error('Model load failed:', err);
  alert('Biometric model failed to load. Please check your internet or model files.');
}

    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        });
    };

    loadModels().then(startVideo);
  }, []);

  const handleScan = async () => {
    const result = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions());
    if (result) {
      setVerified(true);
      onVerify(true);
    } else {
      alert('Face not detected ❌');
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Biometric Verification</h2>
      <video ref={videoRef} autoPlay muted className="w-64 h-48 rounded shadow" />
      <button
        onClick={handleScan}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Verify Face
      </button>
      {verified && <p className="mt-4 text-green-600 font-semibold">Verified ✅</p>}
    </div>
  );
};

export default BiometricMock;