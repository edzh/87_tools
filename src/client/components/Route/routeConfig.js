import TimesheetForm from '../Timesheet/TimesheetForm';
import Timesheet from '../../containers/TimesheetContainer';
import Timeclock from '../../containers/Timeclock/Timeclock';
import TimesheetPage from '../../features/timesheet/TimesheetPage';
import Attendance from '../../features/timesheet/Attendance';

import Family from '../../containers/Family/FamilyContainer';
import FamilyPage from '../../containers/Family/FamilyPageContainer';
import FamilyForm from '../Family/FamilyForm';

import StudentPage from '../../containers/Student/StudentPageContainer';
import StudentClubs from '../../containers/Student/StudentClubsContainer';
import StudentFamily from '../../containers/Student/StudentFamilyContainer';
import Student from '../../containers/Student/StudentContainer';

import Club from '../../containers/Club/ClubContainer';
import ClubForm from '../Club/ClubForm';
import ClubPage from '../../features/clubs/ClubPage';
import ClubDetails from '../../features/clubs/ClubDetails';
import ClubStudents from '../../features/clubs/ClubStudents';
import ClubAttendance from '../../features/clubs/ClubAttendance';

import Program from '../../containers/Program/ProgramContainer';
import ProgramPage from '../../containers/Program/ProgramPageContainer';
import Dashboard from '../../containers/Program/Dashboard';

import PinPage from 'client/features/pin/PinPage';

import Session from '../../containers/Session/SessionContainer';
import SessionPage from '../../containers/Session/SessionPageContainer';
import Today from '../../containers/Session/Today/TodayContainer';

import SignIn from '../../containers/SignInContainer';
import SignUp from '../../containers/SignUpContainer';

import StreamlineAdd from '../../containers/StreamlineAdd';
import UserContainer from '../../containers/UserContainer';

const routes = [
  {
    path: '/timesheet/new',
    auth: true,
    component: TimesheetForm
  },
  {
    path: '/timesheet/:id',
    auth: true,
    component: TimesheetPage,
    routes: [
      {
        path: '/timesheet/:id/timeclock',
        exact: true,
        component: Timeclock
      },
      {
        path: '/timesheet/:id/attendance',
        exact: true,
        component: Attendance
      }
    ]
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
      },
      {
        path: '/student/:id/family',
        exact: true,
        component: StudentFamily
      }
    ]
  },
  {
    path: '/club/:id',
    auth: true,
    component: ClubPage,
    routes: [
      {
        path: '/club/:id',
        exact: true,
        component: ClubDetails
      },
      {
        path: '/club/:id/students',
        exact: true,
        component: ClubStudents
      },
      {
        path: '/club/:id/attendance',
        exact: true,
        component: ClubAttendance
      }
    ]
  },
  {
    path: '/club/new',
    auth: true,
    component: ClubForm
  },
  {
    path: '/program',
    auth: true,
    exact: true,
    component: Program
  },
  {
    path: '/program/:id',
    auth: true,
    component: ProgramPage,
    routes: [
      {
        path: '/program/:id',
        exact: true,
        component: Dashboard
      },
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
      },
      {
        path: '/program/:id/pin',
        exact: true,
        component: PinPage
      }
    ]
  },
  {
    path: '/session',
    auth: true,
    exact: true,
    component: Session
  },
  {
    path: '/session/:id',
    auth: true,
    component: SessionPage,
    routes: [
      {
        path: '/session/:id/today',
        exact: true,
        component: Today
      },
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
