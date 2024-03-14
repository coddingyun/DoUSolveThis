import React from 'react';
import {
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { Form } from '../components/Form';

const ModalLayout = React.memo(
  ({
    title = '스터디 만들기',
    children,
    leftButtonTitle,
    rightButtonTitle,
    rightButtonType = 'default',
    dirtyFieldsCnt = 0,
    buttonTitle,
    prevNext = true,
    closeButton = true,
    onClose,
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
            {rightButtonType === 'default' && (
              <Button
                className="!w-full !rounded-lg !bg-brand-600 !text-white font-semibold"
                onClick={onNext}
              >
                {rightButtonTitle}
              </Button>
            )}
            {rightButtonType === 'next' && (
              <Form.NextButton
                title={rightButtonTitle}
                onClick={onNext}
                dirtyFieldsCnt={dirtyFieldsCnt}
              />
            )}
            {rightButtonType === 'submit' && (
              <Form.SubmitButton
                title={rightButtonTitle}
                onClick={onNext}
                dirtyFieldsCnt={dirtyFieldsCnt}
              />
            )}
          </div>
        );
      }

      return (
        <div className="!w-full grid grid-cols-1">
          <Form.NextButton
            title={buttonTitle}
            //className="!w-full !rounded-lg !bg-brand-600 !text-white font-semibold"
            onClick={onNext}
            dirtyFieldsCnt={dirtyFieldsCnt}
          />
        </div>
      );
    };

    return (
      <>
        <ModalOverlay />
        <ModalContent>
          {title && (
            <ModalHeader className="text-center text-grey-900 text-2xl font-semibold whitespace-pre-line">
              {title}
            </ModalHeader>
          )}
          {closeButton && <ModalCloseButton onClick={onClose} />}
          <ModalBody className="flex flex-col gap-4">{children}</ModalBody>
          <ModalFooter>{renderButton()}</ModalFooter>
        </ModalContent>
      </>
    );
  },
);

ModalLayout.displayName = 'ModalLayout';

export default ModalLayout;
