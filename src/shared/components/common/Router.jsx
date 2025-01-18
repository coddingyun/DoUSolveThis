import { lazy, useEffect } from 'react';
import useGetUserInfo from '../../hooks/api/useGetUserInfo';
import { useUserActions } from '../../../store/userStore';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../utils/auth';

const Landing = lazy(() => import('../../../pages/Landing'));
const Login = lazy(() => import('../../../pages/Login'));
const SearchStudy = lazy(() => import('../../../pages/SearchStudy'));
const StudyInfo = lazy(() => import('../../../pages/StudyInfo'));
const StudyEdit = lazy(() => import('../../../pages/StudyEdit'));
const MyStudy = lazy(() => import('../../../pages/MyStudy'));
const MyPage = lazy(() => import('../../../pages/MyPage'));
const ParticipationOffer = lazy(
  () => import('../../../pages/ParticipationOffer'),
);
const ApplyList = lazy(() => import('../../../pages/ApplyList'));
const ManagerChange = lazy(() => import('../../../pages/ManagerChange'));

const Router = () => {
  const { setUserName, setUserId, setUserImage, setUserNotices } = useUserActions();
  const { data: userInfo, refetch } = useGetUserInfo();
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (getAccessToken() && location.pathname !== '/') {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username);
      setUserId(userInfo.email);
      setUserImage(userInfo.imageUrl);
      setUserNotices(userInfo.notices)
      if (location.pathname === '/') {
        navigate('/search');
      }
    }
  }, [userInfo]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchStudy />} />
      <Route path="/info/:id" exact element={<StudyInfo />} />
      <Route path="/edit/:id" exact element={<StudyEdit />} />
      <Route path="/my-study" exact element={<MyStudy />} />
      <Route path="/my-page" exact element={<MyPage />} />
      <Route
        path="/participation-offer"
        exact
        element={<ParticipationOffer />}
      />
      <Route path="/apply-list" exact element={<ApplyList />} />
      <Route path="/manager-change" exact element={<ManagerChange />} />
    </Routes>
  );
};

export default Router;
