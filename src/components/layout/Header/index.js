import React, { useState } from 'react';
import { TASK_FILTERS } from '../../../utils/constants';
import Pomodoro from '../../common/Pomodoro';

function Header({ filter, setFilter, searchTerm, setSearchTerm }) {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const filterTypes = [TASK_FILTERS.ACTIVE, TASK_FILTERS.COMPLETED];

  return (
    <header className="space-y-6">
      <div className="text-center relative">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Todos
        </h1>
        <p className="text-gray-600">Stay organized, focused, and productive</p>
        
        <button
          onClick={() => setShowPomodoro(true)}
          className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-gray-600"
          title="Open Pomodoro Timer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Pomodoro</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
          <svg 
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex justify-center gap-2">
          {filterTypes.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-2.5 rounded-lg capitalize transition-all duration-200 ${
                filter === filterType
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {showPomodoro && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pomodoro Timer
                </h2>
                <button 
                  onClick={() => setShowPomodoro(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-sm text-gray-600">
                Use the Pomodoro Technique to stay focused:
                <br />
                • Work for 25 minutes, Take a 5-minute break
                <br />
                • After 4 cycles, take a longer 15-minute break
              </p>
              
              <Pomodoro 
                onComplete={(currentMode) => {
                  if (Notification.permission === 'granted') {
                    new Notification('Pomodoro Timer', {
                      body: `Time's up! ${currentMode === 'work' ? 'Take a break!' : 'Back to work!'}`,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 