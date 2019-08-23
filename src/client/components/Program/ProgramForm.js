import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default function ProgramForm(props) {
  return (
    <div>
      <Formik
        initialValues={{
          programName: ''
        }}
        onSubmit={(values, action) => {
          props.addProgram({
            name: values.programName,
            owner: props.user._id
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
}
