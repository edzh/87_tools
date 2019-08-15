import React from 'react';

export default props => {
  return (
    <h2 className="p-4 border-b font-normal rounded-t bg-grey-darkest text-white shadow">
      {props.children}
    </h2>
  );
};
