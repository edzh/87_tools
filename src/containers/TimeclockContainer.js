import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { setTimesheet } from '../actions/timesheetActions';
import { fetchStudents } from '../actions/studentActions';

import TimestampList from '../components/Timeclock/TimestampList';
import PinInput from '../components/Timeclock/PinInput';
import ManualEntry from '../components/Timeclock/ManualEntry';
import PinLookup from './PinLookup';
import { apiUrl } from 'config';
import styles from './css/Timeclock.module.css';

function Timeclock(props) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [family, setFamily] = useState([]);
  const [fetchedTimesheet, setFetchedTimesheet] = useState([]);
  const [toTimesheets, setToTimesheets] = useState(false);

  const deleteTimesheet = async timesheetId => {
    try {
      const timesheet = await fetch(`${apiUrl}/api/timesheet/${timesheetId}`, {
        method: 'DELETE'
      }).then(() => {
        setToTimesheets(true);
      });

      return timesheet;
    } catch (e) {
      return Promise.reject();
    }
  };

  useEffect(() => {
    props.setTimesheet(props.timesheet);
  });

  useEffect(() => {
    fetch(`${apiUrl}/api/timesheet/${props.timesheet}`)
      .then(response => response.json())
      .then(json => {
        setFetchedTimesheet(json.data);
      })
      .then(() => setRefresh(false));
  }, [refresh]);

  function handleSubmit(e) {
    e.preventDefault();

    getStudentWithPin(pin)
      .then(response => postTimestamp(response))
      .then(() => setError(''))
      .catch(err => setError(err.message))
      .finally(() => setPin(''));
  }

  function handleFamily(students) {
    console.log(students);
    students.forEach(student => {
      postTimestamp(student).catch(err => setError(err.message));
    });
    // postTimestamp(student).catch(err => setError(err.message));

    setFamily([]);
  }

  const postTimestamp = async (student, fobStatus) => {
    try {
      const timestamp = await fetch(`${apiUrl}/api/timestamp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student: student._id,
          timesheet: props.timesheet,
          fobStatus
        })
      })
        .then(response => response.json())
        .then(json => json.data)
        .then(() => {
          setRefresh(true);
        });

      return timestamp;
    } catch (e) {
      return Promise.reject(new Error(`${student.name} already signed in!`));
    }
  };

  // Will attempt to match pin with student. If student not found, fallback
  // to searching family pins
  const getStudentWithPin = async pin => {
    try {
      const student = await fetch(`${apiUrl}/api/student?pin=${pin}`)
        .then(response => response.json())
        .then(json => json.data[0]);

      if (!student) {
        const familyPins = await fetch(`${apiUrl}/api/pin/${pin}`)
          .then(response => response.json())
          .then(json => json.data)
          .catch(err => console.error(err));

        if (!familyPins) {
          return Promise.reject(new Error('Student not found!'));
        }

        if (familyPins.students.length === 1) {
          return familyPins.students[0];
        }
        setFamily(familyPins.students);
        return Promise.reject(new Error(`${pin} is a family pin!`));
      }
      return student;
    } catch (e) {
      console.error(e);
    }
  };

  console.log(props.timesheet);

  if (toTimesheets === true) {
    return <Redirect to="/timesheet" />;
  }

  return (
    <div className="flex p-2">
      <div className="w-1/3">
        <PinInput
          pin={pin}
          setPin={setPin}
          handleSubmit={handleSubmit}
          error={error}
          family={family}
          handleFamily={handleFamily}
        />
        <ManualEntry
          students={props.students}
          fetchStudents={props.fetchStudents}
          postTimestamp={postTimestamp}
          setError={setError}
        />
      </div>
      <div className="w-2/3">
        <TimestampList
          refresh={refresh}
          setRefresh={setRefresh}
          timesheet={fetchedTimesheet}
        />
        <button
          className="p-2 ml-4 border rounded hover:bg-red hover:text-white"
          onClick={() => deleteTimesheet(props.timesheet)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    timesheet: ownProps.timesheet,
    students: state.student.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTimesheet: timesheet => {
      dispatch(setTimesheet(timesheet));
    },
    fetchStudents: () => {
      dispatch(fetchStudents());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeclock);
