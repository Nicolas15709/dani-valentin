import React, { useState, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import RosePetals from './components/RosePetals';
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
        ? 'bg-gradient-to-b from-purple-900 via-pink-900 to-red-900' 
        : 'bg-gradient-to-b from-pink-100 to-red-50'
    }`}>
      {/* Background Effects */}
      <FloatingHearts />
      <RosePetals />
      
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
    </div>
  );
};

export default App;