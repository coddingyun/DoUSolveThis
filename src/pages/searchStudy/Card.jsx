import React from 'react';
import { RankTag, LangTag } from './Tag';

export const StudyCard = React.memo(
  ({ id, title, description, tier, lang }) => {
    const url = `/info/${id}`;
    return (
      <a
        key={id}
        href={url}
        className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      >
        <div className="px-4 pt-4 mb-1 flex items-start justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <RankTag>{tier}</RankTag>
        </div>
        <p className="px-4 pb-4 font-normal text-sm text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <hr />
        <div className="px-4 py-3 flex gap-2">
          <LangTag>{lang}</LangTag>
        </div>
      </a>
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
