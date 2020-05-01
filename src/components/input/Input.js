import React, { useCallback } from 'react';

const Input = ({ onChange = () => {}, ...props }) => {
  const handleOnchange = useCallback((e) => onChange(e.target.value), [
    onChange,
  ]);

  return <input {...props} onChange={handleOnchange}></input>;
};

export default Input;
