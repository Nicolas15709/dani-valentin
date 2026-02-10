import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  xOffset: number;
  yOffset: number;
}

const MagicParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate magical particles
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      xOffset: (Math.random() - 0.5) * 100,
      yOffset: (Math.random() - 0.5) * 100
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float-magic"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            '--x-offset': `${particle.xOffset}px`,
            '--y-offset': `${particle.yOffset}px`
          } as React.CSSProperties}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-200 opacity-60 blur-[2px] animate-glow-pulse"></div>
        </div>
      ))}

      <style>{`
        @keyframes float-magic {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(calc(var(--x-offset) * 0.5), calc(var(--y-offset) * 0.3)) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(var(--x-offset), var(--y-offset)) scale(0.8);
            opacity: 1;
          }
          75% {
            transform: translate(calc(var(--x-offset) * 0.3), calc(var(--y-offset) * 0.7)) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: blur(2px) brightness(1);
          }
          50% {
            filter: blur(3px) brightness(1.5);
          }
        }

        .animate-float-magic {
          animation: float-magic 5s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MagicParticles;
