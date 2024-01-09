import React from 'react';

const Select = ({ value, handleChangeValue, options }) => {
  return (
    <select
      id="order"
      className="h-9 border border-gray-300 text-gray-700 font-semibold text-xs rounded-lg focus:outline-none block w-24 px-1.5"
      value={value}
      onChange={handleChangeValue}
    >
      {options &&
        options.map((option, idx) => (
          <option key={option} value={idx + 1}>
            {option}
          </option>
        ))}
    </select>
  );
};

export default Select;
