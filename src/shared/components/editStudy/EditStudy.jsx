import React, { createContext, useState } from 'react';
import ModalLayout from '../../layout/ModalLayout';
import { editStudyStepTitle } from '../../constants/steps';
import EditStudyInfo from './steps/EditStudyInfo';

const EditStudy = ({ clickHandler, Funnel, Step, onClose }) => {
  const modalStateList = [
    {
      leftButtonTitle: '잠깐만요',
      rightButtonTitle: '다음',
      rightButtonType: 'next',
      onPrev: onClose,
      onNext: () => clickHandler(editStudyStepTitle[1]),
    },
    {
      leftButtonTitle: '이전',
      rightButtonTitle: '다음',
      rightButtonType: 'next',
      dirtyFieldsCnt: 5,
      onPrev: () => clickHandler(editStudyStepTitle[0]),
      onNext: () => clickHandler(editStudyStepTitle[2]),
    },
    {
      leftButtonTitle: '이전',
      rightButtonTitle: '다음',
      rightButtonType: 'next',
      dirtyFieldsCnt: 5,
      onPrev: () => clickHandler(editStudyStepTitle[1]),
      onNext: () => clickHandler(editStudyStepTitle[3]),
    },
    {
      title: null,
      leftButtonTitle: '처음으로',
      rightButtonTitle: '내 스터디로',
      onPrev: () => clickHandler(editStudyStepTitle[2]),
      onNext: () => clickHandler(editStudyStepTitle[4]),
    },
  ];

  const EditContext = createContext({
    modalState: modalStateList[0],
    setModalState: () => {},
  });

  const [modalState, setModalState] = useState({
    leftButtonTitle: '잠깐만요',
    rightButtonTitle: '다음',
    rightButtonType: 'next',
    onPrev: onClose,
    onNext: () => clickHandler(editStudyStepTitle[1]),
  });

  return (
    <EditContext.Provider value={{ modalState, setModalState }}>
      <ModalLayout
        title={modalState.title || '스터디 이름'}
        leftButtonTitle={modalState.leftButtonTitle}
        rightButtonTitle={modalState.rightButtonTitle}
        rightButtonType={modalState?.rightButtonType}
        dirtyFieldsCnt={modalState?.dirtyFieldsCnt}
        onPrev={modalState.onPrev}
        onNext={modalState.onNext}
      >
        <Funnel>
          <Step name={editStudyStepTitle[0]}>
            <EditStudyInfo />
          </Step>
          <Step name={editStudyStepTitle[1]}></Step>
          <Step name={editStudyStepTitle[2]}></Step>
          <Step name={editStudyStepTitle[3]}></Step>
        </Funnel>
      </ModalLayout>
    </EditContext.Provider>
  );
};

export default EditStudy;
