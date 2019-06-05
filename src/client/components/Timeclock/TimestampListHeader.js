import React from 'react';

export default ({ timesheet }) => {
  if (timesheet.io === 'in') {
    return (
      <div className="text-sm border-b flex border-grey-light px-4">
        <p className="py-1 font-bold w-24">Time</p>
        <p className="py-1 font-bold w-64">Name</p>
        <p className="py-1 ml-4 font-bold w-64">Club</p>
        <p className="py-1 ml-4 font-bold w-16">Fob</p>
      </div>
    );
  }

  if (timesheet.io === 'out') {
    return (
      <div className="text-sm border-b flex border-grey-light px-4">
        <p className="py-1 font-bold w-24">Time</p>
        <p className="py-1 font-bold w-64">Name</p>
        <p className="py-1 ml-4 font-bold w-64">Pickup</p>
      </div>
    );
  }
};
