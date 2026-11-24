import React from 'react';
import { motion } from 'framer-motion';
import RefreshIcon from './icons/RefreshIcon';

interface GardenTasksProps {
  tasks: string[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ShimmerEffect = () => (
    <motion.div
        className="absolute inset-0"
        style={{
            backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(74, 222, 128, 0.2) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
        }}
    />
);

const GardenTasks: React.FC<GardenTasksProps> = ({ tasks, isLoading, onRefresh }) => {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01, boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="p-4 border rounded-2xl bg-green-600/10 backdrop-blur-lg border-green-300/30"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-green-800">Today's Tasks</h2>
        <motion.button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1 text-green-600 transition-colors rounded-full hover:bg-green-200 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Refresh tasks"
        >
            <RefreshIcon />
        </motion.button>
      </div>
      {isLoading ? (
        <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="relative w-5 h-5 overflow-hidden rounded-md bg-green-200/80">
                        <ShimmerEffect />
                    </div>
                    <div className={`relative h-4 overflow-hidden rounded-full bg-green-200/80 ${i === 0 ? 'w-3/4' : 'w-1/2'}`}>
                        <ShimmerEffect />
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }}
              className="flex items-center gap-3 text-sm text-green-900"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-md bg-green-200/80 text-green-700">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>{task}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default GardenTasks;