import React, { useState, useEffect, useCallback, useRef } from 'react';
import { POMODORO_SETTINGS } from '../../../utils/constants';
import timerSound from '../../../audio/timer.mp3';

function Pomodoro({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(POMODORO_SETTINGS.WORK);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [cycles, setCycles] = useState(0);
  const audioRef = useRef(new Audio(timerSound));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = useCallback((newMode) => {
    switch (newMode) {
      case 'work':
        setTimeLeft(POMODORO_SETTINGS.WORK);
        break;
      case 'short':
        setTimeLeft(POMODORO_SETTINGS.SHORT_BREAK);
        break;
      case 'long':
        setTimeLeft(POMODORO_SETTINGS.LONG_BREAK);
        break;
      default:
        setTimeLeft(POMODORO_SETTINGS.WORK);
    }
    setMode(newMode);
    setIsActive(false);
  }, []);

  const handleComplete = useCallback(() => {
    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      
      // Play sound
      audioRef.current.play();
      
      if (newCycles % POMODORO_SETTINGS.CYCLES_BEFORE_LONG_BREAK === 0) {
        resetTimer('long');
      } else {
        resetTimer('short');
      }
      
      if (onComplete) {
        onComplete(mode);
      }
    } else {
      resetTimer('work');
    }
  }, [cycles, mode, onComplete, resetTimer]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const getProgressStyle = () => {
    const totalTime = mode === 'work' 
      ? POMODORO_SETTINGS.WORK 
      : mode === 'short' 
        ? POMODORO_SETTINGS.SHORT_BREAK 
        : POMODORO_SETTINGS.LONG_BREAK;
    const progress = (timeLeft / totalTime) * 100;
    return {
      background: `conic-gradient(
        ${mode === 'work' ? '#3B82F6' : '#10B981'} ${progress}%,
        #E5E7EB ${progress}%
      )`
    };
  };

  return (
    <div className="bg-white/90 rounded-xl p-4 sm:p-6 shadow-lg max-w-sm mx-auto">
      <div className="text-center space-y-4 sm:space-y-6">
        {/* Timer Display */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full border-6 sm:border-8 border-gray-100" />
          
          {/* Progress Circle */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-200"
            style={getProgressStyle()}
          />
          
          {/* Timer Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 font-mono tracking-tight">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1 sm:mt-2 capitalize">
              {mode === 'work' ? '🎯 Focus Time' : mode === 'short' ? '☕️ Short Break' : '🌟 Long Break'}
            </div>
          </div>
        </div>

        {/* Mode Indicators */}
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          {['work', 'short', 'long'].map((timerMode) => (
            <button
              key={timerMode}
              onClick={() => resetTimer(timerMode)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                mode === timerMode
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-700/10 scale-105'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {timerMode === 'work' 
                ? '🎯 Work' 
                : timerMode === 'short' 
                  ? '☕️ Break' 
                  : '🌟 Long'}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <button
            onClick={toggleTimer}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-red-100 text-red-700 hover:bg-red-200 ring-2 ring-red-700/10'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 ring-2 ring-blue-700/10'
            }`}
          >
            {isActive ? '⏸' : '▶️'}
            <span className="hidden sm:inline ml-1">
              {isActive ? 'Pause' : 'Start'}
            </span>
          </button>
          <button
            onClick={() => resetTimer(mode)}
            className="px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 ring-2 ring-gray-700/10"
          >
            🔄
            <span className="hidden sm:inline ml-1">Reset</span>
          </button>
        </div>

        {/* Cycles Counter */}
        <div className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-50 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg inline-block">
          🔄 Cycles: {cycles}
        </div>
      </div>
    </div>
  );
}

export default Pomodoro; 