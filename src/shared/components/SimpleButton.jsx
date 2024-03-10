import { Button } from '@chakra-ui/react';

const SimpleButton = ({ title, onClick, isDisabled = false, type }) => {
  return (
    <Button
      type={type}
      className="flex items-center gap-1 !px-3.5 !py-0 !bg-brand-600 !rounded-lg"
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <div className="text-white font-semibold text-sm">{title}</div>
    </Button>
  );
};

export default SimpleButton;
