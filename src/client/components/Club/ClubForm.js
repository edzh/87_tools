import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router';
import { useFormInput } from 'utils/hooks';
import { apiUrl } from 'config';

export default ({ addClub, sessionId }) => {
  const name = useFormInput('');
  const day = useFormInput('');
  const [newClub, setNewClub] = useState({ redirect: false, id: '' });

  if (newClub.redirect === true) {
    return <Redirect to={`/club/id/${newClub.id}`} />;
  }

  return (
    <div className="shadow mt-2 border rounded p-4 form">
      <Formik
        initialValues={{
          clubName: '',
          day: ''
        }}
        onSubmit={(values, action) => {
          addClub({
            name: values.clubName,
            day: values.day,
            session: sessionId
          });
        }}
      >
        {() => (
          <Form>
            <label htmlFor="clubName"></label>
            <Field id="clubName" name="clubName" className="form-input block" />
            <label htmlFor="day"></label>
            <Field
              id="day"
              name="day"
              component="select"
              className="form-input block"
            >
              <option value="">---</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
            </Field>
            <label htmlFor="session"></label>
            <button className="btn block hover:bg-blue-400" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
