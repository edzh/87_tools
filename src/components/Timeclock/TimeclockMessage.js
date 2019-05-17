import React from 'react';

export default function TimeclockError(props) {
  if (!props.message) {
    return null;
  }

  return (
    <p className="p-2 mt-2 border-l-4 border-red-light bg-red-lighter rounded text-red-darker">
      {props.message}
    </p>
  );
}
