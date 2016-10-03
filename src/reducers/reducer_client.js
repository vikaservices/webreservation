import { CHECK_CLIENT_SSN, CREATE_CLIENT } from '../actions/types';

const INITIAL_STATE = {
  client_id: 0
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CHECK_CLIENT_SSN:
      console.log(action);
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("CHECK_CLIENT_SSN: got status: " + action.payload.response.status);
        }
        //console.log("CHECK_CLIENT_SSN: no data");
        return {...state, client_id: -1};
      }
      return {...state, client_id: action.payload.data.client.id};

    case CREATE_CLIENT:
      console.log(action);
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("CREATE_CLIENT: got status: " + action.payload.response.status);
        }
        return {...state, client_id: -2};
      }
      return {...state, client_id: action.payload.data.client.id};

    default:
      return state;
  }
}
