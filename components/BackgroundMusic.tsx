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

    // Set initial volume
    audio.volume = MUSIC_CONFIG.volume;

    const startAudio = () => {
      if (!audio) return;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Remove listener once started
          window.removeEventListener('click', startAudio);
          window.removeEventListener('touchstart', startAudio);
        })
        .catch((error) => {
          console.log('Playback failed:', error);
        });
    };

    // Try to autoplay immediately
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented, wait for first interaction
          window.addEventListener('click', startAudio);
          window.addEventListener('touchstart', startAudio);
        });
    }

    return () => {
      audio.pause();
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the global click listener if it's still active
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = MUSIC_CONFIG.volume;
      setIsMuted(false);
      if (!isPlaying) {
        audio.play().then(() => setIsPlaying(true));
      }
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
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
