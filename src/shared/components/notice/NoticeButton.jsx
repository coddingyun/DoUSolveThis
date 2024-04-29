import { useState } from 'react';
import { ReactComponent as ClickedBell } from '../../../assets/bell-clicked.svg';
import { ReactComponent as Bell } from '../../../assets/bell.svg';
import { Button } from '@chakra-ui/react';
import NoticeModal from './NoticeModal';

const NoticeButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClickNoticeButton = () => {
    setClicked(prev => !prev);
  };

  return (
    <div className='relative'>
      <Button
        className={`!p-0 rounded-lg ${clicked ? '!bg-brand-50' : '!bg-white'}`}
        onClick={handleClickNoticeButton}
      >
        {clicked ? <ClickedBell /> : <Bell width={20} height={20} stroke="#667085"/>}
      </Button>
      {clicked && <NoticeModal />}
    </div>
  );
};

export default NoticeButton;
