import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import club from './clubReducer';
import family from './familyReducer';
import program from './programReducer';
import session from './sessionReducer';
import student from './studentReducer';
import timesheets from './timesheetReducer';
import user from './userReducer';

export default combineReducers({
  club,
  family,
  program,
  session,
  student,
  timesheets,
  user
});
