import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EditModal from './modals/EditModal';
import ExitModal from './modals/ExitModal';

const StudyCard = React.memo(({ id, title, management = false }) => {
  const navigate = useNavigate();
  const {
    isOpen: isExitModalOpen,
    onOpen: onExitModalOpen,
    onClose: onExitModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const url = `/info/${id}`;

  const handleExit = () => {
    onExitModalOpen();
  };

  const handleEdit = () => {
    onEditModalOpen();
  };

  const handleNavigate = () => {
    navigate(url);
  };

  return (
    <>
      <EditModal
        isEditModalOpen={isEditModalOpen}
        onEditModalClose={onEditModalClose}
        id={id}
      />
      <ExitModal
        isExitModalOpen={isExitModalOpen}
        onExitModalClose={onExitModalClose}
        id={id}
      />
      <div className="block bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="p-6 text-3xl font-semibold tracking-tight text-gray-900">
          {title}
        </h5>
        <hr />
        <div className="px-6 py-4 flex justify-between">
          <div className="flex gap-2">
            <Button
              className="!h-[36px] px-[14px] !text-gray-700 !bg-white !border !border-gray-300 !font-bold"
              onClick={handleExit}
            >
              나가기
            </Button>
            {management && (
              <Button
                className="!h-[36px] px-[14px] !text-gray-700 !bg-white !border !border-gray-300 !font-bold"
                onClick={handleEdit}
              >
                수정하기
              </Button>
            )}
          </div>

          <Button
            className="!h-[36px] px-[14px] !text-brand-700 !bg-brand-50"
            onClick={handleNavigate}
          >
            바로 가기
          </Button>
        </div>
      </div>
    </>
  );
});

StudyCard.displayName = 'StudyCard';

export default StudyCard;
