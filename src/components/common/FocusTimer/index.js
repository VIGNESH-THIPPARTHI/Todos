import React, { useState, useEffect, useRef } from 'react';
import timerSound from '../../../audio/timer.mp3';

function FocusTimer({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef(new Audio(timerSound));

  const formatTimeDetailed = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setIsComplete(true);
            setIsMinimized(false);
            audioRef.current.play();
            if (Notification.permission === 'granted') {
              new Notification('Focus Time Complete!', {
                body: 'Time to take a break!',
              });
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(duration * 60);
    setIsActive(true);
    setIsMinimized(true);
    setIsComplete(false);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setIsComplete(false);
    onClose();
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
      >
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
        {isActive ? formatTimeDetailed(timeLeft) : 'Focus Timer'}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Focus Timer</h2>
          
          {isComplete ? (
            <div className="space-y-4">
              <div className="text-lg font-medium text-green-600">
                Time's up! Great work! 🎉
              </div>
              <button
                onClick={onClose}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Close
              </button>
            </div>
          ) : !isActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 px-3 py-2 border rounded-lg text-center"
                  min="1"
                />
                <span className="text-gray-600">minutes</span>
              </div>
              
              <div className="flex justify-center gap-3">
                <button
                  onClick={startTimer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Start Focus Time
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-4xl font-bold text-blue-600">
                {formatTimeDetailed(timeLeft)}
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={stopTimer}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Stop
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Minimize
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FocusTimer; 