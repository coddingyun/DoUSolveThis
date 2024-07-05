import { useEffect } from 'react';
import { useExitActions, useExitLead } from '../../../../store/studyStore';
import { useUserName } from '../../../../store/userStore';
import InputContainer from '../../InputContainer';
import SelectComp from '../../Select';

const ChangeLead = ({ studyInfoData }) => {
  const lead = useExitLead();
  const { setLead } = useExitActions();

  const userName = useUserName();
  const members =
    studyInfoData &&
    studyInfoData.members &&
    studyInfoData.members.filter(member => member.username !== userName);

  useEffect(() => {
    if (members && members[0]) {
      setLead(members[0]);
    }
  }, [members]);

  return (
    <InputContainer>
      <SelectComp
        value={lead.username}
        handleChangeValue={e =>
          setLead(
            members.filter(member => {
              if (member.username === e.target.value) {
                return member;
              }
            }),
          )
        }
        options={members.map(member => member.username)}
      />
    </InputContainer>
  );
};

export default ChangeLead;
