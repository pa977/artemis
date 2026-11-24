import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SidebarSection, ChatSession, UserProfile } from '../types';
import DnaIcon from './icons/DnaIcon';
import LogoutIcon from './icons/LogoutIcon';
import NewChatIcon from './icons/NewChatIcon';
import ToolsIcon from './icons/ToolsIcon';
import DeleteIcon from './icons/DeleteIcon';
import GardenIcon from './icons/GardenIcon';
import UserIcon from './icons/UserIcon';
import MusicIcon from './icons/MusicIcon';
import { playSidebarOpen, playSidebarClose } from '../services/soundService';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sections: SidebarSection[];
  onLogout: () => void;
  onNewChat: (sectionTitle?: string, sectionId?: string) => Promise<void>;
  chatHistory: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  activeView: 'garden' | 'chat' | 'profile';
  onSetView: (view: 'garden' | 'chat' | 'profile') => void;
  userProfile: UserProfile;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

const sidebarVariants: Variants = {
  open: { width: '280px', transition: { type: 'spring', stiffness: 100, damping: 20 } },
  closed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const textVariants = {
  open: { opacity: 1, x: 0, display: 'inline-block', transition: { delay: 0.1, duration: 0.2 } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 }, transitionEnd: { display: 'none' } },
};

const menuVariants = {
    closed: { 
        opacity: 0, 
        height: 0,
        scale: 0.95,
        transition: { 
            height: { duration: 0.2 },
            opacity: { duration: 0.1 },
            when: "afterChildren", 
            staggerChildren: 0.05, 
            staggerDirection: -1 
        }
    },
    open: { 
        opacity: 1, 
        height: "auto",
        scale: 1,
        transition: { 
            height: { duration: 0.3 },
            opacity: { duration: 0.2 },
            when: "beforeChildren", 
            staggerChildren: 0.05 
        }
    }
};

const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
};

const ActiveIndicator = () => (
    <motion.div
        layoutId="active-indicator"
        className="absolute inset-0 z-0 rounded-lg bg-green-500/20"
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, sections, onLogout, onNewChat, chatHistory, activeChatId, onSelectChat, onDeleteChat, activeView, onSetView, userProfile, isMusicPlaying, onToggleMusic }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSectionSelect = (id: string, title: string) => {
    onNewChat(title, id);
    setIsMenuOpen(false);
  };

  const toggleSidebar = () => {
    isOpen ? playSidebarClose() : playSidebarOpen();
    setIsOpen(!isOpen);
  };
  
  return (
    <motion.nav
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      className="relative z-20 flex flex-col h-full border-r bg-white/40 backdrop-blur-xl border-green-200/80"
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="absolute z-30 p-1 transition-colors duration-200 rounded-full -right-4 top-10 bg-green-100/80 hover:bg-green-200 text-green-700 backdrop-blur-sm">
            <motion.svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isOpen ? 180 : 0 }} >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
        </button>
        <div className="flex items-center justify-center mb-10 shrink-0" style={{ height: '48px' }}>
            <div className="w-12 h-12 text-green-600 shrink-0"><DnaIcon /></div>
            <AnimatePresence>
            {isOpen && (
                <motion.h1 variants={textVariants} initial="closed" animate="open" exit="closed" className="ml-2 text-xl font-bold tracking-widest uppercase font-orbitron text-green-800">
                ARTEMIS
                </motion.h1>
            )}
            </AnimatePresence>
        </div>
        <div className="flex flex-col gap-3">
            <motion.button onClick={() => onSetView('garden')} className="relative flex items-center justify-center w-full p-3 transition-all duration-200 border rounded-lg group bg-green-500/10 hover:bg-green-500/20 border-green-500/30 hover:border-green-500/50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {activeView === 'garden' && <ActiveIndicator />}
                <div className="relative z-10 w-6 h-6 text-green-600 shrink-0"><GardenIcon /></div>
                <AnimatePresence>{isOpen && (<motion.span variants={textVariants} initial="closed" animate="open" exit="closed" className="relative z-10 ml-4 text-sm font-medium text-green-800 whitespace-nowrap">My Garden</motion.span>)}</AnimatePresence>
            </motion.button>
            <motion.button onClick={() => onNewChat('General Chat')} className="relative flex items-center justify-center w-full p-3 transition-all duration-200 border rounded-lg group bg-green-500/10 hover:bg-green-500/20 border-green-500/30 hover:border-green-500/50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="relative z-10 w-6 h-6 text-green-600 shrink-0"><NewChatIcon /></div>
                <AnimatePresence>{isOpen && (<motion.span variants={textVariants} initial="closed" animate="open" exit="closed" className="relative z-10 ml-4 text-sm font-medium text-green-800 whitespace-nowrap">General Chat</motion.span>)}</AnimatePresence>
            </motion.button>
             <div className="relative">
                <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`flex items-center justify-center w-full p-3 transition-all duration-200 border rounded-lg group bg-green-500/10 hover:bg-green-500/20 border-green-500/30 hover:border-green-500/50`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} >
                    <div className="w-6 h-6 text-green-600 shrink-0"><ToolsIcon /></div>
                    <AnimatePresence>{isOpen && (<motion.span variants={textVariants} initial="closed" animate="open" exit="closed" className="ml-4 text-sm font-medium text-green-800 whitespace-nowrap">AI Tools</motion.span>)}</AnimatePresence>
                </motion.button>
                <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        variants={menuVariants} 
                        initial="closed" 
                        animate="open" 
                        exit="closed" 
                        className={`overflow-hidden ${isOpen 
                            ? 'relative w-full mt-1 bg-green-500/5 rounded-lg border border-green-500/10' 
                            : 'absolute left-full top-0 ml-4 w-72 bg-white/90 backdrop-blur-xl border border-green-200 rounded-lg shadow-2xl shadow-green-900/20 z-50'
                        }`}
                    >
                        <div className="p-2 space-y-1">
                            {sections.map(section => (
                                <motion.button 
                                    key={section.id} 
                                    variants={menuItemVariants} 
                                    onClick={() => handleSectionSelect(section.id, section.title)} 
                                    className="flex items-center w-full p-2 text-left rounded-md text-sm transition-colors text-green-800 hover:bg-green-500/20"
                                >
                                    <div className="w-5 h-5 mr-3 shrink-0">{section.icon}</div>
                                    <span className="truncate">{section.title}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
      </div>
      <div className="flex-1 px-4 pt-6 overflow-y-auto border-t border-green-200/80">
        <AnimatePresence>{isOpen && (<motion.h2 variants={textVariants} initial="closed" animate="open" exit="closed" className="mb-2 text-xs font-semibold tracking-widest text-green-700 uppercase">Chat History</motion.h2>)}</AnimatePresence>
        <div className="space-y-2">
            <AnimatePresence>
            {chatHistory.map(chat => (
                <motion.div key={chat.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="relative p-2 transition-colors duration-200 rounded-lg cursor-pointer group hover:bg-green-500/10"
                    onClick={() => onSelectChat(chat.id)}
                >
                    {activeChatId === chat.id && activeView === 'chat' && <ActiveIndicator />}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center min-w-0">
                            <AnimatePresence>
                            {isOpen && (
                                <motion.span variants={textVariants} initial="closed" animate="open" exit="closed" className={`text-sm truncate ${activeChatId === chat.id && activeView === 'chat' ? 'text-green-950 font-medium' : 'text-green-800'}`}>
                                    {chat.title}
                                </motion.span>
                            )}
                            </AnimatePresence>
                        </div>
                        {isOpen && (<button onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }} className="p-1 rounded-md opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-opacity"><DeleteIcon /></button>)}
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
      </div>
      <div className="p-4 mt-auto border-t shrink-0 border-green-200/80">
          <motion.button onClick={() => onSetView('profile')} className="relative flex items-center w-full p-2 mb-2 transition-all duration-200 rounded-lg group hover:bg-green-500/10" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {activeView === 'profile' && <ActiveIndicator />}
            <div className={`relative z-10 flex items-center justify-center w-10 h-10 overflow-hidden rounded-full shrink-0 ${activeView === 'profile' ? 'ring-2 ring-green-500' : ''}`}>
              {userProfile.profilePicture ? (
                <img src={userProfile.profilePicture} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full p-2 text-green-700 bg-green-200"><UserIcon /></div>
              )}
            </div>
            <AnimatePresence>{isOpen && (<motion.span variants={textVariants} initial="closed" animate="open" exit="closed" className="relative z-10 ml-4 text-sm font-medium text-green-800 whitespace-nowrap">{userProfile.username}</motion.span>)}</AnimatePresence>
          </motion.button>
          
          <div className={`flex ${isOpen ? 'flex-row' : 'flex-col'} items-center gap-2`}>
            <motion.a href="#" onClick={onLogout} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className={`flex items-center p-3 rounded-lg transition-all duration-200 group relative text-green-800 hover:bg-red-400/10 hover:text-red-400 ${isOpen ? 'flex-1' : ''}`}>
              <div className="w-6 h-6 shrink-0"><LogoutIcon /></div>
              <AnimatePresence>{isOpen && (<motion.span variants={textVariants} initial="closed" animate="open" exit="closed" className="ml-4 text-sm font-medium whitespace-nowrap">Logout</motion.span>)}</AnimatePresence>
            </motion.a>
             <motion.button onClick={onToggleMusic} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className={`relative p-3 transition-all duration-200 rounded-lg group ${isMusicPlaying ? 'text-green-600 bg-green-500/20' : 'text-green-800 hover:bg-green-500/10'}`}>
                <div className="w-6 h-6 shrink-0"><MusicIcon isPlaying={isMusicPlaying} /></div>
             </motion.button>
          </div>

      </div>
    </motion.nav>
  );
};

export default Sidebar;