import { combineReducers } from 'redux';
//import timeslotsReducer from './reducer_timeslots';
import termsReducer from './reducer_terms';
import unitsReducer from './reducer_units';
import freedaysReducer from './reducer_freedays';
//import clientReducer from './reducer_client';
import appReducer from './reducer_app';

const rootReducer = combineReducers({
//  timeslots: timeslotsReducer,
  terms: termsReducer,
  units: unitsReducer,
  freedays: freedaysReducer,
//  clientid: clientReducer,
  app: appReducer
});

export default rootReducer;
