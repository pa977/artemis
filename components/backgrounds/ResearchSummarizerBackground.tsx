import React from 'react';
import { motion } from 'framer-motion';

const RainDrop: React.FC = () => {
    const delay = Math.random() * 10;
    const duration = Math.random() * 1 + 0.8;
    const x = `${Math.random() * 100}%`;
    const finalY = window.innerHeight;

    return (
        <motion.line
            x1={x} y1={-20} x2={x} y2={20}
            stroke="rgba(16, 185, 129, 0.5)"
            strokeWidth={Math.random() > 0.5 ? 1.5 : 1}
            strokeLinecap="round"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: finalY, opacity: [0, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
        />
    )
}

const Ripple: React.FC = () => {
    const delay = Math.random() * 8;
    const duration = Math.random() * 2 + 2;

    return (
        <motion.circle
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 80 + 10}%`}
            r="1"
            stroke="rgba(16, 185, 129, 0.5)"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 30, opacity: [1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
        />
    )
}

const WateringScheduleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-emerald-50 to-green-100">
        <motion.div 
            className="absolute inset-0"
            style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.1) 100%)'
            }}
             animate={{
                x: ['-100%', '100%']
             }}
             transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'mirror'
             }}
        />
        <svg width="100%" height="100%" className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
                <RainDrop key={i} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
                <Ripple key={i} />
            ))}
        </svg>
    </div>
  );
};

export default WateringScheduleBackground;