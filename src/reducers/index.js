import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import pinLookup from './pinLookupReducer';
import timesheets from './timesheetReducer';
import family from './familyReducer';

export default combineReducers({
  postcareLocations,
  pinLookup,
  timesheets,
  family
});
