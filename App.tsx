import React, { useState, useEffect } from 'react';
import DefaultBackground from './components/backgrounds/DefaultBackground';
import { Login } from './components/Login';
import Dashboard from './components/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from './types';
import LoginTransitionAnimation from './components/LoginTransitionAnimation';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginAnimation, setShowLoginAnimation] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = () => {
    const savedProfile = localStorage.getItem('artemis_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      const defaultProfile: UserProfile = {
        username: 'Bio-Explorer',
        email: 'user@artemis.bio',
        profilePicture: '',
      };
      localStorage.setItem('artemis_profile', JSON.stringify(defaultProfile));
      setUserProfile(defaultProfile);
    }
    setShowLoginAnimation(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('artemis_profile', JSON.stringify(newProfile));
  };
  
  const handleAnimationComplete = () => {
    setIsLoggedIn(true);
    setShowLoginAnimation(false);
  };

  const isApiKeyMissing = !process.env.API_KEY;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
        <DefaultBackground />
      {isApiKeyMissing && (
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 text-center">
          <div className="bg-white/10 border border-red-500/50 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-red-400 mb-4">API Key Missing</h2>
            <p className="text-green-100/80 mb-6 leading-relaxed">
              It looks like your <code className="bg-black/30 px-2 py-1 rounded text-red-300">GEMINI_API_KEY</code> is not set. 
              Please create a <code className="bg-black/30 px-2 py-1 rounded text-red-300">.env</code> file in the root directory and add your key.
            </p>
            <div className="bg-black/40 p-4 rounded-lg text-left font-mono text-sm text-green-400 mb-6 overflow-x-auto">
              GEMINI_API_KEY=your_key_here
            </div>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-500/20"
            >
              Get Free API Key
            </a>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {isLoggedIn && userProfile ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <Dashboard 
              onLogout={handleLogout} 
              userProfile={userProfile} 
              onUpdateProfile={handleUpdateProfile} 
            />
          </motion.div>
        ) : showLoginAnimation ? (
           <motion.div key="animation" className="w-full h-full">
             <LoginTransitionAnimation onAnimationComplete={handleAnimationComplete} />
           </motion.div>
        ) : (
          <motion.div
            key="login"
            className="w-full h-full"
          >
            <Login onLogin={handleLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;