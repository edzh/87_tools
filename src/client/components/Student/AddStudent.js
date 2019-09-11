import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { useFormInput } from 'utils/hooks';

export default function AddStudent() {
  const name = useFormInput('');
  const grade = useFormInput('');
  const pin = useFormInput('');
  const [alert, setAlert] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({
        name: name.value,
        grade: grade.value,
        pin: pin.value
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create student!');
        }

        return response.json();
      })
      .then(() =>
        setAlert({
          status: 'Success',
          message: `${name.value} has been created!`
        })
      )
      .catch(err => setAlert({ status: 'Error', message: err.message }));
  }

  return (
    <Formik
      initialValues={{
        studentName: '',
        grade: ''
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
        </Form>
      )}
    </Formik>
  );
}
