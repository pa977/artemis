import React from 'react';
import { motion } from 'framer-motion';

const FallingLeaf: React.FC = () => {
    const duration = Math.random() * 8 + 7;
    const delay = Math.random() * 10;
    const size = Math.random() * 15 + 10;
    const initialX = Math.random() * 100;
    const xFlutter = Math.random() * 60 - 30;

    return (
        <motion.div
            className="absolute text-amber-500"
            style={{ left: `${initialX}vw`, top: `-${size}px` }}
            animate={{
                y: window.innerHeight + size,
                x: [0, xFlutter, -xFlutter, 0],
                rotate: [0, 180, 360, 540]
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0"/>
                <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-2c2.21 0 4.21-.89 5.66-2.34L6.34 6.34C4.89 7.79 4 9.79 4 12c0 4.41 3.59 8 8 8z" />
            </svg>
        </motion.div>
    );
};

const HarvestGuideBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-amber-50 to-emerald-100">
        {Array.from({ length: 25 }).map((_, i) => (
            <FallingLeaf key={i} />
        ))}
        {/* Soft radial glow */}
        <motion.div
            className="absolute"
            style={{
                top: '70%',
                left: '10%',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 50%)',
            }}
            animate={{ 
                scale: [1, 1.1, 1],
                x: ['0%', '10%', '0%']
            }}
            transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: 'easeInOut',
                repeatType: 'mirror'
            }}
        />
    </div>
  );
};

export default HarvestGuideBackground;