import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import EditStudentDetails from './EditStudentDetails';
import EditStudentFamily from './EditStudentFamily';

const intToGrade = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade'
];
const intToDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function StudentDetails({
  updateCurrentStudent,
  student,
  ...props
}) {
  const [edit, setEdit] = useState(false);

  if (!student) {
    return null;
  }

  return (
    <div className="">
      <div className="flex">
        <h2 className="pg-header">{student.name}</h2>
        <button
          className={`${
            edit ? 'bg-blue-500 text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
      </div>
      <div className="bg-gray-100">
        <div className="m-4 flex">
          <h3 className="w-32 text-xl">Grade</h3>
          <p className="text-xl">{intToGrade[student.grade]}</p>
        </div>
        <div className="m-4 flex">
          <h3 className="w-32 text-xl">PIN</h3>

          {edit ? (
            <Formik
              initialValues={{
                studentName: student.name,
                grade: student.grade,
                pin: student.pin
              }}
              onSubmit={values => {
                updateCurrentStudent({
                  ...student,
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
            <p className="text-xl">{student.pin}</p>
          )}
        </div>
      </div>
      <h2 className="font-bold text-xl">Family</h2>
      <EditStudentFamily student={student} />
      {student.family && (
        <div className="m-4">
          <Link to={`/family/${student.family._id}`} className="no-underline">
            <p className="text-xl text-blue-600  hover:text-blue">
              {student.family.name}
            </p>
          </Link>
          <h3 className="my-2">Pickups</h3>
          {student.family.pickups.map((pickup, index) => (
            <div className="flex" key={index}>
              <p className="w-64 text-bold">{pickup.name}</p>
              <p>{pickup.pin}</p>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl font-bold my-2">Clubs</h2>
      <div className="p-4">
        {student.clubs &&
          student.clubs
            .filter(club => club.session === props.currentSession.item._id)
            .map((club, index) => (
              <div className="flex m-2" key={index}>
                <p className="w-32">{intToDay[club.day]}</p>
                <Link className="no-underline" to={`/club/${club._id}`}>
                  <p className="text-blue-600  hover:text-blue">{club.name}</p>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}
