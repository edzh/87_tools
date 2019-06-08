import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { useFetchPin } from 'utils/hooks';

import { useFormInput } from '../Student/AddStudent';

export default ({
  family,
  pickups,
  setPickups,
  setMessage,
  editPickups,
  setEditPickups
}) => {
  const pickupName = useFormInput('');
  const pin = useFormInput('');

  async function handleAddPin(e) {
    e.preventDefault();

    const pinCheck = await fetch(
      `${process.env.REACT_APP_API_URL}/api/pin/${pin.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`
        }
      }
    )
      .then(response => response.json())
      .then(json => json.data)
      .catch(() => setMessage({ status: 'Success', message: 'Pin added.' }));

    if (!pinCheck) {
      const newPins = [...pickups, { name: pickupName.value, pin: pin.value }];

      fetch(`${process.env.REACT_APP_API_URL}/api/family/${family._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('id_token')}`
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

  return (
    <div className="m-4">
      <form className="" onSubmit={handleAddPin}>
        <input
          className="p-2 mr-1 -ml-1 w-64 text-sm border rounded"
          type="text"
          placeholder="Name of pickup adult..."
          {...pickupName}
        />
        <input
          className="p-2 w-32 text-sm border rounded"
          type="number"
          placeholder="PIN"
          {...pin}
        />
        <button
          className="p-1 my-2 -ml-1 border rounded block bg-blue text-white hover:bg-white hover:text-black"
          type="submit"
        >
          Add Pin
        </button>
      </form>
    </div>
  );
};
