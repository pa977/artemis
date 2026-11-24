import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plant, JournalEntry } from '../types';
import { analyzePlantPhoto } from '../services/geminiService';

interface JournalModalProps {
  plant: Plant;
  onClose: () => void;
  onAddEntry: (plantId: string, entry: Omit<JournalEntry, 'id'>) => void;
  updateAiHealthAnalysis: (plantId: string, entryId: string, analysis: string) => void;
}

const JournalModal: React.FC<JournalModalProps> = ({ plant, onClose, onAddEntry, updateAiHealthAnalysis }) => {
  const [note, setNote] = useState('');
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim() && !image) return;
    setIsSubmitting(true);

    const newEntry: Omit<JournalEntry, 'id'> = {
        date: new Date().toISOString(),
        note: note,
        imageUrl: image?.preview,
    };
    onAddEntry(plant.id, newEntry);

    // Get the ID that will be assigned (not ideal, but works for this demo)
    const tempId = `entry-${newEntry.date}`;

    if (image) {
        const analysis = await analyzePlantPhoto(image.file);
        updateAiHealthAnalysis(plant.id, tempId, analysis);
    }

    setNote('');
    setImage(null);
    setIsSubmitting(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="relative flex flex-col w-full h-full max-w-2xl max-h-[90vh] p-6 border rounded-2xl bg-green-50/80 backdrop-blur-2xl border-green-200"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-2xl font-bold font-orbitron text-green-800">{plant.name}'s Journal</h2>
        
        <div className="flex-1 pr-2 -mr-2 overflow-y-auto">
          <AnimatePresence>
            {plant.journal.length === 0 ? (
                 <div className="flex items-center justify-center h-full text-center text-green-700">No entries yet. Add one below!</div>
            ) : (
                plant.journal.map(entry => (
                    <motion.div key={entry.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-4 mb-4 border rounded-lg bg-white/50 border-green-200">
                        <p className="text-xs font-semibold text-green-600">{new Date(entry.date).toLocaleString()}</p>
                        <p className="mt-1 text-green-900">{entry.note}</p>
                        {entry.imageUrl && <img src={entry.imageUrl} className="object-cover mt-2 rounded-lg max-h-48"/>}
                        {entry.aiHealthAnalysis && (
                            <div className="p-2 mt-2 text-xs italic border-l-2 rounded-r-md bg-green-100/70 border-green-500 text-green-800">
                                <strong>AI Analysis:</strong> {entry.aiHealthAnalysis}
                            </div>
                        )}
                    </motion.div>
                ))
            )}
            </AnimatePresence>
        </div>
        
        <div className="pt-4 mt-auto border-t border-green-200">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a new journal entry..." rows={3}
              className="w-full p-2 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
            {image && (
                <div className="relative w-24 h-24">
                    <img src={image.preview} className="object-cover w-full h-full rounded-md" />
                    <button type="button" onClick={() => setImage(null)} className="absolute top-0 right-0 p-1 text-white translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/80 hover:bg-red-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            )}
            <div className="flex items-center justify-between">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <motion.button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 transition-colors rounded-full text-green-600 hover:bg-green-200" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </motion.button>
              <motion.button type="submit" disabled={isSubmitting} className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-400" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {isSubmitting ? 'Saving...' : 'Add Entry'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JournalModal;