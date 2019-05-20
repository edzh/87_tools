import React, { useState } from 'react';
import { useFormInput } from 'hooks';
import { Redirect } from 'react-router';

export default function(props) {
  const email = useFormInput('');
  const password = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();

    props.signIn(email.value, password.value);
  }

  if (props.isAuthenticated) {
    return <Redirect to="/timesheet" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" {...email} />
        <input type="passsword" {...password} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
