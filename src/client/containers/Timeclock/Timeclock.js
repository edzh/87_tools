import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { apiUrl } from 'config';

import { getCurrentTimesheet } from '../../actions/timesheetActions';
import {
  addTimestamp,
  addTimestampFailure
} from '../../actions/timeclockActions';

import TimestampList from './TimestampList';
import MultiStudent from '../../components/Timeclock/MultiStudent';

const PinSchema = Yup.object().shape({
  pin: Yup.string().required('Please enter a pin!')
});

function Timeclock({
  getCurrentTimesheet,
  currentTimesheet,
  addTimestamp,
  addTimestampFailure,
  timesheetId,
  alert
}) {
  const [multiStudent, setMultiStudent] = useState({ students: [] });

  useEffect(() => {
    getCurrentTimesheet(timesheetId);
  }, []);

  async function submitPinTimestamp(pin) {
    const fetchedPin = await fetch(`${apiUrl}/api/pin/${pin}`)
      .then(response => {
        if (!response.ok) throw Error('Invalid pin!');
        return response.json();
      })
      .then(json => json.data);

    if (currentTimesheet.item.io === 'out' && fetchedPin.type === 'student') {
      throw Error('You cannot use a student to pin to sign out!');
    }

    if (fetchedPin.type === 'student') {
      const studentClub = fetchedPin.currentClubs.find(
        club =>
          club.day ===
          parseInt(format(new Date(currentTimesheet.item.date), 'E'))
      );

      addTimestamp({
        student: fetchedPin._id,
        club: studentClub ? studentClub._id : null,
        timesheet: timesheetId
      });
    }

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
  }

  return (
    <div>
      <Formik
        initialValues={{
          pin: ''
        }}
        // validationSchema={PinSchema}
        onSubmit={values => {
          submitPinTimestamp(values.pin).catch(err => addTimestampFailure(err));
        }}
      >
        {({ errors }) => (
          <Form>
            <Field name="pin" className="border rounded" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {alert ? (
        <div className={alert.type === 'error' ? `bg-red` : `bg-green`}>
          {alert.type} {alert.message}
        </div>
      ) : null}
      <MultiStudent
        multiStudent={multiStudent}
        addTimestamp={addTimestamp}
        currentTimesheet={currentTimesheet}
        setMultiStudent={setMultiStudent}
      />
      <TimestampList />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    timesheetId: ownProps.match.params.id,
    currentTimesheet: state.timesheet.currentTimesheet,
    alert: state.timestamp.alert
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeclock);
