import { TIMESLOTS_SEARCH } from '../actions/types';

const INITIAL_STATE = {
  timeslots_list: [],  // returned list of timeslots
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TIMESLOTS_SEARCH:
      console.log("reducer_timeslots: TIMESLOTS_SEARCH");
      //console.log(action);
      if( !action.payload ) {
        console.log("got empty payload");
        return {...state, timeslots_list: []};
      }
      // TODO: error handling
      //console.log(action.payload.data.timeslots);
      return {...state, timeslots_list: action.payload.data.timeslots};
    default:
      return state;
  }
}
