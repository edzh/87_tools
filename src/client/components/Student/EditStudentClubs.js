import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

const intToDay = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

export default function EditStudentClubs({
  clubs,
  sessions,
  currentStudent,
  currentSession,
  getCurrentSession,
  getClubsBySession,
  updateCurrentStudent
}) {
  const [edit, setEdit] = useState(false);

  function findClubWithDay(clubDay) {
    if (!currentStudent.byId[currentStudent.allIds].currentClubs) return '';
    const club = currentStudent.byId[currentStudent.allIds].clubs
      .filter(club => club.day === clubDay)
      .find(club => club.session === currentSession.item.allIds);

    if (club) return club._id;
  }

  if (!currentStudent.allIds) return null;
  if (!sessions.allIds.length) return null;

  return (
    <div className="detail-card">
      <button
        onClick={() => setEdit(!edit)}
        className={`${
          edit ? 'bg-blue-500 text-white' : 'bg-white'
        } px-2 text-xs border rounded shadow border-gray-200`}
      >
        Edit
      </button>
      <h2 className="text-xl font-bold mb-2">
        Clubs{' '}
        {currentSession.item.allIds &&
          `- ${currentSession.item.byId[currentSession.item.allIds].name}`}
      </h2>

      <div className="flex">
        {sessions.allIds.map(sessionId => (
          <p
            key={sessionId}
            className="p-2 mr-2 btn block hover:bg-blue-400 cursor-pointer"
            onClick={() => {
              getCurrentSession(sessionId);
              getClubsBySession(sessionId);
            }}
          >
            {sessions.byId[sessionId].name}
          </p>
        ))}
      </div>
      {edit ? (
        currentSession.item.allIds && (
          <Formik
            enableReinitialize
            initialValues={{
              monday: findClubWithDay(1),
              tuesday: findClubWithDay(2),
              wednesday: findClubWithDay(3),
              thursday: findClubWithDay(4),
              friday: findClubWithDay(5)
            }}
            onSubmit={(values, actions) => {
              const currentClubIds = [
                values.monday,
                values.tuesday,
                values.wednesday,
                values.thursday,
                values.friday
              ].filter(club => club !== '');

              const sessionClubIds = currentStudent.byId[
                currentStudent.allIds
              ].clubs
                .filter(club => club.session !== currentSession.item.allIds)
                .map(club => club._id);

              const clubs = Array.from(
                new Set([...sessionClubIds, ...currentClubIds])
              ).filter(club => club !== '');

              updateCurrentStudent({
                ...currentStudent.byId[currentStudent.allIds],
                currentClubIds,
                clubs
              });
            }}
          >
            {() => (
              <Form className="my-4">
                {intToDay.map((day, index) => (
                  <div className="flex" key={day}>
                    <label
                      className="my-auto font-bold w-24 capitalize"
                      htmlFor={day}
                    >
                      {day}
                    </label>
                    <Field
                      className="block p-1 rounded border border-gray-400 mb-1"
                      name={day}
                      component="select"
                    >
                      <option value="">---</option>
                      {clubs.allIds
                        .filter(clubId => clubs.byId[clubId].day === index)
                        .map(clubId => (
                          <option className="block" key={clubId} value={clubId}>
                            {clubs.byId[clubId].name}
                          </option>
                        ))}
                    </Field>
                  </div>
                ))}
                <button className="btn block hover:bg-blue-400" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )
      ) : (
        <div className="my-4">
          {currentStudent.byId[currentStudent.allIds].clubs &&
            currentStudent.byId[currentStudent.allIds].clubs
              .filter(club => club.session === currentSession.item.allIds)
              .map((club, index) => (
                <div className="flex my-2" key={index}>
                  <p className="w-24 capitalize">{intToDay[club.day]}</p>
                  <Link className="no-underline" to={`/club/${club._id}`}>
                    <p className="text-blue-500 hover:text-blue-400">
                      {club.name}
                    </p>
                  </Link>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
