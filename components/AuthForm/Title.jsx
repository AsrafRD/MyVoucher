import React from 'react';

const Title = ({ children }) => {
  return (
    <h1 className="text-2xl font-bold mb-6 text-center">
      {children}
    </h1>
  );
};

export default Title;
