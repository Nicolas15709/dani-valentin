import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingStars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const newStars: Star[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Star shape using CSS */}
            <div className="absolute inset-0 bg-white rounded-full blur-[1px] opacity-80"></div>
            <div className="absolute inset-0 bg-yellow-200 rounded-full animate-pulse-glow"></div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            filter: blur(1px);
          }
          50% {
            opacity: 1;
            filter: blur(2px);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingStars;
