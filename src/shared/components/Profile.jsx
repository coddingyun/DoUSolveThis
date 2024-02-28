import { Image } from '@chakra-ui/react';
import { useUserImage } from '../../store/userStore';

const Profile = ({boxSize}) => {
  const userImage = useUserImage(state => state.userImage);
  return (
    <Image
      src={userImage}
      className="rounded-full"
      alt="profile"
      boxSize={boxSize}
    />
  );
};

export default Profile;
