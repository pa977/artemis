import React from 'react';
import { motion } from 'framer-motion';

const FloatingLeaf: React.FC = () => {
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const size = Math.random() * 20 + 15;
    const initialX = `${Math.random() * 100}vw`;
    const initialY = `${Math.random() * 100}vh`;

    return (
        <motion.div
            className="absolute"
            style={{
                width: size,
                height: size,
                left: initialX,
                top: initialY,
            }}
            animate={{
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
                y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
                rotate: [0, (Math.random() - 0.5) * 90, 0],
                opacity: [0, 0.4, 0.6, 0.4, 0]
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
            }}
        >
             <svg viewBox="0 0 50 50" className="w-full h-full text-green-400/80 transform -rotate-45">
                 <path d="M25 0 C 25 0, 0 15, 25 50 C 25 50, 50 15, 25 0 Z" fill="currentColor" />
             </svg>
        </motion.div>
    );
};

export default FloatingLeaf;
