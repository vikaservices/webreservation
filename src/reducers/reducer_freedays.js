import { FREEDAYS_SEARCH } from '../actions/types';

const INITIAL_STATE = {
  freedays_list: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case FREEDAYS_SEARCH:
        //console.log(action);
        if( !action.payload ) {
          return {...state, freedays_list: []};
        }
        if( !action.payload.data ) {
          if( action.payload.response ) {
            console.log("FREEDAYS_SEARCH: got error status: " + action.payload.response.status);
          }
          return {...state, freedays_list: []};
        }
        return {...state, freedays_list: action.payload.data.freedays};

      default:
        return state;
    }
}
