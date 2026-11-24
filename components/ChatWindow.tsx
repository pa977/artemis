import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import DnaIcon from './icons/DnaIcon';
import TypingAnimation from './TypingAnimation';
import KnowledgeGraph from './KnowledgeGraph';
import IdentifyPlantIcon from './icons/IdentifyPlantIcon';
import NewChatIcon from './icons/NewChatIcon';
import IdentifyPlantModal from './IdentifyPlantModal'; // New import
import { playSendMessage, playReceiveMessage, playModalOpen, playModalClose } from '../services/soundService';

const AiAvatar: React.FC<{ isLoading?: boolean }> = ({ isLoading = false }) => (
    <div className="relative flex items-center justify-center w-10 h-10 p-2 border rounded-full shrink-0 bg-green-200/50 border-green-300">
        <DnaIcon animate={isLoading} />
        {isLoading && (
            <motion.div 
                className="absolute inset-0 border-2 rounded-full border-green-500"
                animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
        )}
    </div>
);

const UserAvatar: React.FC = () => (
  <div className="flex items-center justify-center w-10 h-10 border rounded-full shrink-0 bg-green-200/50 border-green-300">
      <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
  </div>
);

const ThinkingIndicator: React.FC = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-start gap-4"
    >
        <AiAvatar isLoading={true} />
        <div className="p-4 border rounded-2xl bg-green-100 border-green-200">
            <motion.div 
              className="flex items-center gap-2"
              transition={{ staggerChildren: 0.2 }}
            >
                <motion.div
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                />
                 <motion.div
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />
            </motion.div>
        </div>
    </motion.div>
)

interface ChatWindowProps {
  activeSectionTitle: string;
  messages: ChatMessage[];
  onSendMessage: (prompt: string, image?: File) => void;
  onNewChat: () => Promise<void>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeSectionTitle, messages, onSendMessage, onNewChat }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null);
  const [isIdentifyModalOpen, setIdentifyModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Determine if the AI is currently "thinking" by checking if the last message is from the user.
  useEffect(() => {
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        const currentIsLoading = lastMessage.role === 'user';
        
        // Play sound only when transitioning from loading to not loading
        if (isLoading && !currentIsLoading) {
            playReceiveMessage();
        }
        setIsLoading(currentIsLoading);
    } else {
        setIsLoading(false);
    }
  }, [messages]);


  const handleSend = async () => {
    if ((!input.trim() && !image) || isLoading) return;
    playSendMessage();
    const currentInput = input;
    const currentImageFile = image?.file;

    setInput('');
    setImage(null);
    
    await onSendMessage(currentInput, currentImageFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    }
    if (e.target) e.target.value = '';
  };

  const handleIdentifyClick = () => {
    playModalOpen();
    setIdentifyModalOpen(true);
  };
  
  const handleIdentificationComplete = (file: File) => {
    setImage({ file, preview: URL.createObjectURL(file) });
    setInput("Please identify this plant from the image. What is its common name, scientific name, and some key care instructions?");
    setIdentifyModalOpen(false);
    playModalClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 bg-transparent">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 p-2 border rounded-xl bg-green-500/10 border-green-500/30 text-green-600">
                <DnaIcon />
            </div>
            <div>
                <h2 className="text-lg font-bold text-green-900 font-orbitron tracking-tight">{activeSectionTitle}</h2>
                <p className="text-xs text-green-600/70 font-medium uppercase tracking-wider">Artemis Bio-AI Assistant</p>
            </div>
        </div>
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewChat}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-700 transition-all border rounded-xl bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
        >
            <div className="w-4 h-4"><NewChatIcon /></div>
            <span className="hidden sm:inline">New Chat</span>
        </motion.button>
      </div>

      <div className="flex-1 pb-4 pr-4 space-y-6 overflow-y-auto">
        <AnimatePresence>
            {messages.map((msg) => (
                <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                    {msg.role === 'assistant' && <AiAvatar />}
                    <div className={`flex flex-col max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`p-4 rounded-2xl border ${msg.role === 'user' 
                            ? 'bg-gradient-to-br from-green-100 to-green-50 text-green-950 rounded-br-none border-green-200' 
                            : 'bg-gradient-to-br from-white to-green-50 text-green-950 rounded-bl-none border-green-200'
                        }`}>
                            {msg.image && <img src={msg.image} alt="upload preview" className="object-cover mb-2 rounded-lg max-h-60" />}
                            {msg.isKnowledgeGraph ? <KnowledgeGraph /> : <TypingAnimation text={msg.content} />}
                        </div>
                    </div>
                    {msg.role === 'user' && <UserAvatar />}
                </motion.div>
            ))}
        </AnimatePresence>
        {isLoading && <ThinkingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-4 mt-auto">
        <motion.div 
            className="relative p-1 transition-all duration-300 border rounded-2xl bg-white/50 backdrop-blur-xl border-green-300"
            animate={{
                boxShadow: isFocused ? '0 0 20px rgba(34, 197, 94, 0.3)' : '0 0 0 rgba(34, 197, 94, 0)',
                borderColor: isFocused ? 'rgba(34, 197, 94, 0.6)' : 'rgba(34, 197, 94, 0.3)'
            }}
        >
          {image && (
            <div className="relative p-2">
                <img src={image.preview} alt="preview" className="object-cover h-24 rounded-lg"/>
                <button onClick={() => setImage(null)} className="absolute p-1 transition-colors rounded-full top-1 right-1 bg-red-800/80 hover:bg-red-700/80">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={`Message ${activeSectionTitle}...`}
              className="w-full p-3 bg-transparent text-green-950 focus:outline-none"
              disabled={isLoading}
            />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={handleIdentifyClick} title="Identify Plant" className="p-2 transition-colors rounded-full text-green-600 hover:bg-green-200">
                <IdentifyPlantIcon />
            </motion.button>
            <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={handleUploadClick} title="Upload Image" className="p-2 transition-colors rounded-full text-green-600 hover:bg-green-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </motion.button>
            <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={handleSend} disabled={isLoading || (!input.trim() && !image)} className="p-2 ml-2 transition-all rounded-full bg-green-600 text-white disabled:bg-green-300 disabled:opacity-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isIdentifyModalOpen && (
          <IdentifyPlantModal
            onClose={() => { setIdentifyModalOpen(false); playModalClose(); }}
            onIdentify={handleIdentificationComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWindow;