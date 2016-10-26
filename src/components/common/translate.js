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
    diacor_header_cancel: 'Varauksen peruuttaminen'
});

//BUTTONS FIN
_.extend(FIN, {
    diacor_popup_button_cancel: 'Peruuta',
    diacor_popup_button_accept: 'Jatka',
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
    diacor_input_placeholder_cell: 'Matkapuhelinnumero'
});

//FILTERS FIN
_.extend(FIN, {
    diacor_filter_extra_hide: 'Piilota lisävalinnat ',
    diacor_filter_extra_country_fin: 'Suomi',
    diacor_filter_extra_country_swe: 'Ruotsi',
    diacor_filter_extra_country_rus: 'Venäjä',
    diacor_filter_extra_gender_male: 'Mies',
    diacor_filter_extra_gender_female: 'Nainen',
    diacor_filter_extra_city_Espoo: 'Espoo',
    diacor_filter_extra_city_Helsinki: 'Helsinki',
    diacor_filter_extra_city_Vantaa: 'Vantaa',
    diacor_filter_extra_show: 'Näytä lisävalinnat ',
    diacor_filter_main_reservation_turku_link: 'DIACOR TURUN AJANVARAUS',
    diacor_filter_time_morning: 'Aamu',
    diacor_filter_time_day: 'Päivä',
    diacor_filter_time_evening: 'Ilta'
});

//TEXTS FIN
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
     diacor_popup_new_client_header_one: 'Hei, kuka on tulossa vastaanotolle',
     diacor_popup_new_client_header_two: 'Uusi asiakas, tervetuloa! Lisää vielä seuraavat tiedot:',
     diacor_ohc_team_list_choose_link: 'Valitse',
     diacor_section_confirmation_header: 'VARAUKSEN VAHVISTAMINEN',
     diacor_section_confirmation_content: 'Tarkista tiedot ennen varauksen vahvistamista.',
     diacor_section_confirmation_content_time: 'VARATTAVA AIKA',
     diacor_section_confirmation_content_reason: 'KÄYNNIN SYY',
     diacor_section_confirmation_content_payer: 'MAKSAJA',
     diacor_section_confirmation_content_ohc: 'Työterveyskäynti, ',
     diacor_section_confirmation_content_private: 'Yksityiskäynti',
     diacor_section_confirmation_content_other_payer: 'Muu maksaja (vakuutusyhtiö tai maksusitoumus)',
     diacor_section_confirmation_content_contactInfo1: 'YHTEYSTIETOSI',
     diacor_section_confirmation_content_contactInfo2: 'Yhteystiedot',
     diacor_section_confirmation_content_plus: 'Ymmärrän, että online vastaanotto onnistuu vain DiacorPlus sovelluksen avulle',
     diacor_section_confirmation_content_terms: 'Peruutusehdot',
     diacor_section_confirmation_content_notification: 'Varauksen voi peruuttaa ilmaiseksi 4 tuntia ennen aikaa. Esteen sattuessa peruuta aikasi viimeistään edellisenä päivänä ennen sovittua ajankohtaa. Peruuttamattomasta tai samana päivänä perutusta varauksesta perimme maksun.',
     diacor_section_header1: 'Työterveysasiakkaan ajanvaraus',
     diacor_section_header2: 'Omat varaukset',
     diacor_section_summary_header: 'VARAUKSEN TIEDOT',
     diacor_section_summary_content: 'Hienoa! Varaus on vastaanotettu ja olemme lähettäneet sähköpostivarmistuksen osoitteeseesi! Varauksesi tunnus on ',
     diacor_company_name: 'Diacor ',
     diacor_section_summary_add_calendar: 'Lisää kalenteriin',
     diacor_section_summary_reminder_question:'HALUATKO MUISTUTUKSEN?',
     diacor_section_summary_reminder_choise: 'Valitse milloin haluat muistutuksen tekstiviestillä.',
     diacor_section_summary_reminder_30min: '30 min ennen',
     diacor_section_summary_reminder_60min: '60 min ennen',
     diacor_section_summary_reminder_2h: '2h  ennen',
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
     diacor_timeslot_list_content: 'Ei aikoja tälle päivälle',
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
