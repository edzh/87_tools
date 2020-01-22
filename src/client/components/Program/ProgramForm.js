import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default function ProgramForm({ setShowForm, addProgram, user }) {
  return (
    <div className="w-64 form p-2 h-24 mt-2">
      <Formik
        initialValues={{
          programName: ''
        }}
        onSubmit={(values, action) => {
          addProgram({
            name: values.programName,
            owner: user._id
          });
        }}
      >
        {() => (
          <Form>
            <label htmlFor="programName"></label>
            <Field
              name="programName"
              placeholder="Program Name"
              className="form-input w-full"
            />
            <div className="flex">
              <button className="btn hover:bg-blue-400" type="submit">
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="ml-auto text-blue-500 hover:text-blue-400"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
