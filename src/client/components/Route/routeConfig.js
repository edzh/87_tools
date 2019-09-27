import AddStudent from '../Student/AddStudent';
import PinLookup from '../../containers/PinLookup';

import TimesheetForm from '../Timesheet/TimesheetForm';
import Timesheet from '../../containers/TimesheetContainer';
import Timeclock from '../../containers/Timeclock/Timeclock';

import Family from '../../containers/Family/FamilyContainer';
import FamilyPage from '../../containers/Family/FamilyPageContainer';
import FamilyForm from '../Family/FamilyForm';

import StudentPage from '../../containers/Student/StudentPageContainer';
import StudentClubs from '../../containers/Student/StudentClubsContainer';
import Student from '../../containers/Student/StudentContainer';

import Club from '../../containers/Club/ClubContainer';
import ClubPage from '../../containers/Club/ClubPageContainer';
import ClubForm from '../Club/ClubForm';

import Program from '../../containers/Program/ProgramContainer';
import ProgramPage from '../../containers/Program/ProgramPageContainer';

import Session from '../../containers/Session/SessionContainer';
import SessionPage from '../../containers/Session/SessionPageContainer';

import SignIn from '../../containers/SignInContainer';
import SignUp from '../../containers/SignUpContainer';

import StreamlineAdd from '../../containers/StreamlineAdd';
import UserContainer from '../../containers/UserContainer';

const routes = [
  {
    path: '/addStudent',
    auth: true,
    component: AddStudent
  },
  {
    path: '/timesheet/new',
    auth: true,
    component: TimesheetForm
  },
  {
    path: '/timesheet/:id',
    auth: true,
    component: Timeclock
  },
  {
    path: '/family/:id',
    auth: true,
    component: FamilyPage
  },
  {
    path: '/student/:id',
    auth: true,
    component: StudentPage,
    routes: [
      {
        path: '/student/:id/clubs',
        exact: true,
        component: StudentClubs
      }
    ]
  },
  {
    path: '/club',
    auth: true,
    exact: true,
    component: Club,
    routes: []
  },
  {
    path: '/club/:id',
    auth: false,
    component: ClubPage
  },
  {
    path: '/club/new',
    auth: true,
    component: ClubForm
  },
  {
    path: '/program',
    auth: false,
    exact: true,
    component: Program
  },
  {
    path: '/program/:id',
    auth: false,
    component: ProgramPage,
    routes: [
      {
        path: '/program/:id/students',
        exact: true,
        component: Student
      },
      {
        path: '/program/:id/sessions',
        exact: true,
        component: Session
      },
      {
        path: '/program/:id/streamline',
        exact: true,
        component: StreamlineAdd
      },
      {
        path: '/program/:id/families',
        exact: true,
        component: Family
      }
    ]
  },
  {
    path: '/session',
    auth: false,
    exact: true,
    component: Session
  },
  {
    path: '/session/:id',
    auth: false,
    component: SessionPage,
    routes: [
      {
        path: '/session/:id/clubs',
        exact: true,
        component: Club
      },
      {
        path: '/session/:id/timesheets',
        exact: true,
        component: Timesheet
      }
    ]
  },
  {
    path: '/signin',
    auth: false,
    component: SignIn
  },
  {
    path: '/signup',
    auth: false,
    component: SignUp
  }
];

export default routes;
