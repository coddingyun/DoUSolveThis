import { Button } from '@chakra-ui/react';
import React from 'react';

const CheckBoxButton = ({ title, isSelected, onClick }) => {
  const style = {
    selected: '!border-brand-300 !bg-brand-50 !text-brand-700',
    notSelected: '!border-gray-300 !text-gray-700',
  };
  return (
    <Button
      className={`!p-0 border font-semibold rounded-lg ${isSelected ? style.selected : style.notSelected}`}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CheckBoxButton;
