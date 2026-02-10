import React, { useState, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import RosePetals from './components/RosePetals';
import FloatingStars from './components/FloatingStars';
import MagicParticles from './components/MagicParticles';
import FloatingLoveMessages from './components/FloatingLoveMessages';
import ProposalScreen from './components/ProposalScreen';
import SuccessScreen from './components/SuccessScreen';
import BackgroundMusic from './components/BackgroundMusic';
import DarkModeToggle from './components/DarkModeToggle';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Save dark mode preference
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden relative selection:bg-pink-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-purple-950 via-pink-900 to-rose-950' 
        : 'bg-gradient-to-br from-pink-100 via-rose-50 to-red-50'
    }`}>
      {/* Enhanced Background Effects */}
      <FloatingStars />
      <MagicParticles />
      <FloatingHearts />
      <RosePetals />
      <FloatingLoveMessages />
      
      {/* Aurora effect for dark mode */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-aurora-1"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-aurora-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-aurora-3"></div>
        </div>
      )}
      
      {/* Background Music */}
      <BackgroundMusic />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
      
      <main className="relative z-10 w-full min-h-screen">
        {!accepted ? (
          <ProposalScreen onAccept={() => setAccepted(true)} />
        ) : (
          <SuccessScreen />
        )}
      </main>

      <footer className={`absolute bottom-2 w-full text-center text-xs opacity-50 pointer-events-none z-0 ${
        isDarkMode ? 'text-pink-200' : 'text-pink-300'
      }`}>
        Hecho con mucho amor ❤️
      </footer>

      <style>{`
        @keyframes aurora-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(50px, -30px) scale(1.1);
            opacity: 0.4;
          }
          66% {
            transform: translate(-30px, 40px) scale(0.9);
            opacity: 0.35;
          }
        }

        @keyframes aurora-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.25;
          }
          33% {
            transform: translate(-40px, 50px) scale(1.15);
            opacity: 0.35;
          }
          66% {
            transform: translate(60px, -20px) scale(0.95);
            opacity: 0.3;
          }
        }

        @keyframes aurora-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.28;
          }
          33% {
            transform: translate(30px, 40px) scale(0.9);
            opacity: 0.38;
          }
          66% {
            transform: translate(-50px, -30px) scale(1.1);
            opacity: 0.33;
          }
        }

        .animate-aurora-1 {
          animation: aurora-1 20s ease-in-out infinite;
        }

        .animate-aurora-2 {
          animation: aurora-2 25s ease-in-out infinite;
        }

        .animate-aurora-3 {
          animation: aurora-3 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;