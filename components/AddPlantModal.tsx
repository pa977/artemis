import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plant } from '../types';

interface AddPlantModalProps {
  onClose: () => void;
  onAddPlant: (plant: Omit<Plant, 'id' | 'journal'>) => Promise<void>;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({ onClose, onAddPlant }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [plantingDate, setPlantingDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !species.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await onAddPlant({ name, species, plantingDate });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-md p-6 border rounded-2xl bg-green-50/80 backdrop-blur-2xl border-green-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-green-800">Add a New Plant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-green-700">Plant Nickname</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., 'Front Porch Tomato'" required className="w-full p-2 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-green-700">Species</label>
            <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="e.g., 'Solanum lycopersicum'" required className="w-full p-2 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-green-700">Planting Date</label>
            <input type="date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} required className="w-full p-2 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <motion.button type="button" onClick={onClose} className="px-4 py-2 font-semibold transition-colors rounded-lg text-green-800 hover:bg-green-200/50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Cancel
            </motion.button>
            <motion.button type="submit" disabled={isSubmitting} className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-400" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isSubmitting ? 'Saving...' : 'Add to Garden'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddPlantModal;