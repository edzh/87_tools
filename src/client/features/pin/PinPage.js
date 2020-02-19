import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom';
import { fetchPin } from './pinSlice';

export default function PinPage() {
  const dispatch = useDispatch();
  const fetchedPin = useSelector(state => state.pin.item);

  return (
    <div>
      <h2 className="text-gray-600 text-lg font-bold">Check Pin</h2>
      <Formik
        initialValues={{
          pin: ''
        }}
        onSubmit={values => {
          dispatch(fetchPin(values.pin));
        }}
      >
        {() => (
          <Form>
            <Field name="pin" autoComplete="off" className="form-input" />
            <button className="btn">Submit</button>
          </Form>
        )}
      </Formik>
      {fetchedPin.type === 'student' ? (
        <Link
          className="hover:text-blue-400 text-blue-500"
          to={`/student/${fetchedPin._id}`}
        >
          {fetchedPin.name}
        </Link>
      ) : (
        <Link
          className="hover:text-blue-400 text-blue-500"
          to={`/family/${fetchedPin._id}`}
        >
          {fetchedPin.name}
        </Link>
      )}
    </div>
  );
}
