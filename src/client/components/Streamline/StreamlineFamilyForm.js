import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { addFamily } from '../../actions/familyActions';

export default function StreamlineFamilyForm({ programId }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        familyName: ''
      }}
      onSubmit={values => {
        dispatch(
          addFamily({
            name: values.familyName,
            program: programId
          })
        );
      }}
    >
      {() => (
        <Form>
          <Field
            placeholder="Family Name"
            name="familyName"
            className="border rounded"
          />
          <button className="btn" type="submit">
            Create Family
          </button>
        </Form>
      )}
    </Formik>
  );
}
