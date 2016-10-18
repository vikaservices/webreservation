import { TIMESLOTS_SEARCH,
         LOGIN_CLIENT,
         LOGIN_OHC_CLIENT,
         CHECK_CLIENT_SSN,
         CHECK_OHC_CLIENT_SSN,
         CREATE_CLIENT,
         MAKE_PRE_RESERVATION,
         CONFIRM_RESERVATION,
         GET_RESERVATION,
         DLG_VIEW_NONE,
         DLG_VIEW_REGISTER_CHECK_SSN,
         DLG_VIEW_REGISTER_OHC_CHECK_SSN,
         DLG_VIEW_REGISTER_OHC_NOT_FOUND,
         DLG_VIEW_REGISTER_CREATE_CLIENT,
         DLG_VIEW_REGISTER_ERROR,
         DLG_VIEW_PRERESERVATION_ERROR,
         DLG_VIEW_CONFIRMATION_ERROR,
         DLG_VIEW_ORDER_REMINDER_ERROR,
         DLG_VIEW_CANCEL_RESERVATION,
         DLG_VIEW_CANCEL_RESERVATION_CONFIRM,
         DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND,
         DLG_VIEW_CANCEL_RESERVATION_OK,
         DLG_VIEW_CANCEL_RESERVATION_ERROR,
         APP_STATE_INITIAL,
         APP_STATE_CLIENT_IDENTIFIED,
         APP_STATE_WAIT_PRE_RESERVATION,
         APP_STATE_PRE_RESERVATION_OK,
         APP_STATE_WAIT_CONFIRMATION,
         APP_STATE_CONFIRMATION_OK,
         APP_STATE_CONFIRMATION_FAILED,
         APP_STATE_ORDER_REMINDER_OK,
         APP_STATE_ORDER_REMINDER_FAILED_NO_CLIENT,
         APP_STATE_ORDER_REMINDER_FAILED_NO_RESERVATION,
         APP_STATE_ORDER_REMINDER_FAILED,
         SET_SELECTED_DATE,
         SET_FILTERS,
         SAVE_SELECTED_TIMESLOT,
         CHANGE_TIME_SELECTION,
         SAVE_CLIENT_INFO,
         RESET,
         CANCEL_RESERVATION,
         SET_TIME_OF_DAY_FILTER,
         TOD_MORNING,
         TOD_DAY,
         TOD_AFTERNOON,
         ORDER_REMINDER,
         DIALOG_CLOSE
       } from '../actions/types';
import reducerTimeslots from './reducer_timeslots';
import reducerClient from './reducer_client';
import reducerReservation from './reducer_reservation';

let d = new Date();
let month = d.getMonth();
let year  = d.getFullYear();
let today = d.toISOString();

// date_filter: new Date(),
// date_filter_month: new Date().getMonth(),
// date_filter_year: new Date().getFullYear()

let INITIAL_STATE = {
                      timeslots_list: [],
                      client_id: 0,
                      hetu: null,
                      employers: [],
                      is_ohc_client: false,
                      client: {},
                      selected_employer: {},
                      dialogisopen: false,
                      dialogview: DLG_VIEW_NONE,
                      appstate: APP_STATE_INITIAL,
                      resource_section_active: 'hidden',
                      timesearch_section_active: 'active',
                      confirmation_section_active: 'inactive',
                      reservation_summary_section_active: 'hidden',
                      selectedtimeslot: {},
                      pendingreservation: false,
                      headertitle: 'Ajanvaraus',
                      timeofdayfilter: '',
                      reservationstatus: 0,
                      reservation_code: null,
                      prereservation: {},
                      reservation: {},
                      filters: {
                        terms_search: '',
                        units_search: '',
                        resource_filter: null,
                        speciality_filter: null,
                        group_filter: null,
                        unit_filter: null,
                        lang_filter: null,
                        gender_filter: null,
                        city_filter: null,
                        employer_id_filter: null,
                        date_filter: today,
                        date_filter_month: month,
                        date_filter_year: year,
                        do_terms_search: false,
                        do_units_filtering: false,
                        do_time_search: false
                      }
                    };

let new_state;
console.log(INITIAL_STATE);

export default function(state = INITIAL_STATE, action) {
  switch( action.type ) {

    case TIMESLOTS_SEARCH:
      console.log("reducer_app: TIMESLOTS_SEARCH");
      return reducerTimeslots( state, action );

    case LOGIN_CLIENT:
      console.log("reducer_app: LOGIN_CLIENT");
      new_state = {...state};
      new_state.dialogisopen = true;
      new_state.dialogview = DLG_VIEW_REGISTER_CHECK_SSN;
      return new_state;

    case LOGIN_OHC_CLIENT:
      console.log("reducer_app: LOGIN_OHC_CLIENT");
      new_state = {...state};
      new_state.dialogisopen = true;
      new_state.dialogview = DLG_VIEW_REGISTER_OHC_CHECK_SSN;
      return new_state;

    case CHECK_CLIENT_SSN:
      console.log("reducer_app: CHECK_CLIENT_SSN");
      new_state = reducerClient( state, action );
      // TODO: error handling
      if( new_state.client_id == -1 ) {
        // client doesn't exist
        new_state.dialogisopen = true;
        new_state.dialogview = DLG_VIEW_REGISTER_CREATE_CLIENT;
      } else if( new_state.client_id > 0 ) {
        // client identified
        new_state.dialogisopen = false;
        new_state.dialogview = DLG_VIEW_NONE;
        new_state.appstate = APP_STATE_CLIENT_IDENTIFIED;
        // check if this is Occupation Health Care client and
        // set selected employer according to mainEmployer
        new_state.employers.map((employer) => {
          // TODO: error handling ?
          if( employer.mainEmployer ) {
            new_state.is_ohc_client = true;
            new_state.selected_employer = employer;
          }
        });
        if( new_state.is_ohc_client ) {
          new_state.resource_section_active = 'active';
        }
      }
      console.log(new_state);
      return new_state;

    case CHECK_OHC_CLIENT_SSN:
      console.log("reducer_app: CHECK_OHC_CLIENT_SSN");
      new_state = reducerClient( state, action );
      if( new_state.is_ohc_client ) {
        // ok, this is ohc client
        new_state.dialogisopen = false;
        new_state.dielogview = DLG_VIEW_NONE;
        new_state.appstate = APP_STATE_CLIENT_IDENTIFIED;
        new_state.resource_section_active = 'active';
        new_state.timesearch_section_active = 'active';
        new_state.confirmation_section_active = 'inactive';
        // set selected employer according to mainEmployer
        new_state.employers.map((employer) => {
          // TODO: error handling ?
          if( employer.mainEmployer ) {
            new_state.selected_employer = employer;
            new_state.filters.employer_id_filter = employer.id;
            new_state.filters.terms_search = employer.name + " työterveystiimi";
            new_state.filters.do_time_search = true;
          }
        });

      } else if(false) {
        // web reservation for this ohc client is forbidden
        new_state.dialogisopen = true;
        new_state.dialogview = DLG_VIEW_REGISTER_OHC_FORBIDDEN;

      } else {
        // failed, not ohc client or client doesnt't exist
        new_state.dialogisopen = true;
        new_state.dialogview = DLG_VIEW_REGISTER_OHC_NOT_FOUND;
      }
      //console.log(new_state);
      return new_state;

    case CREATE_CLIENT:
      console.log("reducer_app: CREATE_CLIENT");
      new_state = reducerClient( state, action );
      // TODO: error handling
      if( new_state.client_id == -2 ) {
        // client creation failed
        new_state.dialogisopen = true;
        new_state.dialogview = DLG_VIEW_REGISTER_ERROR;
      } else if( new_state.client_id > 0 ) {
        // client creation ok
        new_state.dialogisopen = false;
        new_state.dialogview = DLG_VIEW_NONE;
        new_state.appstate = APP_STATE_CLIENT_IDENTIFIED;
        new_state.timesearch_section_active = 'inactive';
        new_state.confirmation_section_active = 'active';
      }
      console.log(new_state);
      return new_state;

      case MAKE_PRE_RESERVATION:
        console.log("reducer_app: MAKE_PRE_RESERVATION");
        console.log(action);
        new_state = reducerReservation(state, action);
        if( new_state.reservationstatus == 0 ) {
          // prereservation ok
          console.log("reducer_app: MAKE_PRE_RESERVATION: pre reservation ok");
          if( new_state.is_ohc_client ) {
            new_state.resource_section_active = 'inactive';
          } else {
            new_state.resource_section_active = 'hidden';
          }
          new_state.timesearch_section_active = 'inactive';
          new_state.confirmation_section_active = 'active';
          new_state.appstate = APP_STATE_PRE_RESERVATION_OK;
          new_state.dialogisopen = false;
          new_state.dialogview = DLG_VIEW_NONE;
          new_state.pendingreservation = false;
        } else {
          // prereservation failed
          console.log("reducer_app: MAKE_PRE_RESERVATION: pre reservation failed");
          new_state.dialogisopen = true;
          new_state.dialogview = DLG_VIEW_PRERESERVATION_ERROR;
        }
        console.log(new_state);
        return new_state;

      case CONFIRM_RESERVATION:
        console.log("CONFIRM_RESERVATION");
        console.log(action);
        new_state = reducerReservation(state, action);
        if( new_state.reservationstatus == 0 ) {
          // confirming reservation ok
          console.log("CONFIRM_RESERVATION : confirm ok");
          new_state.appstate = APP_STATE_CONFIRMATION_OK;
          new_state.dialogisopen = false;
          new_state.dialogview = DLG_VIEW_NONE;
          new_state.resource_section_active = 'hidden';
          new_state.timesearch_section_active = 'hidden';
          new_state.confirmation_section_active = 'hidden';
          new_state.reservation_summary_section_active = 'active';
          new_state.headertitle = "Kiitos varauksesta!";
        } else {
          // confirming reservation failed
          console.log("CONFIRM_RESERVATION : confirm failed");
          new_state.appstate = APP_STATE_CONFIRMATION_FAILED;
          new_state.dialogisopen = true;
          new_state.dialogview = DLG_VIEW_CONFIRMATION_ERROR;
        }
        console.log(new_state);
        return new_state;

      case GET_RESERVATION:
        console.log("GET_RESERVATION");
        console.log(action);
        new_state = {...state};
        if( !action.payload ){
          new_state.dialogisopen = true;
          new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION_ERROR;
          return new_state;
        }
        if( !action.payload.data ) {
          if( action.payload.response && action.payload.response.status == 404 ) {
            new_state.dialogisopen = true;
            new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND;
            new_state.reservationstatus = action.payload.response.status;
            return new_state;
          }
        }
        if( !action.meta.standalone ) {
          new_state.dialogisopen = true;
          new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION_CONFIRM;
        }
        new_state.reservation = action.payload.data.reservation;
        new_state.reservation_code = action.meta.reservation_code;
        new_state.hetu = action.meta.hetu;
        return new_state;

      case SAVE_SELECTED_TIMESLOT:
        console.log("reducer_app: SAVE_SELECTED_TIMESLOT");
        return {...state, selectedtimeslot: action.selectedtimeslot, pendingreservation: true};

      case SAVE_CLIENT_INFO:
        return {...state, client: action.client};

      case RESET:
        new_state = {...state};
        if( new_state.appstate != APP_STATE_INITIAL ) {
          new_state.appstate = APP_STATE_CLIENT_IDENTIFIED;
        }
        if( new_state.is_ohc_client ) {
          new_state.resource_section_active = 'active';
        }
        new_state.timesearch_section_active = 'active';
        new_state.confirmation_section_active = 'inactive';
        new_state.reservation_summary_section_active = 'hidden';
        new_state.dialogisopen = false;
        new_state.dialogview = DLG_VIEW_NONE;
        new_state.headertitle = 'Ajanvaraus';
        return new_state;

      case CANCEL_RESERVATION:
        new_state = {...state};

        console.log(action);

        if( action.payload ) {
          if( action.payload.status == 204 ) {
            // delete ok
            console.log("CANCEL_RESERVATION: delete ok");
            new_state.dialogisopen = true;
            new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION_OK;
            new_state.reservationstatus = 204;

          } else if( action.payload.status == 404 ) {
            // delete error
            console.log("CANCEL_RESERVATION: delete error 404");
            new_state.dialogisopen = true;
            new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND;
            new_state.reservationstatus = 404;

          } else {
            // some other delete error
            console.log("CANCEL_RESERVATION: some other error");
            new_state.dialogisopen = true;
            new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION_ERROR;
          }
        }
        else {
          // init dialog for asking reservation code
          console.log("CANCEL_RESERVATION: open dialog");
          new_state.dialogisopen = true;
          new_state.dialogview = DLG_VIEW_CANCEL_RESERVATION;
        }
        return new_state;

      case SET_TIME_OF_DAY_FILTER:
        let filter;
        switch(action.timeofdayfilter) {
          case 'morning':
            filter=TOD_MORNING;
            break;
          case 'day':
            filter=TOD_DAY;
            break;
          case 'afternoon':
            filter=TOD_AFTERNOON;
            break;
          default:
            filter='';
        }
        return {...state, timeofdayfilter: filter};

      case SET_FILTERS:
        console.log("SET_FILTERS");
        new_state = {...state};
        new_state.filters = action.filters;
        console.log(new_state);
        return new_state;

      case ORDER_REMINDER:
        console.log("ORDER_REMINDER");
        new_state = {...state};

        if( action.payload.response && action.payload.response.status == 200 ) {
          new_state.appstate = APP_STATE_ORDER_REMINDER_OK;
        } else {
          new_state.appstate = APP_STATE_ORDER_REMINDER_OK;
          return new_state;
          if( action.payload.response && action.payload.response.status == 400 ) {
            new_state.appstate = APP_STATE_ORDER_REMINDER_FAILED_NO_CLIENT;
          } else if( action.payload.response && action.payload.response.status == 404 ) {
            new_state.appstate = APP_STATE_ORDER_REMINDER_FAILED_NO_RESERVATION;
          } else {
            new_state.appstate = APP_STATE_ORDER_REMINDER_FAILED;
          }
          new_state.dialogisopen = true;
          new_state.dialogview = DLG_VIEW_ORDER_REMINDER_ERROR;
        }
        console.log("appstate: " + new_state.appstate);
        return new_state;

      case DIALOG_CLOSE:
        new_state = {...state};
        new_state.dialogisopen = false;
        new_state.dialogview = DLG_VIEW_NONE;
        return new_state;

      default:
        return state;
  }
}
