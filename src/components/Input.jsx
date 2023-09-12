import React from 'react';

const Input = ({ value, type, placeholder, id, name, onChange }) => {
  return (
    <input
      className='h-10 w-full border rounded-md p-2 outline-none mt-3'
      value={value}
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
