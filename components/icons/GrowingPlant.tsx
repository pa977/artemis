import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      delayChildren: 1.5,
      staggerChildren: 0.4,
    },
  },
};

const stemVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const leafVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring"
    },
  },
};

const GrowingPlant: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="plantGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="plantGlow">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <g filter="url(#plantGlow)">
          {/* Stem */}
          <motion.path
            d="M50 200 C 50 150, 30 150, 50 100 C 70 50, 50 50, 50 0"
            stroke="url(#plantGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            variants={stemVariants}
          />

          {/* Leaves */}
          <g transform="translate(50, 150)">
            <motion.path d="M0 0 C -20 0, -30 -20, -40 -30" stroke="url(#plantGradient)" strokeWidth="2.5" strokeLinecap="round" variants={leafVariants} />
            <motion.path d="M0 0 C 20 0, 30 -20, 40 -30" stroke="url(#plantGradient)" strokeWidth="2.5" strokeLinecap="round" variants={leafVariants} />
          </g>

          <g transform="translate(50, 100)">
            <motion.path d="M0 0 C -20 0, -25 -20, -35 -30" stroke="url(#plantGradient)" strokeWidth="2.5" strokeLinecap="round" variants={leafVariants} />
            <motion.path d="M0 0 C 20 0, 25 -20, 35 -30" stroke="url(#plantGradient)" strokeWidth="2.5" strokeLinecap="round" variants={leafVariants} />
          </g>

          <g transform="translate(50, 50)">
            <motion.path d="M0 0 C -10 0, -15 -15, -20 -25" stroke="url(#plantGradient)" strokeWidth="2" strokeLinecap="round" variants={leafVariants} />
            <motion.path d="M0 0 C 10 0, 15 -15, 20 -25" stroke="url(#plantGradient)" strokeWidth="2" strokeLinecap="round" variants={leafVariants} />
          </g>
        </g>
      </svg>
    </motion.div>
  );
};

export default GrowingPlant;