import React from 'react';
import { motion } from 'framer-motion';
import { PlantHealthStatus } from '../types';

interface HealthIndicatorProps {
  status: PlantHealthStatus['status'];
  summary: string;
}

const statusColors: Record<PlantHealthStatus['status'], string> = {
  'Thriving': 'bg-green-500',
  'Stable': 'bg-yellow-500',
  'Needs Attention': 'bg-orange-500',
  'Vulnerable': 'bg-red-500',
};

const HealthIndicator: React.FC<HealthIndicatorProps> = ({ status, summary }) => {
  const color = statusColors[status] || 'bg-gray-400';

  return (
    <div className="relative group">
      <motion.div
        className={`w-3 h-3 rounded-full ${color}`}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        <p className="font-bold">{status}</p>
        <p className="italic">"{summary}"</p>
      </div>
    </div>
  );
};

export default HealthIndicator;