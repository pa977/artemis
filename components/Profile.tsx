import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import UserIcon from './icons/UserIcon';
import ProfilePictureModal from './ProfilePictureModal';
import { playModalOpen, playModalClose } from '../services/soundService';

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile }) => {
  const [username, setUsername] = useState(userProfile.username);
  const [email, setEmail] = useState(userProfile.email);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateProfile({ ...userProfile, username, email });
    setIsSaved(true);
  };

  const handlePictureUpdate = (picture: string) => {
    onUpdateProfile({ ...userProfile, profilePicture: picture });
    closeModal();
  };

  const openModal = () => {
    playModalOpen();
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    playModalClose();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);
  
  return (
    <>
      <div className="flex items-center justify-center w-full h-full p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-full max-w-lg p-8 space-y-6 border rounded-2xl bg-white/40 backdrop-blur-lg border-green-300/50"
        >
          <h1 className="text-3xl font-bold text-center text-green-800 font-orbitron">User Profile</h1>
          
          <div className="relative mx-auto group w-36 h-36">
            <div className="w-full h-full overflow-hidden border-4 rounded-full border-green-300 bg-green-200">
              {userProfile.profilePicture ? (
                <img src={userProfile.profilePicture} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full p-6 text-green-600"><UserIcon /></div>
              )}
            </div>
            <button
              onClick={openModal}
              className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white transition-opacity duration-300 bg-black rounded-full opacity-0 bg-opacity-60 group-hover:opacity-100"
            >
              Change Picture
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm text-green-800">Username</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}
                className="w-full p-3 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-green-800">Email</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}
                className="w-full p-3 transition duration-300 bg-white/50 border rounded-lg text-green-950 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            <AnimatePresence mode="wait">
                {isSaved && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="mr-4 text-sm font-semibold text-green-700 overflow-hidden whitespace-nowrap"
                    >
                        Changes saved!
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
              onClick={handleSave}
              className="px-6 py-2 font-bold text-white uppercase transition-colors rounded-lg bg-green-600 hover:bg-green-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ProfilePictureModal
            onClose={closeModal}
            onUpdatePicture={handlePictureUpdate}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;