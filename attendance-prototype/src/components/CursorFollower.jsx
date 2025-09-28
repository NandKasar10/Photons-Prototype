import { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="fixed w-6 h-6 bg-purple-500 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
  style={{
    transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)`,
  }}

    />
  );
};

export default CursorFollower;