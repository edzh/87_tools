import React from 'react';
import { apiUrl } from 'config';
import { useFormInput } from '../Student/AddStudent';

export default function FamilyForm(props) {
  const name = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${apiUrl}/api/family`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name.value })
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...name} />
      <button type="submit">Create new family</button>
    </form>
  );
}
