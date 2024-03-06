import React from 'react';
import { ReactComponent as CompletedIcon } from '../../../../assets/completed.svg';

const EditCompleted = () => {
  return (
    <div className="mt-3 flex flex-col gap-3 items-center">
      <CompletedIcon />
      <h1 className="text-2xl font-bold">스터디가 수정되었습니다!</h1>
    </div>
  );
};

export default EditCompleted;
