import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { format } from 'date-fns';
import { Formik, Form, Field } from 'formik';

export default function Timesheet({ sessionId, addTimesheet }) {
  return (
    <Formik
      initialValues={{
        date: `${format(new Date(), 'YYYY-MM-DD')}T04:00:00.000Z`,
        io: ''
      }}
      onSubmit={(values, actions) => {
        addTimesheet({
          date: values.date,
          io: values.io,
          session: sessionId
        });
      }}
    >
      {() => (
        <Form>
          <Field name="date" />
          <Field name="io" component="select">
            <option value="">---</option>
            <option value="in">Sign in</option>
            <option value="out">Sign out</option>
          </Field>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}
