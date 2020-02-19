import React, { useState } from 'react';
import Alert from '../Alert';

import EditFamilyPins from './EditFamilyPins';

export default ({
  currentFamily,
  editPickups,
  setEditPickups,
  updateCurrentFamily
}) => {
  const [message, setMessage] = useState('');
  if (!currentFamily.allIds) return null;

  async function handleRemove(pinToRemove) {
    const updatedPins = currentFamily.byId[currentFamily.allIds].pickups.filter(
      pickup => pickup.pin !== pinToRemove
    );

    updateCurrentFamily({
      ...currentFamily.byId[currentFamily.allIds],
      pickups: updatedPins
    });
  }

  return (
    <div className="border rounded shadow-md my-4">
      <div className="flex border-b">
        <h3 className="m-4">Pickups</h3>
        <button
          className={`${
            editPickups ? 'bg-blue-500 text-white' : 'bg-white'
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
        {currentFamily.byId[currentFamily.allIds].pickups.map(
          (pickup, index) => (
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
          )
        )}
      </div>
      {editPickups && (
        <EditFamilyPins
          currentFamily={currentFamily}
          updateCurrentFamily={updateCurrentFamily}
          editPickups={editPickups}
          setEditPickups={setEditPickups}
          setMessage={setMessage}
        />
      )}
      <Alert message={message} />
    </div>
  );
};
