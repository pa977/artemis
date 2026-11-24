import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plant, JournalEntry } from '../types';
import JournalModal from './JournalModal';
import JournalIcon from './icons/JournalIcon';
import HealthIndicator from './HealthIndicator';
import { playModalOpen, playModalClose } from '../services/soundService';

interface PlantCardProps {
  plant: Plant;
  onAddJournalEntry: (plantId: string, entry: Omit<JournalEntry, 'id'>) => void;
  updateAiHealthAnalysis: (plantId: string, entryId: string, analysis: string) => void;
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


const PlantCard: React.FC<PlantCardProps> = ({ plant, onAddJournalEntry, updateAiHealthAnalysis }) => {
  const [isJournalOpen, setJournalOpen] = useState(false);
  
  const latestJournalImage = plant.journal.find(entry => entry.imageUrl)?.imageUrl;
  const careInfo = plant.careInfo;
  const isLoading = !careInfo;

  const openJournal = () => {
    playModalOpen();
    setJournalOpen(true);
  };

  const closeJournal = () => {
    playModalClose();
    setJournalOpen(false);
  };

  return (
    <>
      <motion.div
        variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        }}
        whileHover={{ y: -5, boxShadow: '0 10px 20px -5px rgba(34, 197, 94, 0.2)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col justify-between overflow-hidden border rounded-2xl bg-white/40 backdrop-blur-lg border-green-300/50"
      >
        <div 
          className="h-32 bg-center bg-cover" 
          style={{ backgroundImage: latestJournalImage ? `url(${latestJournalImage})` : `url(https://source.unsplash.com/random/400x200/?${plant.species})`}}
        />
        <div className="p-4">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-green-900">{plant.name}</h3>
                    <p className="text-sm text-green-700">{plant.species}</p>
                </div>
                {plant.aiHealthStatus && <HealthIndicator status={plant.aiHealthStatus.status} summary={plant.aiHealthStatus.summary} />}
            </div>
          <p className="mt-1 text-xs text-green-600">Planted: {new Date(plant.plantingDate).toLocaleDateString()}</p>
        </div>
        <div className="p-4 bg-green-50/50">
          {isLoading ? (
             <div className="space-y-2">
                <div className="relative w-3/4 h-4 overflow-hidden rounded bg-green-200">
                    <ShimmerEffect />
                </div>
                <div className="relative w-1/2 h-4 overflow-hidden rounded bg-green-200">
                    <ShimmerEffect />
                </div>
                <div className="relative w-2/3 h-4 overflow-hidden rounded bg-green-200">
                    <ShimmerEffect />
                </div>
            </div>
          ) : careInfo ? (
            <ul className="space-y-1 text-xs text-green-800">
              <li><strong>Water:</strong> {careInfo.watering}</li>
              <li><strong>Sun:</strong> {careInfo.sunlight}</li>
              <li><strong>Pests:</strong> {careInfo.commonPests}</li>
            </ul>
          ) : null}
        </div>
         <button 
            onClick={openJournal}
            className="flex items-center justify-center w-full gap-2 p-3 text-sm font-semibold transition-colors duration-200 bg-green-200/50 text-green-800 hover:bg-green-200/80"
        >
            <JournalIcon />
            View Journal ({plant.journal.length})
        </button>
      </motion.div>

      <AnimatePresence>
        {isJournalOpen && (
          <JournalModal
            plant={plant}
            onClose={closeJournal}
            onAddEntry={onAddJournalEntry}
            updateAiHealthAnalysis={updateAiHealthAnalysis}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PlantCard;