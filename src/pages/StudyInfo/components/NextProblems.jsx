import React from 'react';
import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useDeleteNextProblem from '../hooks/api/nextProblems/useDeleteNextProblem';
import { RankTag, UserTag } from '../../../shared/components/Tag';
import useGetNextProblems from '../hooks/api/nextProblems/useGetNextProblems';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import { ReactComponent as RightArrow } from '../../../assets/chevron-right.svg';
import { ReactComponent as LeftArrow } from '../../../assets/chevron-left.svg';
import { useNextProbs } from '../../../store/nextProbStore';
import SimpleModal from '../../../shared/components/SimpleModal';
import EnterProblem from './modals/checkProblem/EnterProblem';
import EnterOtherProblem from './modals/checkProblem/EnterOtherProblem';
import useDeleteAllNextProblems from '../hooks/api/nextProblems/useDeleteAllNextProblems';
import { useRef, useState, useEffect } from 'react';
import ProblemDetailModal from './modals/checkProblem/PromblemDetailModal';
import useStudyInfo from '../../../shared/hooks/api/useStudyInfo';

const RightButton = ({ className }) => {
  return (
    <div
      className={`${className} inline-flex p-1 rounded-full bg-white border border-gray-300`}
    >
      <RightArrow />
    </div>
  );
};

const LeftButton = ({ className }) => {
  return (
    <div
      className={`${className} inline-flex p-1 rounded-full bg-white border border-gray-300`}
    >
      <LeftArrow />
    </div>
  );
};

const Card = ({ data }) => {
  const toast = useToast();
  const { id } = useParams();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const { deleteFetch } = useDeleteNextProblem(id, data.probNum);

  const handleClickOpenLink = event => {
    window.open(data.link);
    event.preventDefault();
    event.stopPropagation();
  };
  const handleClickCopyLink = event => {
    navigator.clipboard.writeText(data.link).then(() => {
      // TODO. 스타일링 반영
      toast({
        position: 'top',
        title: '문제 링크가 복사되었습니다.',
        status: 'success',
        duration: 3000,
      });
    });
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDelete = e => {
    deleteFetch();
    e.preventDefault();
    e.stopPropagation();
  };
  const scrollContainerRef = useRef(null);
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const updateScrollState = () => {
      if (!scrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsScrolledToStart(scrollLeft === 0);
      setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    updateScrollState();

    scrollContainer.addEventListener('scroll', updateScrollState);

    return () => {
      scrollContainer.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  const scrollRight = event => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 80, behavior: 'smooth' });
    event.preventDefault();
    event.stopPropagation();
  };

  const scrollLeft = event => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -80, behavior: 'smooth' });
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="min-w-[388px] h-[240px] flex flex-col justify-between p-6 shadow-sm rounded-xl border border-solid border-gray-200 cursor-pointer"
      onClick={onOpenDetail}
    >
      <ProblemDetailModal
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        id={id}
        problem={data.probNum}
        title={data.title}
      ></ProblemDetailModal>
      <div>
        <div className="flex justify-between items-start mb-5 cursor-pointer">
          <h2 className="text-2xl font-semibold text-gray-900">{data.title}</h2>
          <Trash onClick={handleDelete} className="cursor-pointer" />
        </div>
        <RankTag>{data.rank}</RankTag>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide"
          >
            {data.types &&
              data.types.map((type, idx) => (
                <UserTag title={`#${type}`} tier={6} key={`type${idx}`} />
              ))}
          </div>
          {!isScrolledToEnd && (
            <div onClick={scrollRight}>
              <RightButton className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
            </div>
          )}
          {!isScrolledToStart && (
            <div onClick={scrollLeft}>
              <LeftButton className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex gap-3">
        <Button
          className="w-full py-2.5 !font-semibold !text-gray-700 !bg-white !border !border-gray-300"
          onClick={handleClickCopyLink}
        >
          문제 링크 복사
        </Button>
        <Button
          className="w-full py-2.5 !font-semibold !text-brand-700 !bg-brand-50"
          onClick={handleClickOpenLink}
        >
          문제 바로 가기
        </Button>
      </div>
    </div>
  );
};

const LoadingCard = () => (
  <div className="min-w-[388px] h-[240px] border border-solid border-gray-200 shadow-sm" />
);

const NextProblems = ({ studyId }) => {
  const {
    isOpen: isOpenOtherEnterProblem,
    onOpen: onOpenOtherEnterProblem,
    onClose: onCloseOtherEnterProblem,
  } = useDisclosure();
  const {
    isOpen: isOpenEnterProblem,
    onOpen: onOpenEnterProblem,
    onClose: onCloseEnterProblem,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const { id } = useParams();
  const { isLoading } = useGetNextProblems(id);
  const { studyInfoData, isStudyLoading } = useStudyInfo(id);

  const nextProbs = useNextProbs();

  const renderCard = () => {
    if (isLoading || isStudyLoading) {
      return Array.from({ length: 3 }).map((_, idx) => (
        <LoadingCard key={`Card${idx}`} />
      ));
    }
    console.log(studyInfoData.how_many);
    console.log('ff: ', parseInt(studyInfoData.how_many) || 1);

    return (
      <div className="grid grid-cols-3 gap-6">
        {nextProbs &&
          nextProbs.slice(0, parseInt(studyInfoData.how_many) || 1).length >
            0 &&
          nextProbs
            .slice(0, parseInt(studyInfoData.how_many) || 1)
            .map((prob, idx) => <Card data={prob} key={`Card${idx}`} />)}
      </div>
    );
  };

  const modalTitle = '정말 문제를\n전체 삭제 하시겠습니까?😭';
  const { deleteAllFetch } = useDeleteAllNextProblems(studyId);

  const handleClickDeleteButton = () => {
    deleteAllFetch();
    onCloseDeleteModal();
  };

  return (
    <div className="py-8">
      <EnterOtherProblem
        isOpen={isOpenOtherEnterProblem}
        onClose={onCloseOtherEnterProblem}
      />
      <EnterProblem isOpen={isOpenEnterProblem} onClose={onCloseEnterProblem} />
      <SimpleModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        title={modalTitle}
        buttonTitle="전체 삭제"
        onClick={handleClickDeleteButton}
      />
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <h3 className="text-gray-900 text-[24px] font-semibold">
            📌 다음 스터디까지 풀 문제
          </h3>
          <Button
            onClick={onOpenEnterProblem}
            className="!bg-brand-600 !text-white rounded-lg font-semibold text-sm"
          >
            백준 문제 추가
          </Button>
          <Button
            onClick={onOpenOtherEnterProblem}
            className="!bg-brand-600 !text-white rounded-lg font-semibold text-sm"
          >
            타 플랫폼 문제 추가
          </Button>
        </div>
        <Button
          className="!text-gray-700 !text-base !font-semibold !bg-white"
          onClick={onOpenDeleteModal}
        >
          전체 삭제
        </Button>
      </div>
      <div className="w-full flex flex-wrap gap-6 pt-8">{renderCard()}</div>
    </div>
  );
};

export default NextProblems;
