import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { apiUrl } from 'config';
import { format } from 'date-fns';

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
    props.setTimesheet(props.timesheet);
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/timesheet/${props.timesheet}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        setFetchedTimesheet(json.data);
      })
      .then(() => setRefresh(false));
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
        setMessage({ status: 'Error', message: 'Please enter a pin.' })
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

    if (fetchedPin.students.length === 1) {
      return {
        student: fetchedPin.students[0],
        pickup: pickup,
        family: fetchedPin._id
      };
    }

    setFamily({
      students: fetchedPin.students,
      pickup: pickup,
      family: fetchedPin._id
    });
    setMessage({ status: 'Warning', message: `${pin} is a family pin!` });
  }

  function handleFamily(students) {
    students.forEach(student => {
      console.log(student);
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
    const family = options.family || {};

    const timestamp = await fetch(
      `${process.env.REACT_APP_API_URL}/api/timestamp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('id_token')}`
        },
        body: JSON.stringify({
          student: student._id,
          timesheet: props.timesheet,
          fobStatus,
          pickup: { family: family, name: pickup.name, pin: pickup.pin },
          club: options.club
        })
      }
    )
      .then(response => {
        if (!response.ok) {
          throw Error(
            `${student.name} is already signed ${fetchedTimesheet.io}!`
          );
        }

        return response.json();
      })
      .then(json => json.data)
      .then(() =>
        setMessage({
          status: 'Success',
          message: `${student.name} has been signed ${fetchedTimesheet.io}!`
        })
      )
      .catch(err => setMessage({ status: 'Error', message: err.message }));

    setRefresh(true);
  };

  const getStudentClubByTimesheet = student => {
    const day = format(new Date(fetchedTimesheet.date), 'E');
    const club = student.clubs.find(club => club.day === parseInt(day));

    return club ? club._id : null;
  };

  if (toTimesheets === true) {
    return <Redirect to="/timesheet" />;
  }

  return (
    <div className="lg:flex">
      <div className="lg:w-1/3 lg:1/3">
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
          students={props.students}
          fetchStudents={props.fetchStudents}
          postTimestamp={postTimestamp}
          setMessage={setMessage}
          getStudentClubByTimesheet={getStudentClubByTimesheet}
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
