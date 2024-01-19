import React from 'react';
import { Switch } from '@chakra-ui/react';
import TopNavigation from '../../layout/TopNavigation';

const MyStudy = () => {
  return (
    <TopNavigation>
      <div className="h-full scroll-auto py-10 px-8">
        <Switch colorScheme="purple" />
      </div>
    </TopNavigation>
  );
};

export default MyStudy;
