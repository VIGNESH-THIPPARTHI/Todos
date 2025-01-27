import React from 'react';

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${className}`}
      {...props}
    />
  );
}

export default Input; 