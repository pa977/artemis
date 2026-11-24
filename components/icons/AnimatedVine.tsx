import React from 'react';
import { motion, Variants } from 'framer-motion';

const vineVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: (custom: { duration: number, delay: number }) => ({
        pathLength: 1,
        transition: {
            duration: custom.duration,
            delay: custom.delay,
            ease: [0.42, 0, 0.58, 1] // easeInOutSine
        }
    })
}

export const AnimatedVine: React.FC<{ delay: number, duration: number, path: string, className?: string }> = ({ delay, duration, path, className }) => {
    return (
        <motion.path
            d={path}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className={className}
            variants={vineVariants}
            initial="hidden"
            animate="visible"
            custom={{ duration, delay }}
        />
    );
}