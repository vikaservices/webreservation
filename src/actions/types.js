// ACTIONS
// -----
export const TERMS_SEARCH = 'terms_search';
export const UNITS_SEARCH = 'units_search';
export const FREEDAYS_SEARCH = 'freedays_search';
export const TIMESLOTS_SEARCH = 'timeslots_search';
// -----
export const LOGIN_CLIENT = 'login_client';
export const LOGIN_OHC_CLIENT = 'login_ohc_client';
export const CHECK_CLIENT_SSN = 'check_client_ssn';
export const CHECK_OHC_CLIENT_SSN = 'check_ohc_client_ssn';
export const CREATE_CLIENT = 'create_client';
export const SAVE_CLIENT_INFO = 'save_client_info';
// -----
export const MAKE_PRE_RESERVATION = 'make_pre_reservation';
export const CONFIRM_RESERVATION = 'confirm_reservation';
export const GET_RESERVATION = 'get_reservation';
export const CANCEL_RESERVATION = 'cancel_reservation';
// -----
export const SET_SELECTED_DATE = 'set_selected_date';
export const SAVE_SELECTED_TIMESLOT = 'save_selected_timeslot';
export const RESET = 'reset';
export const SET_TIME_OF_DAY_FILTER = 'set_time_of_day_filter';

// APP STATE
export const APP_STATE_INITIAL = 'app_state_initial';
export const APP_STATE_CLIENT_IDENTIFIED = 'app_state_client_identified';
export const APP_STATE_WAIT_PRE_RESERVATION = 'app_state_wait_preservation';
export const APP_STATE_PRE_RESERVATION_OK = 'app_state_pre_reservation_ok';
export const APP_STATE_WAIT_CONFIRMATION = 'app_state_wait_cinfirmation';
export const APP_STATE_CONFIRMATION_OK = 'app_state_confirmation_ok';
export const APP_STATE_CONFIRMATION_FAILED = 'app_state_confirmation_failed';

// DIALOGS
export const DLG_VIEW_NONE = 'dlg_view_none';
export const DLG_VIEW_REGISTER_CHECK_SSN = 'dlg_view_register_check_ssn';
export const DLG_VIEW_REGISTER_OHC_CHECK_SSN = 'dlg_view_register_ohc_check_ssn';
export const DLG_VIEW_REGISTER_OHC_NOT_FOUND = 'dlg_view_register_ohc_not_found';
export const DLG_VIEW_REGISTER_OHC_FORBIDDEN = 'dlg_view_register_ohc_forbidden';
export const DLG_VIEW_REGISTER_CREATE_CLIENT = 'dlg_view_register_create_client';
export const DLG_VIEW_REGISTER_ERROR = 'dlg_view_register_error';
export const DLG_VIEW_PRERESERVATION_ERROR = 'dlg_view_preservation_error';
export const DLG_VIEW_CONFIRMATION_ERROR = 'dlg_view_confirmation_error';
export const DLG_VIEW_CANCEL_RESERVATION = 'dlg_view_cancel_reservation';
export const DLG_VIEW_CANCEL_RESERVATION_CONFIRM = 'dlg_view_cancel_reservation_confirm';
export const DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND = 'dlg_view_cancel_reservation_not_found';
export const DLG_VIEW_CANCEL_RESERVATION_OK = 'dlg_view_cancel_reservation_ok';
export const DLG_VIEW_CANCEL_RESERVATION_ERROR = 'dlg_view_cancel_reservation_error';

// TIME OF DAY FILTER CUTOFFS
export const TOD_MORNING = '7';
export const TOD_DAY = '11';
export const TOD_AFTERNOON = '17';
