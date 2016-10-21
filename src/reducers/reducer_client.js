import { CHECK_CLIENT_SSN,
         CHECK_OHC_CLIENT_SSN,
         CREATE_CLIENT
       } from '../actions/types';


export default function(state = {}, action) {
  let new_state = {...state};
  switch(action.type) {
    // handle both cases same way, upper lever reducer_app will check from
    // is_ohc_client field whether client is Occupation Health Care client
    // or not
    case CHECK_CLIENT_SSN:
    case CHECK_OHC_CLIENT_SSN:
      console.log(action);
      // error handling
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("reducer_client: CHECK_CLIENT_SSN/CHECK_OHC_CLIENT_SSN: error status: " + action.payload.response.status);
          new_state.reservationstatus = action.payload.response.status;
        }
        else {
          new_state.reservationstatus = -1;
        }
        new_state.client_id = 0;
        return new_state;
      }
      // ok
      new_state.client_id = action.payload.data.client.id;
      new_state.employers = action.payload.data.client.employers;
      new_state.is_ohc_client = action.payload.data.client.employers.length ? true : false;
      new_state.reservationstatus = 0;
      return new_state;

    case CREATE_CLIENT:
      console.log(action);
      // error handling
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("reducer_client: CREATE_CLIENT: error status: " + action.payload.response.status);
          new_state.reservationstatus = action.payload.response.status;
        }
        else {
          new_state.reservationstatus = -1;
        }
        new_state.client_id = 0;
        return new_state;
      }
      // ok
      new_state.client_id = action.payload.data.client.id;
      new_state.reservationstatus = 0;
      return new_state;

    default:
      return state;
  }
}
