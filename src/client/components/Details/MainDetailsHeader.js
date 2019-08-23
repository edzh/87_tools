import React from 'react';

export default function MainDetailsHeader(props) {
  return (
    <h2 className="p-4 border-b font-normal rounded-t bg-grey-darkest text-white shadow">
      {props.children}
    </h2>
  );
}
