import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setTimesheet } from '../actions/timesheetActions';

import TimestampList from '../components/Timesheet/TimestampList';

function Timeclock(props) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    props.setTimesheet(props.timesheet);
  });

  function handleSubmit(e) {
    e.preventDefault();

    fetchStudentWithPin(pin)
      .then(response => postTimestamp(response))
      .then(response => addTimestampToTimesheet(response))
      // .then(() => setError(''))
      .catch(err => setError(err.message));

    setPin('');
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
      // .catch(err => setError('Already signed in!'));

      if (!timestamp) {
        return Promise.reject(new Error('Already signed in!'));
      }

      return timestamp;
    } catch (e) {
      return Promise.reject(new Error('Already signed in!'));
    }
  };

  const fetchStudentWithPin = async pin => {
    try {
      const student = await fetch(
        `http://localhost:3001/api/student?pin=${pin}`
      )
        .then(response => response.json())
        .then(json => json.data[0]);

      if (!student) {
        setError('Student not found!');
        return Promise.reject(new Error('Student not found!'));
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
