import {
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';

const ModalLayout = ({
  title = '스터디 만들기',
  children,
  leftButtonTitle,
  rightButtonTitle,
  buttonTitle,
  prevNext = true,
  onNext,
  onPrev,
}) => {
  const renderButton = () => {
    if (prevNext) {
      return (
        <div className="!w-full grid grid-cols-2 gap-3">
          <Button
            className="!w-full !rounded-lg border border-solid !border-gray-300 !bg-white !text-gray-700 font-semibold"
            onClick={onPrev}
          >
            {leftButtonTitle}
          </Button>
          <Button
            className="!w-full !rounded-lg !bg-brand-600 !text-white font-semibold"
            onClick={onNext}
          >
            {rightButtonTitle}
          </Button>
        </div>
      );
    }

    return (
      <div className="!w-full">
        <Button
          className="!w-full !rounded-lg border border-solid !border-gray-300 !bg-white !text-gray-700 font-semibold"
          onClick={onNext}
        >
          {buttonTitle}
        </Button>
      </div>
    );
  };
  
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        {title && (
          <ModalHeader className="text-center text-grey-900 text-2xl font-semibold">
            {title}
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-4">{children}</ModalBody>
        <ModalFooter>
          {renderButton()}
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ModalLayout;
