import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CommonLayout from '../../layout/CommonLayout';
import StudyInfoCard from './StudyInfoCard';

const StudyInfo = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    'info',
    () =>
      fetch(`${process.env.REACT_APP_BASE_URL}/api/studies/${id}`).then(res =>
        res.json(),
      ),
    {
      refetchOnWindowFocus: false,
    },
  );
  return (
    !isLoading && (
      <CommonLayout title={`${data.title} 스터디 정보`}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-gray-700 mb-5">{data && data.description}</div>
            <StudyInfoCard
              people={data.members.length}
              lang={data.language}
              tier={data.avg_rank}
              solved={data.avg_solved}
              id={id}
            />
          </div>
          <div>
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              풀 문제 고르기
            </button>
          </div>
        </div>
      </CommonLayout>
    )
  );
};

export default StudyInfo;
