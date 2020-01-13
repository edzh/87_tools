import { combineReducers } from 'redux';
import { clubs, currentClub } from './clubReducer';
import { families, currentFamily } from './familyReducer';
import { programs, currentProgram } from './programReducer';
import { sessions, currentSession } from './sessionReducer';
import { students, currentStudent } from './studentReducer';
import { timesheets, currentTimesheet } from './timesheetReducer';
import clubPageReducer from '../features/clubs/clubSlice';
import timestamp from './timestampReducer';
import user from './userReducer';

export default combineReducers({
  currentClub,
  currentFamily,
  currentProgram,
  currentSession,
  currentStudent,
  currentTimesheet,
  clubs,
  clubPageReducer,
  families,
  programs,
  sessions,
  students,
  timesheets,
  timestamp,
  user
});
