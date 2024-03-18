import React from 'react';
import useGetNotices from '../../hooks/api/useGetNotices';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import Line from '../Line';

const NoticeContent = ({ data }) => {
  const handleClickNotice = () => {};

  const handleClickDelete = () => {};

  return (
    <div className="cursor-pointer p-4 flex flex-col gap-4 !items-start !bg-white" onClick={handleClickNotice}>
      <div className="w-full flex justify-between">
        <h3 className="text-brand-700 text-base font-semibold">
          스터디 참여 신청
        </h3>
        <Trash onClick={handleClickDelete} />
      </div>
      <h4 className="text-gray-900">
        {data.username}가 {data.title}에 스터디 참여 신청을 보냈습니다.
      </h4>
      <h5 className="text-gray-500">{data.noticeTime}</h5>
    </div>
  );
};

const NoticeModal = () => {
  const { data } = useGetNotices();

  return (
    <div className="w-[435px] max-h-[75vh] overflow-y-auto p-4 rounded-lg border border-gray-200 shadow-sm absolute top-12 right-0 z-10">
      {data &&
        data.map((item, idx) => (
          <>
            <NoticeContent key={`notice#${item.id}`} data={item} />
            {data.length - 1 !== idx && <Line />}
          </>
        ))}
    </div>
  );
};

export default NoticeModal;
