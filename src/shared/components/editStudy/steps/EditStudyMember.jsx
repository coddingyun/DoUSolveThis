import { useState } from 'react';
import InputContainer from '../../InputContainer';
import Input from '../../Input';
import { useEditStudyActions, useEditStudyMembers } from '../../../../store/studyStore';
import useCheckId from '../../../hooks/api/useCheckId';
import { BaekjoonIdTag } from '../../Tag';

const EditStudyMember = () => {
  const [term, setTerm] = useState('');
  const [isValid, setIsValid] = useState(true);
  const members = useEditStudyMembers();
  const { addMember } = useEditStudyActions();

  const onCheckIdSuccessCallback = data => {
    if (data.valid) {
      addMember(data);
      setTerm('');
    } else {
      setIsValid(false);
    }
  };
  const { refetch } = useCheckId(term, onCheckIdSuccessCallback);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  const borderStyle = !isValid ? '!border-error-300' : 'border-gray-300';

  return (
    <InputContainer title="스터디원 추가(선택)">
      <Input
        placeholder="스터디원 사용자 ID 등록하기"
        className={borderStyle}
        value={term}
        handleChangeValue={e => {
          setTerm(e.target.value);
          if (!isValid) {
            setIsValid(true);
          }
        }}
        handleKeyDown={handleKeyDown}
      />
      {!isValid && (
          <span className="text-sm text-error-500">일치하는 ID가 없습니다</span>
        )}
      <div className="flex flex-wrap gap-2">
        {members &&
          members.map((member, idx) => (
            <BaekjoonIdTag key={`member#${idx}`} type="edit" member={member}>{member.username}</BaekjoonIdTag>
          ))}
      </div>
    </InputContainer>
  );
};

export default EditStudyMember;
