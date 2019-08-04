import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import student from './studentReducer';
import timesheets from './timesheetReducer';
import family from './familyReducer';
import club from './clubReducer';
import user from './userReducer';

export default combineReducers({
  student,
  timesheets,
  family,
  club,
  user
});
