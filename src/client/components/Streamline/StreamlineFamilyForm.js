import React from 'react';
import { Formik, Field, Form } from 'formik';

export default function StreamlineFamilyForm({ addFamily, programId }) {
  return (
    <Formik
      initialValues={{
        familyName: ''
      }}
      onSubmit={values => {
        addFamily({
          name: values.familyName,
          program: programId
        });
      }}
    >
      {() => (
        <Form>
          <Field name="familyName" className="border rounded" />
          <button type="submit">Create Family</button>
        </Form>
      )}
    </Formik>
  );
}
