import { useState } from 'react';

function useInput(initialValue, submitAction) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setInputValue('');
    submitAction(inputValue);
  };

  return [inputValue, handleChange, handleSubmit];
}

export default useInput;
