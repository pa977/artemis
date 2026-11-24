import React from 'react';
import { motion } from 'framer-motion';

const LightRay: React.FC<{ rotation: number; delay: number }> = ({ rotation, delay }) => (
    <motion.div
      className="absolute top-0 origin-top"
      style={{
        width: '2px',
        height: '150vh',
        background: 'linear-gradient(to bottom, rgba(74, 222, 128, 0.25), transparent)',
        rotate: `${rotation}deg`,
      }}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 15, delay, repeat: Infinity, ease: "easeInOut" }}
    />
);


const LoginBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-green-50 to-emerald-100">
      {/* Central Glow */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(134, 239, 172, 0.3) 0%, rgba(134, 239, 172, 0) 60%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
       {/* Light Rays */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
            <LightRay rotation={-30} delay={0} />
            <LightRay rotation={-15} delay={3} />
            <LightRay rotation={0} delay={6} />
            <LightRay rotation={15} delay={9} />
            <LightRay rotation={30} delay={12} />
        </div>
      </div>
    </div>
  );
};

export default LoginBackground;
