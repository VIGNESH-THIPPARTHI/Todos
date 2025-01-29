import React, { useState } from 'react';
import { TASK_FILTERS } from '../../../utils/constants';
import FocusTimer from '../../common/FocusTimer';

function Header({ filter, setFilter, searchTerm, setSearchTerm }) {
  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const filterTypes = [TASK_FILTERS.ACTIVE, TASK_FILTERS.COMPLETED];

  return (
    <header className="space-y-6">
      <div className="relative">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            Todos
          </h1>
          <p className="text-gray-600">Stay organized, focused, and productive</p>
        </div>

        <div className="absolute top-0 right-4">
          {!showFocusTimer && (
            <button
              onClick={() => setShowFocusTimer(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              Focus Time
            </button>
          )}
          {showFocusTimer && <FocusTimer onClose={() => setShowFocusTimer(false)} />}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by task name, category, or date (e.g., 1/27/2024)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
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
    </header>
  );
}

export default Header; 