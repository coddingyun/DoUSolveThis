import Profile from "../../shared/components/Profile";
import TopNavigation from "../../shared/layout/TopNavigation";
import { useUserBaekjoonId, useUserName } from "../../store/userStore";

const MakeStudy = () => {
  const userName = useUserName();
  const userBaekjoonId = useUserBaekjoonId();
  return (
    <TopNavigation>
      <div className="py-24 flex flex-col items-center justify-center">
        <Profile boxSize="96px"/>
        <h2>{userName}</h2>
        <h4>@{userBaekjoonId}</h4>
      </div>
    </TopNavigation>
  )
}

export default MakeStudy;
