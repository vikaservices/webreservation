import _ from 'lodash';

var FIN = {};
var EN = {};
var SWE = {};

//BUTTONS
_.extend(FIN, {
    diacor_popup_button_cancel: 'Peruuta',
    diacor_popup_button_accept: 'Jatka',
    diacor_popup_button_return_scheduling: 'Palaa ajanvaraukseen',
    diacor_popup_button_cancel_appointment: 'Peruuta varaus',
    diacor_popup_button_leave_scheduling: 'Poistu ajanvarauksesta',
    diacor_popup_button_new_reservation: 'Varaa uusi aika'
});

//PLACEHOLDERS
_.extend(FIN, {
    diacor_input_placeholder_ssn: 'Henkilötunnus',
    diacor_input_placeholder_reservation_code: 'Varauskoodi'
});

//POPUP TEXTS FIN
 _.extend(FIN, {
     diacor_popup_ask_ssn_header: 'Hei, kuka on tulossa vastaanotolle?',
     diacor_popup_ask_ssnohc_header: 'Hei työterveysasiakas, aloita ajan varaaminen tästä.',
     diacor_popup_ohc_notfound_header: 'Hups, jotain meni pieleen.',
     diacor_popup_ohc_notfound_content: 'Henkilötiedoillasi ei löytynyt työterveysasiakkuutta. Tarkista työterveyssopimuksen voimassaolo työnantajaltasi.',
     diacor_popup_ohc_forbidden_header: 'Ajanvarausta ei voitu tehdä.',
     diacor_popup_ohc_forbidden_content: 'Voit varata ajan internetin kautta vain yksityiskäyntinä. Varaa työterveyskäynti soittamalla numeroon ',
     diacor_popup_ohc_forbidden_link: '09 7750 7755',
     diacor_popup_creation_error_header: 'Jotakin meni pieleen...',
     diacor_popup_prereservation_error_header: 'Jotakin meni pieleen esivarauksen teossa...',
     diacor_popup_cancel_reservation_header: 'Syötä varauskoodi peruaksesi varaus',
     diacor_popup_cancel_reservation_content: 'Löydät varauskoodin sähköpostistasi varausvahvistuksesta.',
     diacor_popup_cancel_notfound_headerone: 'Varaustunnuksella ',
     diacor_popup_cancel_notfound_headertwo: ' ei löytynyt varausta.',
     diacor_popup_ask_cancel_reservation_confirm_header: 'Varauksen tiedot',
     diacor_popup_ask_cancel_reservation_confirm_content: 'Voit hallinnoida kaikkia varauksiasi DiacorPlus-palvelussa.',
     diacor_popup_cancel_reservation_ok_header: 'Varaus peruttu',
     diacor_popup_cancel_reservation_ok_content1: 'Peruutit seuraavan varauksen.',
     diacor_popup_cancel_reservation_ok_content2: 'Varauskoodi: ',
     diacor_popup_cancel_reservation_ok_content3: 'Voit hallinnoida kaikkia varauksiasi DiacorPlus-palvelussa.',
     diacor_popup_cancel_reservation_error_header: 'Jotakin meni pieleen varauksen peruuttamisessa...',

 });


 _.extend(EN, {
     diacor_popup_ask_ssn_header: 'Hi, who is coming to the reception?'
 });

 export default function text(key, lang=null) {

    if (lang === 'swe') {
        return SWE[key] || key;
    }
    else if (lang === 'en') {
        return EN[key] || key;
    }
    else {
        return FIN[key] || key;
    }
 };
