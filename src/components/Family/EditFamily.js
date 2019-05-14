import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';

import { useFormInput } from '../Student/AddStudent';

export default ({ setEdit, family }) => {
  const name = useFormInput(family.name);
  const [pickups, setPickups] = useState(family.pickups);

  function handleChange(e, field, _index) {
    const newPickups = pickups.map((pickup, index) => {
      if (index !== _index) return pickup;

      return { ...pickup, [field]: e.target.value };
    });

    setPickups(newPickups);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${apiUrl}/api/family/${family._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        pickups: pickups
      })
    }).then(() => setEdit(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...name} />
      {pickups.map((pickup, index) => (
        <div key={pickup.pin}>
          <input
            type="text"
            value={pickup.name}
            onChange={e => handleChange(e, 'name', index)}
          />
          <input
            type="number"
            value={pickup.pin}
            onChange={e => handleChange(e, 'pin', index)}
          />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
};
