import React, { useEffect, useState } from 'react';
import { FLOATING_LOVE_MESSAGES } from '../constants';

interface FloatingMessage {
  id: number;
  text: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const FloatingLoveMessages: React.FC = () => {
  const [messages, setMessages] = useState<FloatingMessage[]>([]);

  useEffect(() => {
    // Generate floating messages
    const newMessages: FloatingMessage[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      text: FLOATING_LOVE_MESSAGES[i % FLOATING_LOVE_MESSAGES.length],
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      duration: Math.random() * 3 + 4, // 4-7 seconds
      delay: Math.random() * 5
    }));
    setMessages(newMessages);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {messages.map((message) => (
        <div
          key={message.id}
          className="absolute animate-float-message"
          style={{
            left: `${message.x}%`,
            top: `${message.y}%`,
            animationDuration: `${message.duration}s`,
            animationDelay: `${message.delay}s`
          }}
        >
          <div className="font-romantic text-2xl md:text-3xl text-pink-400/40 drop-shadow-lg whitespace-nowrap">
            {message.text}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes float-message {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          10% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.8);
          }
        }

        .animate-float-message {
          animation: float-message 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingLoveMessages;
