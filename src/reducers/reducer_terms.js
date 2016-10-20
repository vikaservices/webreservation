import { TERMS_SEARCH } from '../actions/types';

const INITIAL_STATE = {
  terms_list: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TERMS_SEARCH:
      console.log("reducer_terms: TERMS_SEARCH");
      if( !action.payload ) {
        return {...state, terms_list: []}
      }
      console.log(action.payload.data.terms);
      return {...state, terms_list: action.payload.data.terms};

    default:
      return state;
  }
}
