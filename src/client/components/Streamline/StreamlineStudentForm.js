import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import StreamlineFamilyForm from './StreamlineFamilyForm';

export default function StreamlineStudentForm({
  recentStudent,
  addStudent,
  programId
}) {
  const [familyExists, setFamilyExists] = useState(true);

  const families = useSelector(state => state.families.items);
  const recentFamily = useSelector(state => state.families.recentFamily);
  const students = useSelector(state => state.students.items);

  return (
    <div>
      <Formik
        initialValues={{
          studentName: '',
          grade: '',
          pin: ''
        }}
        onSubmit={values => {
          addStudent({
            name: values.studentName,
            grade: values.grade,
            program: programId,
            pin: values.pin,
            family: familyExists ? values.family : recentFamily
          });
        }}
      >
        {() => (
          <Form>
            <Field
              placeholder="Student Name"
              name="studentName"
              className="border rounded"
            />
            <Field name="grade" component="select" className="border rounded">
              <option value="">---</option>
              <option value="0">K</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <Field placeholder="PIN" name="pin" className="border rounded" />
            {familyExists ? (
              <div>
                <Field
                  name="family"
                  className="border rounded"
                  component="select"
                >
                  <option value="">---</option>
                  {families.allIds.map(familyId => (
                    <option value={familyId}>
                      {families.byId[familyId].name}
                    </option>
                  ))}
                </Field>
                <button className="btn" onClick={() => setFamilyExists(false)}>
                  Create New Family
                </button>
              </div>
            ) : (
              <div>
                <StreamlineFamilyForm programId={programId} />
                <button className="btn" onClick={() => setFamilyExists(true)}>
                  Use Existing Family
                </button>
              </div>
            )}
            <button className="btn" type="submit">
              Create Student
            </button>
          </Form>
        )}
      </Formik>
      {recentStudent && (
        <Link to={`/student/${recentStudent}`}>
          {students.byId[recentStudent].name}
        </Link>
      )}
    </div>
  );
}
