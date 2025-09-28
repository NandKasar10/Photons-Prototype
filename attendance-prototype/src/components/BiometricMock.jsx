import { useState } from 'react';

const BiometricMock = ({ onVerify }) => {
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleScan = () => {
    setScanning(true);

    // Simulate fingerprint scan delay
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
      localStorage.setItem('fingerprintVerified', 'true');
      onVerify(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-xl font-bold mb-4">🔒 Fingerprint Verification</h2>

      <div className="w-32 h-32 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full flex items-center justify-center shadow-lg mb-6">
        {scanning ? (
          <div className="animate-pulse text-white font-bold">Scanning...</div>
        ) : (
          <div className="text-white text-3xl">🧤</div>
        )}
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className={`px-6 py-2 text-white rounded ${
          scanning ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        } transition`}
      >
        {scanning ? 'Scanning...' : 'Place Finger to Scan'}
      </button>

      {verified && (
        <p className="mt-4 text-green-600 font-semibold">Fingerprint Verified ✅</p>
      )}
    </div>
  );
};

export default BiometricMock;