
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = () => {
  const [sessionCode, setSessionCode] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const qrContainerRef = useRef(null);

  useEffect(() => {
    
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (sessionCode.trim() === '') {
      alert('Please enter a session code');
      return;
    }
    setGenerated(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('Unable to copy. Please copy manually.');
    }
  };

  const handleDownloadPNG = () => {
    const svgEl = qrContainerRef.current?.querySelector('svg');
    if (!svgEl) {
      alert('QR not found');
      return;
    }

    
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2; // higher resolution
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#0f1724';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Failed to export image');
          URL.revokeObjectURL(url);
          return;
        }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `qr-${sessionCode || 'session'}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.onerror = () => {
      alert('Failed to create image for download.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center font-sans p-6">
      <div
        className={[
          'w-full max-w-xl bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/6 transition-transform duration-400',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
        role="region"
        aria-label="QR code generator"
      >
        <header className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">📡 Generate QR Code</h2>
          <p className="text-sm text-gray-300">Create a QR for a session code — students scan to mark attendance.</p>
        </header>

        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 items-stretch mb-6">
          <input
            type="text"
            aria-label="Session code"
            placeholder="Enter session code (e.g. PHY101-2025)"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-[1.02] transform transition"
            aria-label="Generate QR"
          >
            Generate
          </button>
        </form>

        <div
          className={[
            'flex flex-col md:flex-row items-center justify-between gap-4',
          ].join(' ')}
        >
          {/* QR area */}
          <div className="flex-1 flex flex-col items-center">
            <div
              ref={qrContainerRef}
              className={[
                'rounded-lg p-4 bg-gradient-to-b from-gray-800/40 to-gray-800/20 border border-white/6',
                generated ? 'scale-100 opacity-100' : 'scale-95 opacity-60',
                'transition-all duration-300',
              ].join(' ')}
              aria-live="polite"
            >
              {generated ? (
                <QRCodeSVG
                  value={sessionCode}
                  size={200}
                  bgColor="#0f1724"
                  fgColor="#ffffff"
                  level="M"
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-sm">No QR yet</div>
                    <div className="text-xs mt-1 text-gray-500">Enter a session code and press Generate</div>
                  </div>
                </div>
              )}
            </div>

            {generated && (
              <div className="mt-3 text-sm text-gray-300 text-center">
                Session Code: <span className="text-blue-300 font-medium">{sessionCode}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-3">
            <button
              onClick={handleCopy}
              disabled={!generated}
              className="w-full md:w-48 px-4 py-3 rounded-lg bg-white/6 text-white hover:bg-white/10 transition flex items-center justify-center gap-2"
              aria-label="Copy session code"
            >
              {copied ? 'Copied ✓' : 'Copy code'}
            </button>

            <button
              onClick={handleDownloadPNG}
              disabled={!generated}
              className="w-full md:w-48 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold hover:from-green-600 hover:to-emerald-600 transition"
              aria-label="Download QR as PNG"
            >
              Download PNG
            </button>

            <button
              onClick={() => {
                setGenerated(false);
                setSessionCode('');
              }}
              className="w-full md:w-48 px-4 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
              aria-label="Reset"
            >
              Reset
            </button>

            <button
              onClick={() => navigate('/teacher')}
              className="w-full md:w-48 px-4 py-3 rounded-lg bg-transparent border border-white/6 text-white hover:bg-white/6 transition"
              aria-label="Back to dashboard"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
