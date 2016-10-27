import { TERMS_SEARCH,
         UNITS_SEARCH,
         TIMESLOTS_SEARCH,
         FREEDAYS_SEARCH,
         MAKE_PRE_RESERVATION,
         CONFIRM_RESERVATION,
         GET_RESERVATION,
         CHECK_CLIENT_SSN,
         CHECK_OHC_CLIENT_SSN,
         CREATE_CLIENT,
         DIALOG_CLOSE,
         SAVE_SELECTED_TIMESLOT,
         LOGIN_CLIENT,
         LOGIN_OHC_CLIENT,
         SAVE_CLIENT_INFO,
         RESET,
         CANCEL_RESERVATION,
         SET_TIME_OF_DAY_FILTER,
         SET_FILTERS,
         ORDER_REMINDER,
         SET_SELECTED_EMPLOYER,
         GET_DOCTOR_INFO
        } from './types';
//import { UIServerUrl } from '../../utils/conf';
import axios from 'axios';
//import Config from 'Config';

//let UIServerUrl = "http://vob.fi:4000/";
let UIServerUrl = "http://localhost:3000/";

export function termsSearch(terms=null) {

  console.log( "Action: termsSearch: " + terms );

  if( !terms ) {
    return {
      type: TERMS_SEARCH,
      payload: null
    };
  }

  const request = axios.get(`${UIServerUrl}terms?prefix=${terms}`);

  return {
    type: TERMS_SEARCH,
    payload: request,
  };
}


export function unitsSearch(units = '') {

  console.log( "Action: unitsSearch" );

  const request = axios.get(`${UIServerUrl}units?prefix=${units}`);

  return {
    type: UNITS_SEARCH,
    payload: request
  };
}


export function timeslotsSearch(date, resource=null, speciality=null, groups=null, unit=null,
                                lang=null, gender=null, city=null, employer=null, client=null) {

  let search_str = `timeslots?date=${date}`;
  search_str += resource    ? `&resource=${resource}`     : '';
  search_str += speciality  ? `&speciality=${speciality}` : '';
  search_str += groups      ? `&groups=${groups}`         : '';
  search_str += unit        ? `&unit=${unit}`             : '';
  //search_str += lang        ? `&lang=${lang}`             : '';
  //search_str += gender      ? `&gender=${gender}`         : '';
  //search_str += city        ? `&city=${city}`             : '';
  search_str += employer    ? `&employer=${employer}`     : '';
  search_str += employer && client ? `&client=${client}`  : '';
  console.log("Action: timeslotsSearch" + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);

  return {
    type: TIMESLOTS_SEARCH,
    payload: request
  };
}


export function freedaysSearch(from, to, resource=null, speciality=null, groups=null, unit=null,
                               lang=null, gender=null, city=null, employer=null, client=null) {

  if( resource == null && speciality == null && groups == null && unit == null &&
      lang == null && gender == null && city == null && employer == null && client == null) {
    return {
      type: FREEDAYS_SEARCH,
      payload: null
    };
  }

  let search_str = `freedays?from=${from}&to=${to}`;
  search_str += resource    ? `&resource=${resource}`     : '';
  search_str += speciality  ? `&speciality=${speciality}` : '';
  search_str += groups      ? `&groups=${groups}`           : '';
  search_str += unit        ? `&unit=${unit}`             : '';
  //search_str += lang        ? `&lang=${lang}`             : '';
  //search_str += gender      ? `&gender=${gender}`         : '';
  //search_str += city        ? `&city=${city}`             : '';
  search_str += employer      ? `&employer=${employer}`     : '';
  search_str += employer && client ? `&client=${client}`    : '';

  console.log("Action: freedaysSearch" + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);

  return {
    type: FREEDAYS_SEARCH,
    payload: request
  };
}

export function loginClient( pending_reservation = false ) {

  console.log("Action: loginClient")
  return {
    type: LOGIN_CLIENT,
    pendingreservation: pending_reservation
  };
}

export function loginOhcClient() {

  console.log("Action: loginOhcClient");
  return {
    type: LOGIN_OHC_CLIENT
  };
}

export function checkClientSSN( ssn ) {

  let search_str = `clients?method=GET&hetu=${ssn}`;
  console.log("Action: checkClientSSN: " + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);
  return {
    type: CHECK_CLIENT_SSN,
    payload: request
  };
}

export function checkOhcClientSSN( ssn ) {

  let search_str = `clients?method=GET&hetu=${ssn}`;

  console.log("Action: checkOhcClientSSN: " + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);
  return {
    type: CHECK_OHC_CLIENT_SSN,
    payload: request
  };
}

export function createClient( ssn, first_name, last_name, address, postcode, city, phone) {

  let request_str = `clients?method=PUT&hetu=${ssn}&firstName=${first_name}&lastName=${last_name}`;
  request_str += `&address=${address}&postcode=${postcode}&city=${city}&phone=${phone}`;
  console.log("Action: createClient: " + request_str);

  const request = axios.get(`${UIServerUrl}${request_str}`);

  return {
    type: CREATE_CLIENT,
    payload: request
  };
}

export function closeDialog() {
  return {
    type: DIALOG_CLOSE
  };
}

export function saveSelectedTimeslot( resourceId, unitId, start, duration, online,
                                      imageUrl, resourceName, title, unitName, starttimehours ) {
  const timeslot = {
    title: title,
    unitId: unitId,
    unitName: unitName,
    resourceId: resourceId,
    resourceName: resourceName,
    start: start,
    duration: duration,
    imageUrl: imageUrl,
    startTimeHours: starttimehours,
    online: online
  };

  return {
    type: SAVE_SELECTED_TIMESLOT,
    selectedtimeslot: timeslot
  };
}

export function makePreReservation(clientId, resourceId, unitId, start, duration, employerId=null) {

  let request_str = `reservations?method=PUT&clientId=${clientId}&resourceId=${resourceId}`;
  request_str += `&unitId=${unitId}&start=${start}&duration=${duration}`;
  request_str += employerId != null ? `&employerId=${employerId}` : '';

  console.log("Action: makePreReservation: " + request_str)

  const request = axios.get(`${UIServerUrl}${request_str}`);

  return {
    type: MAKE_PRE_RESERVATION,
    payload: request
  };
}

export function confirmReservation(reservationId, clientId, notes, visitType,
                                   smsNotificationTo, emailConfirmationTo=null) {

  let request_str = `reservations?method=POST&reservationId=${reservationId}&clientId=${clientId}`;
  request_str += `&notes=${notes}&visitType=${visitType}`;
  request_str += `&smsNotificationTo=${smsNotificationTo}&emailConfirmationTo=${emailConfirmationTo}`;

  console.log("Action: confirmReservation: " + request_str);

  const request = axios(`${UIServerUrl}${request_str}`);

  return {
    type: CONFIRM_RESERVATION,
    payload: request
  };
}


export function getReservation(code, ssn, standalone=null) {
  let request_str = `reservations?hetu=${ssn}&reservationCode=${code}`;

  console.log("Action: getReservation: " + request_str);

  const request = axios.get(`${UIServerUrl}${request_str}`);

  return {
    type: GET_RESERVATION,
    payload: request,
    meta: {reservation_code: code, hetu: ssn, standalone: standalone}
  };
}


// calling without code will init opening dialog asking for reservation code
// calling with code will cause delete call with 'reservations' API call
export function cancelReservation( code = null, hetu = null ) {
  if( code ) {
    let request_str = `reservations?method=DELETE&reservationCode=${code}`;
    request_str += hetu ? `&hetu=${hetu}` : '';
    console.log("Action: cancelReservation: request_str = " + request_str);

    const request = axios.get(`${UIServerUrl}${request_str}`);
    //console.log(request);

    return {
      type: CANCEL_RESERVATION,
      payload: request
    }

  } else {
    return {
      type: CANCEL_RESERVATION
    }
  }
}

export function saveClientInfo(ssn = null, first_name = null, last_name = null,
                               address = null, postcode = null, city = null, phone = null) {
  const client = {
     ssn: ssn,
     first_name: first_name,
     last_name: last_name,
     address: address,
     postcode: postcode,
     city: city,
     phone: phone,
     email: ''
  };
  return {
    type: SAVE_CLIENT_INFO,
    client: client
  }
}

export function resetState( reload=false ) {
  return {
    type: RESET,
    reload: reload
  }
}

export function setTimeOfDayFilter(filter) {
  return {
    type: SET_TIME_OF_DAY_FILTER,
    timeofdayfilter: filter
  }
}

export function setFilter(filters) {
  return {
    type: SET_FILTERS,
    filters: filters
  }
}

export function orderReminder(reservationId, clientId, reminderId) {
  let request_str = `reservations?method=POST&reminders=1&reservationId=${reservationId}&clientId=${clientId}&reminderId=${reminderId}`;
  console.log("Action: orderReminder: request_str: " + request_str);

  let request = axios.get(`${UIServerUrl}${request_str}`);
  //console.log(request)

  return {
    type: ORDER_REMINDER,
    payload: request
  }
}

export function setSelectedEmployer(id) {
  return {
    type: SET_SELECTED_EMPLOYER,
    id: id
  }
}

export function showDoctorInfo(id, lang = null) {
  let request_str = `professionals/${id}?lang=${lang}`;

  let request = axios.get(`${UIServerUrl}${request_str}`);

  return {
    type: GET_DOCTOR_INFO,
    payload: request
  }
}
