var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var dmob = require('../utils/dmob');

var dmobReservationUrl = dmob.reservationApiUrl.href;
var dmobAuth = dmob.apiCredentials;

function wrapUnirest( apiRequest, req, res, next, payload, method) {

  var date = new Date();
  var tm = "";
  tm += date.getHours() < 10 ? ("0" + date.getHours() + ':') : (date.getHours() + ':');
  tm += date.getMinutes() < 10 ? ("0" + date.getMinutes() + ':') : (date.getMinutes() + ':');
  tm += date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds();

  // log request
  console.log( tm + " : wrapUnirest: apiRequest: " + apiRequest );

  if( method && method == "PUT" ) {
    console.log(tm + " : sending PUT");
    console.log(payload);

    unirest.put( apiRequest )
            .type('json')
            .auth(dmobAuth)
            .send(payload)
            .end(function(response){
              if( response.ok ) {
                console.log("response.statusCode - ok : " + response.statusCode);
                res.status(response.statusCode).json(response.body);
              } else {
                console.log("response.statusCode - not ok : " + response.statusCode);
                res.status(response.statusCode).json(response.body);
              }
            });

  } else if( method && method == "POST" ) {
    console.log(tm + " : sending POST");
    console.log(payload);

    unirest.post( apiRequest )
            .type('json')
            .auth(dmobAuth)
            .send(payload)
            .end(function(response){
              if( response.ok ) {
                console.log("response.statusCode - ok : " + response.statusCode);
                res.status(response.statusCode).json(response.body);
              } else {
                console.log("response.statusCode - not ok : " + response.statusCode);
                res.sendStatus(response.statusCode);
              }
            });

  } else if( method && method == "DELETE" ) {
    console.log(tm + " : sending DELETE");
    console.log(apiRequest);
    unirest.delete( apiRequest )
            .auth(dmobAuth)
            .end(function(response){
              if( response.ok ) {
                console.log(tm + " : response.statusCode - ok : " + response.statusCode);
                res.status(response.statusCode).json(response.body);
              } else {
                console.log(tm + " : response.statusCode - not ok : " + response.statusCode);
                res.sendStatus(response.statusCode);
              }
            });

  } else {
    console.log(tm + " : sending GET");
    unirest.get( apiRequest )
            .auth(dmobAuth)
            .end(function(response){
              if( response.ok ) {
                res.status(response.statusCode).json(response.body);
              } else {
                res.sendStatus(response.statusCode);
              }
            });
  }
}

/* Status page. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});


router.get('/terms', function(req, res, next) {
  var apiRequest = dmobReservationUrl + 'terms?prefix=' + encodeURIComponent(req.query.prefix);
  apiRequest += '&lang=' + req.query.lang;
  wrapUnirest( apiRequest, req, res, next );
});


router.get('/units', function(req, res, next) {
  var apiRequest = dmobReservationUrl + 'units?prefix=' + encodeURIComponent(req.query.prefix);
  apiRequest += '&lang=' + req.query.lang;
  wrapUnirest( apiRequest, req, res, next );
});

router.get('/fixedgroups', function(req, res, next) {
  var apiRequest = dmobReservationUrl + 'fixedgroups?lang=' + req.query.lang;
  wrapUnirest( apiRequest, req, res, next );
});


router.get('/timeslots', function(req, res, next) {
  console.log('router - timeslots');

  var apiRequest = dmobReservationUrl + 'timeslots?';
  for( var key in req.query ) {
    console.log( key + " : " + req.query[key] );
    apiRequest += key + '=' + encodeURIComponent(req.query[key]) + '&';
  }
  console.log("apiRequest: " + apiRequest);

  wrapUnirest( apiRequest, req, res, next );
});


router.get('/freedays', function(req, res, next) {
  //console.log('router - freedays');

  var apiRequest = dmobReservationUrl + 'freedays?';
  for( var key in req.query ) {
    //console.log( key + " : " + req.query[key] );
    apiRequest += key + '=' + encodeURIComponent(req.query[key]) + '&';
  }
  //console.log("apiRequest: " + apiRequest);

  wrapUnirest( apiRequest, req, res, next );
});


router.get('/clients', function(req, res, next) {

  if( req.query.method == "GET" ) {
    //console.log('router - clients - GET');
    var apiRequest = dmobReservationUrl + 'clients?';
    apiRequest += req.query.hetu ? "hetu=" + encodeURIComponent(req.query.hetu) : '';
    //console.log("apiRequest: " + apiRequest);
    wrapUnirest( apiRequest, req, res, next );
  }

  else if( req.query.method == "PUT") {
    //console.log('router - clients - PUT');
    if( !req.query.hetu || !req.query.firstName || !req.query.lastName || 
        !req.query.address || !req.query.postcode || !req.query.city || !req.query.phone ) {
      res.sendStatus(400);
      return 0;
    }
    var apiRequest = dmobReservationUrl + 'clients';

    var hetu = req.query.hetu;
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var address = req.query.address;
    var postcode = req.query.postcode;
    var city = req.query.city;
    var phone = req.query.phone;
    var mail = (req.query.email != undefined) ? req.query.email : '';
    var payload = `{"hetu":"${hetu}", "firstName":"${firstName}", "lastName":"${lastName}", "address":"${address}", "postcode":"${postcode}", "city":"${city}", "phone":"${phone}", "email":"${mail}" }`;

    //console.log(payload);
    wrapUnirest( apiRequest, req, res, next, payload, req.query.method );
    //res.sendStatus(200);
  }

  else {
    res.sendStatus(400);
    return 0;
  }
});

router.get('/professionals/:id', function(req, res, next) {
  if( !req.params.id ) {
    res.sendStatus(400);
    return 0;
  }
  var apiRequest = dmobReservationUrl + 'professionals/' + req.params.id + "?lang=" + req.query.lang;
  wrapUnirest( apiRequest, req, res, next );
});



router.get('/reservations', function(req, res, next) {

  var apiRequest;
  var payload = "";

  if( req.query.method == "PUT" ) {
    if( !req.query.clientId || !req.query.resourceId || !req.query.unitId || 
        !req.query.start || !req.query.duration || !req.query.online || !req.query.method ) {
      res.sendStatus(400);
      return 0;
    }
    apiRequest = dmobReservationUrl + 'reservations';

    var clientId = req.query.clientId;
    var resourceId = req.query.resourceId;
    var unitId = req.query.unitId;
    var start = req.query.start;
    var duration = req.query.duration;
    var online = req.query.online;
    payload = `{"clientId":${clientId}, "resourceId":${resourceId}, "unitId":${unitId}, `;
    payload += `"start":"${start}", "duration":${duration}, "online": ${online}`;
    payload += req.query.employerId ? ` ,"employerId":${req.query.employerId}}` : "}";
  }

  else if( req.query.method  == "POST" ) {
    if( req.query.reminders ) {
      // ORDER REMINDERS
      if( !req.query.reservationId || !req.query.clientId ||
          !req.query.reminderId || !req.query.method ) {
        res.sendStatus(400);
        return 0;
      }
      apiRequest = dmobReservationUrl + 'reservations/' + req.query.reservationId + '/reminders';

      payload = `{"clientId":${req.query.clientId}, "reminderType":"${req.query.reminderId}"}`;

    } else {
      // RESERVATION CONFIRMATION
      if( !req.query.reservationId || !req.query.clientId || !req.query.visitType ||
          !req.query.smsNotificationTo || !req.query.method ) {
        res.sendStatus(400);
        return 0;
      }
      apiRequest = dmobReservationUrl + 'reservations/' + req.query.reservationId;
      apiRequest += req.query.lang ? `?lang=${req.query.lang}` : "?lang=";

      var clientId = req.query.clientId;
      var notes = req.query.notes;
      var visitType = req.query.visitType;
      var smsNotificationTo = req.query.smsNotificationTo;
      var emailConfirmationTo = req.query.emailConfirmationTo;
      payload = `{"clientId":${clientId}, "notes":"${notes}", "visitType":"${visitType}", "smsNotificationTo":"${smsNotificationTo}", "emailConfirmationTo":"${emailConfirmationTo}" }`;
    }
  }

  else if( req.query.method  == "DELETE" ) {
    if( !req.query.reservationCode ) {
      res.sendStatus(400);
      return 0;
    }
    apiRequest = dmobReservationUrl + 'reservations?';

    apiRequest += `reservationCode=${req.query.reservationCode}`;
    apiRequest += req.query.hetu ? `&hetu=${req.query.hetu}` : '';
  }

  else {  // GET
    if( !req.query.reservationCode ||  !req.query.hetu) {
      res.sendStatus(400);
      return 0;
    }
    var apiRequest = dmobReservationUrl;
    apiRequest += 'reservations?hetu=' + encodeURIComponent(req.query.hetu);
    apiRequest += '&reservationCode=' + encodeURIComponent(req.query.reservationCode);
    apiRequest += '&lang=' + req.query.lang;
  }

  //console.log(payload);
  wrapUnirest( apiRequest, req, res, next, payload, req.query.method, req.query.reservationId );
  //res.sendStatus(200);
});

module.exports = router;
