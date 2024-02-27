import React from 'react';
import { useParams } from 'react-router-dom';
import CommonLayout from '../../shared/layout/CommonLayout';

const StudyEdit = () => {
  const { id } = useParams();
  return (
    <CommonLayout title={`${id} 스터디원 추가 및 정보 수정하기`}>
      <div className="h-full flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-semibold">
            스터디 비밀번호를 입력해주세요. (스터디장에게 문의하세요.)
          </h2>
        </div>
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          다음
        </button>
      </div>
    </CommonLayout>
  );
};

export default StudyEdit;
