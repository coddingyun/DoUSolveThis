import { Button } from "@chakra-ui/react";

const SimpleButton = ({onClick}) => {
  return (
    <Button className="flex items-center gap-1 !bg-brand-600" onClick={onClick}>
      <div className="text-white font-semibold text-base">스터디 만들기</div>
    </Button>
  );
};

export default SimpleButton;
