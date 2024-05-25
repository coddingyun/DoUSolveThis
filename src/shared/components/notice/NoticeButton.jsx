import { useEffect, useRef } from 'react';
import { ReactComponent as ClickedBell } from '../../../assets/bell-clicked.svg';
import { ReactComponent as Bell } from '../../../assets/bell.svg';
import { Button } from '@chakra-ui/react';
import NoticeModal from './NoticeModal';

const NoticeButton = ({ isOpenMenu, setIsOpenMenu }) => {
  const dropMenuRef = useRef();

  const handleClickNoticeButton = e => {
    e.stopPropagation();
    setIsOpenMenu(prev => (prev === 'notice' ? null : 'notice'));
  };

  useEffect(() => {
    const handleOutsideClose = e => {
      if (isOpenMenu === 'notice' && !dropMenuRef.current.contains(e.target))
        setIsOpenMenu(null);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpenMenu]);

  const clicked = isOpenMenu === 'notice';

  return (
    <div className="relative">
      <Button
        className={`!p-0 rounded-lg ${clicked ? '!bg-brand-50' : '!bg-white'}`}
        onClick={handleClickNoticeButton}
      >
        {clicked ? (
          <ClickedBell />
        ) : (
          <Bell width={20} height={20} stroke="#667085" />
        )}
      </Button>
      {clicked && (
        <div ref={dropMenuRef}>
          <NoticeModal />
        </div>
      )}
    </div>
  );
};

export default NoticeButton;
