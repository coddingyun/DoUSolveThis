import { Button } from '@chakra-ui/react';
import { ReactComponent as Checked } from '../../../assets/check.svg'
import { ReactComponent as NotChecked } from '../../../assets/notChecked.svg'

const CheckBoxButton = ({ title, isSelected, onClick }) => {
  const style = {
    selected: '!border-brand-300 !bg-brand-50 !text-brand-700',
    notSelected: '!border-gray-300 !bg-white !text-gray-700',
  };
  return (
    <Button
      className={`flex gap-2 !p border !text-sm !font-semibold rounded-lg ${isSelected ? style.selected : style.notSelected}`}
      onClick={onClick}
    >
      {isSelected ? <Checked /> : <NotChecked />}
      {title}
    </Button>
  );
};

export default CheckBoxButton;
