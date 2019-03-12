import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setTimesheet } from '../actions/timesheetActions';

import TimestampList from '../components/Timesheet/TimestampList';

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

      if (!timestamp) {
        return Promise.reject(new Error('Already signed in!'));
      }

      return timestamp;
    } catch (e) {
      return Promise.reject(new Error('Already signed in!'));
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
          .then(json => json.data);

        if (!familyPins) {
          return Promise.reject(new Error('Student not found!'));
        }
        // console.log(familyPins.students.length)
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

  function handleChange(e) {
    setPin(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={pin} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {family.map((student, index) => (
        <button key={index} onClick={() => handleFamily(student)}>
          {student.name}
        </button>
      ))}
      <TimestampList
        refresh={refresh}
        setRefresh={setRefresh}
        timesheet={props.timesheet}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    timesheet: ownProps.timesheet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTimesheet: timesheet => {
      dispatch(setTimesheet(timesheet));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeclock);
