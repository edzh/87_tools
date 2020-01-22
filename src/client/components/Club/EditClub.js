import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useFormInput } from 'utils/hooks';
import { apiUrl } from 'config';

export default function EditClub({
  updateCurrentClub,
  setEditDetails,
  currentClub,
  sessions
}) {
  function handleSubmit(values, action) {
    const { session, capacity } = values;
    updateCurrentClub({
      ...currentClub,
      name: values.name,
      session,
      capacity
    });
  }

  if (!currentClub) return null;

  return (
    <Formik
      initialValues={{
        clubName: currentClub.name,
        session: currentClub.session,
        capacity: currentClub.capacity
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          name="clubName"
          placeholder="Club Name"
          className="p-2 my-2 border rounded"
        />
        <Field component="select" name="session">
          <option>Current session ({currentClub.session.name})</option>
          {sessions.allIds.map(sessionId => (
            <option value={sessionId}>{sessions.byId[sessionId].name}</option>
          ))}
        </Field>
        <Field
          name="capacity"
          placeholder="Capacity"
          className="p-2 my-2 border rounded"
        />
        <button
          className="p-2 border rounded ml-2 bg-blue-500 text-white hover:bg-white hover:text-black"
          type="submit"
        >
          Save Club Details
        </button>
      </Form>
    </Formik>
  );
}
