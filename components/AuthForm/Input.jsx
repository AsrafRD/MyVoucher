import React from 'react';

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 border rounded w-full"
      required
    />
  );
};

export default Input;
