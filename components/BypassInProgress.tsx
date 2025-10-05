
import React, { useState, useEffect } from 'react';
import TerminalIcon from './icons/TerminalIcon';

interface BypassInProgressProps {
  logLines: string[];
  onComplete: () => void;
}

const BypassInProgress: React.FC<BypassInProgressProps> = ({ logLines, onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (logLines.length === 0) return;

    if (lineIndex < logLines.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedLines(prev => [...prev, logLines[lineIndex]]);
        setLineIndex(prev => prev + 1);
      }, Math.random() * 400 + 200); // Random delay for realism

      return () => clearTimeout(timeoutId);
    } else {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 1500); // Wait a bit after the last line
      
      return () => clearTimeout(completeTimeout);
    }
  }, [lineIndex, logLines, onComplete]);

  return (
    <div className="w-full max-w-2xl p-6 bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg shadow-2xl shadow-green-500/10 font-mono text-green-400">
      <div className="flex items-center pb-4 mb-4 border-b border-green-400/30">
        <TerminalIcon className="w-6 h-6 mr-3" />
        <h2 className="text-xl font-bold">Bypass In Progress...</h2>
        <div className="ml-auto w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <div className="h-64 overflow-y-auto pr-2">
        {displayedLines.map((line, index) => (
          <p key={index} className="text-sm mb-1 animate-fadeIn">
            <span className="text-green-600 mr-2">{'>'}</span> {line}
          </p>
        ))}
        {lineIndex < logLines.length && (
            <div className="flex items-center">
                 <span className="text-green-600 mr-2">{'>'}</span>
                <span className="w-2 h-4 bg-green-400 animate-blink"></span>
            </div>
        )}
      </div>
    </div>
  );
};

export default BypassInProgress;
