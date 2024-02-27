import React from 'react';
import { useParams } from 'react-router-dom';
import useStudyInfo from './hooks/api/useStudyInfo';
import TopNavigation from '../../shared/layout/TopNavigation';
import Header from './components/Header';
import StudyDetailInfo from './components/StudyDetailInfo';
import StudyPlan from './components/StudyPlan';
import MemberList from './components/MemberList';
import NextProblems from './components/NextProblems';

const StudyInfo = () => {
  const { id } = useParams();
  const { studyInfoData, isLoading } = useStudyInfo(id);

  return (
    !isLoading && (
      <TopNavigation>
        <div className="h-full scroll-auto py-10 px-8">
          <Header
            title={studyInfoData.title}
            description={studyInfoData.description}
            peopleNum={studyInfoData.members.length}
            studyId={id}
          />
          <StudyDetailInfo studyInfoData={studyInfoData} />
          <StudyPlan studyInfoData={studyInfoData} />
          <MemberList studyInfoData={studyInfoData} />
          <div className="w-full h-[1px] bg-gray-200" />
          <NextProblems />
        </div>
      </TopNavigation>
    )
  );
};

export default StudyInfo;
