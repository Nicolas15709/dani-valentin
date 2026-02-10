import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  rotation: number;
  color: string;
}

const RosePetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = ['#ff69b4', '#ff1493', '#ff85c1', '#ffc0cb'];
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 12 + Math.random() * 18,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-float bottom-[-50px]"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.delay}s`
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 20 20"
            style={{ 
              transform: `rotate(${petal.rotation}deg)`,
              opacity: 0.6
            }}
          >
            <ellipse
              cx="10"
              cy="10"
              rx="8"
              ry="4"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default RosePetals;
