import React from 'react';

export default ({ currentTimesheet }) => {
  if (currentTimesheet.item.io === 'in') {
    return (
      <div className="text-sm border-b flex border-gray-400 px-4">
        <p className="py-1 font-bold w-24">Time</p>
        <p className="py-1 font-bold w-64">Name</p>
        <p className="py-1 ml-4 font-bold w-64">Club</p>
        <p className="py-1 ml-4 font-bold w-16">Fob</p>
      </div>
    );
  }

  if (currentTimesheet.item.io === 'out') {
    return (
      <div className="text-sm border-b flex border-gray-400 px-4">
        <p className="py-1 font-bold w-24">Time</p>
        <p className="py-1 font-bold w-64">Name</p>
        <p className="py-1 ml-4 font-bold w-64">Pickup</p>
      </div>
    );
  }
};
