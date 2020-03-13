import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import Modal from 'client/components/Modal';

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
  const [showModal, setShowModal] = useState(false);
  if (!currentStudent.allIds) return null;

  return (
    <div className="mt-2">
      <div className="bg-white p-4 rounded border border-gray-400">
        <button
          className={`${
            edit ? 'bg-blue-500 text-white' : 'bg-white'
          } ml-auto text-xs border rounded shadow px-2 mb-2`}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
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
                <Field
                  name="studentName"
                  className="border rounded block mb-2"
                />
                <Field
                  component="select"
                  name="grade"
                  className="border rounded block mb-2"
                >
                  <option value="0">Kindergarten</option>
                  <option value="1">1st Grade</option>
                  <option value="2">2nd Grade</option>
                  <option value="3">3rd Grade</option>
                  <option value="4">4th Grade</option>
                  <option value="5">5th Grade</option>
                </Field>
                <Field name="pin" className="border rounded block mb-2" />
                <button type="submit" className="btn p-1">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <p className="text-xl mb-2">
              {intToGrade[currentStudent.byId[currentStudent.allIds].grade]}
            </p>
            <div className="flex mb-2">
              <h3 className="w-10 text-xl font-semibold">PIN</h3>
              <p className="text-xl">
                {currentStudent.byId[currentStudent.allIds].pin}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white rounded px-1 hover:bg-red-400"
            >
              Delete
            </button>
            {showModal ? (
              <Modal>
                <div className="mb-4">
                  Are you sure you want to delete{' '}
                  {currentStudent.byId[currentStudent.allIds].name}?
                </div>
                <div className="flex">
                  <button
                    onClick={() => deleteCurrentStudent(currentStudent.allIds)}
                    className="bg-red-500 hover:bg-red-400 text-white rounded p-2 mr-2 flex-grow"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-blue-500 hover:bg-blue-400 text-white rounded p-2 ml-2 flex-grow"
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
