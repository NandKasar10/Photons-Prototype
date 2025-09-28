import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';   // ✅ Correct import

const QRGenerator = () => {
  const [sessionCode, setSessionCode] = useState('');
  const [generated, setGenerated] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (sessionCode.trim() === '') {
      alert('Please enter a session code');
      return;
    }
    setGenerated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center font-comic text-white p-6">
      <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-blue-300 mb-4">📡 Generate QR Code</h2>
        <p className="text-gray-300 mb-6">
          Enter a session code to generate a QR for student attendance.
        </p>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Enter Session Code"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition"
          >
            Generate QR
          </button>
        </form>

        {/* QR Display */}
        {generated && (
          <div className="flex flex-col items-center gap-4">
            <QRCodeSVG
              value={sessionCode}
              size={200}
              bgColor="#111827"
              fgColor="#ffffff"
            />
            <p className="text-sm text-gray-300">
              Session Code: <span className="text-blue-300">{sessionCode}</span>
            </p>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/teacher')}
          className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;