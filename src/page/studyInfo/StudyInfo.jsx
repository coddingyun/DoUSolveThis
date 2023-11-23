import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CommonLayout from '../../layout/CommonLayout';

const StudyInfo = () => {
  const { id } = useParams();
  const { data } = useQuery(
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
    <CommonLayout title={`${data && data.title} 스터디 정보`}>
      <div>
        <div className="text-gray-700">{data && data.description}</div>
      </div>
    </CommonLayout>
  );
};

export default StudyInfo;
