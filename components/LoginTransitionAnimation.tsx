import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DnaIcon from './icons/DnaIcon';
import { AnimatedVine } from './icons/AnimatedVine';

const Mote: React.FC = () => {
    const duration = Math.random() * 20 + 15; // Slower
    const delay = Math.random() * 15; // More spread out
    const size = Math.random() * 2 + 0.5; // Smaller
    const initialX = `${Math.random() * 100}vw`;
    const initialY = `${Math.random() * 100}vh`;

    return (
      <motion.div
        className="absolute rounded-full bg-green-200/70"
        style={{
          width: size,
          height: size,
          left: initialX,
          top: initialY,
          filter: 'blur(1.5px)'
        }}
        animate={{
          x: [0, (Math.random() - 0.5) * 40, 0], // Less horizontal drift
          y: [0, (Math.random() - 0.5) * 40, 0], // Gentle floating
          opacity: [0, 0.9, 0],
          scale: [0.8, 1.2, 0.8]
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

// Intricate vine paths
const vinePaths = {
    topLeft: "M0,0 C100,50 150,150 250,250 C350,350 400,450 500,500 M150,150 C120,200 180,250 200,300 M350,350 C380,320 420,380 450,400",
    topRight: "M1000,0 C900,50 850,150 750,250 C650,350 600,450 500,500 M850,150 C880,200 820,250 800,300 M650,350 C620,320 580,380 550,400",
    bottomLeft: "M0,1000 C100,950 150,850 250,750 C350,650 400,550 500,500 M150,850 C120,800 180,750 200,700 M350,650 C380,680 420,620 450,600",
    bottomRight: "M1000,1000 C900,950 850,850 750,750 C650,650 600,550 500,500 M850,850 C880,800 820,750 800,700 M650,650 C620,680 580,620 550,600",
}


const LoginTransitionAnimation: React.FC<{onAnimationComplete: () => void}> = ({ onAnimationComplete }) => {
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationFinished(true);
        }, 4500); // Reduced duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-green-50"
            animate={{ opacity: animationFinished ? 0 : 1 }}
            transition={{ duration: 1.0 }}
            onAnimationComplete={animationFinished ? onAnimationComplete : undefined}
        >
            {/* Background Atmosphere */}
            <motion.div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle, rgba(134, 239, 172, 0.2) 0%, rgba(110, 231, 183, 0) 60%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 5.0, ease: 'easeInOut' }}
            />
            <AnimatePresence>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
                    {Array.from({ length: 100 }).map((_, i) => <Mote key={i} />)}
                </motion.div>
            </AnimatePresence>

            {/* Central Pulse & Icon */}
            <motion.div
                 className="relative flex flex-col items-center justify-center"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
            >
                <motion.div className="w-24 h-24 text-green-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 1, type: 'spring' }}
                >
                    <DnaIcon animate={true} />
                </motion.div>
            </motion.div>

            {/* Realistic Vine Growth */}
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 pointer-events-none">
                 <defs>
                    <filter id="vineGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="undulate">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="0.02 0.05" 
                            numOctaves="2" 
                            result="turbulence"
                        >
                            <animate 
                                attributeName="baseFrequency" 
                                dur="15s" 
                                values="0.02 0.05;0.03 0.08;0.02 0.05" 
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="4" />
                    </filter>
                </defs>
                <g filter="url(#vineGlow) url(#undulate)">
                    <AnimatedVine path={vinePaths.topLeft} delay={1.0} duration={2.0} className="stroke-green-400" />
                    <AnimatedVine path={vinePaths.topRight} delay={1.2} duration={2.2} className="stroke-green-300" />
                    <AnimatedVine path={vinePaths.bottomLeft} delay={1.1} duration={1.8} className="stroke-green-400/80" />
                    <AnimatedVine path={vinePaths.bottomRight} delay={1.4} duration={2.5} className="stroke-green-300/90" />
                </g>
            </svg>

            {/* Welcome Text */}
            <motion.div className="relative flex flex-col items-center justify-center"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 2.8, duration: 1, ease: "backOut" }}
            >
                <motion.p
                    className="mt-4 text-lg text-green-700"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 3.0, duration: 0.8 }}
                >
                    Welcome to
                </motion.p>
                <motion.h1
                    className="text-4xl font-bold tracking-widest text-transparent uppercase font-orbitron bg-clip-text bg-gradient-to-r from-green-600 to-green-700"
                    style={{ textShadow: '0 0 20px rgba(6, 78, 59, 0.2)'}}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                >
                    ARTEMIS
                </motion.h1>
            </motion.div>

        </motion.div>
    )
}

export default LoginTransitionAnimation;