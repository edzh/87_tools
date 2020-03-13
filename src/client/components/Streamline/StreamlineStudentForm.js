import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { addStudent } from '../../actions/studentActions';
import FamilyInput from './FamilyInput';

export default function StreamlineStudentForm({ programId }) {
  const dispatch = useDispatch();
  const recentFamily = useSelector(state => state.families.recentFamily);
  const recentStudent = useSelector(state => state.students.recentStudent);
  const students = useSelector(state => state.students.items);

  return (
    <div className="form p-8">
      <Formik
        initialValues={{
          studentName: '',
          grade: '',
          pin: '',
          family: recentFamily ? recentFamily : ''
        }}
        onSubmit={values => {
          dispatch(
            addStudent({
              name: values.studentName,
              grade: values.grade,
              program: programId,
              pin: values.pin,
              family: values.family || recentFamily
            })
          );
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <label className="sr-only" htmlFor="studentName">
              Name
            </label>
            <Field
              placeholder="Name"
              name="studentName"
              className="form-input block"
            />
            <label className="sr-only" htmlFor="grade">
              Grade
            </label>
            <Field name="grade" component="select" className="form-input block">
              <option value="">---</option>
              <option value="0">K</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <label className="sr-only" htmlFor="pin">
              PIN
            </label>
            <Field placeholder="PIN" name="pin" className="form-input block" />
            <FamilyInput
              value={values.family}
              setFieldValue={setFieldValue}
              programId={programId}
            />
            <button className="btn block" type="submit">
              Create Student
            </button>
          </Form>
        )}
      </Formik>
      {recentStudent && students.byId[recentStudent] && (
        <div>
          <Link
            className="text-blue-500 hover:text-blue-400"
            to={`/student/${recentStudent}`}
          >
            {students.byId[recentStudent].name}
          </Link>
          {' has been created'}
        </div>
      )}
    </div>
  );
}
