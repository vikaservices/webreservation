import { CHECK_CLIENT_SSN,
         CHECK_OHC_CLIENT_SSN,
         CREATE_CLIENT
       } from '../actions/types';

const INITIAL_STATE = {
  client_id: 0,
  employers: [],
  is_ohc_client: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    // handle both cases same way, upper lever reducer_app will check from
    // is_ohc_client field whether client is Occupation Health Care client
    // or not
    case CHECK_CLIENT_SSN:
    case CHECK_OHC_CLIENT_SSN:
      console.log(action);
      let new_state = {...state};
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("CHECK_CLIENT_SSN/CHECK_OHC_CLIENT_SSN: got error status: " + action.payload.response.status);
          if( action.payload.response.status == 404 ) {
            // client doesn't exist
            new_state.client_id = -1;
          } else {
            // some other error
            console.log("CHECK_CLIENT_SSN/CHECK_OHC_CLIENT_SSN: some other error");
          }
        }
      } else {
        new_state.client_id = action.payload.data.client.id;
        new_state.employers = action.payload.data.client.employers;
        new_state.is_ohc_client = action.payload.data.client.employers.length ? true : false;
      }
      return new_state;

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
