import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const StudyCard = React.memo(({ id, title, management = false }) => {
  const navigate = useNavigate();
  const url = `/info/${id}`;

  const handleExit = () => {
    // TODO exit api
  };

  const handleEdit = () => {
    // TODO edit api
  };

  const handleNavigate = () => {
    navigate(url);
  };

  return (
    <div
      className="block bg-white border border-gray-200 rounded-lg shadow"
    >
      <h5 className="p-6 text-3xl font-semibold tracking-tight text-gray-900">
        {title}
      </h5>
      <hr />
      <div className="px-6 py-4 flex justify-between">
        <div className="flex gap-2">
          <Button
            className="!h-[36px] px-[14px] !text-gray-700 !bg-white !border !border-gray-300 !font-bold"
            onClick={handleExit}
          >
            나가기
          </Button>
          {management && (
            <Button
              className="!h-[36px] px-[14px] !text-gray-700 !bg-white !border !border-gray-300 !font-bold"
              onClick={handleEdit}
            >
              수정하기
            </Button>
          )}
        </div>

        <Button
          className="!h-[36px] px-[14px] !text-brand-700 !bg-brand-50"
          onClick={handleNavigate}
        >
          바로 가기
        </Button>
      </div>
    </div>
  );
});

StudyCard.displayName = 'StudyCard';

export default StudyCard;
