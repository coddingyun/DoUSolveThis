import React from 'react';

export const RankTag = ({ children }) => {
  return (
    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
      {children}
    </span>
  );
};

export const LangTag = ({ children }) => {
  return (
    <span className="bg-gray-700 text-gray-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border border-gray-500">
      {children}
    </span>
  );
};
