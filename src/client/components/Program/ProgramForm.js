import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default props => {
  return (
    <div>
      <Formik
        initialValues={{
          programName: ''
        }}
        onSubmit={(values, action) => {
          fetch(`${apiUrl}/api/program/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: values.programName,
              owner: props.user._id
            })
          });
        }}
      >
        {() => (
          <Form>
            <Field name="programName" className="p-2 my-2 border rounded" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
