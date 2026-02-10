import React, { useState, useRef, useEffect } from 'react';
import { NO_BUTTON_PHRASES, TARGET_NAME } from '../constants';
import { Heart } from 'lucide-react';
import PhotoGallery from './PhotoGallery';
import PersonalizedReasons from './PersonalizedReasons';

interface ProposalScreenProps {
  onAccept: () => void;
}

const ProposalScreen: React.FC<ProposalScreenProps> = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    moveNoButton();
  };

  const moveNoButton = () => {
    // Move button to random position
    const maxX = window.innerWidth - 200; // Account for button width
    const maxY = window.innerHeight - 100; // Account for button height
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setIsNoButtonPositioned(true);
  };

  const handleNoMouseEnter = () => {
    // Move button away when cursor gets close (after first click)
    if (noCount > 0) {
      moveNoButton();
    }
  };

  const getNoText = () => {
    return NO_BUTTON_PHRASES[Math.min(noCount, NO_BUTTON_PHRASES.length - 1)];
  };

  // Calculate sizes
  const yesButtonSize = noCount * 20 + 16; 
  const noButtonScale = Math.max(0.3, 1 - noCount * 0.1); // Shrinks with each click, minimum 30%

  // Easter egg message for persistent "No" clickers
  const showEasterEgg = noCount > 10;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center relative z-10 overflow-hidden">
      
      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Animated Heart Icon */}
      <div className="absolute top-8 animate-bounce">
        <Heart className="text-red-500 fill-current w-12 h-12 drop-shadow-lg" />
      </div>

      {/* Text Section */}
      <h1 className="text-4xl md:text-6xl font-romantic text-pink-600 mb-4 drop-shadow-sm animate-fade-in">
        {TARGET_NAME}
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 font-bold mb-8 max-w-lg animate-fade-in">
        ¿Quieres ser mi San Valentín? 🌹
      </p>

      {/* Easter Egg Message */}
      {showEasterEgg && (
        <div className="mb-6 bg-red-100 border-2 border-red-300 rounded-xl p-4 max-w-md animate-bounce">
          <p className="text-red-600 font-bold text-lg">
            ¡Ya sé que quieres decir que sí! 😭💔
          </p>
          <p className="text-red-500 text-sm mt-2">
            ¡Mira qué grande está el botón de SÍ!
          </p>
        </div>
      )}

      {/* Buttons Section */}
      <div className="relative w-full min-h-[200px] flex items-center justify-center mb-12">
        <button
          onClick={onAccept}
          style={{ fontSize: `${yesButtonSize}px` }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 z-20 px-8 py-4 leading-none min-w-[100px] animate-pulse-slow"
        >
          ¡Sí! ❤️
        </button>

        <button
          ref={noButtonRef}
          onClick={handleNoClick}
          onMouseEnter={handleNoMouseEnter}
          style={{
            transform: `scale(${noButtonScale})`,
            ...(isNoButtonPositioned && {
              position: 'fixed',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
            })
          }}
          className={`bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 z-10 text-xl ${
            !isNoButtonPositioned ? 'ml-4' : ''
          }`}
        >
          {getNoText()}
        </button>
      </div>

      {/* Personalized Reasons */}
      <PersonalizedReasons />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProposalScreen;