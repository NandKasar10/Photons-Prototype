import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';

const StudentScan = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("camera"); // "camera" or "upload"

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      navigate('/login/student');
    }

    if (mode === "camera") {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          alert(`QR Scanned ✅: ${decodedText}`);
          localStorage.setItem("scannedSession", decodedText);
          scanner.clear();
          navigate('/student');
        },
        (err) => console.warn("Scan error:", err)
      );

      return () => {
        scanner.clear().catch(() => {});
      };
    }
  }, [mode, navigate]);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      alert(`QR from Image ✅: ${result}`);
      localStorage.setItem("scannedSession", result);
      navigate('/student');
    } catch (err) {
      alert("❌ Could not scan QR from image");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center font-comic text-white p-6">
      <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-green-300 mb-4">📷 Scan QR Code</h2>
        <p className="text-gray-300 mb-6">
          Choose a method to scan your attendance QR code.
        </p>

        {/* Mode Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("camera")}
            className={`px-4 py-2 rounded font-semibold transition ${
              mode === "camera"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            📷 Camera
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`px-4 py-2 rounded font-semibold transition ${
              mode === "upload"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            📂 Upload
          </button>
        </div>

        {/* Scanner / Upload UI */}
        {mode === "camera" ? (
          <div
            id="reader"
            className="w-full h-72 rounded-lg overflow-hidden border border-gray-600 shadow mb-6 bg-black"
          ></div>
        ) : (
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0 file:text-sm file:font-semibold
                         file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            <div id="reader" className="hidden"></div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/student')}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default StudentScan;