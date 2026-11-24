import React from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './TypingAnimation';
import DnaIcon from './icons/DnaIcon';
import { playModalClose } from '../services/soundService';

interface HealthReportModalProps {
  onClose: () => void;
  reportContent: string;
  isLoading: boolean;
}

const HealthReportModal: React.FC<HealthReportModalProps> = ({ onClose, reportContent, isLoading }) => {
  const handleClose = () => {
    playModalClose();
    onClose();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] p-6 border rounded-2xl bg-green-50/80 backdrop-blur-2xl border-green-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-2xl font-bold font-orbitron text-green-800">Garden Health Report</h2>
        
        <div className="flex-1 pr-2 -mr-2 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-green-700">
              <div className="w-16 h-16 mb-4 text-green-500">
                <DnaIcon animate={true} />
              </div>
              <p className="font-semibold">ARTEMIS is analyzing your garden...</p>
              <p className="text-sm">Please wait a moment.</p>
            </div>
          ) : (
            <TypingAnimation text={reportContent} />
          )}
        </div>
        
        <div className="flex justify-end pt-4 mt-4 border-t border-green-200">
            <motion.button 
              onClick={handleClose} 
              className="px-4 py-2 font-semibold transition-colors rounded-lg text-green-800 hover:bg-green-200/50" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HealthReportModal;