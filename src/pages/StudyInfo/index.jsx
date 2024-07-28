import React from 'react';
import { useParams } from 'react-router-dom';
import useStudyInfo from '../../shared/hooks/api/useStudyInfo';
import TopNavigation from '../../shared/layout/TopNavigation';
import Header from './components/Header';
import StudyDetailInfo from './components/StudyDetailInfo';
import StudyPlan from './components/StudyPlan';
import MemberList from './components/MemberList';
import NextProblems from './components/NextProblems';
import Line from '../../shared/components/Line';
import ProblemSearch from './components/ProblemSearch';

const StudyInfo = () => {
  const { id } = useParams();
  const { studyInfoData, isLoading } = useStudyInfo(id);

  return (
    !isLoading && (
      <TopNavigation>
        <div className="h-full scroll-auto py-10 px-8">
          <Header studyInfoData={studyInfoData} studyId={id} />
          <StudyDetailInfo studyInfoData={studyInfoData} />
          <StudyPlan studyInfoData={studyInfoData} />
          {studyInfoData.participated && (
            <>
              <MemberList studyInfoData={studyInfoData} />
              <Line />
              <ProblemSearch studyId={id} />
              <Line />
              <NextProblems studyId={id} />
            </>
          )}
        </div>
      </TopNavigation>
    )
  );
};

export default StudyInfo;
