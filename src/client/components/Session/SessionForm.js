import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default function SessionForm(props) {
  return (
    <div>
      <Formik
        initialValues={{
          sessionName: '',
          start: '',
          end: ''
        }}
        onSubmit={(values, action) => {
          console.log({ values });
          props.addSession({
            name: values.sessionName,
            start: values.start,
            end: values.end,
            program: props.programId
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
}
