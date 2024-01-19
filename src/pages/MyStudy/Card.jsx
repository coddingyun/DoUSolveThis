import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const StudyCard = React.memo(({ id, title }) => {
  const navigate = useNavigate();
  const url = `/info/${id}`;

  const handleClick = () => {
    navigate(url);
  };
  return (
    <div
      key={id}
      className="block bg-white border border-gray-200 rounded-lg shadow"
    >
      <h5 className="p-6 text-3xl font-semibold tracking-tight text-gray-900">
        {title}
      </h5>
      <hr />
      <div className="px-6 py-4 flex flex-row-reverse">
        <Button
          className="!h-[36px] px-[14px] !text-brand-700 !bg-brand-50"
          onClick={handleClick}
        >
          바로 가기
        </Button>
      </div>
    </div>
  );
});

export default StudyCard;
