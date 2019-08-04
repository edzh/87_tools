import React from 'react';

const errorStyle = 'border-red-light bg-red-lighter text-red-darker';
const successStyle = 'border-green-light bg-green-lighter text-green-darker';
const warningStyle = 'border-yellow-light bg-yellow-lighter text-yellow-darker';

export default function Alert({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={`p-2 mt-2 border-l-4 ${
        message.status === 'Error'
          ? errorStyle
          : message.status === 'Success'
          ? successStyle
          : message.status === 'Warning' && warningStyle
      } rounded`}
    >
      {message.message}
    </p>
  );
}
