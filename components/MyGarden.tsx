import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plant, JournalEntry, WeatherData } from '../types';
import { generateGardenHealthReport } from '../services/geminiService';
import PlantCard from './PlantCard';
import AddPlantModal from './AddPlantModal';
import GardenTasks from './GardenTasks';
import WeatherWidget from './WeatherWidget';
import HealthReportModal from './HealthReportModal';
import ReportIcon from './icons/ReportIcon';
import { playModalOpen, playModalClose } from '../services/soundService';

interface MyGardenProps {
    plants: Plant[];
    onAddPlant: (plant: Omit<Plant, 'id' | 'journal'>) => Promise<void>;
    onAddJournalEntry: (plantId: string, entry: Omit<JournalEntry, 'id'>) => void;
    updateAiHealthAnalysis: (plantId: string, entryId: string, analysis: string) => void;
    weatherData: WeatherData | null;
    tasks: string[];
    isLoading: boolean;
    onRefreshInsights: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const MyGarden: React.FC<MyGardenProps> = ({ plants, onAddPlant, onAddJournalEntry, updateAiHealthAnalysis, weatherData, tasks, isLoading, onRefreshInsights }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);

  const handleGenerateReport = async () => {
    playModalOpen();
    setReportModalOpen(true);
    setIsReportLoading(true);
    const report = await generateGardenHealthReport(plants, weatherData);
    setReportContent(report);
    setIsReportLoading(false);
  };

  const openAddModal = () => {
    playModalOpen();
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    playModalClose();
    setAddModalOpen(false);
  };

  return (
    <>
        <div className="w-full h-full p-4 overflow-y-auto md:p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2"
            >
                <GardenTasks tasks={tasks} isLoading={isLoading} onRefresh={onRefreshInsights} />
                <WeatherWidget weather={weatherData} isLoading={isLoading} />
            </motion.div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold text-green-800 font-orbitron">My Digital Garden</h1>
                <div className="flex items-center gap-4">
                    <motion.button 
                        onClick={handleGenerateReport}
                        disabled={isReportLoading}
                        className="flex items-center gap-2 px-4 py-2 font-semibold transition-colors rounded-lg bg-green-600/20 text-green-800 hover:bg-green-600/30 disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ReportIcon />
                        {isReportLoading ? 'Analyzing...' : 'Health Report'}
                    </motion.button>
                    <motion.button 
                        onClick={openAddModal}
                        className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-green-600 hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        + Add Plant
                    </motion.button>
                </div>
            </div>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {plants.map(plant => (
                    <PlantCard 
                        key={plant.id} 
                        plant={plant} 
                        onAddJournalEntry={onAddJournalEntry}
                        updateAiHealthAnalysis={updateAiHealthAnalysis}
                    />
                ))}
            </motion.div>
        </div>
        <AnimatePresence>
            {isAddModalOpen && <AddPlantModal onClose={closeAddModal} onAddPlant={onAddPlant} />}
            {isReportModalOpen && 
              <HealthReportModal 
                onClose={() => setReportModalOpen(false)} 
                reportContent={reportContent} 
                isLoading={isReportLoading}
              />
            }
        </AnimatePresence>
    </>
  );
};

export default MyGarden;