import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';

const intToDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default ({ student, updateCurrentStudent, currentSessionClubs }) => {
  if (!student._id) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        studentName: student.name,
        grade: student.grade,
        pin: student.pin,
        family: student.family && student.family._id,
        clubs: student.clubs.reduce(
          (clubs, club) => {
            clubs[club.day] = club._id;
            return clubs;
          },
          ['', '', '', '', '']
        )
      }}
      onSubmit={(values, action) => {
        console.log(values);
        updateCurrentStudent({
          ...student,
          name: values.studentName,
          grade: values.grade,
          pin: values.pin,
          family: values.family,
          clubs: values.clubs.filter(club => club !== '')
        });
      }}
    >
      {({ values }) => (
        <Form>
          <Field name="studentName" />
          <Field name="grade" component="select">
            <option value="0">K</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <Field name="pin" />
          <Field name="family" component="select"></Field>
          <FieldArray
            name="clubs"
            render={arrayHelpers => (
              <div>
                {values.clubs.map((clubId, index) => {
                  const club = student.clubs.find(
                    studentClub => studentClub._id === clubId
                  );

                  return (
                    <Field
                      key={index}
                      name={`clubs.${index}`}
                      component="select"
                    >
                      <option value={index}>{club && club.name}</option>
                      {currentSessionClubs &&
                        currentSessionClubs
                          .filter(sessionClub => sessionClub.day === index)
                          .map(sessionClub => (
                            <option value={sessionClub._id}>
                              {sessionClub.name}
                            </option>
                          ))}
                    </Field>
                  );
                })}
              </div>
            )}
          ></FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
