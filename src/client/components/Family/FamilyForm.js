import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useFormInput } from 'utils/hooks';

export default function FamilyForm(props) {
  const name = useFormInput('');
  const [newFamily, setNewFamily] = useState({ redirect: false, id: '' });
  console.log(props.programId);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/family`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name.value, program: props.programId })
    })
      .then(response => response.json())
      .then(json => {
        setNewFamily({ redirect: true, id: json.data._id });
      });
  }

  if (newFamily.redirect === true) {
    return <Redirect to={`/family/${newFamily.id}`} />;
  }

  return (
    <div>
      <h3 className="text-lg mx-2 mt-2 font-bold text-gray-600">
        Create New Family
      </h3>
      <div className="p-8 form mt-2 w-64 rounded">
        <form onSubmit={handleSubmit}>
          <input
            className="form-input py-1 px-2 my-2"
            placeholder="Name"
            type="text"
            {...name}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
