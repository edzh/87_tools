import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import PinLookup from './containers/PinLookup';
import AddStudent from './components/Student/AddStudent';
import TimesheetForm from './components/Timesheet/TimesheetForm';
import Timesheet from './containers/TimesheetContainer';
import Timeclock from './containers/TimeclockContainer';
import Family from './containers/FamilyContainer';
import FamilyPage from './containers/FamilyPageContainer';
import StudentPage from './containers/StudentPageContainer';
import Club from './containers/ClubContainer';
import ClubPage from './containers/ClubPageContainer';

import DbMigrate from './data/db.migrate.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ fontFamily: ['Roboto', 'sans-serif'] }}>
          <Navbar className="nav" />
          <div className="lg:ml-64 ml-16 p-4">
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
            <Route
              exact
              path={'/family/:id'}
              render={({ match }) => <FamilyPage family={match.params.id} />}
            />
            <Route
              exact
              path={'/student/:id'}
              render={({ match }) => <StudentPage student={match.params.id} />}
            />
            <Route exact path={'/club'} render={() => <Club />} />
            <Route
              exact
              path={'/club/:id'}
              render={({ match }) => <ClubPage club={match.params.id} />}
            />
            <Route exact path={'/dbmigrate'} render={() => <DbMigrate />} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
