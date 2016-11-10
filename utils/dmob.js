/* global process */
var url = require("url");

// Dmob server api url and credentials
exports.reservationApiUrl = url.parse(process.env.RESERVATIONUI_DMOB_API_URL ? process.env.RESERVATIONUI_DMOB_API_URL : 'https://diadev01.hiq.fi/dmob/api/v1/webreservation/');
exports.apiCredentials = {
  user: process.env.RESERVATIONUI_DMOB_API_USER ? process.env.RESERVATIONUI_DMOB_API_USER : 'webres',
  pass: process.env.RESERVATIONUI_DMOB_API_PWD ? process.env.RESERVATIONUI_DMOB_API_PWD : 'WebRes666',
  // TODO: Only use basic authentication when needed.
  // Not used in all environments.
  sendImmediately: true
};
