import { UNITS_SEARCH } from '../actions/types';

const INITIAL_STATE = {
  units_list: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UNITS_SEARCH:
      console.log("reducer: UNITS_SEARCH");
      if( !action.payload ) {
        return {...state, units_list: []}
      }
      return {...state, units_list: action.payload.data.units};

    default:
      return state;
  }
}
