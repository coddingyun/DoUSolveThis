import { getTierColor } from '../../../shared/utils/tierInfo';

const UserTag = ({ title, tier }) => {
  const tierColor = getTierColor(tier);
  return (
    <div
      className={`rounded-[16px] px-3 py-1 ${tierColor.textColor} ${tierColor.bgColor} text-[14px]`}
    >
      {title}
    </div>
  );
};

export default UserTag;
