import React from 'react';

export default function Modal(props) {
  return (
    <div
      className="fixed overflow-auto inset-0 z-50 flex"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded border">
        {props.children}
      </div>
    </div>
  );
}
