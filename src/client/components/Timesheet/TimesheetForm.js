import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { format } from 'date-fns';
import { Formik, Form, Field } from 'formik';

export default function Timesheet({ currentSession, addTimesheet }) {
  return (
    <div className="p-8 form ml-2">
      <h3 className="mb-2 text-lg font-bold">New Timesheet</h3>
      <Formik
        initialValues={{
          date: `${format(new Date(), 'YYYY-MM-DD')}T04:00:00.000Z`,
          io: ''
        }}
        onSubmit={(values, actions) => {
          addTimesheet({
            date: values.date,
            io: values.io,
            session: currentSession.item._id,
            program: currentSession.item.program
          });
        }}
      >
        {() => (
          <Form>
            <Field className="form-input" name="date" />
            <Field className="form-input" name="io" component="select">
              <option value="">---</option>
              <option value="in">Sign in</option>
              <option value="out">Sign out</option>
            </Field>
            <button className="btn hover:bg-blue-400" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
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
