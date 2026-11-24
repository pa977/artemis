import React from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC = () => {
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 5;
  const size = Math.random() * 3 + 1;
  const initialX = `${Math.random() * 100}vw`;
  const finalY = `-${size}px`;

  return (
    <motion.div
      className="absolute rounded-full bg-green-400/50"
      style={{
        width: size,
        height: size,
        left: initialX,
        bottom: `-${size}px`,
      }}
      animate={{
        y: [0, -window.innerHeight - size],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
    />
  );
};

const LightRay: React.FC<{ rotation: number; delay: number }> = ({ rotation, delay }) => (
    <motion.div
      className="absolute top-0 origin-top"
      style={{
        width: '2px',
        height: '150vh',
        background: 'linear-gradient(to bottom, rgba(74, 222, 128, 0.2), transparent)',
        rotate: `${rotation}deg`,
      }}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 15, delay, repeat: Infinity, ease: "easeInOut" }}
    />
);


const DefaultBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-green-50 to-emerald-100">
      {/* Organic Vein-like Texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0h1v5h5V0h1v5h5V0h1v5h5V0h1v5h5V0h1v5h5V0h1v5h5V0h1v5h5V0h1v5h5V0h1v5h4v1h-4v5h4v1h-4v5h4v1h-4v5h4v1h-4v5h4v1h-4v5h4v1h-4v5h4v1h-4v5h4v1h-4v5h4v1h-4v4h-1v-4h-5v4h-1v-4h-5v4h-1v-4h-5v4h-1v-4h-5v4h-1v-4h-5v4h-1v-4h-5v4h-1v-4H0v-1h5v-5H0v-1h5v-5H0v-1h5v-5H0v-1h5v-5H0v-1h5v-5H0v-1h5v-5H0v-1h5v-5H0v-1h5v-5H0V5h6zm-1 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-5 6h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm5 6v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-5 6h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm5 6v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-5 6h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm5 6v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-5 6h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm5 6v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5zm-6 0v5h-5v-5h5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
      ></div>

      {/* Central Glow */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(134, 239, 172, 0.3) 0%, rgba(134, 239, 172, 0) 60%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Floating Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Particle key={i} />
      ))}

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

export default DefaultBackground;