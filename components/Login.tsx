import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DnaIcon from './icons/DnaIcon';
import UserIcon from './icons/UserIcon';
import EmailIcon from './icons/EmailIcon';
import LockIcon from './icons/LockIcon';
import GoogleIcon from './icons/GoogleIcon';
import GrowingPlant from './icons/GrowingPlant';
import FloatingLeaf from './FloatingLeaf';
import LoginBackground from './backgrounds/LoginBackground';

const Leaf: React.FC = () => (
    <motion.svg
        viewBox="0 0 50 50"
        className="absolute w-12 h-12 text-green-500"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
        transition={{ duration: 0.5, type: 'spring' }}
    >
        <path d="M25 0 C 25 0, 0 15, 25 50 C 25 50, 50 15, 25 0 Z" fill="currentColor" />
    </motion.svg>
);

const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
};

const InputField: React.FC<{ icon: React.ReactNode, type: string, placeholder: string }> = ({ icon, type, placeholder }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
            {icon}
        </span>
        <motion.input
            whileFocus={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}
            className="w-full p-3 pl-10 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            type={type}
            placeholder={placeholder}
            required
        />
    </div>
);

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="relative w-full h-full overflow-hidden bg-green-50">
            <LoginBackground />
            <div className="absolute inset-0">
                {Array.from({ length: 15 }).map((_, i) => <FloatingLeaf key={i} />)}
            </div>
            
            <GrowingPlant className="absolute bottom-0 left-0 w-48 h-96 opacity-60 pointer-events-none" />
            <GrowingPlant className="absolute bottom-0 right-0 w-40 h-80 opacity-50 transform scale-x-[-1] pointer-events-none" />


            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-4 mb-4"
                >
                    <div className="w-16 h-16 text-green-500">
                        <DnaIcon animate={true} />
                    </div>
                    <motion.h1
                        className="text-5xl font-bold tracking-widest text-transparent uppercase font-orbitron bg-clip-text bg-gradient-to-r from-green-500 to-green-400"
                        animate={{
                            textShadow: [
                                '0 0 15px rgba(52, 211, 153, 0.4)',
                                '0 0 25px rgba(52, 211, 153, 0.7)',
                                '0 0 15px rgba(52, 211, 153, 0.4)'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        ARTEMIS
                    </motion.h1>
                </motion.div>
                <motion.p
                    className="mb-8 text-lg text-center text-green-700/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Your personal assistant for plants, forestry, and biotechnology.
                </motion.p>
                <div className="relative w-full max-w-sm">
                    <motion.div
                        className="relative w-full p-8 space-y-6 border rounded-2xl bg-white/40 backdrop-blur-lg border-green-300/50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isSignUp ? 'signup' : 'login'}
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-center text-green-800">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                                {isSignUp && <InputField icon={<UserIcon />} type="text" placeholder="Username" />}
                                <InputField icon={<EmailIcon />} type="email" placeholder="user@artemis.bio" />
                                <InputField icon={<LockIcon />} type="password" placeholder="••••••••" />
                            </motion.div>
                        </AnimatePresence>

                        <motion.button
                            onClick={onLogin}
                            className="relative w-full py-3 overflow-hidden font-bold uppercase transition-all duration-300 border-2 rounded-lg group border-green-500 bg-green-500/20 hover:bg-green-500/30"
                            whileHover="hover"
                        >
                            <motion.span className="absolute inset-0 transition-all duration-500 bg-green-500"
                                variants={{ hover: { clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` } }}
                                initial={{ clipPath: `polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)` }}
                            />
                            <span className="relative z-10 text-green-800 group-hover:text-white">{isSignUp ? 'Create Account' : 'Enter the Grove'}</span>
                            <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.2, rotate: 15 } }}>
                                <div className="absolute w-8 h-8 -top-2 -left-2"><Leaf /></div>
                                <div className="absolute w-8 h-8 transform -bottom-2 -right-2 rotate-180"><Leaf /></div>
                            </motion.div>
                        </motion.button>
                        
                        <div className="flex items-center text-xs text-center text-green-700">
                            <div className="flex-grow border-t border-green-300/70"></div>
                            <span className="px-3">OR</span>
                            <div className="flex-grow border-t border-green-300/70"></div>
                        </div>

                        <motion.button 
                            onClick={onLogin} 
                            className="flex items-center justify-center w-full gap-3 py-2.5 font-semibold text-green-800 transition-colors bg-white/60 rounded-lg hover:bg-white/90 border border-green-300/50"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <GoogleIcon />
                            Continue with Google
                        </motion.button>

                        <p className="text-sm text-center text-green-800">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button onClick={() => setIsSignUp(!isSignUp)} className="ml-2 font-semibold hover:underline text-green-700">
                                {isSignUp ? 'Log in' : 'Sign up'}
                            </button>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};