import React from 'react';
import { Link } from 'react-router-dom';
import { RankTag, BottomTag, RecruitingTag } from '../../../shared/components/Tag';

export const StudyCard = React.memo(({ item }) => {
  const url = `/info/${item.id}`;
  return (
    <Link
      key={item.id}
      to={url}
      className="block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <div className="px-6 pt-4 mb-2 flex items-start justify-between">
        <RecruitingTag isRecruiting={item.recruiting}/>
        <RankTag>{item.avg_rank}</RankTag>
      </div>
      <h5 className="px-6 mb-2 text-3xl font-semibold tracking-tight text-gray-900">
        {item.title}
      </h5>
      <p className="px-6 pb-6 font-medium text-sm text-gray-700 dark:text-gray-400">
        {item.description}
      </p>
      <hr />
      <div className="px-6 py-3 flex gap-2">
        <BottomTag>{item.language}</BottomTag>
        <BottomTag>{item.area==='ALL'?'전국':item.area} {item.city==='ALL'?'전체':item.city}</BottomTag>
        <BottomTag>{item.level}</BottomTag>
        <BottomTag>{item.meeting_type}</BottomTag>
      </div>
    </Link>
  );
});

StudyCard.displayName = 'StudyCard';

export const LoadingCard = idx => {
  return (
    <div
      key={idx}
      className="block h-36 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow"
    />
  );
};
