import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { useFetchPin } from 'utils/hooks';

import { useFormInput } from '../Student/AddStudent';

export default ({ setEditDetails, family }) => {
  const name = useFormInput(family.name);
  const pickupName = useFormInput('');
  const pin = useFormInput('');
  const [pickups, setPickups] = useState(family.pickups);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/family/${family._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({ name: name.value })
    }).then(() => setEditDetails(false));
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <p className="font-bold">Family Name</p>
      <input className="p-2 my-2 border rounded" type="text" {...name} />
      <button
        className="p-2 border rounded ml-2 bg-blue text-white hover:bg-white hover:text-black"
        type="submit"
      >
        Save Name
      </button>
    </form>
  );
};
