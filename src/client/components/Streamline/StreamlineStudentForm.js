import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { addStudent } from '../../actions/studentActions';
import StreamlineFamilyForm from './StreamlineFamilyForm';
import FamilyInput from './FamilyInput';

export default function StreamlineStudentForm({ programId }) {
  const dispatch = useDispatch();
  const [familyExists, setFamilyExists] = useState(true);
  const families = useSelector(state => state.families.items);
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
              family: familyExists ? values.family : recentFamily
            })
          );
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <label htmlFor="studentName">Name</label>
            <Field
              placeholder="Name"
              name="studentName"
              className="form-input"
            />
            <label htmlFor="grade">Grade</label>
            <Field name="grade" component="select" className="form-input">
              <option value="">---</option>
              <option value="0">K</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <label htmlFor="pin">PIN</label>
            <Field placeholder="PIN" name="pin" className="form-input" />
            {familyExists && (
              <FamilyInput
                value={values.family}
                setFieldValue={setFieldValue}
              />
            )}
            <button className="btn" type="submit">
              Create Student
            </button>
          </Form>
        )}
      </Formik>
      {recentStudent && students.byId[recentStudent] && (
        <Link to={`/student/${recentStudent}`}>
          {students.byId[recentStudent].name}
        </Link>
      )}
    </div>
  );
}
