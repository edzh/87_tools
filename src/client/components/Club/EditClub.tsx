import React, { useState, useEffect } from 'react';

import { useFormInput } from 'utils/hooks';

export default ({ setEditDetails, club }) => {
  const name = useFormInput(club.name);
  const start = useFormInput(club.start);
  const end = useFormInput(club.end);
  const capacity = useFormInput(club.capacity);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/club/${club._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({
        name: name.value,
        start: start.value,
        end: end.value,
        capacity: capacity.value
      })
    }).then(() => setEditDetails(false));
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <p>Club Name</p>
      <input className="p-2 my-2 border rounded" type="text" {...name} />
      <input className="p-2 my-2 border rounded" type="date" {...start} />
      <input className="p-2 my-2 border rounded" type="date" {...end} />
      <input className="p-2 my-2 border rounded" type="number" {...capacity} />
      <button
        className="p-2 border rounded ml-2 bg-blue text-white hover:bg-white hover:text-black"
        type="submit"
      >
        Save Club Details
      </button>
    </form>
  );
};
