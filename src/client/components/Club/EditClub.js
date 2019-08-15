import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useFormInput } from 'utils/hooks';
import { apiUrl } from 'config';

export default ({ setEditDetails, club }) => {
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
        name: values.name,
        start: values.start,
        end: values.end,
        capacity: values.capacity
      })
    }).then(() => setEditDetails(false));
  }

  return (
    <>
      <Formik
        initialValues={{
          clubName: club.name,
          start: club.start,
          end: club.end,
          capacity: club.capacity
        }}
      >
        <Form>
          <Field
            name="clubName"
            placeHolder="Club Name"
            className="p-2 my-2 border rounded"
          />
          <Field component="select" name="session" />
          <Field
            name="capacity"
            placeHolder="Club Name"
            className="p-2 my-2 border rounded"
          />
        </Form>
      </Formik>

      <form className="m-4" onSubmit={handleSubmit}>
        <p>Club Name</p>
        <input className="p-2 my-2 border rounded" type="text" {...name} />
        <input className="p-2 my-2 border rounded" type="date" {...start} />
        <input className="p-2 my-2 border rounded" type="date" {...end} />
        <input
          className="p-2 my-2 border rounded"
          type="number"
          {...capacity}
        />
        <button
          className="p-2 border rounded ml-2 bg-blue text-white hover:bg-white hover:text-black"
          type="submit"
        >
          Save Club Details
        </button>
      </form>
    </>
  );
};
