import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useFormInput } from 'utils/hooks';
import { apiUrl } from 'config';

export default ({ setEditDetails, club, sessions }) => {
  const name = useFormInput(club.name);
  const start = useFormInput(club.start);
  const end = useFormInput(club.end);
  const capacity = useFormInput(club.capacity);

  function handleSubmit(values, action) {
    fetch(`${apiUrl}/api/club/${club._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({
        name: values.clubName,
        session: values.session,
        capacity: values.capacity
      })
    }).then(() => setEditDetails(false));
  }

  return (
    <Formik
      initialValues={{
        clubName: club.name,
        session: club.session,
        capacity: club.capacity
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          name="clubName"
          placeHolder="Club Name"
          className="p-2 my-2 border rounded"
        />
        <Field component="select" name="session">
          <option>Current session ({club.session.name})</option>
          {sessions.map(session => (
            <option value={session._id}>{session.name}</option>
          ))}
        </Field>
        <Field
          name="capacity"
          placeHolder="Capacity"
          className="p-2 my-2 border rounded"
        />
        <button
          className="p-2 border rounded ml-2 bg-blue text-white hover:bg-white hover:text-black"
          type="submit"
        >
          Save Club Details
        </button>
      </Form>
    </Formik>
  );
};
