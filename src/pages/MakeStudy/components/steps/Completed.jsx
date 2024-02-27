import ModalLayout from '../ModalLayout';
import { ReactComponent as CompletedIcon } from '../../../../assets/completed.svg';

const Completed = ({ onPrev, onNext }) => {
  return (
    <ModalLayout
      title={null}
      leftButtonTitle="처음으로"
      rightButtonTitle="내 스터디로"
      onPrev={onPrev}
      onNext={onNext}
    >
      <div className="mt-3 flex flex-col gap-3 items-center">
        <CompletedIcon />
        <h1 className="text-2xl font-bold">스터디가 등록되었습니다!</h1>
      </div>
    </ModalLayout>
  );
};

export default Completed;
