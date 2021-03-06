import React from 'react';
import { format } from 'date-fns';
import { Formik, Form, Field } from 'formik';

export default function Timesheet({ currentSession, addTimesheet, sessionId }) {
  return (
    <div className="p-8 form ml-2">
      <h3 className="mb-2 text-lg font-bold">New Timesheet</h3>
      <Formik
        initialValues={{
          date: `${format(new Date(), 'yyyy-MM-dd')}T05:00:00.000Z`,
          io: ''
        }}
        onSubmit={(values, actions) => {
          addTimesheet({
            date: values.date,
            io: values.io,
            session: sessionId,
            program: currentSession.byId[sessionId].program
          });
        }}
      >
        {() => (
          <Form>
            <Field className="form-input block" name="date" />
            <Field className="form-input block" name="io" component="select">
              <option value="">---</option>
              <option value="in">Sign in</option>
              <option value="out">Sign out</option>
            </Field>
            <button className="btn block hover:bg-blue-400" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
