import React, { useState } from 'react';
import { Redirect } from 'react-router';

import { useFormInput } from 'utils/hooks';

export default function(props) {
  const email = useFormInput('');
  const password = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();

    props.signUp(email.value, password.value);
  }

  if (props.isAuthenticated) {
    return <Redirect to="/timesheet" />;
  }

  return (
    <div className="p-4 border shadow-md w-64">
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label className="block">Email</label>
        <input className="p-2 mb-4 border rounded" type="text" {...email} />
        <label className="block">Password</label>
        <input
          className="p-2 mb-4 border rounded"
          type="password"
          {...password}
        />
        <button className="block p-2 border rounded" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
