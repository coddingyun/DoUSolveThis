import React from 'react';
import { useNavigate } from 'react-router-dom';
import levelToRank from '../../constants/levelToRank';
import { tierTextColor } from '../../constants/tierColor';

const StudyInfoSubCard = ({ title, info, color }) => {
  const textColor = color || 'text-gray-600';
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-3">
      <h2 className="text-base font-semibold">{title}</h2>
      <h5 className={`w-full text-2xl font-bold ${textColor} flex justify-end`}>
        {info}
      </h5>
    </div>
  );
};

const StudyInfoCard = ({ people, lang, tier, solved, id }) => {
  const navigate = useNavigate();
  const tierText = levelToRank[tier];
  const idx = parseInt((tier - 1) / 5, 10);
  const tierColor = tierTextColor[idx];
  return (
    <div className="border border-gray-200 rounded-lg shadow p-2">
      <div className="flex justify-between">
        <h3 className="text-base font-bold mb-1">정보</h3>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-1 text-center mb-2"
          onClick={() => {
            navigate(`/edit/${id}`);
          }}
        >
          스터디원 추가 및 정보 수정하기
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StudyInfoSubCard title="인원 수" info={`${people}명`} />
        <StudyInfoSubCard title="주 사용 언어" info={lang} />
        <StudyInfoSubCard title="평균 티어" info={tierText} color={tierColor} />
        <StudyInfoSubCard title="평균 푼 문제 수" info={solved} />
      </div>
    </div>
  );
};

export default StudyInfoCard;
