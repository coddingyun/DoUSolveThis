import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import useInput from '../../../../shared/hooks/useInput';
import useParticipateMessage from '../../hooks/api/useParticipateMessage';

const ParticipateModal = ({ isOpen, onClose, title, studyId }) => {
  const [inputValue, handleChange, handleSubmit] = useInput('', null);
  const { isLoading, refetch } = useParticipateMessage(studyId, inputValue);
  const submitAction = () => {
    refetch();
    onClose();
  };
  return (
    <FormControl onSubmit={handleSubmit}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center text-grey-900 font-semibold">
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h4 className="text-gray-700 text-[14px] font-medium">
              참여 메시지
            </h4>
            <Textarea
              variant="outline"
              className="!w-full !h-[108px]"
              value={inputValue}
              onChange={handleChange}
            />
          </ModalBody>
          <ModalFooter className="!w-full grid grid-cols-2 gap-3">
            <Button
              className="!w-full !rounded-lg border border-solid !border-gray-300 !bg-white text-gray-700 font-semibold mr-1"
              variant="outlined"
              onClick={onClose}
              disabled={!!isLoading}
            >
              잠깐만요
            </Button>
            <Button
              className="!w-full !bg-brand-600 !rounded-lg !text-white"
              onClick={submitAction}
            >
              참여하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};

export default ParticipateModal;
