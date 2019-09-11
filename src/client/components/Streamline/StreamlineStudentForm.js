import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

export default function StreamlineStudentForm({
  recentFamily,
  recentStudent,
  addStudent,
  programId
}) {
  if (!recentFamily) {
    return null;
  }

  return (
    <div>
      {recentFamily && (
        <Link to={`/family/${recentFamily._id}`}>{recentFamily.name}</Link>
      )}
      <Formik
        initialValues={{
          studentName: '',
          grade: '',
          pin: ''
        }}
        onSubmit={values => {
          addStudent({
            name: values.studentName,
            grade: values.grade,
            program: programId,
            pin: values.pin,
            family: recentFamily._id
          });
        }}
      >
        {() => (
          <Form>
            <Field name="studentName" className="border rounded" />
            <Field name="grade" component="select" className="border rounded">
              <option value="">---</option>
              <option value="0">K</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <Field name="pin" className="border rounded" />
            <button type="submit">Create Student</button>
          </Form>
        )}
      </Formik>
      {recentStudent && (
        <Link to={`/family/${recentStudent._id}`}>{recentStudent.name}</Link>
      )}
    </div>
  );
}
