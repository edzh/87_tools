import React from 'react';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from 'config';

export default function SessionForm(props) {
  return (
    <div>
      <h3 className="text-lg mx-2 mt-2 font-bold text-gray-600">
        Create New Session
      </h3>
      <div className="p-8 w-64 mt-2 form">
        <Formik
          initialValues={{
            sessionName: '',
            start: '',
            end: ''
          }}
          onSubmit={(values, action) => {
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
              <label htmlFor="sessionName"></label>
              <Field
                name="sessionName"
                placeholder="Session Name"
                className="form-input block w-full"
              />
              <label htmlFor="start"></label>
              <Field
                name="start"
                placeholder="Start Date"
                className="form-input block w-full"
              />
              <label htmlFor="end"></label>
              <Field
                name="end"
                placeholder="End Date"
                className="form-input block w-full"
              />
              <button className="btn block" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
