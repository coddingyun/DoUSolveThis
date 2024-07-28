import React from 'react';
import {
  Button,
  useDisclosure,
  useToast,
  Switch,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
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
import useSearchProblem from '../hooks/api/nextProblems/useSearchProblem';
import { ReactComponent as Search } from '../../../assets/search.svg';
import InputContainer from '../../../shared/components/InputContainer';
import SelectComp from '../../../shared/components/Select';
import levelToRank from '../../../shared/constants/levelToRank';
import Input from '../../../shared/components/Input';
import Line from '../../../shared/components/Line';
import { api } from '../../../shared/hooks/api';
import usePostSuggestion from '../hooks/api/usePostSuggestion';
import {
  ProblemTypeTag,
  ProblemTypeTagGuide,
} from '../../../shared/components/Tag';
const defaultTag = '선택된 태그: ';
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

  const handleClickOpenLink = event => {
    window.open(`https://www.acmicpc.net/problem/{data.problemId}`);
    event.preventDefault();
    event.stopPropagation();
  };
  const handleClickCopyLink = event => {
    navigator.clipboard
      .writeText(`https://www.acmicpc.net/problem/{data.problemId}`)
      .then(() => {
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

  const mutation = usePostSuggestion(() => {
    toast({
      position: 'top',
      title: '문제가 추가되었습니다.',
      status: 'success',
      duration: 3000,
    });
  });
  const handleSuggestProb = () => {
    mutation.mutate({
      id,
      problem: data.problemId,
    });
  };

  return (
    <div className="min-w-[388px] h-[240px] flex flex-col justify-between p-6 shadow-sm rounded-xl border border-solid border-gray-200 cursor-pointer">
      <div>
        <div className="flex justify-between items-start mb-5 cursor-pointer">
          <h2 className="text-2xl font-semibold text-gray-900">{`(${data.problemId}) ${data.title}`}</h2>
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
          onClick={handleSuggestProb}
        >
          이 문제 어때요?
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

const ProblemSearch = ({ studyId }) => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [notSolved, setNotSolved] = useState(false);
  const [minSolved, setMinSolved] = useState();
  const [tags, setTags] = useState([defaultTag]);
  const [tagGuides, setTagGuides] = useState([]);
  const [cards, setCards] = useState();
  const [isRandom, setIsRandom] = useState(false);
  const ranks = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  useEffect(() => {
    setValue('');
    setQuery('');
    setEnd();
    setStart();
    setIsRandom(false);
    setNotSolved(false);
    setMinSolved();
    setTags([defaultTag]);
    setTagGuides([]);
    setCards();
  }, []);
  const handleChangeTagQueryValue = async event => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    try {
      const response = await api.get(`/api/search/tags?query=${newQuery}`);
      setTagGuides(response.data.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };
  const {
    isOpen: isOpenDetailSearch,
    onOpen: onOpenDetailSearch,
    onClose: onCloseDetailSearch,
  } = useDisclosure();
  const { id } = useParams();
  const { refetch } = useSearchProblem(
    id,
    [
      'postNextProblem',
      value,
      {
        start: levelToRank.indexOf(start),
        end: levelToRank.indexOf(end),
        minSolved: minSolved,
        notSolved: notSolved,
        tags: tags.slice(1),
        isRandom: isRandom,
      },
    ],
    setCards,
  );
  const handleChangeValue = event => {
    setValue(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      refetch();
    }
  };

  const renderSearchCard = cards => {
    return (
      <div className="grid grid-cols-3 gap-6">
        {cards &&
          cards.length > 0 &&
          cards.map((prob, idx) => <Card data={prob} key={`Card${idx}`} />)}
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <h3 className="text-gray-900 text-[24px] font-semibold">
            🔎 문제 검색하기
          </h3>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-full relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-grey-500">
              <Search strokeWidth="2" className="w-5 h-5" />
            </div>
            <input
              type="text"
              id="default-search"
              className="block min-w-[300px] mr-4 h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg"
              placeholder="백준 문제 번호, 문제명 입력 후 엔터."
              value={value}
              onChange={handleChangeValue}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              상세 검색
            </FormLabel>
            <Switch
              id="email-alerts"
              isChecked={isOpenDetailSearch}
              onChange={
                isOpenDetailSearch ? onCloseDetailSearch : onOpenDetailSearch
              }
            />
          </FormControl>
        </div>
      </div>
      {isOpenDetailSearch && (
        <div>
          <div className="flex flex-row justify-between mt-2 gap-4">
            <div className="flex gap-2 items-center justify-between !text-gray-700 !text-base !font-semibold !bg-white ">
              <InputContainer title="최소 티어 ">
                <SelectComp
                  value={start}
                  handleChangeValue={e => setStart(e.target.value)}
                  options={levelToRank}
                  textClassName="!text-base !font-normal "
                  placeholder="티어를 선택해주세요."
                />
              </InputContainer>
              <InputContainer title="최대 티어">
                <SelectComp
                  value={end}
                  handleChangeValue={e => {
                    setEnd(e.target.value);
                  }}
                  options={levelToRank}
                  textClassName="!text-base !font-normal "
                  placeholder="티어를 선택해주세요."
                />
              </InputContainer>
              <InputContainer title="최소 푼 사람수">
                <Input
                  placeholder={'최소 푼 사람수를 적어주세요.'}
                  value={minSolved}
                  handleChangeValue={event => {
                    setMinSolved(event.target.value);
                  }}
                  type="number"
                ></Input>
              </InputContainer>
            </div>
            <div className="flex flex-1 items-center"></div>
            <div className="flex items-center">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  랜덤
                </FormLabel>
                <Switch
                  id="랜덤"
                  isChecked={isRandom}
                  onChange={() => setIsRandom(!isRandom)}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  안푼 문제만
                </FormLabel>
                <Switch
                  id="안푼 문제만"
                  isChecked={notSolved}
                  onChange={() => setNotSolved(!notSolved)}
                />
              </FormControl>
            </div>
          </div>

          <div className="flex-1 w-full mt-4">
            <InputContainer title="태그 검색">
              <Input
                placeholder="문제 태그 입력 후 엔터"
                className={'border-gray-300 '}
                value={query}
                handleChangeValue={handleChangeTagQueryValue}
                handleKeyDown={event => {
                  if (event.key === 'Enter') {
                    if (tags.includes(query)) return;
                    setTags([...tags, query]);
                  }
                }}
              />

              <div className="flex flex-wrap gap-2 overflow-x-auto w-full">
                {tags &&
                  tags.map((tag, idx) => (
                    <ProblemTypeTag
                      key={`tag#${idx}`}
                      handleClickDelete={() => {
                        const _tags = [...tags];
                        setTags(_tags.filter(t => t !== tag));
                      }}
                      defaultTag={defaultTag}
                    >
                      {tag}
                    </ProblemTypeTag>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2 overflow-x-auto w-full">
                {tagGuides &&
                  tagGuides.map((tag, idx) => (
                    <ProblemTypeTagGuide
                      key={`tag#${idx}`}
                      onClickHandler={() => {
                        if (tags.includes(tag)) return;
                        setTags([...tags, tag]);
                      }}
                    >
                      {tag}
                    </ProblemTypeTagGuide>
                  ))}
              </div>
            </InputContainer>
          </div>
          <div className="pt-4 relative">
            <Button
              className="w-full items-center gap-1 !px-3.5 !py-0 border border-solid border-gray-300 !rounded-lg"
              onClick={() => {
                refetch();
              }}
            >
              <div className="text-gray-700 font-semibold text-sm">
                검색 하기
              </div>
            </Button>
          </div>
          <div className="pt-8">
            <Line></Line>
          </div>
        </div>
      )}
      <div className="w-full flex flex-wrap gap-6 pt-8">
        {renderSearchCard(cards)}
      </div>
    </div>
  );
};

export default ProblemSearch;
