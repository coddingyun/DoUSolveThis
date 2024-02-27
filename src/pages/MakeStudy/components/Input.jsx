import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  handleChangeValue,
  handleKeyDown,
}) => {
  return (
    <input
      type={type}
      className="w-full h-10 p-4 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg"
      placeholder={placeholder}
      value={value}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
      required
    />
  );
};

export default Input;
