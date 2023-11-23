import React from 'react';
import { RankTag, LangTag } from './Tag';

export const StudyCard = ({ id, title, description, tier, lang }) => {
  const url = `/room/${id}`;
  return (
    <a
      key={id}
      href={url}
      className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <div className="mb-1 flex items-start justify-between">
        <h5 className="text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <RankTag>{tier}</RankTag>
      </div>
      <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <LangTag>{lang}</LangTag>
    </a>
  );
};

export const LoadingCard = idx => {
  return (
    <div
      key={idx}
      className="block h-32 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow"
    />
  );
};
