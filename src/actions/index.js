import { TERMS_SEARCH,
         UNITS_SEARCH,
         TIMESLOTS_SEARCH,
         FREEDAYS_SEARCH,
         MAKE_PRE_RESERVATION,
         CONFIRM_RESERVATION,
         CHECK_CLIENT_SSN,
         CREATE_CLIENT,
         DIALOG_CLOSE,
         SET_SELECTED_DATE,
         SAVE_SELECTED_TIMESLOT,
         LOGIN_CLIENT,
         SAVE_CLIENT_INFO,
         RESET,
         CANCEL_RESERVATION
        } from './types';
//import { UIServerUrl } from '../../utils/conf';
import axios from 'axios';
//import Config from 'Config';

let UIServerUrl = "http://localhost:3000/";

export function termsSearch(terms=null) {

  //console.log( "termsSearch" );
  console.log("UIServerUrl : " + UIServerUrl);

  if( !terms ) {
    return {
      type: TERMS_SEARCH,
      payload: null
    };
  }

  // TODO: encode url paramters
  //let terms_enc = encodeURIComponent(terms);
  //console.log("terms: " + terms);
  //console.log("terms_enc: " + terms_enc);
  const request = axios.get(`${UIServerUrl}terms?prefix=${terms}`);

  return {
    type: TERMS_SEARCH,
    payload: request,
  };
}


export function unitsSearch(units = '') {

  console.log( "unitsSearch" );

  // if( !units ) {
  //   return {
  //     type: UNITS_SEARCH,
  //     payload: null
  //   };
  // }

  const request = axios.get(`${UIServerUrl}units?prefix=${units}`);

  return {
    type: UNITS_SEARCH,
    payload: request
  };
}


export function timeslotsSearch(date, resource=null, speciality=null, group=null,
                               unit=null, lang=null, gender=null, city=null) {

  console.log( "timeslotsSearch" );

  let search_str = `timeslots?date=${date}`;
  search_str += resource    ? `&resource=${resource}`     : '';
  search_str += speciality  ? `&speciality=${speciality}` : '';
  search_str += group       ? `&group=${group}`           : '';
  search_str += unit        ? `&unit=${unit}`             : '';
  //search_str += lang        ? `&lang=${lang}`             : '';
  //search_str += gender      ? `&gender=${gender}`         : '';
  //search_str += city        ? `&city=${city}`             : '';
  console.log('search_str: ' + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);

  return {
    type: TIMESLOTS_SEARCH,
    payload: request
  };
}


export function freedaysSearch(from, to, resource=null, speciality=null, group=null,
                                unit=null, lang=null, gender=null, city=null) {

  console.log( "freedaysSearch" );

  let search_str = `freedays?from=${from}&to=${to}`;
  search_str += resource    ? `&resource=${resource}`     : '';
  search_str += speciality  ? `&speciality=${speciality}` : '';
  search_str += group       ? `&group=${group}`           : '';
  search_str += unit        ? `&unit=${unit}`             : '';
  //search_str += lang        ? `&lang=${lang}`             : '';
  //search_str += gender      ? `&gender=${gender}`         : '';
  //search_str += city        ? `&city=${city}`             : '';
  console.log('search_str = ' + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);
  //const request = { data : {freedays: ["2016-09-16", "2016-09-17", "2016-09-20", "2016-09-23", "2016-09-24"]} };
  console.log(request);

  return {
    type: FREEDAYS_SEARCH,
    payload: request
  };
}

export function loginClient( pending_reservation = false ) {
  return {
    type: LOGIN_CLIENT,
    pendingreservation: pending_reservation
  };
}

export function checkClientSSN( ssn ) {
  console.log("checkSSN");

  let search_str = `clients?method=GET&hetu=${ssn}`;
  console.log("search_str = " + search_str);

  const request = axios.get(`${UIServerUrl}${search_str}`);
  //const request = { data: { id: '12345678-2222' } };


  return {
    type: CHECK_CLIENT_SSN,
    payload: request
  };
}


export function createClient( ssn, first_name, last_name, address, postcode, city, phone) {
  console.log("createClient");

  let request_str = `clients?method=PUT&hetu=${ssn}&firstName=${first_name}&lastName=${last_name}`;
  request_str += `&address=${address}&postcode=${postcode}&city=${city}&phone=${phone}`;
  console.log(request_str);

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

export function saveSelectedTimeslot( resourceId, unitId, start, duration,
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
    startTimeHours: starttimehours
  };

  return {
    type: SAVE_SELECTED_TIMESLOT,
    selectedtimeslot: timeslot
  };
}

export function setSelectedDate( date ) {
  return {
    type: SET_SELECTED_DATE,
    newdate: date
  }
}

export function makePreReservation(clientId, resourceId, unitId, start, duration) {
  console.log("makePreReservation");

  let request_str = `reservations?method=PUT&clientId=${clientId}&resourceId=${resourceId}`;
  request_str += `&unitId=${unitId}&start=${start}&duration=${duration}`;

  const request = axios.get(`${UIServerUrl}${request_str}`);

  return {
    type: MAKE_PRE_RESERVATION,
    payload: request
  };
}

export function confirmReservation(reservationId, clientId,
                            notes, visitType, smsNotificationTo, emailConfirmationTo=null) {

  console.log("confirmReservation");

  let request_str = `reservations?method=POST&reservationId=${reservationId}&clientId=${clientId}`;
  request_str += `&notes=${notes}&visitType=${visitType}`;
  request_str += `&smsNotificationTo=${smsNotificationTo}&emailConfirmationTo=${emailConfirmationTo}`;

  console.log(request_str);

  const request = axios(`${UIServerUrl}${request_str}`);
  //const request = "";

  return {
    type: CONFIRM_RESERVATION,
    payload: request
  };
}

export function saveClientInfo(ssn, first_name, last_name, address, postcode, city, phone) {
  const client = {
    user: {
       user_ssn: ssn,
       first_name: first_name,
       last_name: last_name,
       address: address,
       postcode: postcode,
       city: city,
       phone: phone,
       email: ''
    }
  };
  return {
    type: SAVE_CLIENT_INFO,
    client: client
  }
}

export function resetState() {
  return {
    type: RESET
  }
}

// calling without code will init opening dialog asking for reservation code
// calling with code will cause delete call with 'reservations' API call
export function cancelReservation( code = null, hetu = null ) {
  if( code ) {
    let request_str = `reservations?method=DELETE&reservationCode=${code}`;
    request_str += hetu ? `&hetu=${hetu}` : '';
    console.log("cancelReservation: request_str = " + request_str);

    const request = axios.get(`${UIServerUrl}${request_str}`);

    console.log(request);

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
