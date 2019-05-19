import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { useFetchPin } from 'hooks';

import { useFormInput } from '../Student/AddStudent';

export default ({ setEdit, family }) => {
  const name = useFormInput(family.name);
  const pickupName = useFormInput('');
  const pin = useFormInput('');
  const [pickups, setPickups] = useState(family.pickups);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${apiUrl}/api/family/${family._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name.value })
    }).then(() => setEdit(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-bold text-sm">Name</p>
      <input className="block p-2 border rounded" type="text" {...name} />
      <button className="block p-2 border " type="submit">
        Save Family
      </button>
    </form>
  );
};
