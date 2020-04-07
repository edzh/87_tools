import React from 'react';
import { useSelector } from 'react-redux';
import { useFormInput } from 'utils/hooks';
import { Redirect } from 'react-router';
import Alert from 'client/components/Alert';

export default function(props) {
  const email = useFormInput('');
  const password = useFormInput('');
  const error = useSelector(state => state.user.error);

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
        <input
          required
          className="p-2 mb-4 border rounded"
          type="text"
          {...email}
        />
        <label className="block">Password</label>
        <input
          required
          className="p-2 mb-4 border rounded"
          type="password"
          {...password}
        />
        <button
          className="block p-2 border rounded bg-white hover:bg-blue-500 hover:text-white transition duration-100"
          type="submit"
        >
          Sign In
        </button>
      </form>
      {error && <Alert alert={{ type: 'error', message: error }} />}
    </div>
  );
}
