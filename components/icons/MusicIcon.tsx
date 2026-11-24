import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const MusicIcon: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
    // FIX: Explicitly type pathVariants with Variants from framer-motion
    // to resolve the type error related to the 'ease' property.
    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <AnimatePresence mode="wait">
                {isPlaying ? (
                    <motion.g key="playing">
                        <motion.path variants={pathVariants} initial="hidden" animate="visible" exit="hidden" d="M9 18V5l12-2v13"></motion.path>
                        <motion.circle variants={pathVariants} initial="hidden" animate="visible" exit="hidden" cx="6" cy="18" r="3"></motion.circle>
                        <motion.circle variants={pathVariants} initial="hidden" animate="visible" exit="hidden" cx="18" cy="16" r="3"></motion.circle>
                    </motion.g>
                ) : (
                    <motion.g key="paused">
                        <motion.path variants={pathVariants} initial="hidden" animate="visible" exit="hidden" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></motion.path>
                        <motion.path variants={pathVariants} initial="hidden" animate="visible" exit="hidden" d="M10 9l-2 2 2 2"></motion.path>
                        <motion.path variants={pathVariants} initial="hidden" animate="visible" exit="hidden" d="M14 15l2-2-2-2"></motion.path>
                        <motion.path variants={pathVariants} initial="hidden" animate="visible" exit="hidden" d="M15.54 15.54L8.46 8.46"></motion.path>
                    </motion.g>
                )}
            </AnimatePresence>
        </svg>
    );
};

export default MusicIcon;
