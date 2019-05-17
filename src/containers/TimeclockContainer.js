import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { apiUrl } from 'config';

import { setTimesheet } from '../actions/timesheetActions';
import { fetchStudents } from '../actions/studentActions';

import ManualEntry from '../components/Timeclock/ManualEntry';
import PinInput from '../components/Timeclock/PinInput';
import PinLookup from './PinLookup';
import TimestampList from '../components/Timeclock/TimestampList';
import MakePdf from 'data/MakePdf';

function Timeclock(props) {
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
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
      .catch(err => console.error(err))
      .finally(() => setPin(''));
  }

  function handleFamily(students) {
    students.forEach(student => {
      postTimestamp(student).catch(err => setMessage(err));
    });

    setFamily([]);
  }

  const postTimestamp = async (student, fobStatus) => {
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
      .then(response => {
        if (!response.ok) {
          throw Error(`${student.name} is already signed in!`);
        }

        return response.json();
      })
      .then(json => json.data)
      .then(() =>
        setMessage({
          status: 'Success',
          message: `${student.name} has been signed in!`
        })
      )
      .catch(err => setMessage({ status: 'Error', message: err.message }));

    setRefresh(true);
  };

  // Will attempt to match pin with student. If student not found, fallback
  // to searching family pins
  const getStudentWithPin = async pin => {
    let student;

    student = await fetch(`${apiUrl}/api/student?pin=${pin}`)
      .then(response => {
        if (!response.ok) {
          throw Error('Student pin not found');
        }

        return response.json();
      })
      .then(json => json.data[0])
      .catch(() => fetchStudentsByFamily(pin));

    if (!student) {
      if (fetchStudentsByFamily(pin)) {
        student = fetchStudentsByFamily(pin);
      }

      setMessage({ status: 'Warning', message: `${pin} is a family pin!` });
    }

    return student;
  };

  const fetchStudentsByFamily = async pin => {
    const family = await fetch(`${apiUrl}/api/pin/${pin}`)
      .then(response => {
        if (!response.ok) {
          throw Error('Student not found!');
        }

        return response.json();
      })
      .then(json => json.data)
      .catch(err => setMessage({ status: 'Error', message: err.message }));
    console.log(family);

    if (family.students.length === 1) {
      return family.students[0];
    }
    setFamily(family.students);
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
        />
        <ManualEntry
          students={props.students}
          fetchStudents={props.fetchStudents}
          postTimestamp={postTimestamp}
          setMessage={setMessage}
        />
      </div>
      <div className="lg:pl-4 lg:w-2/3">
        <TimestampList
          refresh={refresh}
          setRefresh={setRefresh}
          timesheet={fetchedTimesheet}
        />
        <div className="flex">
          <button
            className="p-2 ml-4 border rounded hover:bg-red hover:text-white hidden"
            onClick={() => deleteTimesheet(props.timesheet)}
          >
            Delete
          </button>
          {<MakePdf timesheetId={props.timesheet} />}
        </div>
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
