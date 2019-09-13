import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { apiUrl } from 'config';

import { getCurrentTimesheet } from '../actions/timesheetActions';
import {
  getTimesheetTimestamps,
  addTimestamp,
  deleteTimestamp
} from '../actions/timeclockActions';

import { getProgramStudents } from '../actions/programActions';
import { getSessionClubs, getCurrentSession } from '../actions/sessionActions';

import ManualEntry from '../components/Timeclock/ManualEntry';
import PinInput from '../components/Timeclock/PinInput';
import PinLookup from './PinLookup';
import TimestampList from '../components/Timeclock/NewTimestampList';
import MakePdf from 'data/MakePdf';

function Timeclock({
  getTimesheetTimestamps,
  getCurrentTimesheet,
  getCurrentSession,
  getSessionClubs,
  getProgramStudents,
  addTimestamp,
  clubs,
  students,
  timesheetId,
  timestamps,
  currentTimesheet,
  currentSession,
  deleteTimestamp,
  ...props
}) {
  useEffect(() => {
    getCurrentTimesheet(timesheetId);
    getTimesheetTimestamps(timesheetId);
  }, []);

  useEffect(() => {
    if (currentTimesheet.item) {
      getCurrentSession(currentTimesheet.item.session);
      // getSessionClubs(currentTimesheet.item.session);
    }
  }, [currentTimesheet.isFetching]);

  useEffect(() => {
    if (currentSession.item) {
      getProgramStudents(currentSession.item.program);
    }
  }, [currentSession.isFetching]);

  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [family, setFamily] = useState({ students: [] });
  const [fetchedTimesheet, setFetchedTimesheet] = useState([]);
  const [toTimesheets, setToTimesheets] = useState(false);

  const deleteTimesheet = async timesheetId => {
    try {
      const timesheet = await fetch(
        `${process.env.REACT_APP_API_URL}/api/timesheet/${timesheetId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      ).then(() => {
        setToTimesheets(true);
      });

      return timesheet;
    } catch (e) {
      return Promise.reject();
    }
  };

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  function handleSubmit(e) {
    e.preventDefault();

    handlePin(pin)
      .then(response => {
        if (response) {
          const studentClub = getStudentClubByTimesheet(response.student);
          postTimestamp(response.student, null, {
            family: response.family,
            pickup: response.pickup,
            club: studentClub
          });
        }
      })
      .catch(() =>
        setMessage({ status: 'Error', message: 'Student not found.' })
      )
      .finally(() => setPin(''));
  }

  async function handlePin(pin) {
    const fetchedPin = await fetch(
      `${process.env.REACT_APP_API_URL}/api/pin/${pin}`
    )
      .then(response => response.json())
      .then(json => json.data);
    const isStudent =
      fetchedPin.hasOwnProperty('family') || fetchedPin.hasOwnProperty('grade');

    if (isStudent) {
      return { student: fetchedPin };
    }

    const pickup = fetchedPin.pickups.find(
      pickup => pickup.pin === parseInt(pin)
    );

    const familyStudents = await fetch(
      `${apiUrl}/api/family/${fetchedPin._id}/students`
    )
      .then(response => response.json())
      .then(json => json.data);

    if (familyStudents.length === 1) {
      return {
        student: familyStudents[0],
        pickup: pickup,
        family: fetchedPin._id
      };
    }

    setFamily({
      students: familyStudents,
      pickup: pickup,
      family: fetchedPin._id
    });
    setMessage({ status: 'Warning', message: `${pin} is a family pin!` });
  }

  function handleFamily(students) {
    students.forEach(student => {
      const studentClub = getStudentClubByTimesheet(student);
      postTimestamp(student, null, {
        family: family.family,
        pickup: family.pickup,
        club: studentClub
      }).catch(err => console.error(err));
    });

    setFamily({ students: [] });
  }

  const postTimestamp = async (student, fobStatus, options) => {
    options = options || {};
    const pickup = options.pickup || {};
    const family = options.family || undefined;

    // const timestamp = await fetch(
    //   `${process.env.REACT_APP_API_URL}/api/timestamp`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('id_token')}`
    //     },
    //     body: JSON.stringify({
    //       student: student._id,
    //       timesheet: timesheetId,
    //       fobStatus,
    //       pickup: { family: family, name: pickup.name, pin: pickup.pin },
    //       club: options.club
    //     })
    //   }
    // )
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error(
    //         `${student.name} is already signed ${fetchedTimesheet.io}!`
    //       );
    //     }

    //     return response.json();
    //   })
    //   .then(json => json.data)
    //   .then(() =>
    //     setMessage({
    //       status: 'Success',
    //       message: `${student.name} has been signed ${fetchedTimesheet.io}!`
    //     })
    //   )
    //   .catch(err => setMessage({ status: 'Error', message: err.message }));

    await addTimestamp({
      student: student._id,
      timesheet: timesheetId,
      fobStatus,
      pickup: { family: family, name: pickup.name, pin: pickup.pin },
      club: options.club
    });

    setRefresh(true);
  };

  useEffect(() => {
    timestamps.recentTimestamp &&
      setMessage({
        status: 'Success',
        message: `${timestamps.recentTimestamp.student.name} has been recorded!`
      });
  }, [timestamps.recentTimestamp]);

  const getStudentClubByTimesheet = student => {
    const day = format(new Date(currentTimesheet.item.date), 'E');
    const club = student.currentClubs.find(club => club.day === parseInt(day));

    return club ? club._id : null;
  };

  if (toTimesheets === true) {
    return <Redirect to="/timesheet" />;
  }

  return (
    <div className="lg:flex">
      <div className="lg:w-1/3">
        <PinInput
          pin={pin}
          setPin={setPin}
          handleSubmit={handleSubmit}
          message={message}
          family={family}
          handleFamily={handleFamily}
          refresh={refresh}
        />
        <ManualEntry
          students={students}
          postTimestamp={postTimestamp}
          setMessage={setMessage}
          getStudentClubByTimesheet={getStudentClubByTimesheet}
        />
      </div>
      <div className="lg:pl-4 lg:w-2/3">
        <TimestampList
          timestamps={timestamps}
          clubs={clubs}
          students={students}
          currentTimesheet={currentTimesheet}
          deleteTimestamp={deleteTimestamp}
        />
        <div className="flex">
          <button
            className="p-2 ml-4 border rounded hover:bg-red hover:text-white hidden"
            onClick={() => deleteTimesheet(timesheetId)}
          >
            Delete
          </button>
          {/*<MakePdf timesheetId={timesheetId} />*/}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubs: state.club.clubs,
    currentSession: state.session.currentSession,
    currentTimesheet: state.timesheet.currentTimesheet,
    students: state.student.students,
    timesheetId: ownProps.match.params.id,
    timestamps: state.timestamp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTimesheetTimestamps: timesheetId => {
      dispatch(getTimesheetTimestamps(timesheetId));
    },
    getProgramStudents: programId => {
      dispatch(getProgramStudents(programId));
    },
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    },
    getCurrentTimesheet: timesheetId => {
      dispatch(getCurrentTimesheet(timesheetId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    addTimestamp: timestamp => {
      dispatch(addTimestamp(timestamp));
    },
    deleteTimestamp: timestampId => {
      dispatch(deleteTimestamp(timestampId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeclock);
