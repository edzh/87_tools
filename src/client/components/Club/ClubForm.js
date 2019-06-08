import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useFormInput } from 'utils/hooks';

export default () => {
  const name = useFormInput('');
  const day = useFormInput('');
  const [newClub, setNewClub] = useState({ redirect: false, id: '' });

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/club`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({
        name: name.value,
        day: day.value
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create club!');
        }

        return response.json();
      })
      .then(json => {
        setNewClub({ redirect: true, id: json.data._id });
      });
  }

  if (newClub.redirect === true) {
    return <Redirect to={`/club/id/${newClub.id}`} />;
  }

  return (
    <div className="shadow-md border rounded p-4">
      <form onSubmit={handleSubmit}>
        <h2>New Club</h2>
        <div className="mb-4">
          <label>Name</label>
          <input
            className="border rounded p-1 shadow block"
            type="text"
            {...name}
          />
        </div>
        <div className="mb-4">
          <label>Day</label>
          <select className="border rounded p-1 shadow block" {...day}>
            <option value="">---</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
