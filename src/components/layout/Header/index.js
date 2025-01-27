import React from 'react';
import { TASK_FILTERS } from '../../../utils/constants';

function Header({ filter, setFilter, searchTerm, setSearchTerm }) {
  const filterTypes = [TASK_FILTERS.ACTIVE, TASK_FILTERS.ALL, TASK_FILTERS.COMPLETED];

  return (
    <header className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Work Productivity
        </h1>
        <p className="text-gray-600">Stay organized, focused, and productive</p>
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
    </header>
  );
}

export default Header; 