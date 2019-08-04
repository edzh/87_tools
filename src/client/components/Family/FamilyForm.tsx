import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useFormInput } from 'utils/hooks';

export default function FamilyForm(props) {
  const name = useFormInput('');
  const [newFamily, setNewFamily] = useState({ redirect: false, id: '' });

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/family`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name.value })
    })
      .then(response => response.json())
      .then(json => {
        setNewFamily({ redirect: true, id: json.data._id });
      });
  }

  if (newFamily.redirect === true) {
    return <Redirect to={`/family/id/${newFamily.id}`} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="p-2 border rounded" type="text" {...name} />
      <button type="submit">Create new family</button>
    </form>
  );
}
