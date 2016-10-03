import { MAKE_PRE_RESERVATION, CONFIRM_RESERVATION } from '../actions/types';

const INITIAL_STATE = {
    reservationstatus: 0
};

export default function(state = INITIAL_STATE, action) {
  switch( action.type ) {
    case MAKE_PRE_RESERVATION:
      console.log("MAKE_PRE_RESERVATION");
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("MAKE_PRE_RESERVATION: got status: " + action.payload.response.status);
          return {...state, reservationstatus: action.payload.response.status};
        }
        // TODO:
        console.log("MAKE_PRE_RESERVATION: some error");
      }
      return {...state, reservationstatus: 0, reservation_id: action.payload.data.reservation};

    case CONFIRM_RESERVATION:
      console.log("CONFIRM_RESERVATION");
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("CONFIRM_RESERVATION: got status: " + action.payload.response.status);
          return {...state, reservationstatus: action.payload.response.status};
        }
        // TODO:
        console.log("CONFIRM_RESERVATION: some error");
      }
      return {...state, reservationstatus: 0, reservation_code: action.payload.data.code};

    default:
      return state;
  }
}
