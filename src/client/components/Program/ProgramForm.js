import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default function ProgramForm(props) {
  return (
    <div className="bg-gray-100 w-64 shadow rounded p-4">
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
            <label htmlFor="programName"></label>
            <Field
              name="programName"
              placeholder="Program Name"
              className="form"
            />
            <button className="btn hover:bg-blue-400" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
