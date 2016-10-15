// Take js Date object and return date string "YYYY-MM-DD"
function formatDate( date ) {

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
function formatDate2( locale, date ) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();

  var wd_str = getWeekdayStr( locale, currWD );

  //console.log("formatDate2: " + wd_str + " " + currD + "." + currM);

  return wd_str + " " + currD + "." + currM;
}

// locale "fi", "sw", "ru"
function getWeekdayStr( locale, day ) {
  var wd_strings = { fi:["Sunnuntaina",
                         "Maanantaina",
                         "Tiistaina",
                         "Keskiviikkona",
                         "Torstaina",
                         "Perjantaina",
                         "Lauantaina"] };

  return wd_strings[locale][day];
}


// return localized  weekday and date string "weekday DD.MM.YYYY" (no day/month zero-filling)
function formatDate3( locale, date ) {

  var currWD = date.getDay();
  var currM = date.getMonth() + 1;
  var currD = date.getDate();
  var currY = date.getFullYear();

  var wd_str = getWeekdayStr2( locale, currWD );

  //console.log("formatDate3: " + wd_str + " " + currD + "." + currM);

  return wd_str + " " + currD + "." + currM + "." + currY;
}

// locale "fi", "sw", "ru"
function getWeekdayStr2( locale, day ) {
  var wd_strings = { fi:["Sunnuntai",
                         "Maanantai",
                         "Tiistai",
                         "Keskiviikko",
                         "Torstai",
                         "Perjantai",
                         "Lauantai"] };

  return wd_strings[locale][day];
}


function formatDate4(locale, date_string) {
  date = new Date(date_string);

  return formatDate3(locale, date);
}
