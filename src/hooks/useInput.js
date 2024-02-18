import { useState } from 'react';

const useInput = initialValue => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  return [inputValue, handleChange];
};

export default useInput;
