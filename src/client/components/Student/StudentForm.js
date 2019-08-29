import React from 'react';
import { Formik, Field, Form } from 'formik';

export default function StudentForm(props) {
  return (
    <Formik
      initialValues={{
        studentName: '',
        grade: '',
        pin: ''
      }}
      onSubmit={(values, action) => {
        props.addStudent({
          name: values.studentName,
          grade: values.grade,
          pin: values.pin,
          program: props.programId
        });
      }}
    >
      {() => (
        <Form>
          <Field name="studentName" className="border" />
          <Field name="grade" component="select" className="border">
            <option value="0">K</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <Field name="pin" className="border" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
