
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { generateBypassLog } from './services/geminiService';
import LockedScreen from './components/LockedScreen';
import BypassInProgress from './components/BypassInProgress';
import BypassSuccess from './components/BypassSuccess';
import RestoreInProgress from './components/RestoreInProgress';
import RestoreSuccess from './components/RestoreSuccess';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartBypass = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const lines = await generateBypassLog();
      setLogLines(lines);
      setAppState(AppState.BYPASSING);
    } catch (err) {
      setError("Failed to generate bypass log. Please check your connection and API key.");
      setLogLines([]); // Clear any old logs
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBypassComplete = useCallback(() => {
    setAppState(AppState.BYPASSED);
  }, []);

  const handleStartRestore = useCallback(() => {
    setAppState(AppState.RESTORING);
  }, []);

  const handleRestoreComplete = useCallback(() => {
    setAppState(AppState.RESTORED);
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setLogLines([]);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <LockedScreen onStart={handleStartBypass} loading={loading} />;
      case AppState.BYPASSING:
        return <BypassInProgress logLines={logLines} onComplete={handleBypassComplete} />;
      case AppState.BYPASSED:
        return <BypassSuccess onRestore={handleStartRestore} />;
      case AppState.RESTORING:
        return <RestoreInProgress onComplete={handleRestoreComplete} />;
      case AppState.RESTORED:
        return <RestoreSuccess onReset={handleReset} />;
      default:
        return <LockedScreen onStart={handleStartBypass} loading={loading} />;
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-900 text-white font-sans">
      <div 
        className="absolute inset-0 bg-grid-cyan-500/10 bg-[size:30px_30px]"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 60%, transparent 100%)'
        }}
      ></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        {error && (
          <div className="p-4 mb-4 text-sm text-red-200 bg-red-800/50 border border-red-500 rounded-lg max-w-2xl w-full" role="alert">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}
        {renderContent()}
      </div>
       <footer className="absolute bottom-4 text-center text-gray-600 text-sm">
          <p>Device Recovery Simulator v1.0</p>
          <p>For educational and entertainment purposes only.</p>
       </footer>
       <style>{`
          .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-blink { animation: blink 1s step-end infinite; }
          @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }
          .bg-grid-cyan-500\\/10 {
            background-image: linear-gradient(to right, rgba(107, 226, 226, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(107, 226, 226, 0.1) 1px, transparent 1px);
          }
       `}</style>
    </main>
  );
};

export default App;
