import React from 'react';
import { motion } from 'framer-motion';

const Helix: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => {
  const pathLength = 1000;
  let path = 'M 50,0 ';
  for (let i = 0; i < pathLength; i++) {
    const x = 50 + 40 * Math.sin(i * 0.1);
    const y = i * 2;
    path += `L ${x},${y} `;
  }

  return (
    <motion.path
      d={path}
      stroke="rgba(74, 222, 128, 0.2)"
      strokeWidth="2"
      fill="none"
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: [-200, 0, 0, 200], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1]
      }}
    />
  );
};

const ProfileBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-green-50 to-emerald-100">
      <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="profileGlow">
                <feGaussianBlur stdDeviation="3" />
            </filter>
        </defs>
        <g filter="url(#profileGlow)" transform="scale(1.5)">
            <Helix delay={0} duration={15} />
            <Helix delay={5} duration={18} />
            <Helix delay={10} duration={12} />
        </g>
      </svg>
        <motion.div
            className="absolute inset-0"
            style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(134, 239, 172, 0.2) 0%, rgba(134, 239, 172, 0) 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
    </div>
  );
};

export default ProfileBackground;