import React from 'react';

const errorStyle = 'border-red-light bg-red-lighter text-red-darker';
const successStyle = 'border-green-light bg-green-lighter text-green-darker';
const warningStyle = 'border-yellow-light bg-yellow-lighter text-yellow-darker';

export default function Alert({ alert }) {
  if (!alert) {
    return null;
  }

  return (
    <p
      className={`p-2 mt-2 border-l-4 ${
        alert.type === 'error'
          ? errorStyle
          : alert.type === 'success'
          ? successStyle
          : alert.type === 'warning' && warningStyle
      } rounded`}
    >
      {alert.message}
    </p>
  );
}
