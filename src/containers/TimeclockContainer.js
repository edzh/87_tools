import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setTimesheet } from '../actions/timesheetActions';
import { fetchStudents } from '../actions/studentActions';

import TimestampList from '../components/Timeclock/TimestampList';
import PinInput from '../components/Timeclock/PinInput';
import ManualEntry from '../components/Timeclock/ManualEntry';
import PinLookup from './PinLookup';

import styles from './css/Timeclock.module.css';

function Timeclock(props) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [family, setFamily] = useState([]);

  useEffect(() => {
    props.setTimesheet(props.timesheet);
  });

  function handleSubmit(e) {
    e.preventDefault();

    getStudentWithPin(pin)
      .then(response => postTimestamp(response))
      .then(response => addTimestampToTimesheet(response))
      .then(() => setError(''))
      .catch(err => setError(err.message));

    setPin('');
  }

  function handleFamily(student) {
    console.log(student);
    postTimestamp(student)
      .then(response => addTimestampToTimesheet(response))
      .catch(err => setError(err.message));

    setFamily([]);
  }

  const addTimestampToTimesheet = async timestamp => {
    try {
      const timesheet = fetch(
        `http://localhost:3001/api/timesheet/${props.timesheet}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ timestamp })
        }
      )
        .then(() => {
          setRefresh(true);
        })
        .catch(err => console.error('err', err));

      return timesheet;
    } catch (e) {
      console.error(e, 'output');
    }
  };

  const postTimestamp = async student => {
    try {
      const timestamp = await fetch('http://localhost:3001/api/timestamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student: student._id,
          timesheet: props.timesheet
        })
      })
        .then(response => response.json())
        .then(json => json.data);

      return timestamp;
    } catch (e) {
      return Promise.reject(new Error(`${student.name} already signed in!`));
    }
  };

  // Will attempt to match pin with student. If student not found, fallback
  // to searching family pins
  const getStudentWithPin = async pin => {
    try {
      const student = await fetch(
        `http://localhost:3001/api/student?pin=${pin}`
      )
        .then(response => response.json())
        .then(json => json.data[0]);

      if (!student) {
        const familyPins = await fetch(`http://localhost:3001/api/pin/${pin}`)
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

  return (
    <div className={styles.container}>
      <PinInput
        pin={pin}
        setPin={setPin}
        handleSubmit={handleSubmit}
        error={error}
        family={family}
        handleFamily={handleFamily}
      />
      <div className={styles.studentList}>
        <h2>Signed In</h2>
        <div className={styles.list}>
          <TimestampList
            refresh={refresh}
            setRefresh={setRefresh}
            timesheet={props.timesheet}
          />
        </div>
      </div>
      <ManualEntry
        students={props.students}
        fetchStudents={props.fetchStudents}
        postTimestamp={postTimestamp}
        addTimestampToTimesheet={addTimestampToTimesheet}
        setError={setError}
      />
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
