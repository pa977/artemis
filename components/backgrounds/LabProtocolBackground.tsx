import React from 'react';
import { motion } from 'framer-motion';

const Sprout: React.FC = () => {
  const delay = Math.random() * 15;
  const duration = 0.8;
  const x = `${Math.random() * 100}%`;
  const y = `${Math.random() * 100}%`;

  return (
    <motion.svg
      x={x} y={y}
      width="20" height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(16, 185, 129, 0.7)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0, opacity: 0, rotate: -15 }}
      animate={{ 
        scale: [0, 1, 1, 0], 
        opacity: [0, 1, 1, 0],
        rotate: [-15, 0, 15, 0]
      }}
      transition={{
        duration: duration * 3,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 15,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1]
      }}
    >
        <path d="M7 10v4c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-4"/>
        <path d="M12 16V4m0 0-3 3m3-3 3 3"/>
    </motion.svg>
  );
};

const GardenPlannerBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-emerald-50">
      {/* Grid pattern */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
        <defs>
            <pattern id="plannerGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="grid-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(110, 231, 183, 0)" />
                <stop offset="50%" stopColor="rgba(110, 231, 183, 1)" />
                <stop offset="100%" stopColor="rgba(110, 231, 183, 0)" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#plannerGrid)" />
        <motion.rect
            x="0"
            y="0"
            width="10"
            height="100%"
            fill="url(#grid-glow)"
            style={{ filter: "blur(5px)"}}
            animate={{ x: ['-10%', '110%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        />
      </svg>
      
      {/* Animated Sprouts */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
            <Sprout key={i} />
        ))}
      </svg>
    </div>
  );
};

export default GardenPlannerBackground;