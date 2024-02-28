import Profile from '../../../../shared/components/Profile';

const ProfileSection = ({ userName, baekjoonId }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Profile boxSize="96px" />
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-gray-900">{userName}</h2>
        <h4 className="text-lg font-normal text-gray-500">@{baekjoonId}</h4>
      </div>
    </div>
  );
};

export default ProfileSection;
