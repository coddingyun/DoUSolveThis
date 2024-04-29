import { Select } from '@chakra-ui/react';

const SelectComp = ({
  value,
  handleChangeValue,
  options,
  className,
  textClassName,
  placeholder,
}) => {
  return (
    <div className={className}>
      <Select
        id="order"
        className={`h-9 border !border-gray-300 text-gray-700 font-semibold rounded-lg ${
          textClassName || '!text-xs'
        }`}
        value={value}
        onChange={handleChangeValue}
      >
        <option value="placeholder" disabled hidden selected>
          {placeholder}
        </option>
        {options &&
          options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default SelectComp;
