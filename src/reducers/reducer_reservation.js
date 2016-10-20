import { MAKE_PRE_RESERVATION,
         CONFIRM_RESERVATION,
         GET_RESERVATION,
         CANCEL_RESERVATION } from '../actions/types';

export default function(state = {}, action) {
  let new_state;

  switch( action.type ) {
    case MAKE_PRE_RESERVATION:
      console.log("reducer_client: MAKE_PRE_RESERVATION");
      new_state = {...state};
      // error handling
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("reducer_client: MAKE_PRE_RESERVATION: error status: " + action.payload.response.status);
          new_state.reservationstatus = action.payload.response.status;
        }
        else {
          new_state.reservationstatus = -1;
        }
        return new_state;
      }
      // ok
      new_state.prereservation = action.payload.data.reservation;
      new_state.reservationstatus = 0;
      return new_state;

    case CONFIRM_RESERVATION:
      console.log("reducer_client: CONFIRM_RESERVATION");
      new_state = {...state};
      // error handling
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("reducer_client: CONFIRM_RESERVATION: error status: " + action.payload.response.status);
          new_state.reservationstatus = action.payload.response.status;
        }
        else {
          new_state.reservationstatus = -1;
        }
        return new_state;
      }
      // ok
      new_state.reservation_code = action.payload.data.reservation.reservationCode;
      new_state.reservationstatus = 0;
      return new_state;

    case GET_RESERVATION:
      console.log("reducer_client: GET_RESERVATION");
      new_state = {...state};
      // error handling
      if( !action.payload.data ) {
        if( action.payload.response ) {
          console.log("reducer_client: CONFIRM_RESERVATION: error status: " + action.payload.response.status);
          new_state.reservationstatus = action.payload.response.status;
        }
        else {
          new_state.reservationstatus = -1;
        }
        return new_state;
      }
      // ok
      new_state.reservation = action.payload.data.reservation;
      new_state.reservation_code = action.meta.reservation_code;
      new_state.hetu = action.meta.hetu;
      return new_state;

    case CANCEL_RESERVATION:
      console.log("reducer_client: GET_RESERVATION");

      // TODO: move response handling form reducer_app here

      return new_state;

    default:
      return state;
  }
}
