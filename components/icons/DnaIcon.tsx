import React from 'react';
import { motion, MotionProps } from 'framer-motion';

const DnaIcon: React.FC<{ animate?: boolean }> = ({ animate = false }) => {
    const animationProps: MotionProps = animate ? {
        animate: { rotate: 360 },
        transition: { duration: 25, repeat: Infinity, ease: 'linear' }
    } : {};
    
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...animationProps}
        >
            {/* Stylized Sprout */}
            <path d="M12 13V8"/>
            <path d="M15 11c-2.5-1-2.5-4-5-4"/>
            <path d="M9 11c2.5-1 2.5-4 5-4"/>
            
            {/* Crescent Orbit */}
            <path d="M19.66 11.66c0 4.24-3.42 7.66-7.66 7.66-3.1 0-5.8-1.84-7-4.5"/>
            <path d="M4.34 12.34c0-4.24 3.42-7.66 7.66-7.66 3.1 0 5.8 1.84 7 4.5"/>
        </motion.svg>
    );
};

export default DnaIcon;