import React from 'react';

export default props => {
  return (
    <div className="fixed pin w-full h-full shadow-lg opacity-100">
      <div className="bg-black opacity-25 w-full h-full" />
      <div className="pin absolute mx-auto items-center flex w-1/2 z-10">
        {props.children}
      </div>
    </div>
  );
};
