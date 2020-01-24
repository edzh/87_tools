import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { addFamily } from '../../actions/familyActions';

export default function StreamlineFamilyForm({ programId }) {
  const dispatch = useDispatch();

  return (
    <div className="form p-8">
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
              className="form-input block"
            />
            <button className="btn block" type="submit">
              Create Family
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
