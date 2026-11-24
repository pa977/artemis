import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types';
import WeatherIcon from './icons/weather';
import AlertIcon from './icons/weather/AlertIcon';
import DnaIcon from './icons/DnaIcon';

interface WeatherWidgetProps {
    weather: WeatherData | null;
    isLoading: boolean;
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

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
        <motion.div
            whileHover={{ y: -3, scale: 1.01, boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="p-4 border rounded-2xl bg-green-600/10 backdrop-blur-lg border-green-300/30"
        >
            <div className="relative w-2/3 h-5 mb-3 overflow-hidden rounded bg-green-200/80"><ShimmerEffect /></div>
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 overflow-hidden rounded-full bg-green-200/80"><ShimmerEffect /></div>
                <div className="space-y-2">
                    <div className="relative w-24 h-6 overflow-hidden rounded bg-green-200/80"><ShimmerEffect /></div>
                    <div className="relative w-32 h-4 overflow-hidden rounded bg-green-200/80"><ShimmerEffect /></div>
                </div>
            </div>
        </motion.div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -3, scale: 1.01, boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="p-4 text-green-900 border rounded-2xl bg-green-600/10 backdrop-blur-lg border-green-300/30"
    >
      <h2 className="text-sm font-semibold text-green-800">{weather.location}</h2>
      <div className="flex items-center gap-4 mt-2">
        <WeatherIcon code={weather.conditionCode} />
        <div>
          <p className="text-3xl font-bold">{weather.temperature}°F</p>
          <p className="text-sm text-green-700">{weather.condition}</p>
        </div>
      </div>
      {weather.aiSummary && (
        <div className="pt-3 mt-3 border-t border-green-300/50">
            <div className="flex items-start gap-2 p-2 text-xs font-semibold rounded-lg bg-green-500/20 text-green-900">
                <div className="w-5 h-5 pt-0.5 text-green-600 shrink-0"><DnaIcon /></div>
                <p>
                  <span className="font-bold">ARTEMIS says:</span> {weather.aiSummary}
                </p>
            </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherWidget;