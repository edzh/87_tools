import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { useFetchPin } from 'hooks';
import Alert from '../Alert';

import { useFormInput } from '../Student/AddStudent';

export default ({ edit, family }) => {
  const pickupName = useFormInput('');
  const pin = useFormInput('');
  const [pickups, setPickups] = useState(family.pickups);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPickups(family.pickups);
  }, [family]);

  async function handleAddPin(e) {
    e.preventDefault();

    const pinCheck = await fetch(`${apiUrl}/api/pin/${pin.value}`)
      .then(response => response.json())
      .then(json => json.data)
      .catch(() => setMessage({ status: 'Success', message: 'Pin added.' }));

    if (!pinCheck) {
      const newPins = [...pickups, { name: pickupName.value, pin: pin.value }];

      fetch(`${apiUrl}/api/family/${family._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pickups: newPins })
      })
        .then(() => setPickups(newPins))
        .then(() => {
          pin.setValue('');
          pickupName.setValue('');
        });
    } else {
      setMessage({
        status: 'Error',
        message: `${pinCheck.name} is using this pin.`
      });
    }
  }

  function handleRemove(pinToRemove) {
    const updatedPins = pickups.filter(pickup => pickup.pin !== pinToRemove);

    fetch(`${apiUrl}/api/family/${family._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pickups: updatedPins })
    })
      .then(() => setPickups(updatedPins))
      .then(() =>
        setMessage({
          status: 'Warning',
          message: `${pinToRemove} has been removed!`
        })
      );
  }

  return (
    <div>
      <div className="flex">
        <p className="font-bold w-1/3">Name</p>
        <p className="font-bold w-1/3">Pin</p>
      </div>
      {pickups &&
        pickups.map((pickup, index) => (
          <div className="flex" key={pickup.pin}>
            <p className="text-sm w-1/3">{pickup.name}</p>
            <p className="text-sm w-1/3">{pickup.pin}</p>
            {edit && (
              <button
                className="text-sm"
                type="button"
                onClick={() => handleRemove(pickup.pin)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      {edit && (
        <form onSubmit={handleAddPin}>
          <input
            className="p-2 text-sm border"
            type="text"
            placeholder="Name of pickup adult..."
            {...pickupName}
          />
          <input
            className="p-2 text-sm border"
            type="number"
            placeholder="PIN"
            {...pin}
          />
          <button className="text-sm p-1 border" type="submit">
            Add Pin
          </button>
        </form>
      )}
      <Alert message={message} />
    </div>
  );
};
