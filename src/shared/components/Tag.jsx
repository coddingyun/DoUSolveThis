import levelToRank from '../constants/levelToRank';
import { tierBgColor, tierTextColor } from '../constants/tierColor';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { useEditStudyActions, useStudyActions } from '../../store/studyStore';
import { getTierColor } from '../utils/tierInfo';

export const RankTag = ({ children }) => {
  const tierText = levelToRank[children];
  let bgColor = '';
  let textColor = '';
  if (children === 0) {
    bgColor = 'bg-grey-600';
    textColor = 'text-white';
  } else {
    const idx = parseInt((children - 1) / 5, 10);
    bgColor = tierBgColor[idx];
    textColor = tierTextColor[idx];
  }
  return (
    <span
      className={`${bgColor} ${textColor} text-sm font-medium me-2 px-2.5 py-0.5 rounded-2xl`}
    >
      {tierText}
    </span>
  );
};

export const UserTag = ({ title, tier }) => {
  const tierColor = getTierColor(tier);
  return (
    <div
      className={`rounded-[16px] px-3 py-1 ${tierColor.textColor} ${tierColor.bgColor} text-[14px]`}
    >
      {title}
    </div>
  );
};

export const BottomTag = ({ children }) => {
  return (
    <span className="text-brand-700 text-sm font-semibold">#{children}</span>
  );
};

export const BaekjoonIdTag = ({ children, type }) => {
  const { deleteMember } = useStudyActions();
  const { deleteMember: deleteMemberEdit } = useEditStudyActions();

  const handleClickDelete = () => {
    if (type == 'edit') {
      deleteMemberEdit(children);
    } else {
      deleteMember(children);
    }
  };

  return (
    <span className="w-fit flex gap-1 items-center px-2.5 py-0.5 text-gray-700 bg-gray-200 text-sm font-semibold rounded-2xl">
      {children}
      <Delete onClick={handleClickDelete} />
    </span>
  );
};

export const ApplyStatusTag = ({ state }) => {
  const tagStyle = state => {
    switch (state) {
      case '대기중':
        return {
          textColor: 'text-brand-700',
          bgColor: 'bg-brand-50',
          text: '대기중',
        };
      case '거절':
        return {
          textColor: 'text-error-700',
          bgColor: 'bg-error-50',
          text: '거절',
        };
      case '승인':
        return {
          textColor: 'text-success-50',
          bgColor: 'bg-success-50',
          text: '승낙',
        };
    }
  };

  return (
    <div
      className={`w-fit px-3 py-1 ${tagStyle(state).textColor} ${tagStyle(state).bgColor} text-sm font-medium rounded-2xl`}
    >
      {tagStyle(state).text}
    </div>
  );
};
