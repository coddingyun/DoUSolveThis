import React from 'react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useFunnel from '../../../shared/hooks/useFunnel';
import { Form } from '../../../shared/components/Form';
import EditStudy from '../../../shared/components/editStudy/EditStudy';
import { editStudyStepTitle } from '../../../shared/constants/steps';
import { useEditStudyActions } from '../../../store/studyStore';
import { studySchema } from '../../../shared/constants/schema';

const StudyCard = React.memo(({ id, title, management = false }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Funnel, Step, setStep } = useFunnel(editStudyStepTitle[0]);
  const { reset } = useEditStudyActions();

  const clickHandler = nextStep => {
    setStep(nextStep);
  };

  const url = `/info/${id}`;

  const handleExit = () => {
    // TODO exit api
  };

  const handleEdit = () => {
    onOpen();
  };

  const handleNavigate = () => {
    navigate(url);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          clickHandler(editStudyStepTitle[0]);
          reset();
        }}
        closeOnOverlayClick={false}
      >
        <Form
          onSubmit={() => {
            // Todo. Submit Action 여기로 이동시키기
          }}
          schema={studySchema}
        >
          <EditStudy
            clickHandler={clickHandler}
            Funnel={Funnel}
            Step={Step}
            onClose={onClose}
          />
        </Form>
      </Modal>
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
