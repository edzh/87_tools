import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

export default function EditStudentClubs({
  clubs,
  sessions,
  currentStudent,
  getCurrentSession,
  getSessionClubs,
  updateCurrentStudent
}) {
  console.log(currentStudent.item.currentClubs);

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
          monday: currentStudent.item.currentClubs
            ? currentStudent.item.currentClubs[0]
              ? currentStudent.item.currentClubs[0]._id
              : ''
            : '',
          tuesday: currentStudent.item.currentClubs
            ? currentStudent.item.currentClubs[1]
              ? currentStudent.item.currentClubs[1]._id
              : ''
            : '',
          wednesday: currentStudent.item.currentClubs
            ? currentStudent.item.currentClubs[2]
              ? currentStudent.item.currentClubs[2]._id
              : ''
            : '',
          thursday: currentStudent.item.currentClubs
            ? currentStudent.item.currentClubs[3]
              ? currentStudent.item.currentClubs[3]._id
              : ''
            : '',
          friday: currentStudent.item.currentClubs
            ? currentStudent.item.currentClubs[4]
              ? currentStudent.item.currentClubs[4]._id
              : ''
            : ''
        }}
        onSubmit={(values, actions) => {
          const currentClubs = [
            values.monday,
            values.tuesday,
            values.wednesday,
            values.thursday,
            values.friday
          ].filter(club => club !== '');

          const clubs = Array.from(
            new Set([...currentStudent.item.clubs, ...currentClubs])
          ).filter(club => club !== '');

          updateCurrentStudent({
            ...currentStudent.item,
            currentClubs,
            clubs
          });
        }}
      >
        {() => (
          <Form>
            <Field name="monday" component="select">
              <option value="">---</option>
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
              <option value="">---</option>
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
              <option value="">---</option>
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
              <option value="">---</option>
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
              <option value="">---</option>
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
