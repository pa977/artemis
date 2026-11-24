
import React from 'react';
import { motion } from 'framer-motion';

const Node: React.FC<{ cx: number; cy: number; text: string; delay: number }> = ({ cx, cy, text, delay }) => (
  <g>
    <motion.circle
      cx={cx}
      cy={cy}
      r={30}
      fill="rgba(110, 231, 183, 0.3)"
      stroke="rgba(16, 185, 129, 1)"
      strokeWidth={1}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay, type: 'spring', stiffness: 150 }}
    >
        <animate attributeName="r" values="30;32;30" dur="3s" repeatCount="indefinite" />
    </motion.circle>
    <motion.text
      x={cx}
      y={cy}
      textAnchor="middle"
      dy=".3em"
      fill="#064e3b"
      fontSize="10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.2 }}
    >
      {text}
    </motion.text>
  </g>
);

const Branch: React.FC<{ d: string; delay: number }> = ({ d, delay }) => (
  <motion.path
    d={d}
    stroke="#6ee7b7"
    strokeWidth={1.5}
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ delay, duration: 0.8, ease: 'easeInOut' }}
  />
);

const KnowledgeGraph: React.FC = () => {
  return (
    <div className="p-4 rounded-lg bg-emerald-50/50">
      <h3 className="mb-4 text-lg font-bold text-center text-emerald-700">Photosynthesis Pathway</h3>
      <svg viewBox="0 0 500 400" className="w-full h-auto">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        
        <g filter="url(#glow)">
          {/* Branches */}
          <Branch d="M250 380 Q 250 300, 150 250" delay={0} />
          <Branch d="M150 250 Q 100 220, 80 150" delay={0.2} />
          <Branch d="M80 150 Q 70 100, 100 50" delay={0.4} />
          <Branch d="M150 250 Q 200 220, 220 150" delay={0.2} />

          <Branch d="M250 380 Q 250 300, 350 250" delay={0.1} />
          <Branch d="M350 250 Q 300 220, 320 150" delay={0.3} />
          <Branch d="M350 250 Q 400 220, 420 150" delay={0.3} />
          <Branch d="M420 150 Q 430 100, 400 50" delay={0.5} />

          {/* Nodes */}
          <Node cx={250} cy={380} text="Root" delay={0} />
          <Node cx={150} cy={250} text="Light" delay={0.2} />
          <Node cx={350} cy={250} text="Calvin" delay={0.3} />
          <Node cx={80} cy={150} text="Photosystem II" delay={0.4} />
          <Node cx={220} cy={150} text="Photosystem I" delay={0.4} />
          <Node cx={320} cy={150} text="Carbon Fix." delay={0.5} />
          <Node cx={420} cy={150} text="Regeneration" delay={0.5} />
          <Node cx={100} cy={50} text="ATP" delay={0.6} />
          <Node cx={400} cy={50} text="Glucose" delay={0.7} />
        </g>
      </svg>
    </div>
  );
};

export default KnowledgeGraph;