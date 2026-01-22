import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl, videoTitle }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl p-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <video
              src={videoUrl}
              controls
              autoPlay
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold">{videoTitle}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;