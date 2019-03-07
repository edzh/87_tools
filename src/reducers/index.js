import { combineReducers } from 'redux';
import postcareLocations from './postcareLocationsReducer';
import pinLookup from './pinLookupReducer';
import timesheets from './timesheetReducer';

export default combineReducers({
  postcareLocations,
  pinLookup,
  timesheets
});
