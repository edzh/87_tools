import AddStudent from '../Student/AddStudent';
import PinLookup from '../../containers/PinLookup';
import TimesheetForm from '../Timesheet/TimesheetForm';
import Timesheet from '../../containers/TimesheetContainer';
import Timeclock from '../../containers/TimeclockContainer';
import Family from '../../containers/FamilyContainer';
import FamilyPage from '../../containers/FamilyPageContainer';
import FamilyForm from '../Family/FamilyForm';
import StudentPage from '../../containers/StudentPageContainer';
import Student from '../../containers/StudentContainer';
import Club from '../../containers/ClubContainer';
import ClubPage from '../../containers/ClubPageContainer';
import ClubForm from '../Club/ClubForm';
import Program from '../../containers/ProgramContainer';
import ProgramPage from '../../containers/ProgramPageContainer';
import Session from '../../containers/SessionContainer';
import SessionPage from '../../containers/SessionPageContainer';
import SignIn from '../../containers/SignInContainer';
import SignUp from '../../containers/SignUpContainer';
import UserContainer from '../../containers/UserContainer';

const routes = [
  {
    path: '/addStudent',
    auth: true,
    component: AddStudent
  },
  {
    path: '/timesheet',
    auth: true,
    exact: true,
    component: Timesheet
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
    path: '/family',
    auth: true,
    exact: true,
    component: Family,
    routes: []
  },
  {
    path: '/family/new',
    auth: true,
    component: FamilyForm
  },
  {
    path: '/family/:id',
    auth: true,
    component: FamilyPage
  },
  {
    path: '/student/:id',
    auth: true,
    component: StudentPage
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
