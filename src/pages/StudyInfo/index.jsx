import React from 'react';
import { useParams } from 'react-router-dom';
import useStudyInfo from '../../hooks/api/useStudyInfo';
import TopNavigation from '../../layout/TopNavigation';
import Header from './Header';
import StudyDetailInfo from './StudyDetailInfo';
import StudyPlan from './StudyPlan';
import MemberList from './MemberList';
import NextProblems from './NextProblems';

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
          <NextProblems />
        </div>
      </TopNavigation>
    )
  );
};

export default StudyInfo;
