import React from 'react';
import { motion } from 'framer-motion';

const Vine: React.FC<{ d: string, delay: number, duration: number, stroke: string }> = ({ d, delay, duration, stroke }) => (
    <motion.path
        d={d}
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration, delay, ease: 'easeInOut', repeat: Infinity }}
    />
)

const LightNode: React.FC<{ d: string, delay: number, duration: number }> = ({ d, delay, duration }) => (
    <motion.circle
        r="3"
        fill="rgba(250, 204, 21, 0.8)"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${d}`} />
        </animateMotion>
    </motion.circle>
)


const CompanionFinderBackground: React.FC = () => {
  const vines = [
      { id: 'v1', d: "M 0 800 C 200 600, 400 300, 800 200 S 1400 0, 1920 100", stroke: 'rgba(16, 185, 129, 0.7)', duration: 15, delay: 0 },
      { id: 'v2', d: "M 1920 900 C 1600 700, 1400 400, 1000 300 S 400 100, 0 200", stroke: 'rgba(110, 231, 183, 0.9)', duration: 18, delay: 1 },
      { id: 'v3', d: "M 0 200 C 300 400, 500 800, 900 700 S 1500 500, 1920 600", stroke: 'rgba(5, 150, 105, 0.6)', duration: 20, delay: 0.5 }
  ]
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100">
        <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
            <defs>
                <filter id="vineGlow">
                    <feGaussianBlur stdDeviation="2.5" />
                </filter>
                 {vines.map(vine => <path id={vine.id} d={vine.d} key={vine.id} />)}
            </defs>
            <g filter="url(#vineGlow)">
                {vines.map(vine => (
                    <Vine key={vine.id} {...vine} />
                ))}
            </g>
            <g>
                {vines.map(vine => (
                    <LightNode key={vine.id} d={vine.id} duration={vine.duration / 2} delay={vine.delay + (Math.random() * 5)} />
                ))}
            </g>
        </svg>
    </div>
  );
};

export default CompanionFinderBackground;