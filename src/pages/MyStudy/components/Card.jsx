import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EditModal from './modals/EditModal';
import ExitModal from './modals/ExitModal';
import { ReactComponent as Trash } from '../../../assets/trash.svg'
import SimpleModal from '../../../shared/components/SimpleModal';
import useDeleteMyStudy from '../hooks/api/useDeleteMyStudy';

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
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const mutation = useDeleteMyStudy();

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

  const handleClickDeleteButton = () => {
    mutation.mutate(id);
    onCloseDeleteModal();
  }

  const modalTitle = "정말 스터디를\n삭제 하시겠습니까?😭"

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
      <SimpleModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        title={modalTitle}
        buttonTitle="스터디 삭제"
        onClick={handleClickDeleteButton}
      />
      <div className="block bg-white border border-gray-200 rounded-lg shadow">
        <div className='p-6 flex justify-between items-start'>
          <h5 className="text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
          {management && <Trash onClick={onOpenDeleteModal} className="cursor-pointer"/>}
        </div>
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
