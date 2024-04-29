import React from 'react';
import useGetNotices from '../../hooks/api/useGetNotices';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import Line from '../Line';
import useDeleteNotices from '../../hooks/api/useDeleteNotices';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const NoticeContent = ({ data }) => {
  const navigate = useNavigate();
  const mutation = useDeleteNotices(data.id);

  const handleClickNotice = () => {
    navigate('/participation-offer');
  };

  const handleClickDelete = e => {
    e.stopPropagation();
    mutation.mutate();
  };

  return (
    <div
      className="cursor-pointer p-4 flex flex-col gap-4 !items-start !bg-white"
      onClick={handleClickNotice}
    >
      <div className="w-full flex justify-between">
        <h3 className="text-brand-700 text-base font-semibold">
          스터디 참여 신청
        </h3>
        <Trash onClick={handleClickDelete} />
      </div>
      <h4 className="text-gray-900">
        {data.username}가 {data.title}에 스터디 참여 신청을 보냈습니다.
      </h4>
      <h5 className="text-gray-500">{formatDate(data.noticeTime)}</h5>
    </div>
  );
};

const NoticeModal = () => {
  const { data } = useGetNotices();

  return (
    <div className="w-[435px] h-[712px] overflow-y-auto p-4 rounded-lg border border-gray-200 shadow-sm absolute top-12 right-0 !bg-white z-10">
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
