import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default function ProgramForm(props) {
  return (
    <div className="bg-gray-100 w-64 rounded p-4">
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
              className="p-2 mb-2 rounded w-full"
            />
            <button
              className="bg-blue-200 text-blue-800 p-1 rounded ml-auto block"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
