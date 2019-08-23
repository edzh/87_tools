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
import Session from '../../containers/SessionContainer';
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
    component: Family,
    routes: [
      {
        path: '/family/new',
        auth: true,
        component: FamilyForm
      },
      {
        path: '/family/id/:id',
        auth: true,
        component: FamilyPage
      }
    ]
  },
  {
    path: '/student/:id',
    auth: true,
    component: StudentPage
  },
  {
    path: '/club',
    auth: true,
    component: Club,
    routes: [
      {
        path: '/club/:id',
        auth: false,
        component: ClubPage
      },
      {
        path: '/club/new',
        auth: true,
        component: ClubForm
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
