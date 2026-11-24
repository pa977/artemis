import React from 'react';
import { motion } from 'framer-motion';

const NutrientParticle: React.FC = () => {
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 8;
    const initialY = 100 + Math.random() * 30;
    const finalY = -50 - Math.random() * 30;
    const initialX = Math.random() * 100;
    const xOffset = (Math.random() - 0.5) * 80;


    return (
        <motion.circle
            cx={`${initialX}%`}
            cy={`${initialY}%`}
            r={Math.random() * 2 + 1}
            fill={Math.random() > 0.5 ? "rgba(209, 250, 229, 0.8)" : "rgba(167, 243, 208, 0.8)"}
            animate={{ 
                y: [0, finalY],
                x: [0, xOffset],
                opacity: [0, 1, 1, 0]
            }}
            transition={{ 
                duration, 
                delay, 
                repeat: Infinity, 
                ease: 'easeInOut',
                times: [0, 0.1, 0.9, 1]
            }}
        />
    )
}

const SoilGuideBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-emerald-50">
        {/* Soil Layers */}
        <motion.div 
            className="absolute inset-0"
            style={{
                backgroundImage: 'linear-gradient(180deg, #ecfdf5 30%, #d1fae5 50%, #a7f3d0 70%)'
            }}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror'
            }}
        />

        {/* Animated roots */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-40">
            <motion.path
                d="M 500 0 V 400 Q 450 500 400 600 T 300 800"
                stroke="rgba(20, 83, 45, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
            />
             <motion.path
                d="M 1200 0 V 300 Q 1300 450 1100 600 T 1300 900"
                stroke="rgba(20, 83, 45, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 10, delay: 1, ease: "easeOut" }}
            />
        </svg>
        
        {/* Nutrient Particles */}
        <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
                <filter id="nutrientGlow">
                    <feGaussianBlur stdDeviation="1.5" />
                </filter>
            </defs>
            <g filter="url(#nutrientGlow)">
                {Array.from({ length: 50 }).map((_, i) => (
                    <NutrientParticle key={i} />
                ))}
            </g>
        </svg>
    </div>
  );
};

export default SoilGuideBackground;