import React from 'react';
import levelToRank from '../../constants/levelToRank';
import { tierBgColor, tierTextColor } from '../../constants/tierColor';

export const RankTag = ({ children }) => {
  const tierText = levelToRank[children];
  let bgColor = '';
  let textColor = '';
  if (children === 0) {
    bgColor = 'bg-grey-600';
    textColor = 'text-white';
  } else {
    const idx = parseInt((children - 1) / 5, 10);
    bgColor = tierBgColor[idx];
    textColor = tierTextColor[idx];
  }
  return (
    <span
      className={`${bgColor} ${textColor} text-sm font-medium me-2 px-2.5 py-0.5 rounded`}
    >
      {tierText}
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
