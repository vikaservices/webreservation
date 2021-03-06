// Take js Date object and return date string "YYYY-MM-DD"

function formatDate(date) {

  var currY = date.getFullYear();
  var currM = (date.getMonth()+1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  var currD = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();

  return currY + "-" + currM + "-" + currD;
}

// Arguments:
//   locale   - 2 character locale code
//   date     - js Date objec
// return
//   localized  weekday and date string "weekday DD.MM" (no day/month zero-filling)
function formatDate2(locale, date) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();

  var wd_str = getWeekdayStr( locale, currWD );

  return wd_str + " " + currD + "." + currM;
}

// locale "fi", "sw", "ru"
function getWeekdayStr(locale, day) {
  var wd_strings = { "fi":["Su","Ma","Ti","Ke","To","Pe","La"],
                     "sv":["Sö","Må","Ti","On","To","Fr","Lö"],
                     "en":["Su","Mo","Tu","We","Th","Fr","Sa"] };

  return wd_strings[locale][day];
}

// return localized  weekday and date string "weekday DD.MM.YYYY" (no day/month zero-filling)
function formatDate3(locale, date) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();
  var currY = date.getFullYear();

  var wd_str = getWeekdayStr2( locale, currWD );

  return wd_str + " " + currD + "." + currM + "." + currY;
}


function formatDate4(locale, date_string) {
  var date = new Date(date_string);

  return this.formatDate3(locale, date);
}

// locale "fi", "sw", "ru"
function getWeekdayStr2(locale, day) {
  var wd_strings = { "fi":["Sunnuntai","Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"],
                     "sv":["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],
                     "en":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] };

  return wd_strings[locale][day];
}


// return localized  weekday and date string "weekday DD.MM.YYYY" (no day/month zero-filling)
function formatDate3(locale, date) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();
  var currY = date.getFullYear();

  var wd_str = getWeekdayStr3( locale, currWD );

  return wd_str + " " + currD + "." + currM + "." + currY;
}

// locale "fi", "sw", "ru"
function getWeekdayStr3(locale, day) {
  var wd_strings = { "fi":["Sunnuntaina","Maanantaina","Tiistaina","Keskiviikkona","Torstaina","Perjantaina","Lauantaina"],
                     "sv":["På Söndag","På Måndag","På Tisdag","På Onsdag","På Torsdag","På Fredag","På Lördag"],
                     "en":["On Sunday"," On Monday","On Tuesday","On Wednesday","On Thursday","On Friday","On Saturday"] };

  return wd_strings[locale][day];
}





function getHours(date_string) {
  var hours = date_string.substr(11, 2);
  var mins = date_string.substr(14, 2);

  return hours + ":" + mins;
}

function getCalendarDateString(date_string) {
  date = new Date(date_string);

  var Y  = date.getFullYear();
  var M  = date.getMonth() + 1 < 10   ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var D  = date.getDate() < 10        ? "0" + date.getDate()        : date.getDate();
  var HH = date.getHours() < 10       ? "0" + date.getHours()       : date.getHours();
  var MM = date.getMinutes() < 10     ? "0" + date.getMinutes()     : date.getMinutes();
  var SS = date.getSeconds() < 10     ? "0" + date.getSeconds()     : date.getSeconds();

  return `{Y}${M}${D}T${HH}${MM}${SS}`;
}

function convertUTCStringToLocal( date_string ) {
  var date = new Date(date_string);

  var Y  = date.getFullYear();
  var M  = date.getMonth() + 1 < 10   ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var D  = date.getDate() < 10        ? "0" + date.getDate()        : date.getDate();
  var HH = date.getHours() < 10       ? "0" + date.getHours()       : date.getHours();
  var MM = date.getMinutes() < 10     ? "0" + date.getMinutes()     : date.getMinutes();
  var SS = date.getSeconds() < 10     ? "0" + date.getSeconds()     : date.getSeconds();

  return `${Y}-${M}-${D}T${HH}:${MM}:${SS}`;
}

module.exports = {
    formatDate: formatDate,
    formatDate2: formatDate2,
    formatDate3: formatDate3,
    formatDate4: formatDate4,
    getHours: getHours,
    convertUTCStringToLocal: convertUTCStringToLocal
};
