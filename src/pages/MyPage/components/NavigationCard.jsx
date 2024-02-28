import { ReactComponent as ArrowRight } from '../../../assets/arrow-right.svg';

const NavigationCard = ({ title, onClick }) => {
  return (
    <div className="flex justify-between items-center px-4 py-5 shadow-sm rounded-lg border border-solid border-gray-200 cursor-pointer" onClick={onClick}>
      <h3 className='font-semibold text-xl text-gray-900'>{title}</h3>
      <ArrowRight />
    </div>
  );
};

export default NavigationCard;
