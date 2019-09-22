import React from 'react';

const errorStyle = 'border-red-400 bg-red-200 text-red-800';
const successStyle = 'border-green-400 bg-green-200 text-green-800';
const warningStyle = 'border-yellow-400 bg-yellow-200 text-yellow-800';

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
