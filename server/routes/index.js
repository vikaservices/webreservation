var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var dmob = require('../utils/dmob');

var dmobReservationUrl = dmob.reservationApiUrl.href;
var dmobAuth = dmob.apiCredentials;

function wrapUnirest( apiRequest, req, res, next, payload, method) {

  // log request
  console.log( apiRequest );

  if( method && method == "PUT" ) {
    console.log("sending PUT");
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
                res.sendStatus(response.statusCode);
              }
            });

  } else if( method && method == "POST" ) {
    console.log("sending POST");
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
    console.log("sending DELETE");
    console.log(apiRequest);
    unirest.delete( apiRequest )
            .auth(dmobAuth)
            .end(function(response){
              if( response.ok ) {
                console.log("response.statusCode - ok : " + response.statusCode);
                res.status(response.statusCode).json(response.body);
              } else {
                console.log("response.statusCode - not ok : " + response.statusCode);
                res.sendStatus(response.statusCode);
              }
            });

  } else {
    console.log("sending GET");
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
  if( !req.query.prefix ) {
    res.sendStatus(400);
    return 0;
  } else {
    var apiRequest = dmobReservationUrl + 'terms?prefix=' + encodeURIComponent(req.query.prefix);
    wrapUnirest( apiRequest, req, res, next );
  }
});

router.get('/units', function(req, res, next) {
  // if( !req.query.prefix ) {
  //   res.sendStatus(400);
  //   return 0;
  // } else {
    var apiRequest = dmobReservationUrl + 'units?prefix=' + encodeURIComponent(req.query.prefix);
    wrapUnirest( apiRequest, req, res, next );
  // }
});

router.get('/timeslots', function(req, res, next) {
  if( !req.query.date ) {
    res.sendStatus(400);
    return 0;
  } else {
    var apiRequest = dmobReservationUrl + 'timeslots?date=' + req.query.date;
    // optional parameters
    if( req.query.resource ) {
      apiRequest += '&resource=' + encodeURIComponent(req.query.resource);
    }
    if( req.query.speciality ) {
      apiRequest += '&speciality=' + encodeURIComponent(req.query.speciality);
    }
    if( req.query.group ) {
      apiRequest += '&group=' + encodeURIComponent(req.query.group);
    }
    if( req.query.unit ) {
      apiRequest += '&unit=' + encodeURIComponent(req.query.unit);
    }
    wrapUnirest( apiRequest, req, res, next );
  }
});

router.get('/freedays', function(req, res, next) {
  if( !req.query.from || !req.query.to ) {
    res.sendStatus(400);
    return 0;
  } else {
    var apiRequest = dmobReservationUrl + 'freedays?from=' + req.query.from + '&to=' + req.query.to;
    // optional parameters
    if( req.query.resource ) {
      apiRequest += '&resource=' + encodeURIComponent(req.query.resource);
    }
    if( req.query.speciality ) {
      apiRequest += '&speciality=' + encodeURIComponent(req.query.speciality);
    }
    if( req.query.group ) {
      apiRequest += '&group=' + encodeURIComponent(req.query.group);
    }
    if( req.query.unit ) {
      apiRequest += '&unit=' + encodeURIComponent(req.query.unit);
    }
    wrapUnirest( apiRequest, req, res, next );
  }
});

router.get('/clients', function(req, res, next) {

  if( req.query.method == "GET" ) {
    if( !req.query.hetu ) {
      res.sendStatus(400);
      return 0;
    } else {
      var apiRequest = dmobReservationUrl + 'clients?hetu=' + encodeURIComponent(req.query.hetu);
      console.log("calling wrapUnirest");
      wrapUnirest( apiRequest, req, res, next );
    }
  }

  else if( req.query.method == "PUT") {
    if( !req.query.hetu || !req.query.firstName || !req.query.lastName || 
        !req.query.address || !req.query.postcode || !req.query.city || !req.query.phone ) {
      res.sendStatus(400);
      return 0;
    }
    var apiRequest = dmobReservationUrl + 'clients';

    var hetu = encodeURIComponent(req.query.hetu);
    var firstName = encodeURIComponent(req.query.firstName);
    var lastName = encodeURIComponent(req.query.lastName);
    var address = encodeURIComponent(req.query.address);
    var postcode = encodeURIComponent(req.query.postcode);
    var city = encodeURIComponent(req.query.city);
    var phone = encodeURIComponent(req.query.phone);
    var mail = (req.query.email != undefined) ? req.query.email : '';
    var payload = `{"hetu":"${hetu}",
                    "firstName":"${firstName}",
                    "lastName":"${lastName}",
                    "address":"${address}",
                    "postcode":"${postcode}",
                    "city":"${city}",
                    "phone":"${phone}",
                    "email":"${mail}" }`;

    //console.log(payload);
    wrapUnirest( apiRequest, req, res, next, payload, req.query.method );
    //res.sendStatus(200);
  }

  else {
    res.sendStatus(400);
    return 0;
  }
});

router.get('/reservations', function(req, res, next) {

  var apiRequest;
  var payload = "";

  if( req.query.method == "PUT" ) {
    if( !req.query.clientId || !req.query.resourceId || !req.query.unitId || 
        !req.query.start || !req.query.duration || !req.query.method ) {
      res.sendStatus(400);
      return 0;
    }
    apiRequest = dmobReservationUrl + 'reservations';

    var clientId = encodeURIComponent(req.query.clientId);
    var resourceId = encodeURIComponent(req.query.resourceId);
    var unitId = encodeURIComponent(req.query.unitId);
    var start = req.query.start;
    var duration = encodeURIComponent(req.query.duration);
    payload = `{"clientId":${clientId},
                "resourceId":${resourceId},
                "unitId":${unitId},
                "start":"${start}",
                "duration":${duration} }`;
  }

  else if( req.query.method  == "POST" ) {
    if( !req.query.reservationId || !req.query.clientId || !req.query.notes || !req.query.visitType ||
        !req.query.smsNotificationTo || !req.query.emailConfirmationTo || !req.query.method ) {
      res.sendStatus(400);
      return 0;
    }
    apiRequest = dmobReservationUrl + 'reservations/' + req.query.reservationId;

    var clientId = encodeURIComponent(req.query.clientId);
    var notes = encodeURIComponent(req.query.notes);
    var visitType = encodeURIComponent(req.query.visitType);
    var smsNotificationTo = encodeURIComponent(req.query.smsNotificationTo);
    var emailConfirmationTo = req.query.emailConfirmationTo;
    payload = `{"clientId":${clientId},
                "notes":"${notes}",
                "visitType":"${visitType}",
                "smsNotificationTo":"${smsNotificationTo}",
                "emailConfirmationTo":"${emailConfirmationTo}" }`;
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
  }

  //console.log(payload);
  wrapUnirest( apiRequest, req, res, next, payload, req.query.method, req.query.reservationId );
  //res.sendStatus(200);
});

module.exports = router;
