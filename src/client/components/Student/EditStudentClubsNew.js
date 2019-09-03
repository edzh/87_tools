import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

export default function EditStudentClubs({
  clubs,
  sessions,
  currentStudent,
  getCurrentSession,
  getSessionClubs
}) {
  console.log(currentStudent.item);

  return (
    <div>
      {sessions.items &&
        sessions.items.map(session => (
          <p key={session._id} onClick={() => getCurrentSession(session._id)}>
            {session.name}
          </p>
        ))}

      <Formik
        initialValues={{
          monday: currentStudent.item.currentClubs[0],
          tuesday: currentStudent.item.currentClubs[0],
          wednesday: currentStudent.item.currentClubs[0],
          thursday: currentStudent.item.currentClubs[0],
          friday: currentStudent.item.currentClubs[0]
        }}
      >
        {() => (
          <Form>
            <Field name="monday" component="select">
              {clubs.items &&
                clubs.items
                  .filter(club => club.day === 1)
                  .map(club => (
                    <option className="block" key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
            </Field>
            <Field name="tuesday" component="select">
              {clubs.items &&
                clubs.items
                  .filter(club => club.day === 2)
                  .map(club => (
                    <option className="block" key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
            </Field>
            <Field name="wednesday" component="select">
              {clubs.items &&
                clubs.items
                  .filter(club => club.day === 3)
                  .map(club => (
                    <option className="block" key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
            </Field>
            <Field name="thursday" component="select">
              {clubs.items &&
                clubs.items
                  .filter(club => club.day === 4)
                  .map(club => (
                    <option className="block" key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
            </Field>
            <Field name="friday" component="select">
              {clubs.items &&
                clubs.items
                  .filter(club => club.day === 5)
                  .map(club => (
                    <option className="block" key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
            </Field>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
