import { Modal } from '@chakra-ui/react';
import { Form } from '../../../../shared/components/Form';
import { studySchema } from '../../../../shared/constants/schema';
import { editStudyStepTitle } from '../../../../shared/constants/steps';
import EditStudy from '../../../../shared/components/editStudy/EditStudy';
import useFunnel from '../../../../shared/hooks/useFunnel';
import { useEditStudyActions } from '../../../../store/studyStore';

const EditModal = ({ isEditModalOpen, onEditModalClose, id }) => {
  const {
    Funnel: EditFunnel,
    Step: EditStep,
    setStep: setEditStep,
  } = useFunnel(editStudyStepTitle[0]);
  const { reset } = useEditStudyActions();

  const clickEditHandler = nextStep => {
    setEditStep(nextStep);
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={() => {
        onEditModalClose();
        clickEditHandler(editStudyStepTitle[0]);
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
          clickHandler={clickEditHandler}
          Funnel={EditFunnel}
          Step={EditStep}
          onClose={onEditModalClose}
          editId={id}
        />
      </Form>
    </Modal>
  );
};

export default EditModal;
