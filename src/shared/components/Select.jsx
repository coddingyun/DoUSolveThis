import React from 'react';
import { Select } from '@chakra-ui/react';

const SelectComp = ({
  value,
  handleChangeValue,
  options,
  className,
  textClassName,
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
        {options &&
          options.map((option, idx) => (
            <option key={option} value={idx}>
              {option}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default SelectComp;
