import React from 'react';
import { Link } from 'react-router-dom';
import { RankTag, BottomTag } from './Tag';

export const StudyCard = React.memo(
  ({ id, title, description, tier, lang, area, level, meetingType }) => {
    const url = `/info/${id}`;
    return (
      <Link
        key={id}
        to={url}
        className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      >
        <div className="px-4 pt-4 mb-2 flex items-start justify-between">
          <h5 className="text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
          <RankTag>{tier}</RankTag>
        </div>
        <p className="px-4 pb-6 font-medium text-sm text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <hr />
        <div className="px-4 py-3 flex gap-2">
          <BottomTag>{lang}</BottomTag>
          <BottomTag>{area}</BottomTag>
          <BottomTag>{level}</BottomTag>
          <BottomTag>{meetingType}</BottomTag>
        </div>
      </Link>
    );
  },
);

export const LoadingCard = idx => {
  return (
    <div
      key={idx}
      className="block h-36 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow"
    />
  );
};
