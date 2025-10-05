
import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface RestoreSuccessProps {
  onReset: () => void;
}

const RestoreSuccess: React.FC<RestoreSuccessProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-2xl shadow-blue-500/10">
      <div className="relative mb-8">
        <div className="absolute -inset-2 bg-blue-400/50 rounded-full blur-xl animate-pulse"></div>
        <div className="relative w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center border-2 border-blue-400">
          <CheckCircleIcon className="w-12 h-12 text-blue-400" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Device Restored</h1>
      <p className="text-gray-400 mb-8 max-w-sm">
        The device has been successfully factory restored and is ready for setup.
      </p>
      <button
        onClick={onReset}
        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      >
        <span className="absolute -inset-0.5 -translate-x-0.5 -translate-y-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50 blur transition-all duration-200 group-hover:opacity-100 group-hover:duration-200"></span>
        Start Over
      </button>
    </div>
  );
};

export default RestoreSuccess;
