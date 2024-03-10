import { lazy, useEffect } from 'react';
import useGetUserInfo from '../../hooks/api/useGetUserInfo';
import { useUserActions } from '../../../store/userStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const Router = () => {
  const { setUserName, setUserId, setUserImage } = useUserActions();
  const { data: userInfo, refetch } = useGetUserInfo();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username);
      setUserId(userInfo.email);
      setUserImage(userInfo.imageUrl);
    }
  }, [userInfo]);

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
