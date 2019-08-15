import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default () => {
  return (
    <div>
      <Formik
        initialValues={{
          sessionName: '',
          start: '',
          end: ''
        }}
        onSubmit={(values, action) => {
          fetch(`${apiUrl}/api/session/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: values.sessionName,
              start: values.start,
              end: values.end
            })
          });
        }}
      >
        {() => (
          <Form>
            <Field name="sessionName" className="p-2 my-2 border rounded" />
            <Field name="start" className="p-2 my-2 border rounded" />
            <Field name="end" className="p-2 my-2 border rounded" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
