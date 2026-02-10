import React, { useState } from 'react';
import { LOVE_LETTER_TEXT } from '../constants';
import { Heart, X } from 'lucide-react';

const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open letter */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-8 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 animate-bounce-gentle"
      >
        <Heart className="w-5 h-5 fill-current" />
        Lee mi carta de amor
        <Heart className="w-5 h-5 fill-current" />
      </button>

      {/* Letter Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative max-w-2xl w-full animate-unfold">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 rounded-full p-3 shadow-2xl transition-all duration-300 hover:scale-110 z-10 border-2 border-white"
              aria-label="Cerrar carta"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Letter Paper */}
            <div className="bg-gradient-to-br from-pink-50 via-white to-red-50 rounded-lg shadow-2xl p-8 md:p-12 border-4 border-pink-200 relative overflow-hidden">
              {/* Decorative hearts in corners */}
              <div className="absolute top-4 left-4 text-pink-300 opacity-20">
                <Heart className="w-12 h-12 fill-current" />
              </div>
              <div className="absolute top-4 right-4 text-red-300 opacity-20">
                <Heart className="w-12 h-12 fill-current" />
              </div>
              <div className="absolute bottom-4 left-4 text-red-300 opacity-20">
                <Heart className="w-12 h-12 fill-current" />
              </div>
              <div className="absolute bottom-4 right-4 text-pink-300 opacity-20">
                <Heart className="w-12 h-12 fill-current" />
              </div>

              {/* Letter Content */}
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <Heart className="w-16 h-16 text-red-500 fill-current mx-auto mb-4 animate-pulse" />
                  <h2 className="font-romantic text-4xl md:text-5xl text-red-600 mb-2">
                    Para mi amor
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto"></div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg font-serif">
                    {LOVE_LETTER_TEXT}
                  </p>
                </div>

                {/* Decorative line */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                  <div className="w-24 h-0.5 bg-gradient-to-r from-pink-300 to-red-300"></div>
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                  <div className="w-24 h-0.5 bg-gradient-to-r from-red-300 to-pink-300"></div>
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes unfold {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateX(-90deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
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

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-unfold {
          animation: unfold 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default LoveLetter;
