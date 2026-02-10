import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-200 bg-white">
        <img
          src={PHOTO_GALLERY[currentIndex].src}
          alt={PHOTO_GALLERY[currentIndex].caption}
          className="w-full h-full object-cover transition-opacity duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Foto+No+Disponible';
          }}
        />
        
        {PHOTO_GALLERY.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-pink-500" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-pink-500" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {PHOTO_GALLERY.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-pink-500 w-6' 
                      : 'bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <p className="text-center mt-4 text-lg font-semibold text-pink-600">
        {PHOTO_GALLERY[currentIndex].caption}
      </p>
    </div>
  );
};

export default PhotoGallery;
