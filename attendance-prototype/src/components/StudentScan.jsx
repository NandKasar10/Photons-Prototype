import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const StudentScan = ({ onScan }) => {
  const [scannerReady, setScannerReady] = useState(false);

  useEffect(() => {
    setScannerReady(true);
  }, []);

  useEffect(() => {
    if (scannerReady) {
      const scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        (decodedText) => {
          scanner.clear();
          onScan(decodedText);
        },
        (errorMessage) => {
          console.warn('QR scan error:', errorMessage);
        }
      );
    }
  }, [scannerReady]);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Scan QR to Join Attendance</h2>
      <div
        id="reader"
        className="w-full max-w-md border rounded shadow-md bg-white p-2"
      />
    </div>
  );
};

export default StudentScan;
