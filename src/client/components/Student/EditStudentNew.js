import React from 'react';
import { Formik, Field, Form } from 'formik';

export default ({ student, updateCurrentStudent }) => {
  if (!student._id) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        studentName: student.name,
        grade: student.grade,
        pin: student.pin,
        family: student.family._id
      }}
      onSubmit={(values, action) => {
        updateCurrentStudent({
          ...student,
          name: values.studentName,
          grade: values.grade,
          pin: values.pin,
          family: values.family
        });
      }}
    >
      {() => (
        <Form>
          <Field name="studentName" />
          <Field name="grade" />
          <Field name="pin" />
          <Field name="family" component="select"></Field>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
