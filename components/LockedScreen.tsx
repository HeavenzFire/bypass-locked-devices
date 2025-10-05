
import React from 'react';
import LockIcon from './icons/LockIcon';

interface LockedScreenProps {
  onStart: () => void;
  loading: boolean;
}

const LockedScreen: React.FC<LockedScreenProps> = ({ onStart, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl shadow-2xl shadow-cyan-500/10">
      <div className="relative mb-8">
        <div className="absolute -inset-2 bg-cyan-400/50 rounded-full blur-xl animate-pulse"></div>
        <div className="relative w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center border-2 border-cyan-400">
          <LockIcon className="w-12 h-12 text-cyan-400" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Device Locked</h1>
      <p className="text-gray-400 mb-8 max-w-sm">
        Security protocols engaged. Initiate bypass procedure to gain access and restore device.
      </p>
      <button
        onClick={onStart}
        disabled={loading}
        className="relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-200 bg-cyan-600 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute -inset-0.5 -translate-x-0.5 -translate-y-0.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 blur transition-all duration-200 group-hover:opacity-100 group-hover:duration-200"></span>
        {loading ? (
            <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white"></div>
        ) : (
            'Start Bypass'
        )}
      </button>
    </div>
  );
};

export default LockedScreen;
