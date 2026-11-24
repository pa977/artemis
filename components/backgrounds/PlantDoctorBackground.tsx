import React from 'react';
import { motion } from 'framer-motion';

const Firefly: React.FC = () => {
  const duration = Math.random() * 8 + 7;
  const delay = Math.random() * 10;
  const size = Math.random() * 3 + 2;

  return (
    <motion.div
      className="absolute rounded-full bg-amber-200"
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        filter: 'blur(2px)'
      }}
      animate={{
        x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 50],
        y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 50],
        opacity: [0, 0.9, 0.7, 0.9, 0],
        scale: [1, 1.2, 1, 1.1, 1]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  );
};

const PestIdBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-emerald-50 to-green-100">
        {/* Leaf silhouettes */}
        <motion.div 
            className="absolute inset-[-10%] opacity-10"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%2310b981' fill-opacity='0.08'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.08'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 70 200 70 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
                transform: 'scale(2) rotate(30deg)'
            }}
            animate={{
                x: ['-5px', '5px'],
                y: ['-5px', '5px']
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
            }}
        />

        {/* Floating Fireflies */}
        {Array.from({ length: 25 }).map((_, i) => (
            <Firefly key={i} />
        ))}
    </div>
  );
};

export default PestIdBackground;