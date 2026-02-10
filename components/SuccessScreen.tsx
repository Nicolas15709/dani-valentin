import React, { useEffect } from 'react';
import { DATE_DETAILS, TARGET_NAME, IMAGES } from '../constants';
import confetti from 'canvas-confetti';
import { Calendar, MapPin, Clock, Camera } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const SuccessScreen: React.FC = () => {
  useEffect(() => {
    // Fire confetti on mount - enhanced version
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Multiple confetti bursts from different positions
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount: particleCount / 2,
        origin: { x: 0.5, y: 0.5 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const captureScreenshot = async () => {
    try {
      // Simple approach: use html2canvas if available, otherwise inform user
      const html2canvas = (window as any).html2canvas;
      if (html2canvas) {
        const canvas = await html2canvas(document.body);
        const link = document.createElement('a');
        link.download = 'mi-san-valentin.png';
        link.href = canvas.toDataURL();
        link.click();
      } else {
        alert('¡Toma un screenshot con tu dispositivo! 📸');
      }
    } catch (error) {
      alert('¡Toma un screenshot con tu dispositivo! 📸');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center relative z-10">
      
      <div className="mb-8 w-64 h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-pink-300 bg-white animate-scale-in">
        <img 
           src={IMAGES.CELEBRATION}
           alt="Celebration" 
           className="w-full h-full object-cover"
           onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=🎉'; 
           }}
        />
      </div>

      <h1 className="text-5xl md:text-7xl font-romantic text-red-500 mb-6 drop-shadow-md animate-bounce-in">
        ¡Sabía que dirías que sí! ❤️
      </h1>
      
      <p className="text-2xl text-pink-700 font-bold mb-4 animate-fade-in">
        Te amo, Mi flaca 
      </p>

      <p className="text-lg text-gray-600 mb-8 max-w-md italic animate-fade-in">
        "A mi me vuelve loco tu forma de ser" 🎵
      </p>

    

      {/* Countdown Timer */}
      <CountdownTimer />

      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-md w-full border border-pink-200 mt-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-pink-100">
          Nuestra Cita
        </h2>
        
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-4 text-gray-700">
            <div className="bg-pink-100 p-3 rounded-full">
                <MapPin className="text-pink-500 w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Lugar</p>
                <p className="text-lg font-bold">{DATE_DETAILS.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
             <div className="bg-pink-100 p-3 rounded-full">
                <Calendar className="text-pink-500 w-6 h-6" />
             </div>
            <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Fecha</p>
                <p className="text-lg font-bold">{DATE_DETAILS.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
             <div className="bg-pink-100 p-3 rounded-full">
                <Clock className="text-pink-500 w-6 h-6" />
             </div>
            <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Hora</p>
                <p className="text-lg font-bold">{DATE_DETAILS.time}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SuccessScreen;