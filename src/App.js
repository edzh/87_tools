import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styles from './App.css';

import Navbar from './components/Navbar/Navbar';
import PinLookup from './containers/PinLookup';
import AddStudent from './components/Student/AddStudent';
import TimesheetForm from './components/Timesheet/TimesheetForm';
import Timesheet from './containers/Timesheet';
import Timeclock from './containers/TimeclockContainer';
import Family from './containers/FamilyContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div
          className="container"
          style={{ fontFamily: ['Roboto', 'sans-serif'] }}
        >
          <Navbar className="nav" />
          <Route exact path={'/pinlookup'} render={() => <PinLookup />} />
          <Route exact path={'/addstudent'} render={() => <AddStudent />} />
          <Route exact path={'/timesheet/'} render={() => <Timesheet />} />
          <Route
            exact
            path={'/timesheet/new'}
            render={() => <TimesheetForm />}
          />
          <Route
            exact
            path={'/timesheet/id/:id'}
            render={({ match }) => <Timeclock timesheet={match.params.id} />}
          />
          <Route exact path={'/family'} render={() => <Family />} />
        </div>
      </Router>
    );
  }
}

export default App;
