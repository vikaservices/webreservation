import { TIMESLOTS_SEARCH } from '../actions/types';

const INITIAL_STATE = {
  timeslots_list: [],
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TIMESLOTS_SEARCH:
      console.log("reducer_timeslots: TIMESLOTS_SEARCH");
      //console.log(action);
      if( !action.payload ) {
        return {...state, timeslots_list: []};
      }
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("TIMESLOTS_SEARCH: got error status: " + action.payload.response.status);
        }
        return {...state, timeslots_list: []};
      }
      return {...state, timeslots_list: action.payload.data.timeslots};

    default:
      return state;
  }
}
