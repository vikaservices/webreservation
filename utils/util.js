// Take Date object and return date string "YYYY-MM-DD"
function formatDate( date ) {

  let currY = date.getFullYear();
  let currM = (date.getMonth()+1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  let currD = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();

  //console.log("formatDate: " + currY + "-" + currM + "-" + currD);

  return currY + "-" + currM + "-" + currD;
}

function formatDate2( locale, date ) {

  let currWD = date.getDay();
  let currM = date.getMonth() + 1;
  let currD = date.getDate();

  let wd_str = getWeekdayStr( locale, currWD );

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
