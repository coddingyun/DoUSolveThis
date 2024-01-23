import React from 'react';
import { Select } from '@chakra-ui/react';

const SelectComp = ({ value, handleChangeValue, options, className }) => {
  return (
    <div className={className}>
      <Select
        id="order"
        className="h-9 border !border-gray-300 text-gray-700 !text-xs font-semibold rounded-lg"
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
