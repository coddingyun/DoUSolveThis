import levelToRank from '../constants/levelToRank';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { useEditStudyActions, useStudyActions } from '../../store/studyStore';
import { getTierColor } from '../utils/tierInfo';
import { useUserName } from '../../store/userStore';

export const RankTag = ({ children }) => {
  const tierText = levelToRank[children];
  const tierColor = getTierColor(children);
  return (
    <span
      className={`inline-flex gap-2 ${tierColor.bgColor} ${tierColor.textColor} text-sm font-semibold px-3 py-1 rounded-2xl`}
    >
      <img src={`/badge/${tierText}.png`} width="16" />
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

export const BaekjoonIdTag = ({ children, type, member }) => {
  const { deleteMember } = useStudyActions();
  const { deleteMember: deleteMemberEdit } = useEditStudyActions();
  const userName = useUserName();

  const handleClickDelete = () => {
    if (type == 'edit') {
      deleteMemberEdit(member);
    } else {
      deleteMember(member);
    }
  };

  return (
    <span className="w-fit flex gap-1 items-center px-2.5 py-0.5 text-gray-700 bg-gray-200 text-sm font-semibold rounded-2xl">
      {children}
      {member.username !== userName && <Delete onClick={handleClickDelete} />}
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

export const RecruitingTag = ({ isRecruiting }) => {
  const tagStyle = () => {
    if (isRecruiting) {
      return {
        textColor: 'text-brand-700',
        bgColor: 'bg-brand-50',
        text: '모집 중',
      };
    } else {
      return {
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-50',
        text: '모집 완료',
      };
    }
  };

  return (
    <div
      className={`w-fit px-3 py-1 ${tagStyle().textColor} ${tagStyle().bgColor} text-sm font-medium rounded-2xl`}
    >
      {tagStyle().text}
    </div>
  );
};
