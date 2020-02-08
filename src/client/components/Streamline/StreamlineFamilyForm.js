import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { addFamily } from '../../actions/familyActions';

export default function StreamlineFamilyForm({
  programId,
  setCreateStudent,
  setCreateFamily
}) {
  const dispatch = useDispatch();
  const families = useSelector(state => state.families.items);
  const recentFamily = useSelector(state => state.families.recentFamily);

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
      {recentFamily && families.byId[recentFamily] && (
        <div>
          <Link
            className="text-blue-500 hover:text-blue-400"
            to={`/family/${recentFamily}`}
          >
            {families.byId[recentFamily].name}
          </Link>
          {' has been created'}
        </div>
      )}
      {recentFamily && (
        <button
          className="btn"
          type="button"
          onClick={() => {
            setCreateFamily(false);
            setCreateStudent(true);
          }}
        >
          Create Student
        </button>
      )}
    </div>
  );
}
