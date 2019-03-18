import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import student from './studentReducer';
import timesheets from './timesheetReducer';
import family from './familyReducer';
import club from './clubReducer';

export default combineReducers({
  postcareLocations,
  student,
  timesheets,
  family,
  club
});
