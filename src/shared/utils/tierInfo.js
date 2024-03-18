import levelToRank from '../constants/levelToRank';
import { tierTextColor, tierBgColor } from '../constants/tierColor';

export const getTierText = tier => levelToRank[tier];

export const getTierColor = tier => {
  let bgColor = '';
  let textColor = '';
  if (tier === 0) {
    bgColor = 'bg-blue-gray-50';
    textColor = 'text-blue-gray-700';
  } else {
    const idx = parseInt((tier - 1) / 5, 10);
    bgColor = tierBgColor[idx];
    textColor = tierTextColor[idx];
  }
  return { bgColor, textColor };
};
