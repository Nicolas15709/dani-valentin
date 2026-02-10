import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MUSIC_CONFIG } from '../constants';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay (may be blocked by browser policy)
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('Autoplay prevented:', error);
          // User will need to click to start music
        });
    }

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = MUSIC_CONFIG.volume;
      if (!isPlaying) {
        audio.play().then(() => setIsPlaying(true));
      }
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src={MUSIC_CONFIG.backgroundMusic} type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border-2 border-pink-200"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-pink-500" />
        ) : (
          <Volume2 className={`w-6 h-6 text-pink-500 ${isPlaying ? 'animate-pulse' : ''}`} />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
