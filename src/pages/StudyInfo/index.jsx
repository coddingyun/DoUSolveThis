import React from 'react';
import { useParams } from 'react-router-dom';
import useStudyInfo from '../../hooks/api/useStudyInfo';
import TopNavigation from '../../layout/TopNavigation';
import Header from './Header';
import StudyDetailInfo from './StudyDetailInfo';
import StudyPlan from './StudyPlan';

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
          />
          <StudyDetailInfo studyInfoData={studyInfoData} />
          <StudyPlan studyInfoData={studyInfoData} />
        </div>
      </TopNavigation>
    )
  );
};

export default StudyInfo;
