import { useState, useMemo } from 'react';
import { exitStudyStepTitle } from '../../constants/steps';
import ModalLayout from '../../layout/ModalLayout';
import CheckExit from './steps/CheckExit';
import ChangeLead from './steps/ChangeLead';
import usePostStudyOut from '../../hooks/api/usePostStudyOut';
import usePutStudyManager from '../../hooks/api/usePutStudyManager';
import { useExitLead } from '../../../store/studyStore';
import useStudyInfo from '../../hooks/api/useStudyInfo';
import { useQueryClient } from 'react-query';

const ExitStudy = ({ clickHandler, Funnel, Step, onClose, id }) => {
  const [modalState, setModalState] = useState(0);
  const lead = useExitLead();
  const { studyInfoData } = useStudyInfo(id);
  const queryClient = useQueryClient();

  const onExitSuccessCallback = data => {
    if (data.isManager && studyInfoData.members.length > 1) {
      setModalState(1);
      clickHandler(exitStudyStepTitle[1]);
    } else {
      onClose();
      setModalState(0);
      queryClient.invalidateQueries('myStudy');
    }
  };
  
  const exitMutation = usePostStudyOut(id, onExitSuccessCallback);
  
  const onManagerSuccessCallback = () => {
    exitMutation.mutate();
  };

  const managerMutation = usePutStudyManager(id, onManagerSuccessCallback);

  const modalStateList = useMemo(() => [
    {
      title: '정말 스터디를\n 탈퇴하시겠습니까?😭',
      leftButtonTitle: '잠깐만요',
      rightButtonTitle: '확인',
      rightButtonType: 'next',
      closeButton: false,
      onPrev: onClose,
      onNext: () => {
        exitMutation.mutate();
      },
    },
    {
      title: '다음 스터디장 지정',
      leftButtonTitle: '이전',
      rightButtonTitle: '수정',
      rightButtonType: 'next',
      onPrev: onClose,
      onNext: () => {
        managerMutation.mutate(lead.userId);
      },
    },
  ]);

  const curModalState = modalStateList[modalState];

  return (
    <ModalLayout
      title={curModalState.title}
      leftButtonTitle={curModalState.leftButtonTitle}
      rightButtonTitle={curModalState.rightButtonTitle}
      rightButtonType={curModalState.rightButtonType}
      closeButton={curModalState.closeButton}
      onPrev={curModalState.onPrev}
      onNext={curModalState.onNext}
    >
      <Funnel>
        <Step name={exitStudyStepTitle[0]}>
          <CheckExit />
        </Step>
        <Step name={exitStudyStepTitle[1]}>
          <ChangeLead studyInfoData={studyInfoData} />
        </Step>
      </Funnel>
    </ModalLayout>
  );
};

export default ExitStudy;
