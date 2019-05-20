import React, { useState } from 'react';
import { Redirect } from 'react-router';

import { useFormInput } from 'hooks';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" {...email} />
        <input type="passsword" {...password} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
