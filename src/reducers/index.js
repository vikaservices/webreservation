import { combineReducers } from 'redux';
import termsReducer from './reducer_terms';
import unitsReducer from './reducer_units';
import freedaysReducer from './reducer_freedays';
import appReducer from './reducer_app';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  terms: termsReducer,
  units: unitsReducer,
  freedays: freedaysReducer,
  app: appReducer,
  form: formReducer
});

export default rootReducer;
