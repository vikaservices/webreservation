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
export const SET_SELECTED_EMPLOYER = 'set_selected_employer';
export const GET_DOCTOR_INFO = 'get_doctor_info';
export const GET_FIXEDGROUPS = 'get_fixedgroups';
// -----
export const MAKE_PRE_RESERVATION = 'make_pre_reservation';
export const CONFIRM_RESERVATION = 'confirm_reservation';
export const GET_RESERVATION = 'get_reservation';
export const CANCEL_RESERVATION = 'cancel_reservation';
export const ORDER_REMINDER = 'order_reminder';
// -----
export const RESET = 'reset';
export const SAVE_SELECTED_TIMESLOT = 'save_selected_timeslot';
export const SET_TIME_OF_DAY_FILTER = 'set_time_of_day_filter';
export const SET_FILTERS = 'set_filters';
export const DIALOG_CLOSE = 'dialog_close';

// APP STATE
export const APP_STATE_INITIAL = 'app_state_initial';
export const APP_STATE_CLIENT_IDENTIFIED = 'app_state_client_identified';
export const APP_STATE_CONFIRMATION_OK = 'app_state_confirmation_ok';
export const APP_STATE_ORDER_REMINDER_OK = 'app_state_order_reminder_ok';
export const APP_STATE_ORDER_REMINDER_FAILED_NO_CLIENT = 'app_state_order_reminder_failed_no_client';
export const APP_STATE_ORDER_REMINDER_FAILED_NO_RESERVATION = 'app_state_order_reminder_failed_no_reservation';
export const APP_STATE_ORDER_REMINDER_FAILED = 'app_state_order_reminder_failed';

// DIALOGS
export const DLG_VIEW_NONE = 'dlg_view_none';
export const DLG_VIEW_REGISTER_CHECK_SSN = 'dlg_view_register_check_ssn';
export const DLG_VIEW_REGISTER_FORBIDDEN = 'dlg_view_register_forbidden';
export const DLG_VIEW_REGISTER_OHC_CHECK_SSN = 'dlg_view_register_ohc_check_ssn';
export const DLG_VIEW_REGISTER_OHC_NOT_FOUND = 'dlg_view_register_ohc_not_found';
export const DLG_VIEW_REGISTER_OHC_FORBIDDEN = 'dlg_view_register_ohc_forbidden';
export const DLG_VIEW_REGISTER_CREATE_CLIENT = 'dlg_view_register_create_client';
export const DLG_VIEW_REGISTER_ERROR = 'dlg_view_register_error';
export const DLG_VIEW_PRERESERVATION_ERROR = 'dlg_view_preservation_error';
export const DLG_VIEW_CONFIRMATION_ERROR = 'dlg_view_confirmation_error';
export const DLG_VIEW_ORDER_REMINDER_ERROR = 'dlg_view_order_reminder_error';
export const DLG_VIEW_CANCEL_RESERVATION = 'dlg_view_cancel_reservation';
export const DLG_VIEW_CANCEL_RESERVATION_CONFIRM = 'dlg_view_cancel_reservation_confirm';
export const DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND = 'dlg_view_cancel_reservation_not_found';
export const DLG_VIEW_CANCEL_RESERVATION_OK = 'dlg_view_cancel_reservation_ok';
export const DLG_VIEW_CANCEL_RESERVATION_ERROR = 'dlg_view_cancel_reservation_error';
export const DLG_VIEW_DOCTOR_INFO = 'dlg_view_doctor_info';
export const DLG_VIEW_DOCTOR_INFO_NOT_FOUND = 'dlg_view_doctor_info_not_found';
export const DLG_VIEW_GENERIC_FAILURE = 'dlg_view_generic_failure';

// TIME OF DAY FILTER CUTOFFS
export const TOD_MORNING = '7';
export const TOD_DAY = '11';
export const TOD_AFTERNOON = '17';
