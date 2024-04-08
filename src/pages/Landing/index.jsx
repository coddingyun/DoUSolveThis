import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from '../../assets/search.svg';
import { ReactComponent as Export } from '../../assets/export.svg';
import { ReactComponent as LogoMark } from '../../assets/logo-v.svg';
import LandingButton from './components/LandingButton';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="grid place-items-center">
        <div className="w-full grid place-items-center mb-14">
          <LogoMark className="mb-14" />
          <div className="text-2xl font-bold text-gray-900 text-center mb-3">
            코딩 테스트 스터디 관리 서비스 <br/>
            이 문제 푸셨나요?
          </div>
          <div className="w-full text-base font-normal text-gray-500 text-center">
            스터디원이 푼 문제인지 쉽게 확인해보세요. <br />
            함께 풀고 싶은 문제를 제안해보세요.
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 items-center">
          <LandingButton
            img={<Export strokeWidth="3" className="w-6 h-6" />}
            title="스터디 구경하기"
            clickEvent={() => navigate('/search')}
            bgColor="brand"
          />
          <LandingButton
            img={<Search strokeWidth="3" className="w-6 h-6" />}
            title="로그인 후 시작하기"
            clickEvent={() => navigate('/login')}
            bgColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
