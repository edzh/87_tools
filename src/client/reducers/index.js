import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import { clubs, currentClub } from './clubReducer';
import { families } from './familyReducer';
import { programs, currentProgram } from './programReducer';
import { sessions, currentSession } from './sessionReducer';
import { students, currentStudent } from './studentReducer';
import { timesheets, currentTimesheet } from './timesheetReducer';
import timestamp from './timestampReducer';
import user from './userReducer';

export default combineReducers({
  currentClub,
  currentProgram,
  currentSession,
  currentStudent,
  currentTimesheet,
  clubs,
  families,
  programs,
  sessions,
  students,
  timesheets,
  timestamp,
  user
});
