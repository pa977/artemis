import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CameraIcon from './icons/CameraIcon';
import UploadIcon from './icons/UploadIcon';

interface ProfilePictureModalProps {
  onClose: () => void;
  onUpdatePicture: (picture: string) => void;
}

type View = 'options' | 'camera' | 'upload';

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({ onClose, onUpdatePicture }) => {
  const [view, setView] = useState<View>('options');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setView('camera');
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Please ensure you have given permission.");
    }
  };

  useEffect(() => {
    if (view === 'camera' && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [view, stream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
        setView('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'camera':
        return (
          <div className="flex flex-col items-center">
            {capturedImage ? (
                <>
                    <img src={capturedImage} alt="Capture preview" className="mb-4 rounded-lg" />
                    <div className="flex gap-4">
                        <button onClick={() => setCapturedImage(null)} className="px-4 py-2 font-semibold transition-colors rounded-lg text-green-800 hover:bg-green-200/50">Retake</button>
                        <button onClick={() => onUpdatePicture(capturedImage)} className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-green-600 hover:bg-green-700">Use Photo</button>
                    </div>
                </>
            ) : (
                <>
                    <video ref={videoRef} autoPlay playsInline className="w-full mb-4 rounded-lg" />
                    <button onClick={handleCapture} className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-green-600 hover:bg-green-700">Capture</button>
                </>
            )}
             <canvas ref={canvasRef} className="hidden" />
          </div>
        );
      case 'upload':
          return (
             <div className="flex flex-col items-center">
                <img src={uploadPreview!} alt="Upload preview" className="mb-4 rounded-lg max-h-72" />
                <div className="flex gap-4">
                    <label className="px-4 py-2 font-semibold transition-colors rounded-lg cursor-pointer text-green-800 hover:bg-green-200/50">Change File<input type="file" className="hidden" accept="image/*" onChange={handleFileChange} /></label>
                    <button onClick={() => onUpdatePicture(uploadPreview!)} className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-green-600 hover:bg-green-700">Use Photo</button>
                </div>
            </div>
          );
      case 'options':
      default:
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button onClick={startCamera} className="flex flex-col items-center justify-center p-6 transition-colors border rounded-lg hover:bg-green-100 border-green-300">
              <CameraIcon />
              <span className="mt-2 font-semibold text-green-800">Take Photo</span>
            </button>
            <label className="flex flex-col items-center justify-center p-6 transition-colors border rounded-lg cursor-pointer hover:bg-green-100 border-green-300">
              <UploadIcon />
              <span className="mt-2 font-semibold text-green-800">Upload File</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        );
    }
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
        className="relative w-full max-w-lg p-6 border rounded-2xl bg-green-50/80 backdrop-blur-2xl border-green-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-800">Update Profile Picture</h2>
            {view !== 'options' && (
                <button onClick={() => { setView('options'); setCapturedImage(null); setUploadPreview(null); }} className="text-sm font-semibold text-green-700 hover:underline">Back</button>
            )}
        </div>
        <div>
            {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePictureModal;