import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { PHOTO_GALLERY } from '../constants';

const PhotoGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? PHOTO_GALLERY.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === PHOTO_GALLERY.length - 1 ? 0 : prev + 1
    );
  };

  if (PHOTO_GALLERY.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      {/* Polaroid Frame */}
      <div className="relative group">
        {/* Decorative floating hearts */}
        <div className="absolute -top-6 -left-6 animate-bounce-slow">
          <Heart className="w-8 h-8 text-pink-400 fill-pink-400 opacity-70" />
        </div>
        <div className="absolute -top-4 -right-4 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
          <Heart className="w-6 h-6 text-red-400 fill-red-400 opacity-70" />
        </div>
        <div className="absolute -bottom-4 -left-4 animate-bounce-slow" style={{ animationDelay: '1s' }}>
          <Heart className="w-7 h-7 text-pink-300 fill-pink-300 opacity-70" />
        </div>

        {/* Polaroid container */}
        <div className="relative bg-white p-4 pb-16 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2 mx-auto w-72 sm:w-80">
          {/* Photo */}
          <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-gray-100">
            <img
              src={PHOTO_GALLERY[currentIndex].src}
              alt={PHOTO_GALLERY[currentIndex].caption}
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Foto+No+Disponible';
              }}
            />
            
            {/* Shimmer overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500 pointer-events-none"></div>
          </div>

          {/* Caption on polaroid */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="font-romantic text-2xl text-gray-700">
              {PHOTO_GALLERY[currentIndex].caption}
            </p>
          </div>

          {/* Navigation buttons */}
          {PHOTO_GALLERY.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-pink-500/90 hover:bg-pink-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500/90 hover:bg-pink-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Dots indicator */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {PHOTO_GALLERY.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-6 h-2 bg-pink-500 rounded-full' 
                        : 'w-2 h-2 bg-pink-300 rounded-full hover:bg-pink-400'
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tape effect on corners */}
        <div className="absolute -top-2 left-8 w-16 h-6 bg-pink-100/80 border border-pink-200/50 rotate-[-15deg] shadow-sm"></div>
        <div className="absolute -top-2 right-8 w-16 h-6 bg-pink-100/80 border border-pink-200/50 rotate-[15deg] shadow-sm"></div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;
