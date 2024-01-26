import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import useDeleteAllNextProblems from '../../../hooks/api/nextProblems/useDeleteAllNextProblems';

const DeleteModal = ({ isOpen, onClose, title }) => {
  const { id } = useParams();

  const { deleteAllFetch } = useDeleteAllNextProblems(id);

  const handleClickAllDelete = () => {
    deleteAllFetch();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!w-10">
      <ModalOverlay />
      <ModalContent className="!w-[400px] p-2">
        <ModalHeader className="text-center text-grey-900 font-semibold whitespace-pre-line">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalFooter className="!w-full grid grid-cols-2 gap-3">
          <Button
            className="!w-full !rounded-lg border border-solid !border-gray-300 !bg-white text-gray-700 font-semibold mr-1"
            variant="outlined"
            onClick={onClose}
          >
            잠깐만요
          </Button>
          <Button
            className="!w-full !bg-brand-600 !rounded-lg !text-white"
            onClick={handleClickAllDelete}
          >
            전체 삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
