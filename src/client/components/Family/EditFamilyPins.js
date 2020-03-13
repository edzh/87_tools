import React from 'react';
import { useFormInput } from 'utils/hooks';

export default ({
  currentFamily,
  setMessage,
  editPickups,
  updateCurrentFamily,
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
      const newPins = [
        ...currentFamily.byId[currentFamily.allIds].pickups,
        { name: pickupName.value, pin: pin.value }
      ];

      updateCurrentFamily({
        ...currentFamily.byId[currentFamily.allIds],
        pickups: newPins
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
          className="p-1 my-2 -ml-1 border rounded block bg-blue-500 text-white hover:bg-white hover:text-black"
          type="submit"
        >
          Add Pin
        </button>
      </form>
    </div>
  );
};
