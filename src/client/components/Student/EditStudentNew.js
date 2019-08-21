import React, { useState, useEffect } from 'react';
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

export default ({ student, updateCurrentStudent, currentSession }) => {
  const [fetchedFamilies, setFetchedFamilies] = useState([]);
  useEffect(() => {
    const fetchFamilies = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/api/family`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamilies(result);
    };

    fetchFamilies();
  }, []);

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
        currentClubs: student.currentClubs
          ? student.currentClubs.reduce(
              (clubs, club) => {
                clubs[club.day] = club._id;
                return clubs;
              },
              ['', '', '', '', '', '', '']
            )
          : ['', '', '', '', '', '', ''],
        clubs: student.clubs
      }}
      onSubmit={(values, action) => {
        console.log([
          ...student.clubs,
          ...values.currentClubs.filter(club => club !== '')
        ]);
        updateCurrentStudent({
          ...student,
          name: values.studentName,
          grade: values.grade,
          pin: values.pin,
          family: values.family,
          currentClubs: values.currentClubs.filter(club => club !== ''),
          clubs: [
            ...student.clubs,
            ...values.currentClubs.filter(club => club !== '')
          ].filter((value, index, self) => self.indexOf(value) === index)
        });
      }}
    >
      {({ values }) => (
        <Form>
          <Field name="studentName" className="rounded border block p-1 m-2" />
          <Field
            name="grade"
            component="select"
            className="rounded border block p-1 m-2"
          >
            <option value="0">K</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <Field name="pin" className="rounded border block p-1 m-2" />
          <Field
            name="family"
            component="select"
            className="rounded border block p-1 m-2"
          >
            <option value="">--</option>
            {fetchedFamilies.map(family => (
              <option value={family._id}>{family.name}</option>
            ))}
          </Field>
          <FieldArray
            name="currentClubs"
            render={() => (
              <div>
                {values.currentClubs.map((clubId, index) => {
                  const club = student.clubs.find(
                    studentClub => studentClub._id === clubId
                  );

                  if (index === 6 || index === 0) {
                    return null;
                  }

                  return (
                    <Field
                      key={index}
                      name={`currentClubs.${index}`}
                      component="select"
                      className="rounded border block p-1 m-2"
                    >
                      <option value="">--</option>
                      {currentSession.clubs &&
                        currentSession.clubs
                          .filter(sessionClub => sessionClub.day === index)
                          .map(sessionClub => (
                            <option
                              key={sessionClub._id}
                              value={sessionClub._id}
                            >
                              {sessionClub.name}
                            </option>
                          ))}
                    </Field>
                  );
                })}
              </div>
            )}
          ></FieldArray>
          <button type="submit" className="rounded border block p-1 m-2">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
