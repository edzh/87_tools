import React from 'react';
import { Formik, Field, Form } from 'formik';

export default function StudentForm(props) {
  return (
    <div className="p-8 shadow mt-2 w-64 rounded">
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
          <Form className="mx-auto block">
            <label htmlFor="studentName"></label>
            <Field
              name="studentName"
              placeholder="Name"
              className="border border-gray-400 rounded py-1 px-2 my-2 block"
            />
            <label htmlFor="grade"></label>
            <Field
              name="grade"
              component="select"
              className="border text-sm border-gray-400 rounded p-1 my-2 block"
            >
              <option value="">---</option>
              <option value="0">K</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <label htmlFor="PIN"></label>
            <Field
              name="pin"
              placeholder="PIN"
              className="border border-gray-400 rounded py-1 px-2 my-2 block"
            />
            <div className="flex"></div>
            <button type="submit" className="btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
