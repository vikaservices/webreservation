// Take js Date object and return date string "YYYY-MM-DD"
formatDate(date) {

  var currY = date.getFullYear();
  var currM = (date.getMonth()+1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  var currD = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();

  //console.log("formatDate: " + currY + "-" + currM + "-" + currD);

  return currY + "-" + currM + "-" + currD;
}

// Arguments:
//   locale   - 2 character locale code
//   date     - js Date objec
// return
//   localized  weekday and date string "weekday DD.MM" (no day/month zero-filling)
formatDate2(locale, date) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();

  var wd_str = getWeekdayStr( locale, currWD );

  //console.log("formatDate2: " + wd_str + " " + currD + "." + currM);

  return wd_str + " " + currD + "." + currM;
}

// locale "fi", "sw", "ru"
function getWeekdayStr( locale, day ) {
  var wd_strings = { "fi":["Su","Ma","Ti","Ke","To","Pe","La"],
                     "sv":["Sö","Må","Ti","On","To","Fr","Lö"],
                     "en":["Su","Mo","Tu","We","Th","Fr","Sa"] };

  return wd_strings[locale][day];
}

// return localized  weekday and date string "weekday DD.MM.YYYY" (no day/month zero-filling)
formatDate3(locale, date) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();
  var currY = date.getFullYear();

  var wd_str = getWeekdayStr2( locale, currWD );

  //console.log("formatDate3: " + wd_str + " " + currD + "." + currM);

  return wd_str + " " + currD + "." + currM + "." + currY;
}

// locale "fi", "sw", "ru"
getWeekdayStr2(locale, day) {
  var wd_strings = { fi:["Sunnuntai",
                         "Maanantai",
                         "Tiistai",
                         "Keskiviikko",
                         "Torstai",
                         "Perjantai",
                         "Lauantai"] };

  return wd_strings[locale][day];
}

formatDate4(locale, date_string) {
  date = new Date(date_string);

  return this.formatDate3(locale, date);
}

getHours(date_string) {
  date = new Date(date_string);

  return date.getHours() + ":" + date.getMinutes();
}

getCalendarDateString(date_string) {
  date = new Date(date_string);

  var Y  = date.getFullYear();
  var M  = date.getMonth() + 1 < 10   ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var D  = date.getDate() < 10        ? "0" + date.getDate()        : date.getDate();
  var HH = date.getHours() < 10       ? "0" + date.getHours()       : date.getHours();
  var MM = date.getMinutes() < 10     ? "0" + date.getMinutes()     : date.getMinutes();
  var SS = date.getSeconds() < 10     ? "0" + date.getSeconds()     : date.getSeconds();

  return `{Y}${M}${D}T${HH}${MM}${SS}`;
}
