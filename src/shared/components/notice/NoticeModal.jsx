import React from 'react';
import useGetNotices from '../../hooks/api/useGetNotices';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import Line from '../Line';
import useDeleteNotices from '../../hooks/api/useDeleteNotices';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { ReactComponent as Bell } from '../../../assets/bell.svg';

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

  let alarmContents;
  let alarmTitle;

  switch (data.noticeType) {
    case 1:
      alarmTitle = '스터디 참여 승인';
      alarmContents = `${data.title}에 스터디 참여가 승인되었습니다.`;
      break;
    case 2:
        alarmTitle = '스터디 참여 거절';
        alarmContents = `${data.title}에 스터디 참여를 거절 당했습니다.`;
        break;
    case 3:
      alarmTitle = '스터디장 변경';
      alarmContents = `${data.title}의 스터디장이 ${data.username}로 변경되었습니다.`;
      break;
    case 4:
      alarmTitle = '스터디 삭제';
      alarmContents = `${data.title}이 삭제되었습니다.`;
      break;
    case 5:
      alarmTitle = '스터디 참여 신청';
      alarmContents = `${data.username}가 ${data.title}에 스터디 참여 신청을 보냈습니다.`;
      break;
    case 6:
      alarmTitle = '스터디원 변경';
      alarmContents = `${data.username}가 ${data.title}에서 나갔습니다.`;
      break;
  }

  return (
    <div
      className="cursor-pointer p-4 flex flex-col gap-4 !items-start !bg-white"
      onClick={handleClickNotice}
    >
      <div className="w-full flex justify-between">
        <h3 className="text-brand-700 text-base font-semibold">{alarmTitle}</h3>
        <Trash onClick={handleClickDelete} />
      </div>
      <h4 className="text-gray-900">{alarmContents}</h4>
      <h5 className="text-gray-500">{formatDate(data.noticeTime)}</h5>
    </div>
  );
};

const NoticeModal = () => {
  const { data } = useGetNotices();

  return (
    <div className="w-[435px] h-[712px] overflow-y-auto p-4 rounded-lg border border-gray-200 shadow-sm absolute top-12 right-0 !bg-white z-10">
      {data &&
        data.length >= 1 &&
        data.map((item, idx) => (
          <>
            <NoticeContent key={`notice#${item.id}`} data={item} />
            {data.length - 1 !== idx && <Line />}
          </>
        ))}
      {data && data.length === 0 && (
        <div className="h-full flex flex-col gap-2 justify-center items-center">
          <Bell width={40} height={40} stroke="#98A2B3" />
          <h3 className="text-gray-900 text-xl font-bold">
            새로운 알림이 없습니다.
          </h3>
          <h4 className="text-gray-500">
            다양한 알림을 이곳에서 모아볼 수 있어요.
          </h4>
        </div>
      )}
    </div>
  );
};

export default NoticeModal;
