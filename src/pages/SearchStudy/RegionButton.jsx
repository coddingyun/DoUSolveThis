/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactComponent as Check } from '../../assets/check.svg';
import area from '../../constants/area';

const RegionContainer = ({
  title,
  selectedArea,
  setSelectedArea,
  setSelectedDetailArea,
}) => {
  const style = selectedArea === title ? 'bg-gray-50' : '';

  return (
    <div
      className={`flex flex-row justify-between px-3.5 py-2.5 text-gray-900 ${style} hover:bg-gray-50`}
      onClick={() => {
        setSelectedArea(title);
        setSelectedDetailArea('전체');
      }}
    >
      {title}
      {selectedArea === title && <Check />}
    </div>
  );
};

const DetailRegionContainer = ({
  title,
  selectedDetailArea,
  setSelectedDetailArea,
}) => {
  const style = selectedDetailArea === title ? 'bg-gray-50' : '';
  return (
    <div
      className={`flex flex-row justify-between px-3.5 py-2.5 text-gray-900 ${style} hover:bg-gray-50`}
      onClick={() => {
        setSelectedDetailArea(title);
      }}
    >
      {title}
      {selectedDetailArea === title && <Check />}
    </div>
  );
};

const RegionButton = ({
  studyArea,
  setStudyArea,
  className,
  disabled = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedArea, setSelectedArea] = useState('서울특별시');
  const [selectedDetailArea, setSelectedDetailArea] = useState('전체');

  useEffect(() => {
    setStudyArea({
      area: '지역',
      city: '선택',
    });
  }, []);

  const handleClickApply = () => {
    setStudyArea({
      area: selectedArea,
      city: selectedDetailArea,
    });
    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        className={`h-9 border !border-gray-300 !bg-white !text-gray-700 rounded-lg ${
          className || '!text-xs text-center font-semibold'
        }`}
        isDisabled={disabled}
      >
        {`${studyArea.area} ${studyArea.city}`}
      </Button>

      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center text-grey-900 font-semibold">
            지역
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <h4 className="text-gray-700 text-sm font-medium mb-2">지역</h4>
                <div className="border border-solid border-gray-200 rounded-lg h-[320px] overflow-auto">
                  {Object.keys(area).map(item => (
                    <RegionContainer
                      title={item}
                      selectedArea={selectedArea}
                      setSelectedArea={setSelectedArea}
                      setSelectedDetailArea={setSelectedDetailArea}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-700 text-sm font-medium mb-2">
                  상세 지역
                </div>
                <div className="border border-solid border-gray-200 rounded-lg h-[320px] overflow-auto">
                  <DetailRegionContainer
                    title="전체"
                    selectedDetailArea={selectedDetailArea}
                    setSelectedDetailArea={setSelectedDetailArea}
                  />
                  {area[selectedArea] &&
                    area[selectedArea].map(item => (
                      <DetailRegionContainer
                        title={item}
                        selectedDetailArea={selectedDetailArea}
                        setSelectedDetailArea={setSelectedDetailArea}
                      />
                    ))}
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              className="!rounded-lg border border-solid !border-gray-300 !bg-white text-gray-700 font-semibold mr-1"
              variant="outlined"
              onClick={onClose}
            >
              취소하기
            </Button>
            <Button
              className="!bg-brand-600 !rounded-lg !text-white"
              onClick={handleClickApply}
            >
              적용하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegionButton;
