import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Box,
} from '@chakra-ui/react';
import Input from '../../../../../shared/components/Input';
import useGetProblemCodes from '../../../hooks/api/useGetProblemCodes';
import usePutUserCode from '../../../hooks/api/usePutUserCode';
import useAddUserCode from '../../../hooks/api/useAddUserCode';

const ProblemDetailModal = ({ isOpen, onClose, id, problem, title }) => {
  const [codes, setCodes] = useState([]);
  const [newName, setNewName] = useState('');

  const putMutation = usePutUserCode(data => {});
  const addMutation = useAddUserCode(data => {
    const newCodeBlock = { name: newName, code: '', id: null };
    newCodeBlock.id = data.id;
    const _newCodes = [...codes, newCodeBlock];
    setCodes(_newCodes);
    setNewName('');
  });
  const mutation = useGetProblemCodes(data => {
    setCodes(data.codes);
  });
  const handleInputChange = (index, event) => {
    const newCodes = [...codes];
    newCodes[index].code = event.target.value;
    setCodes(newCodes);
    putMutation.mutate({
      id,
      problem,
      codeId: codes[index].id,
      code: event.target.value,
    });
  };

  const addNewCodeBlock = () => {
    addMutation.mutate({
      id,
      problem,
      name: newName,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    mutation.mutate({ id, problem });
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="1200px">
        <ModalHeader className="text-grey-900 text-2xl font-semibold">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col min-h-[350px] max-h-[550px] overflow-y-auto">
            <Accordion allowToggle>
              {codes?.map((code, index) => (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {code.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <textarea
                      className="flex w-full h-[400px] border"
                      value={code.code}
                      placeholder="코드를 복사해서 넣어주세요!"
                      onChange={event => handleInputChange(index, event)}
                    />
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ModalBody>
        <ModalFooter>
          <Accordion allowToggle w="full">
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="center">
                  + Add User
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <div className="flex flex-row">
                  <Input
                    value={newName}
                    placeholder="추가할 유저의 이름을 입력해주세요"
                    handleChangeValue={e => {
                      setNewName(e.target.value);
                    }}
                  ></Input>
                  <Button colorScheme="blue" onClick={addNewCodeBlock}>
                    +
                  </Button>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProblemDetailModal;
