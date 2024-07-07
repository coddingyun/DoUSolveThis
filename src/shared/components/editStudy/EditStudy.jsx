import React, { useState, useMemo, useEffect } from 'react';
import ModalLayout from '../../layout/ModalLayout';
import { editStudyStepTitle } from '../../constants/steps';
import EditStudyInfo from './steps/EditStudyInfo';
import EditMeetingInfo from './steps/EditMeetingInfo';
import { useNavigate } from 'react-router-dom';
import EditStudyMember from './steps/EditStudyMember';
import useStudyInfo from '../../hooks/api/useStudyInfo';
import {
  useEditStudyActions,
  useEditStudyStore,
} from '../../../store/studyStore';
import EditCompleted from './steps/EditCompleted';
import usePutStudyInfo from '../../hooks/api/usePutStudyInfo';
import StudyModalError from '../StudyModalError';
import usePutStudyManager from '../../hooks/api/usePutStudyManager';
import { useQueryClient } from 'react-query';

const EditStudy = ({ clickHandler, Funnel, Step, onClose, editId }) => {
  const [modalState, setModalState] = useState(0);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const { studyInfoData } = useStudyInfo(editId);

  const queryClient = useQueryClient();

  const onEditStudyManagerSuccessCallback = () => {
    queryClient.invalidateQueries('myStudy');
    setModalState(3);
    clickHandler(editStudyStepTitle[3]);
  };

  const managerMutation = usePutStudyManager(
    editId,
    onEditStudyManagerSuccessCallback,
  );

  const onEditStudySuccessCallback = () => {
    managerMutation.mutate(manager.userId);
  };

  const onEditStudyErrorCallback = () => {
    setModalState(4);
    clickHandler(editStudyStepTitle[4]);
  };

  const mutation = usePutStudyInfo(
    editId,
    onEditStudySuccessCallback,
    onEditStudyErrorCallback,
  );

  const {
    studyName,
    description,
    kakaoUrl,
    language,
    level,
    solvedProblemNumber,
    meetingType,
    studyArea,
    studyTime,
    frequencyStandard,
    frequencyNumber,
    members,
    manager,
  } = useEditStudyStore();

  const {
    setStudyName,
    setDescription,
    setKakaoUrl,
    setLanguage,
    setLevel,
    setSolvedProblemNumber,
    setMeetingType,
    setStudyArea,
    setStudyTime,
    setFrequencyStandard,
    setFrequencyNumber,
    setMembers,
    setManager,
  } = useEditStudyActions();

  useEffect(() => {
    if (studyInfoData) {
      setStudyName(studyInfoData.title);
      setDescription(studyInfoData.description);
      setKakaoUrl(studyInfoData.openchat);
      setLanguage(studyInfoData.language);
      setLevel(studyInfoData.level);
      setSolvedProblemNumber(studyInfoData.how_many);
      setMeetingType(studyInfoData.meeting_type);
      setStudyArea({
        area: studyInfoData.area,
        city: studyInfoData.city,
      }),
        setStudyTime(studyInfoData.study_time);
      setFrequencyStandard(studyInfoData.period);
      setFrequencyNumber(studyInfoData.frequency);
      setMembers(studyInfoData.members);
      setManager(studyInfoData.manager);
    }
  }, [studyInfoData]);

  useEffect(() => {
    if (fetching) {
      mutation.mutate({
        title: studyName,
        description,
        openchat: kakaoUrl,
        main_language: language,
        level,
        members: members.map(member => member.userId),
        // manager: manager.userId,
        area: studyArea.area === '전국' ? 'ALL' : studyArea.area,
        city: studyArea.city === '전체' ? 'ALL' : studyArea.city,
        how_many: solvedProblemNumber,
        meeting_type: meetingType,
        period: frequencyStandard,
        frequency: frequencyNumber,
        study_time: studyTime,
      });
      setFetching(false);
    }
  }, [fetching]);

  const modalStateList = useMemo(
    () => [
      {
        title: studyInfoData && studyInfoData.title,
        leftButtonTitle: '잠깐만요',
        rightButtonTitle: '다음',
        rightButtonType: 'next',
        dirtyFieldsCnt: 0,
        onPrev: onClose,
        onNext: () => {
          setModalState(1);
          clickHandler(editStudyStepTitle[1]);
        },
      },
      {
        title: studyInfoData && studyInfoData.title,
        leftButtonTitle: '이전',
        rightButtonTitle: '다음',
        rightButtonType: 'next',
        dirtyFieldsCnt: 0,
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
        title: studyInfoData && studyInfoData.title,
        leftButtonTitle: '이전',
        rightButtonTitle: '등록하기',
        rightButtonType: 'next',
        dirtyFieldsCnt: 0,
        onPrev: () => {
          setModalState(1);
          clickHandler(editStudyStepTitle[1]);
        },
        onNext: () => {
          setFetching(true);
        },
      },
      {
        title: null,
        leftButtonTitle: '확인',
        rightButtonTitle: '내 스터디로',
        onPrev: () => {
          onClose();
          setModalState(0);
          clickHandler(editStudyStepTitle[0]);
        },
        onNext: () => {
          onClose();
          setModalState(0);
          clickHandler(editStudyStepTitle[0]);
          navigate('/my-study');
        },
      },
      {
        title: null,
        leftButtonTitle: '확인',
        rightButtonTitle: '되돌아가기',
        onPrev: () => {
          onClose();
          setModalState(0);
          clickHandler(editStudyStepTitle[0]);
        },
        onNext: () => {
          setModalState(2);
          clickHandler(editStudyStepTitle[2]);
        },
      },
    ],
    [studyInfoData],
  );

  const curModalState = modalStateList[modalState];

  if (!studyInfoData) {
    return <></>;
  }

  return (
    <ModalLayout
      title={curModalState.title}
      leftButtonTitle={curModalState.leftButtonTitle}
      rightButtonTitle={curModalState.rightButtonTitle}
      rightButtonType={curModalState?.rightButtonType}
      buttonTitle={curModalState?.buttonTitle}
      prevNext={curModalState?.prevNext}
      dirtyFieldsCnt={curModalState?.dirtyFieldsCnt}
      onPrev={curModalState.onPrev}
      onNext={curModalState?.onNext}
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
        <Step name={editStudyStepTitle[3]}>
          <EditCompleted />
        </Step>
        <Step name={editStudyStepTitle[4]}>
          <StudyModalError type="edit" />
        </Step>
      </Funnel>
    </ModalLayout>
  );
};

export default EditStudy;
