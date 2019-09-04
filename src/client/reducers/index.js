import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import club from './clubReducer';
import family from './familyReducer';
import program from './programReducer';
import session from './sessionReducer';
import student from './studentReducer';
import timesheet from './timesheetReducer';
import timestamp from './timestampReducer';
import user from './userReducer';

export default combineReducers({
  club,
  family,
  program,
  session,
  student,
  timesheet,
  timestamp,
  user
});
