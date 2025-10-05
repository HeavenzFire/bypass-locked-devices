
import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface BypassSuccessProps {
  onRestore: () => void;
}

const BypassSuccess: React.FC<BypassSuccessProps> = ({ onRestore }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-green-400/20 rounded-2xl shadow-2xl shadow-green-500/10">
      <div className="relative mb-8">
        <div className="absolute -inset-2 bg-green-400/50 rounded-full blur-xl animate-pulse"></div>
        <div className="relative w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center border-2 border-green-400">
          <CheckCircleIcon className="w-12 h-12 text-green-400" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Bypass Successful</h1>
      <p className="text-gray-400 mb-8 max-w-sm">
        Root access granted. You can now factory restore the device to its original state.
      </p>
      <button
        onClick={onRestore}
        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-red-600 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
      >
        <span className="absolute -inset-0.5 -translate-x-0.5 -translate-y-0.5 rounded-lg bg-gradient-to-r from-red-500 to-yellow-500 opacity-50 blur transition-all duration-200 group-hover:opacity-100 group-hover:duration-200"></span>
        Factory Restore
      </button>
    </div>
  );
};

export default BypassSuccess;
