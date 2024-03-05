import React, { useState, useMemo } from 'react';
import ModalLayout from '../../layout/ModalLayout';
import { editStudyStepTitle } from '../../constants/steps';
import EditStudyInfo from './steps/EditStudyInfo';
import EditMeetingInfo from './steps/EditMeetingInfo';
import { useNavigate } from 'react-router-dom';
import EditStudyMember from './steps/EditStudyMember';

const EditStudy = ({ clickHandler, Funnel, Step, onClose }) => {
  const [modalState, setModalState] = useState(0);
  const navigate = useNavigate();

  const modalStateList = useMemo(
    () => [
      {
        leftButtonTitle: '잠깐만요',
        rightButtonTitle: '다음',
        rightButtonType: 'next',
        dirtyFieldsCnt: 4,
        onPrev: onClose,
        onNext: () => {
          setModalState(1);
          clickHandler(editStudyStepTitle[1]);
        },
      },
      {
        leftButtonTitle: '이전',
        rightButtonTitle: '다음',
        rightButtonType: 'next',
        dirtyFieldsCnt: 5,
        onPrev: () => {
          setModalState(0);
          clickHandler(editStudyStepTitle[0]);
        },
        onNext: () => {
          setModalState(2);
          clickHandler(editStudyStepTitle[2]);
        },
      },
      {
        leftButtonTitle: '이전',
        rightButtonTitle: '다음',
        rightButtonType: 'next',
        dirtyFieldsCnt: 5,
        onPrev: () => {
          setModalState(1);
          clickHandler(editStudyStepTitle[1]);
        },
        onNext: () => {
          setModalState(3);
          //Todo. useEditStudy api 연동
        },
      },
      {
        title: null,
        leftButtonTitle: '처음으로',
        rightButtonTitle: '확인',
        onPrev: () => {
          setModalState(0);
          clickHandler(editStudyStepTitle[0]);
        },
        onNext: () => {
          setModalState(0);
          clickHandler(editStudyStepTitle[0]);
          navigate('/my-study')
        },
      },
    ],
    [],
  );

  const curModalState = modalStateList[modalState]

  return (
    <ModalLayout
      title={curModalState.title || '스터디 이름'}
      leftButtonTitle={curModalState.leftButtonTitle}
      rightButtonTitle={curModalState.rightButtonTitle}
      rightButtonType={curModalState?.rightButtonType}
      dirtyFieldsCnt={curModalState?.dirtyFieldsCnt}
      onPrev={curModalState.onPrev}
      onNext={curModalState.onNext}
    >
      <Funnel>
        <Step name={editStudyStepTitle[0]}>
          <EditStudyInfo />
        </Step>
        <Step name={editStudyStepTitle[1]}>
          <EditMeetingInfo />
        </Step>
        <Step name={editStudyStepTitle[2]}>
          <EditStudyMember />
        </Step>
        <Step name={editStudyStepTitle[3]}></Step>
      </Funnel>
    </ModalLayout>
  );
};

export default EditStudy;
