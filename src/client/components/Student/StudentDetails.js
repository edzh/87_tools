import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

const intToGrade = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade'
];
export default function StudentDetails({
  currentStudent,
  deleteCurrentStudent,
  updateCurrentStudent
}) {
  const [edit, setEdit] = useState(false);
  if (!currentStudent.allIds) return null;

  return (
    <div className="">
      <div className="flex">
        <button
          className={`${
            edit ? 'bg-blue-500 text-white' : 'bg-white'
          } ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
      </div>
      <div className="bg-gray-100">
        <div className="m-4 flex">
          <h3 className="w-32 text-xl">Grade</h3>
          <p className="text-xl">
            {intToGrade[currentStudent.byId[currentStudent.allIds].grade]}
          </p>
        </div>
        <div className="m-4 flex">
          <h3 className="w-32 text-xl">PIN</h3>

          {edit ? (
            <Formik
              initialValues={{
                studentName: currentStudent.byId[currentStudent.allIds].name,
                grade: currentStudent.byId[currentStudent.allIds].grade,
                pin: currentStudent.byId[currentStudent.allIds].pin
              }}
              onSubmit={values => {
                updateCurrentStudent({
                  ...currentStudent.byId[currentStudent.allIds],
                  name: values.studentName,
                  grade: values.grade,
                  pin: values.pin
                });
                setEdit(false);
              }}
            >
              {() => (
                <Form>
                  <Field name="studentName" className="border rounded" />
                  <Field
                    component="select"
                    name="grade"
                    className="border rounded"
                  >
                    <option value="0">Kindergarten</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                  </Field>
                  <Field name="pin" className="border rounded" />
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          ) : (
            <p className="text-xl">
              {currentStudent.byId[currentStudent.allIds].pin}
            </p>
          )}
        </div>
        <button
          onClick={() => deleteCurrentStudent(currentStudent.allIds)}
          className="bg-red p-2"
        >
          delete
        </button>
      </div>
    </div>
  );
}
