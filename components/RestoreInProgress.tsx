
import React, { useState, useEffect } from 'react';

interface RestoreInProgressProps {
  onComplete: () => void;
}

const RestoreInProgress: React.FC<RestoreInProgressProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-lg p-8 bg-gray-800/50 backdrop-blur-sm border border-red-400/20 rounded-2xl shadow-2xl shadow-red-500/10 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Factory Restore in Progress</h2>
      <p className="text-gray-400 mb-6">Erasing all data and restoring factory settings. Do not power off the device.</p>
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white text-lg font-bold mt-4">{progress}%</p>
    </div>
  );
};

export default RestoreInProgress;
