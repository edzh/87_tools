import React, { useState, useEffect } from 'react';
import config from 'config';
import Alert from '../Alert';

import EditFamilyPins from './EditFamilyPins';

export default ({ family, editPickups, setEditPickups }) => {
  const [message, setMessage] = useState('');
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    setPickups(family.pickups);
  }, [family]);

  function handleRemove(pinToRemove) {
    const updatedPins = pickups.filter(pickup => pickup.pin !== pinToRemove);

    fetch(`${config.apiUrl}/api/family/${family._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.token}`
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
    <div className="border rounded shadow-md my-4">
      <div className="flex border-b">
        <h3 className="m-4">Pickups</h3>
        <button
          className={`${
            editPickups ? 'bg-blue text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditPickups(!editPickups)}
        >
          Edit
        </button>
      </div>
      <div className="m-4">
        <div className="flex">
          <p className="font-bold w-64">Name</p>
          <p className="font-bold w-32">Pin</p>
        </div>
        {pickups &&
          pickups.map((pickup, index) => (
            <div className="flex my-4" key={pickup.pin}>
              <p className="w-64">{pickup.name}</p>
              <p className="w-16">{pickup.pin}</p>
              {editPickups ? (
                <button
                  className=""
                  type="button"
                  onClick={() => handleRemove(pickup.pin)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
      </div>
      {editPickups && (
        <EditFamilyPins
          family={family}
          pickups={pickups}
          setPickups={setPickups}
          editPickups={editPickups}
          setEditPickups={setEditPickups}
          setMessage={setMessage}
        />
      )}
      <Alert message={message} />
    </div>
  );
};
