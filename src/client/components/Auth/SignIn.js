import React from 'react';
import { useFormInput } from 'utils/hooks';
import { Redirect } from 'react-router';

export default function(props) {
  const email = useFormInput('');
  const password = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();

    props.signIn(email.value, password.value);
  }

  if (props.isAuthenticated) {
    return <Redirect to="/program" />;
  }

  return (
    <div className="p-4 border shadow-md w-64">
      <h2 className="mb-4">Sign In</h2>
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
          Sign In
        </button>
      </form>
    </div>
  );
}
