import { useState } from 'react';
import InputContainer from '../../InputContainer';
import Input from '../../Input';
import { useEditStudyActions, useEditStudyMembers } from '../../../../store/studyStore';
import useCheckId from '../../../hooks/api/useCheckId';
import { BaekjoonIdTag } from '../../Tag';

const EditStudyMember = () => {
  const [term, setTerm] = useState('');
  const members = useEditStudyMembers();
  const { addMember } = useEditStudyActions();

  const onCheckIdSuccessCallback = data => {
    if (data.valid) {
      addMember(data.username);
    }
  };
  const { refetch } = useCheckId(term, onCheckIdSuccessCallback);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      refetch();
      setTerm('');
    }
  };

  return (
    <InputContainer title="스터디원 추가(선택)">
      <Input
        placeholder="스터디원 사용자 ID 등록하기"
        value={term}
        handleChangeValue={e => setTerm(e.target.value)}
        handleKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap gap-2">
        {members &&
          members.map((member, idx) => (
            <BaekjoonIdTag key={`member#${idx}`} type="edit" member={member}>{member}</BaekjoonIdTag>
          ))}
      </div>
    </InputContainer>
  );
};

export default EditStudyMember;
