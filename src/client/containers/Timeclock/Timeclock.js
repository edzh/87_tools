import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Formik, Field, Form } from 'formik';
import { apiUrl } from 'config';

import { getCurrentTimesheet } from '../../actions/timesheetActions';
import {
  addTimestamp,
  addTimestampFailure,
  getDateTimesheetTimestamps
} from '../../actions/timeclockActions';

import TimestampList from './TimestampList';
import Alert from '../../components/Alert';
import PinInput from '../../components/Timeclock/PinInput';
import MultiStudent from '../../components/Timeclock/MultiStudent';
import ManualEntry from './ManualEntry';
import Filters from '../../components/Timeclock/Filters';
import TimesheetHeader from '../../components/Timeclock/TimesheetHeader';

function Timeclock({
  getCurrentTimesheet,
  getDateTimesheetTimestamps,
  currentTimesheet,
  addTimestamp,
  addTimestampFailure,
  timesheetId,
  alert,
  signInTimestamps
}) {
  const [multiStudent, setMultiStudent] = useState({ students: [] });
  const pinInputRef = useRef();
  useEffect(() => {
    getCurrentTimesheet(timesheetId);
    pinInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (currentTimesheet.item && currentTimesheet.item.io === 'out')
      getDateTimesheetTimestamps(currentTimesheet.item.date, 'in');
  }, [currentTimesheet.isFetching]);

  async function submitPinTimestamp(pin, fobStatus) {
    const fetchedPin = await fetch(`${apiUrl}/api/pin/${pin}`)
      .then(response => {
        if (!response.ok) throw Error('Pin does not exist!');
        return response.json();
      })
      .then(json => json.data);

    // Refuse student fob for sign out
    if (currentTimesheet.item.io === 'out' && fetchedPin.type === 'student') {
      throw Error('You cannot use a student to pin to sign out!');
    }

    if (currentTimesheet.item.io === 'in' && fetchedPin.type === 'family') {
      throw Error('You cannot use a family to pin to sign in!');
    }

    // Sign student in
    if (fetchedPin.type === 'student') {
      const studentClub = fetchedPin.currentClubs.find(
        club =>
          club.day ===
          parseInt(format(new Date(currentTimesheet.item.date), 'E'))
      );

      addTimestamp({
        student: fetchedPin._id,
        club: studentClub ? studentClub._id : null,
        fobStatus,
        timesheet: timesheetId
      });
    }

    // Sign family out
    if (fetchedPin.type === 'family') {
      const familyStudents = await fetch(
        `${apiUrl}/api/family/${fetchedPin._id}/students`
      )
        .then(response => response.json())
        .then(json => json.data);

      const pickup = fetchedPin.pickups.find(
        pickup => pickup.pin === parseInt(pin)
      );

      if (familyStudents.length === 1) {
        const studentClub = familyStudents[0].currentClubs.find(
          club =>
            club.day ===
            parseInt(format(new Date(currentTimesheet.item.date), 'E'))
        );
        addTimestamp({
          student: familyStudents[0]._id,
          timesheet: timesheetId,
          pickup: {
            family: fetchedPin._id,
            pickup: pickup.name,
            pin: pickup.pin
          },
          club: studentClub ? studentClub._id : null
        });
      } else {
        setMultiStudent({
          students: familyStudents,
          pickup: pickup,
          family: fetchedPin._id
        });
      }
    }

    pinInputRef.current.focus();
  }

  return (
    <div className="flex">
      <div className="w-1/3 mr-2">
        <PinInput
          submitPinTimestamp={submitPinTimestamp}
          addTimestampFailure={addTimestampFailure}
          pinInputRef={pinInputRef}
        />
        <Alert alert={alert} />
        <MultiStudent
          multiStudent={multiStudent}
          setMultiStudent={setMultiStudent}
          addTimestamp={addTimestamp}
          currentTimesheet={currentTimesheet}
          pinInputRef={pinInputRef}
          signInTimestamps={signInTimestamps}
        />
        <ManualEntry submitPinTimestamp={submitPinTimestamp} />
      </div>
      <div className="w-2/3 border rounded p-2">
        <TimesheetHeader currentTimesheet={currentTimesheet} />
        <Filters />
        <div style={{ height: '540px' }} className="overflow-auto">
          <TimestampList />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    timesheetId: ownProps.match.params.id,
    currentTimesheet: state.currentTimesheet,
    alert: state.timestamp.alert,
    signInTimestamps: state.timestamp.signin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTimestamp: timestamp => {
      dispatch(addTimestamp(timestamp));
    },
    addTimestampFailure: error => {
      dispatch(addTimestampFailure(error));
    },
    getCurrentTimesheet: timesheetId => {
      dispatch(getCurrentTimesheet(timesheetId));
    },
    getDateTimesheetTimestamps: (date, io) => {
      dispatch(getDateTimesheetTimestamps(date, io));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeclock);
