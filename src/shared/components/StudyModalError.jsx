import { ReactComponent as ErrorIcon } from '../../assets/error.svg';

const StudyModalError = ({ type = 'default' }) => {
  return (
    <div className="mt-3 flex flex-col gap-3 items-center">
      <ErrorIcon />
      <h1 className="text-2xl font-bold">
        스터디 {type == 'default' ? '등록' : '수정'}을 실패했습니다!
      </h1>
      <h2 className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</h2>
    </div>
  );
};

export default StudyModalError;
