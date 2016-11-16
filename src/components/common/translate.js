import _ from 'lodash';

var FIN = {};
var EN = {};
var SWE = {};

//ERRORS FIN
_.extend(FIN, {
    diacor_error_404: '404 - Sivua ei löytynyt',
    diacor_error_required: 'Pakollinen kenttä',
});

_.extend(FIN, {
    diacor_time_min: 'min',
    diacor_header_reservation: 'Ajanvaraus',
    diacor_header_summary: 'Kiitos varauksesta!',
    diacor_header_cancel: 'Varauksen peruuttaminen',
    diacor_header_lang_fi: 'FI',
    diacor_header_lang_se: 'SE',
    diacor_header_lang_en: 'EN',
    diacor_ohc_search: ' työterveystiimi',
});

//BUTTONS FIN
_.extend(FIN, {
    diacor_popup_button_cancel: 'Peruuta',
    diacor_popup_button_accept: 'Jatka',
    diacor_popup_button_close: 'Sulje',
    diacor_popup_button_return_scheduling: 'Palaa ajanvaraukseen',
    diacor_popup_button_cancel_appointment: 'Peruuta varaus',
    diacor_popup_button_leave_scheduling: 'Poistu ajanvarauksesta',
    diacor_popup_button_new_reservation: 'Varaa uusi aika',
    diacor_popup_button_confirm: 'VAHVISTA VARAUS',
    diacor_section_summary_button_new: 'TEE UUSI VARAUS',
    diacor_section_summary_button_leave: 'POISTU AJANVARAUKSESTA'
});

//PLACEHOLDERS FIN
_.extend(FIN, {
    diacor_input_placeholder_ssn: 'Henkilötunnus',
    diacor_input_placeholder_name: 'Etunimi',
    diacor_input_placeholder_surname: 'Sukunimi',
    diacor_input_placeholder_address: 'Katuosoite',
    diacor_input_placeholder_postalcode: 'Postinumero',
    diacor_input_placeholder_city: 'Postitoimipaikka',
    diacor_input_placeholder_phone: 'Puhelinnumero',
    diacor_input_placeholder_reservation_code: 'Varauskoodi',
    diacor_input_placeholder_name_or_service: 'Nimi tai palvelu',
    diacor_input_placeholder_office: 'Toimipiste',
    diacor_input_placeholder_reason: 'Kirjoita syy käynnillesi...',
    diacor_input_placeholder_email: 'Sähköpostiosoite',
    diacor_input_placeholder_cell: 'Matkapuhelinnumero',
});

//FILTERS FIN
_.extend(FIN, {
    diacor_filter_extra_hide: 'Piilota lisävalinnat ',
    diacor_filter_extra_city_Espoo: 'Espoo',
    diacor_filter_extra_city_Helsinki: 'Helsinki',
    diacor_filter_extra_city_Vantaa: 'Vantaa',
    diacor_filter_extra_show: 'Näytä lisävalinnat ',
    diacor_filter_extra_label: 'Lisävalinnat',
    diacor_filter_extra_label_gender: 'Sukupuoli',
    diacor_filter_extra_label_city: 'Kaupunki',
    diacor_filter_extra_label_language: 'Kieli',
    diacor_filter_main_reservation_turku_link: 'DIACOR TURUN AJANVARAUS',
    diacor_filter_time_morning: 'Aamu',
    diacor_filter_time_day: 'Päivä',
    diacor_filter_time_evening: 'Ilta'
});

//TEXTS FIN
 _.extend(FIN, {
     diacor_popup_ask_ssn_header: 'Hei, kuka on tulossa vastaanotolle?',
     diacor_popup_ask_ssnohc_header: 'Hei työterveysasiakas, aloita ajan varaaminen tästä.',
     diacor_popup_forbidden_header: 'Ajanvarausta ei voitu tehdä.',
     diacor_popup_forbidden_content: 'Ajan varaaminen internetin kautta on estetty. Voit varata ajan soittamalla numeroon ',
     diacor_popup_forbidden_link: '09 7750 7755',
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
     diacor_popup_new_client_header_one: 'Hei, kuka on tulossa vastaanotolle',
     diacor_popup_new_client_header_two: 'Uusi asiakas, tervetuloa! Lisää vielä seuraavat tiedot:',
     diacor_popup_doctor_info_skills: 'Osaamisalueet:',
     diacor_popup_doctor_info_services: 'Palvelut:',
     diacor_popup_doctor_info_locations: 'Toimipisteet:',
     diacor_popup_doctor_info_languages: 'Asiointikielet:',
     diacor_popup_doctor_info_prices1: 'HINNAT',
     diacor_popup_doctor_info_prices2: 'Yksityisasiakkaan hinnat arkisin:',
     diacor_popup_doctor_info_not_found: 'Lisätietoja ei valitettavasti löytynyt',
     diacor_popup_generic_failure: 'Jotakin meni pieleen, yritä hetken kuluttua uudelleen',
     diacor_ohc_team_list_choose_link: 'Valitse',
     diacor_section_confirmation_header: 'VARAUKSEN VAHVISTAMINEN',
     diacor_section_confirmation_content: 'Tarkista tiedot ennen varauksen vahvistamista.',
     diacor_section_confirmation_content_time: 'VARATTAVA AIKA',
     diacor_section_confirmation_content_reason: 'KÄYNNIN SYY',
     diacor_section_confirmation_content_payer: 'MAKSAJA',
     diacor_section_confirmation_content_ohc: 'Työterveyskäynti, ',
     diacor_section_confirmation_content_private: 'Yksityiskäynti',
     diacor_section_confirmation_content_other_payer: 'Muu maksaja (palveluseteli tai työantajan vakuutusyhtiö)',
     diacor_section_confirmation_content_contactInfo1: 'LISÄÄ YHTEYSTIETOSI',
     diacor_section_confirmation_content_plus: 'Ymmärrän, että online vastaanotto onnistuu vain DiacorPlus sovelluksen avulla',
     diacor_section_confirmation_content_terms: 'Peruutusehdot',
     diacor_section_confirmation_content_notification: 'Varauksen voi peruuttaa ilmaiseksi 4 tuntia ennen aikaa. Esteen sattuessa peruuta aikasi viimeistään edellisenä päivänä ennen sovittua ajankohtaa. Peruuttamattomasta tai samana päivänä perutusta varauksesta perimme maksun.',
     diacor_section_confirmation_note_slot1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet ornare dui.',
     diacor_section_confirmation_note_slot2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet ornare dui.',
     diacor_section_confirmation_note_ohc: 'Varmista, että palvelu on yrityksesi työterveyspalvelujen piirissä.',
     diacor_section_confirmation_note_email: 'Tarvitsemme s-postiosoitteesi vahvistusta varten.',
     diacor_section_confirmation_note_phone: 'Syötä matkapuhelinnumero muodossa 040-1234567.',
     diacor_section_header1_desktop: 'Työterveysasiakkaan ajanvaraus',
     diacor_section_header1_mobile: 'Työterveysasiakkaat',
     diacor_section_header2: 'Omat varaukset',
     diacor_section_summary_header: 'VARAUKSEN TIEDOT',
     diacor_section_summary_content: 'Hienoa! Varaus on vastaanotettu ja olemme lähettäneet sähköpostivarmistuksen osoitteeseesi! Varauksesi tunnus on ',
     diacor_company_name: 'Diacor ',
     diacor_section_summary_add_calendar: 'Lisää kalenteriin',
     diacor_section_summary_reminder_question:'HALUATKO MUISTUTUKSEN?',
     diacor_section_summary_reminder_choise: 'Valitse milloin haluat muistutuksen tekstiviestillä.',
     diacor_section_summary_reminder_30min: '30 min ennen',
     diacor_section_summary_reminder_60min: '60 min ennen',
     diacor_section_summary_reminder_12h: '12h ennen',
     diacor_section_summary_reminder_24h: '24h ennen',
     diacor_section_summary_reminder_order: 'TILAA MUISTUTUS',
     diacor_section_summary_reminder_question2: 'MITEN KÄYTÄN DIACOR ONLINE-PALVELUA?',
     diacor_section_summary_download: 'Lataa ',
     diacor_section_summary_plus: 'Diacor Plus',
     diacor_section_summary_app: '-sovellus',
     diacor_section_summary_sure: 'Varmista, että sinulla on puhelin mukana ja että siinä on akkua riittävästi.',
     diacor_section_summary_notification: 'Saat notifikaation kun lääkäri on valmis ottamaan sinut vastaan.',
     diacor_section_summary_open: 'Avaa notifikaation ja DiacorPlus sovellus avataan.',
     diacor_section_summary_redirect: 'Sinut ohjataan suoraan vastaanotolle.',
     diacor_section_summary_valued_customer: 'ARVOASIAKKUUS',
     diacor_section_summary_what: 'Mitäs tähän?', //TODO: check this
     diacor_section_resource_header: 'TYÖTERVEYSTIIMISI',
     diacor_section_resource_content: 'Varmista, että palvelu kuuluu yrityksesi työterveys-sopimukseen.',
     diacor_section_timesearch_header: 'AJAN VALINTA',
     diacor_section_timesearch_link: 'Muuta valintaa',
     diacor_timeslot_link: 'Varaa',
     diacor_timeslot_diacorplus: 'DiacorPlus Etävastaanotto',
     diacor_timeslot_list_header: 'Vapaat ajat ',
     diacor_timeslot_list_no_free_times: 'Halutulle päivälle ei löydy aikoja hakukriteereilläsi. Alla ehdotettuna seuraavia lähimpiä vapaita aikoja. Kalenterissa vihreällä merkityllä päivällä varattavissa olevat ajat.',
 });

 _.extend(EN, {
     diacor_popup_ask_ssn_header: 'Hi, who is coming to the reception?',
     diacor_section_header1_desktop: 'Test for languages',
 });

 export default function text(key) {

    if(window.T === 'lang_fi') {
        return FIN[key] || key;
    }
    else if (window.T === 'lang_se') {
        return SWE[key] || key;
    }
    else if (window.T === 'lang_en') {
        return EN[key] || key;
    }
    else {
        return FIN[key] || key;
    }
 };
