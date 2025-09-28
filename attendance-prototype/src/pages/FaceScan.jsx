import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const FaceScan = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      navigate('/login/student');
      return;
    }

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const t = setTimeout(() => setMounted(true), 30);
      return () => clearTimeout(t);
    }
    setMounted(true);
  }, [navigate]);

  useEffect(() => {
    let mountedLocal = true;
    setError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera API not available in this browser.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then((stream) => {
        if (!mountedLocal) return;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => { /* ignore play errors */ });
        }
      })
      .catch((err) => {
        console.error('Camera error:', err);
        setError('Camera access failed. Please allow camera access.');
      });

    return () => {
      mountedLocal = false;
      // stop tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const takeSnapshot = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;
    const ctx = canvas.getContext('2d');
    
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    
    canvasRef.current = canvas;
    return dataUrl;
  }, []);

  const handleSave = () => {
    
    const sessionId = localStorage.getItem('scannedSession');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!sessionId || !user) {
      alert('Session or user not found');
      navigate('/student');
      return;
    }

    const attendance = JSON.parse(localStorage.getItem(`attendance-${sessionId}`)) || [];
    attendance.push({
      name: user.username,
      time: new Date().toLocaleTimeString(),
      
      snapshot: capturedImage || null,
    });

    localStorage.setItem(`attendance-${sessionId}`, JSON.stringify(attendance));
    alert('Attendance marked successfully ✅');
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-neutral-900 flex items-center justify-center p-6 font-sans text-white">
      <div
        className={[
          'w-full max-w-3xl mx-auto rounded-2xl p-6 backdrop-blur-md bg-black/40 border border-white/6 shadow-2xl transition-transform duration-400',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
        role="region"
        aria-label="Face scan"
      >
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">🧠 Face Scan</h1>
            <p className="text-sm text-gray-300 mt-1">Scan your face to confirm attendance. Camera feed runs locally on your device.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-gray-300">Tip: Position your face inside the frame</div>
            <button
              onClick={() => {
                if (streamRef.current) {
                  streamRef.current.getTracks().forEach((t) => t.stop());
                  streamRef.current = null;
                }
                navigate('/student');
              }}
              className="px-3 py-2 rounded-lg bg-white/6 hover:bg-white/10 transition"
            >
              ← Back
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="relative w-full max-w-[520px] aspect-square rounded-xl overflow-hidden border border-white/6 bg-gray-900">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label="Camera preview"
              />
              {/* subtle frame overlay */}
              <div className="pointer-events-none absolute inset-0 border-2 border-dashed border-white/6 rounded-xl" />
              {/* recording indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full text-sm">
                <span className={`w-2 h-2 rounded-full ${isCapturing ? 'bg-rose-400 animate-pulse' : 'bg-rose-300/80'}`} />
                <span className="text-xs text-gray-200">{isCapturing ? 'Capturing' : 'Live'}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3 items-center">
              <button
                onClick={() => {
                  setIsCapturing(true);
                  
                  setTimeout(() => {
                    takeSnapshot();
                    setIsCapturing(false);
                  }, 220);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition transform hover:-translate-y-0.5"
                aria-label="Capture snapshot"
              >
                📸 Capture
              </button>

              <button
                onClick={() => {
                  setCapturedImage(null);
                }}
                disabled={!capturedImage}
                className="px-4 py-2 bg-white/6 hover:bg-white/10 rounded-lg transition disabled:opacity-50"
                aria-label="Retake"
              >
                ♻️ Retake
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition disabled:opacity-60"
                aria-label="Mark attendance"
              >
                ✅ Mark Attendance
              </button>
            </div>

            {error && <div className="mt-3 text-sm text-rose-300">{error}</div>}
          </div>

          <aside className="flex flex-col items-center md:items-stretch gap-4">
            <div className="w-full bg-black/30 rounded-lg p-4 border border-white/5 text-center">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">Preview</h3>
              {capturedImage ? (
                <img src={capturedImage} alt="snapshot preview" className="w-full rounded-md object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-800 rounded-md flex items-center justify-center text-gray-400">
                  No snapshot yet
                </div>
              )}
              <div className="mt-3 text-xs text-gray-300">Local preview only — not uploaded.</div>
            </div>

            <div className="w-full bg-black/30 rounded-lg p-3 border border-white/5 text-sm text-gray-300">
              <div className="font-medium text-sm text-gray-200 mb-2">Session</div>
              <div className="text-xs text-gray-400 mb-2">Scanned session id:</div>
              <div className="truncate text-sm text-indigo-200 bg-white/4 px-2 py-1 rounded">{localStorage.getItem('scannedSession') || '—'}</div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(localStorage.getItem('scannedSession') || '').then(() => {
                    /* silent copy */
                  }).catch(() => {});
                }}
                className="mt-3 w-full px-3 py-2 rounded bg-white/6 hover:bg-white/10"
              >
                Copy session id
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FaceScan;