import { useExitActions, useExitLead } from '../../../../store/studyStore';
import { useUserName } from '../../../../store/userStore';
import useStudyInfo from '../../../hooks/api/useStudyInfo';
import InputContainer from '../../InputContainer';
import SelectComp from '../../Select';

const ChangeLead = ({ id }) => {
  const lead = useExitLead();
  const { setLead } = useExitActions();

  const { studyInfoData } = useStudyInfo(id);
  const userName = useUserName();
  const members = studyInfoData
    ? studyInfoData.members.map(member => {
        if (member.username !== userName) {
          return member;
        }
      })
    : [];

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
