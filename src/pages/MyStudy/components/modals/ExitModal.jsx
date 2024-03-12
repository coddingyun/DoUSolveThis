import { Modal } from '@chakra-ui/react';
import { Form } from '../../../../shared/components/Form';
import { studySchema } from '../../../../shared/constants/schema';
import { exitStudyStepTitle } from '../../../../shared/constants/steps';
import useFunnel from '../../../../shared/hooks/useFunnel';
import ExitStudy from '../../../../shared/components/exitStudy/ExitStudy';

const ExitModal = ({ isExitModalOpen, onExitModalClose, id }) => {
  const {
    Funnel: ExitFunnel,
    Step: ExitStep,
    setStep: setExitStep,
  } = useFunnel(exitStudyStepTitle[0]);

  const clickExitHandler = nextStep => {
    setExitStep(nextStep);
  };

  return (
    <Modal
      isOpen={isExitModalOpen}
      onClose={() => {
        onExitModalClose();
        clickExitHandler(exitStudyStepTitle[0]);
      }}
      closeOnOverlayClick={false}
    >
      <Form
        onSubmit={() => {
          // Todo. Submit Action 여기로 이동시키기
        }}
        schema={studySchema}
      >
        <ExitStudy
          clickHandler={clickExitHandler}
          Funnel={ExitFunnel}
          Step={ExitStep}
          onClose={onExitModalClose}
          id={id}
        />
      </Form>
    </Modal>
  );
};

export default ExitModal;
