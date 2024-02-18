import React from 'react';
import {
  ModalOverlay,
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
  onNext,
  onPrev,
}) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        {title && (
          <ModalHeader className="text-center text-grey-900 text-2xl font-semibold">
            {title}
          </ModalHeader>
        )}
        <ModalBody className="flex flex-col gap-4">{children}</ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ModalLayout;
