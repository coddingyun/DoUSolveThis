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
  Select,
  Button,
  Box,
} from '@chakra-ui/react';
import Input from '../../../../../shared/components/Input';
import useGetProblemCodes from '../../../hooks/api/useGetProblemCodes';
import usePutUserCode from '../../../hooks/api/usePutUserCode';
import useAddUserCode from '../../../hooks/api/useAddUserCode';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // 이 컴포넌트에서만 스타일 적용
// 필요한 언어를 import
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-go';

const ProblemDetailModal = ({ isOpen, onClose, id, problem, title }) => {
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(-1);
  const [newName, setNewName] = useState('');
  const supportedLanguages = [
    'javascript',
    'python',
    'java',
    'c',
    'cpp',
    'ruby',
    'kotlin',
    'json',
  ];

  const [language, setLanguage] = useState('python'); // 기본 언어 설정
  const [t, setT] = useState(false);
  const putMutation = usePutUserCode(data => {});

  useEffect(() => {
    // SyntaxHighlighter 초기화
    window.SyntaxHighlighter?.highlight();
  }, []);
  const addMutation = useAddUserCode(data => {
    const newCodeBlock = {
      name: newName,
      code: '',
      id: null,
      language: language,
    };
    newCodeBlock.id = data.id;
    const _newCodes = [...codes, newCodeBlock];
    setCodes(_newCodes);
    setNewName('');
  });
  const mutation = useGetProblemCodes(data => {
    data.codes
      .filter(code => !code.language)
      .map(code => {
        code.language = language;
      });
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
  const handleLanguageChange = (index, newLanguage) => {
    const updatedCodes = [...codes];
    updatedCodes[index].language = newLanguage;
    setCodes(updatedCodes);
  };

  const addNewCodeBlock = () => {
    addMutation.mutate({
      id,
      problem,
      name: newName,
      language: language,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    mutation.mutate({ id, problem });
  }, [isOpen, t]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="1200px">
        <ModalHeader className="text-grey-900 text-2xl font-semibold">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col min-h-[350px] max-h-[550px] overflow-y-auto border-none">
            <Accordion allowToggle>
              {codes?.map((code, index) => (
                <AccordionItem key={index} onClick={() => setT(!t)}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {code.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} onClick={e => e.stopPropagation()}>
                    <Select
                      key={index}
                      value={code.language || language}
                      onChange={e =>
                        handleLanguageChange(index, e.target.value)
                      }
                      mb={4}
                      size="sm"
                    >
                      {supportedLanguages.map(lang => (
                        <option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </option>
                      ))}
                    </Select>

                    {selectedCode === index ? (
                      <textarea
                        className="flex w-full h-[400px] outline-none p-2 border rounded-md"
                        value={code.code}
                        placeholder="코드를 복사해서 넣어주세요!"
                        onChange={event => handleInputChange(index, event)}
                        onBlur={() => setSelectedCode(-1)} // 포커스 아웃 시 코드 에디터 모드 해제
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => setSelectedCode(index)}
                        className="cursor-pointer p-2 border rounded-md bg-gray-50"
                      >
                        <pre
                          className={`language-${code.language || language}`}
                          <code
                            className={`language-${code.language || language}`}
                            dangerouslySetInnerHTML={{
                              __html: Prism.highlight(
                                code.code,
                                Prism.languages[code.language || language],
                                code.language || language,
                              ),
                            }}
                          />
                        </pre>
                      </div>
                    )}
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
