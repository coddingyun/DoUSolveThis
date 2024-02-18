import React from 'react';

const InputContainer = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default InputContainer;
