import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

export default function EditStudentClubs({
  clubs,
  sessions,
  currentStudent,
  currentSession,
  getCurrentSession,
  getSessionClubs,
  updateCurrentStudent
}) {
  function findClubWithDay(clubDay) {
    if (!currentStudent.item.currentClubs) return '';
    const club = currentStudent.item.currentClubs.find(
      club => club.day === clubDay
    );
    if (club) return club._id;
  }

  return (
    <div>
      <div className="flex">
        {sessions.items &&
          sessions.items.map(session => (
            <p
              key={session._id}
              className="p-2 mr-2 btn"
              onClick={() => getCurrentSession(session._id)}
            >
              {session.name}
            </p>
          ))}
      </div>

      {currentSession.item._id && (
        <Formik
          initialValues={{
            monday: findClubWithDay(1),
            tuesday: findClubWithDay(2),
            wednesday: findClubWithDay(3),
            thursday: findClubWithDay(4),
            friday: findClubWithDay(5)
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
              <div className="flex">
                <label className="my-auto font-bold w-24" htmlFor="monday">
                  Monday
                </label>
                <Field
                  className="block p-2 rounded border border-gray-400 my-2"
                  name="monday"
                  component="select"
                >
                  <option value="">---</option>
                  {clubs.items &&
                    clubs.items
                      .filter(club => club.day === 1)
                      .map(club => (
                        <option
                          className="block"
                          key={club._id}
                          value={club._id}
                        >
                          {club.name}
                        </option>
                      ))}
                </Field>
              </div>
              <div className="flex">
                <label className="my-auto font-bold w-24" htmlFor="tuesday">
                  Tuesday
                </label>
                <Field
                  className="block p-2 rounded border border-gray-400 my-2"
                  name="tuesday"
                  component="select"
                >
                  <option value="">---</option>
                  {clubs.items &&
                    clubs.items
                      .filter(club => club.day === 2)
                      .map(club => (
                        <option
                          className="block"
                          key={club._id}
                          value={club._id}
                        >
                          {club.name}
                        </option>
                      ))}
                </Field>
              </div>
              <div className="flex">
                <label className="my-auto font-bold w-24" htmlFor="wednesday">
                  Wednesday
                </label>
                <Field
                  className="block p-2 rounded border border-gray-400 my-2"
                  name="wednesday"
                  component="select"
                >
                  <option value="">---</option>
                  {clubs.items &&
                    clubs.items
                      .filter(club => club.day === 3)
                      .map(club => (
                        <option
                          className="block"
                          key={club._id}
                          value={club._id}
                        >
                          {club.name}
                        </option>
                      ))}
                </Field>
              </div>
              <div className="flex">
                <label className="my-auto font-bold w-24" htmlFor="thursday">
                  Thursday
                </label>
                <Field
                  className="block p-2 rounded border border-gray-400 my-2"
                  name="thursday"
                  component="select"
                >
                  <option value="">---</option>
                  {clubs.items &&
                    clubs.items
                      .filter(club => club.day === 4)
                      .map(club => (
                        <option
                          className="block"
                          key={club._id}
                          value={club._id}
                        >
                          {club.name}
                        </option>
                      ))}
                </Field>
              </div>
              <div className="flex">
                <label className="my-auto font-bold w-24" htmlFor="friday">
                  Friday
                </label>
                <Field
                  className="block p-2 rounded border border-gray-400 my-2"
                  name="friday"
                  component="select"
                >
                  <option value="">---</option>
                  {clubs.items &&
                    clubs.items
                      .filter(club => club.day === 5)
                      .map(club => (
                        <option
                          className="block"
                          key={club._id}
                          value={club._id}
                        >
                          {club.name}
                        </option>
                      ))}
                </Field>
              </div>
              <button className="btn hover:bg-blue-400" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
