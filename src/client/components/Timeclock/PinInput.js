import React, { useState, useRef, useEffect } from 'react';
import { Form, Formik, Field } from 'formik';

import Alert from '../Alert';
import StudentSelector from './StudentSelector';

export default function PinInput({
  submitPinTimestamp,
  addTimestampFailure,
  pinInputRef
}) {
  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="mb-4 font-normal">Timeclock</h2>
      <Formik
        initialValues={{
          pin: ''
        }}
        onSubmit={(values, { resetForm }) => {
          submitPinTimestamp(values.pin).catch(err => addTimestampFailure(err));
          resetForm({ pin: '' });
          pinInputRef.current.focus();
        }}
      >
        {({ errors }) => (
          <Form>
            <Field
              name="pin"
              autoComplete="off"
              className="border shadow-inner block p-2 text-xl rounded-t w-full"
              innerRef={pinInputRef}
            />
            <button
              className="p-2 border hover:border-blue-500 hover:bg-blue-500 hover:text-white shadow text-blue-500 bg-gray-100 border-gray-400 text-xl rounded-b w-full"
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
