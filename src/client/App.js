import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WithAuth from './containers/WithAuthContainer';

import Navbar from './containers/NavbarContainer';
import PinLookup from './containers/PinLookup';
import AddStudent from './components/Student/AddStudent';
import TimesheetForm from './components/Timesheet/TimesheetForm';
import Timesheet from './containers/TimesheetContainer';
import Timeclock from './containers/TimeclockContainer';
import Family from './containers/FamilyContainer';
import FamilyPage from './containers/FamilyPageContainer';
import FamilyForm from './components/Family/FamilyForm';
import StudentPage from './containers/StudentPageContainer';
import Student from './containers/StudentContainer';
import Club from './containers/ClubContainer';
import ClubPage from './containers/ClubPageContainer';
import ClubForm from './components/Club/ClubForm';
import Program from './containers/ProgramContainer';
import Session from './containers/SessionContainer';
import SignIn from './containers/SignInContainer';
import SignUp from './containers/SignUpContainer';
import UserContainer from './containers/UserContainer';

class App extends Component {
  render() {
    return (
      <UserContainer>
        <Router>
          <div style={{ fontFamily: 'sans-serif' }}>
            <Navbar />
            <div className="lg:ml-64 ml-16 p-4 bg-white relative z-10">
              <Route exact path={'/pinlookup'} render={() => <PinLookup />} />
              <Route
                exact
                path={'/addstudent'}
                render={() => (
                  <WithAuth>
                    <AddStudent />
                  </WithAuth>
                )}
              />
              <Route exact path={'/students'} render={() => <Student />} />
              <Route
                exact
                path={'/timesheet/'}
                render={() => (
                  <WithAuth>
                    <Timesheet />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/timesheet/new'}
                render={() => (
                  <WithAuth>
                    <TimesheetForm />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/timesheet/id/:id'}
                render={({ match }) => (
                  <WithAuth>
                    <Timeclock timesheet={match.params.id} />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/family'}
                render={() => (
                  <WithAuth>
                    <Family />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/family/new'}
                render={() => (
                  <WithAuth>
                    <FamilyForm />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/family/id/:id'}
                render={({ match }) => (
                  <WithAuth>
                    <FamilyPage family={match.params.id} />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/student/:id'}
                render={({ match }) => (
                  <WithAuth>
                    <StudentPage studentId={match.params.id} />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/club'}
                render={() => (
                  <WithAuth>
                    <Club />
                  </WithAuth>
                )}
              />
              <Route
                exact
                path={'/club/id/:id'}
                render={({ match }) => <ClubPage club={match.params.id} />}
              />
              <Route
                exact
                path={'/club/new'}
                render={() => (
                  <WithAuth>
                    <ClubForm />
                  </WithAuth>
                )}
              />
              <Route exact path={'/program'} render={() => <Program />} />
              <Route exact path={'/session'} render={() => <Session />} />
              <Route exact path={'/signin'} render={() => <SignIn />} />
              <Route exact path={'/signup'} render={() => <SignUp />} />
            </div>
          </div>
        </Router>
      </UserContainer>
    );
  }
}

export default App;
