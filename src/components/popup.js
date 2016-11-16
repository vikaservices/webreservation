import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import NewClientForm from './new_client_form';
import SvgIcon from './common/svg_definitions';
import text from './common/translate';
import { getFormValues } from 'redux-form';
import { DLG_VIEW_REGISTER_CHECK_SSN,
         DLG_VIEW_REGISTER_FORBIDDEN,
         DLG_VIEW_REGISTER_OHC_CHECK_SSN,
         DLG_VIEW_REGISTER_OHC_NOT_FOUND,
         DLG_VIEW_REGISTER_OHC_FORBIDDEN,
         DLG_VIEW_REGISTER_CREATE_CLIENT,
         DLG_VIEW_REGISTER_ERROR,
         DLG_VIEW_PRERESERVATION_ERROR,
         DLG_VIEW_CONFIRMATION_ERROR,
         DLG_VIEW_ORDER_REMINDER_ERROR,
         DLG_VIEW_CANCEL_RESERVATION,
         DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND,
         DLG_VIEW_CANCEL_RESERVATION_CONFIRM,
         DLG_VIEW_CANCEL_RESERVATION_OK,
         DLG_VIEW_CANCEL_RESERVATION_ERROR,
         DLG_VIEW_DOCTOR_INFO,
         DLG_VIEW_DOCTOR_INFO_NOT_FOUND,
         DLG_VIEW_GENERIC_FAILURE

       } from '../actions/types';


class Popup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reservation_code: '',
      ssn: '',
      bigPop: false,
      buttonDisabled: false,
    };
  }

  checkClientSSN( ssn, event ) {
    event.preventDefault();
    //console.log("Popup : checkSSN : ssn = " + ssn);
    this.props.saveClientInfo(ssn);
    if( event.target.name == "regularLoginForm" ) {
      this.props.checkClientSSN(ssn);
    }
    else if( event.target.name == "ohcLoginForm" ) {
      this.props.checkOhcClientSSN(ssn);
    }
  }

  //createClient( ssn, first_name, last_name, address, postcode, city, phone ) {
  createClient() {
    const {ssn, first_name, last_name, address, postcode, city, phone} = this.props.values;
    console.log("Popup: createClient: first_name=" + first_name + " last_name=" + last_name +
    " address=" + address +  " postcode=", postcode + " city=" + city + " phone=" + phone);
    this.props.saveClientInfo(ssn, first_name, last_name, address, postcode, city, phone);
    this.props.createClient(ssn, first_name, last_name, address, postcode, city, phone);
  }

  getReservation(code, ssn, event) {
    event.preventDefault();
    //console.log("Popup: getReservation");
    this.setState({
        reservation_code: code,
        ssn: ssn,
        buttonDisabled: true
    });
    this.props.getReservation(code, ssn);
  }

  cancelReservation(event) {
    event.preventDefault();
    //console.log("Popup: handleCancelReservation: code: " + this.state.reservation_code + " ssn: " + this.state.ssn);
    this.props.cancelReservation(this.state.reservation_code, this.state.ssn);
  }

  resetState(event) {
    event.preventDefault();
    //console.log("Popup: resetState");
    this.props.resetState();
  }

  closeDialog() {
    this.props.closeDialog();
  }

  /************* DIALOG CONTENT RENDERING FUNCTIONS ***************/

  renderAskSnn() {
    return (
      <div className="client-popup">
        <h4>{text('diacor_popup_ask_ssn_header')}</h4>
        <form name="regularLoginForm" onSubmit={(event) => this.checkClientSSN($('input[name="ssn"]').val(), event)}>
          <input autoFocus className="popup-form-input" placeholder={text('diacor_input_placeholder_ssn')} type="text" name="ssn" /><br />
          <img className='img-private-doctor' src="public/img/group-15@3x.png" />
          <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <button className="btn-white" onClick={(event) => this.resetState(event)}>{text('diacor_popup_button_cancel')}</button>
              <button className="btn-red">{text('diacor_popup_button_accept')}</button>
            </div>
          </div>
          <a href="" onClick={(event) => this.resetState(event)}>
            <SvgIcon className="popup-close" Icon='close' />
          </a>
        </form>
      </div>
    );
  }

  reservationForbidden() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_forbidden_header')}.</h4>
        <p className="reservation-forbidden">{text('diacor_popup_forbidden_content')}
            <a href={'tel:'+ text('diacor_popup_forbidden_link')}>{text('diacor_popup_forbidden_link')}</a>
        </p>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderAskSnnOhc() {
    return (
      <div className="client-popup">
        <h4>{text('diacor_popup_ask_ssnohc_header')}</h4>
        <form name="ohcLoginForm" onSubmit={(event) => this.checkClientSSN($('input[name="ssn"]').val(), event)}>
          <input autoFocus className="popup-form-input" placeholder={text('diacor_input_placeholder_ssn')} type="text" name="ssn" /><br />
          <img className='img-occupational-doctor' src="public/img/group-15@3x.png" />
          <div className="popup-control-box">
              <div className="submit-buttons-centered">
                <button className="btn-white" onClick={(event) => this.resetState(event)}>{text('diacor_popup_button_cancel')}</button>
                <button className="btn-red">{text('diacor_popup_button_accept')}</button>
              </div>
          </div>
          <a href="" onClick={(event) => this.resetState(event)}>
            <SvgIcon className="popup-close" Icon='close' />
          </a>
        </form>
      </div>
    );
  }

  ohcClientNotFound() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_ohc_notfound_header')}</h4>
        <p>{text('diacor_popup_ohc_notfound_content')}</p>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  ohcReservationForbidden() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_ohc_forbidden_header')}.</h4>
        <p className="reservation-forbidden">{text('diacor_popup_ohc_forbidden_content')}
            <a href={'tel:'+ text('diacor_popup_ohc_forbidden_link')}>{text('diacor_popup_ohc_forbidden_link')}</a>
        </p>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderAskClientInfoForm() {
    console.log("renderAskClientInfoForm");
    return (
      <div className="dialog">
        <NewClientForm popUp={true}
                       resetState={this.resetState.bind(this)}
                       onSubmit={this.createClient.bind(this)}
                       initialValues={this.props.client} />
      </div>
    );
  }

  renderClientCreationError() {
      //TODO: does this need more?
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_creation_error_header')}</h4>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <button className="btn-red" onClick={(event) => this.resetState(event)}>{text('diacor_popup_button_return_scheduling')}</button>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderPreReservationError() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_prereservation_error_header')}</h4>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <button className="btn-red" onClick={(event) => this.resetState(event)}>{text('diacor_popup_button_return_scheduling')}</button>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderReservationConfirmationError() {
    return (
      <div className="client-popup">
        <h4>Jotakin meni pieleen varauksen vahvistamisessa, yritä hetken kuluttua uudelleen</h4>
        <div className="popup-control-box">
          <div className="submit-buttons-centered">
            <button onClick={this.closeDialog.bind(this)} className="btn-red">Poistu</button>
          </div>
        </div>
      </div>
    );
  }

  renderOrderReminderError() {
    return (
      <div className="client-popup">
        <h4>Jotakin meni pieleen muistutuksen tallentamisessa, yritä hetken kuluttua uudelleen</h4>
        <div className="popup-control-box">
          <div className="submit-buttons-centered">
            <button onClick={this.closeDialog.bind(this)} className="btn-red">Poistu</button>
          </div>
        </div>
      </div>
    );
  }

  renderCancelReservation() {
    return (
      <div className="dialog client-popup-form">
        <form onSubmit={(event) => this.getReservation($('input[name="code"]').val(),
                                                       $('input[name="ssn"]').val(),
                                                       event)}>
          <h4>{text('diacor_popup_cancel_reservation_header')}</h4>
          <input autoFocus className="input-reservation-code" type="text" name="code" placeholder={text('diacor_input_placeholder_reservation_code')} /><br />
          <input className="input-reservation-ssn" type="text" name="ssn" placeholder={text('diacor_input_placeholder_ssn')} /><br />
          <p className="reservation-input-info">{text('Löydät varauskoodin sähköpostistasi varausvahvistuksesta.')}</p>
          <div className="popup-control-box">
              <div className="submit-buttons-centered">
                <a href="" onClick={(event) => this.resetState(event)}><button className="btn-white">{text('diacor_popup_button_cancel')}</button></a>
                <a href="">
                    <button disabled={this.state.buttonDisabled}
                            className="btn-red">{text('diacor_popup_button_accept')}
                   </button>
                </a>
              </div>
          </div>
          <a href="" onClick={(event) => this.resetState(event)}>
            <SvgIcon className="popup-close" Icon='close' />
          </a>
        </form>
      </div>
    );
  }

  renderCancelReservationNotFound() {
    var header = text('diacor_popup_cancel_notfound_headerone') + this.state.reservation_code + text('diacor_popup_cancel_notfound_headertwo');
    return (
      <div className="dialog client-popup">
        <h4 className="popup-error-not-found">{header}</h4>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderCancelReservationConfirm() {
    let reservation = this.props.reservation;

    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_ask_cancel_reservation_confirm_header')}</h4>
        <div className='popup-reservation-info'>
          <span>{reservation.product}</span><br />
          <span>{reservation.resourceName}</span><br />
          <span>{reservation.title}</span><br/>
          <span>{formatDate4("fi", reservation.start)}</span><br />
          <span>{getHours(reservation.start)} ({reservation.duration} {text('diacor_time_min')})</span>
        </div>
        <div className="popup-unit-info">
          {reservation.online ?
          <a className="popup-svg-phone" href={reservation.unitLinkUrl}>
            <SvgIcon className="" Icon='phone' />
          </a>
          : ''}
          <span className="popup-unit-name"><a href={reservation.unitLinkUrl}>{reservation.unitName}</a></span><br />
          <span>{reservation.unitAddress}</span><br />
          <span>{reservation.unitPostCode} {reservation.unitCity}</span><br />
          <span>Varauskoodi: {this.state.reservation_code}</span>
        </div>
        <p>{text('diacor_popup_ask_cancel_reservation_confirm_content')}</p>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-white">{text('diacor_popup_button_return_scheduling')}</button></a>
              <a href="" onClick={(event) => this.cancelReservation(event)}><button className="btn-red btn-red-mobile-margin">{text('diacor_popup_button_cancel_appointment')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderCancelReservationOk() {
      //TODO: change this back to old
    let reservation = this.props.reservation;
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_cancel_reservation_ok_header')}</h4>
        <span className="cancellation-statement">{text('diacor_popup_cancel_reservation_ok_content1')}</span>
        <div className='popup-reservation-info'>
            <span>{reservation.product}</span><br />
            <span>{reservation.resourceName}</span><br />
            <span>{reservation.title}</span><br/>
            <span>{formatDate4("fi", reservation.start)}</span><br />
            <span>{reservation.start} ({reservation.duration})</span>
        </div>
        <div className="popup-unit-info">
            <a className="popup-svg-phone" href={reservation.unitLinkUrl}>
              <SvgIcon className="" Icon='phone' />
            </a>
            <span className="popup-unit-name"><a href={reservation.unitLinkUrl}>{reservation.unitName}</a></span><br />
            <span>{reservation.unitAddress}</span><br />
            <span>{reservation.unitPostCode} {reservation.unitCity}</span><br />
            <span>{ text('diacor_popup_cancel_reservation_ok_content2') + this.state.reservation_code}</span>
        </div>
        <p className="popup-cancellation-ok-margin">{text('diacor_popup_cancel_reservation_ok_content3')}</p>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="http://diacor.fi"><button className="btn-white">{text('diacor_popup_button_leave_scheduling')}</button></a>
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_new_reservation')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderCancelReservationError() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_cancel_reservation_error_header')}</h4>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  helperRenderArray( array ) {
    return array.map((item, index) => {
      return (
        <span key={`${index}${item}`}>{item}, </span>
      );
    });
  }

  // wrap in a-element
  // [{id: id, name: name, linkUrl: url},{id: id, name: name, linkUrl: url},...]
  helperRenderArrayOfObjects( array ) {
    return array.map((item, index) => {
      return (
        <a href={item.linkUrl} className="link" key={`${index}${item.linkUrl}`}>{item.name}, </a>
      );
    });
  }

  helperRenderPrices( obj ) {
    return Object.keys(obj).map((key, index) => {
      return (
        <span key={`${index}${key}${obj[key]}`}>{key} min, {obj[key]} e<br /></span>
      );
    });

  }

  renderDoctorInfo() {
    let info = this.props.doctorinfo;
    return (
      <div className="dialog client-popup">
        <div className="doctor-info-container">
          <div className="doctor-info">
            <h4>{info.resourceName}</h4>
            <div className='doctor-info-person'>
            <img src={info.imageUrl} />
              <h3>{info.resourceName}</h3>
              <p>{this.helperRenderArray(info.titles)}</p>
              <h3>{text('diacor_popup_doctor_info_skills')}</h3>
              <p className="italics">{info.speciality}</p>
            </div>

            <div className="">
              <h3>{text('diacor_popup_doctor_info_services')}</h3>
              <p className="italics">{this.helperRenderArrayOfObjects(info.services)}</p>
            </div>

            <div className="">
              <h3>{text('diacor_popup_doctor_info_locations')}</h3>
              <p className="italics">{this.helperRenderArrayOfObjects(info.units)}</p>
            </div>

            <div className="">
              <h3>{text('diacor_popup_doctor_info_languages')}</h3>
              <p className="italics">{this.helperRenderArray(info.languages)}</p>
            </div>

            <div className="">
              <h3>{text('diacor_popup_doctor_info_prices1')}</h3>
              <p className="italics">
                <span>{text('diacor_popup_doctor_info_prices2')}</span><br />
                {this.helperRenderPrices(info.prices)}
              </p>
            </div>
          </div>
          <div className="popup-control-box">
              <div className="submit-buttons-centered">
                <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_close')}</button></a>
              </div>
          </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderDoctorInfoNotFoundError() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_doctor_info_not_found')}</h4>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderGenericFailure() {
    return (
      <div className="dialog client-popup">
        <h4>{text('diacor_popup_generic_failure')}</h4>
        <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <a href="" onClick={(event) => this.resetState(event)}><button className="btn-red">{text('diacor_popup_button_return_scheduling')}</button></a>
            </div>
        </div>
        <a href="" onClick={(event) => this.resetState(event)}>
          <SvgIcon className="popup-close" Icon='close' />
        </a>
      </div>
    );
  }

  renderDialog() {
    switch( this.props.dialogview ) {
      case DLG_VIEW_REGISTER_CHECK_SSN:
        return this.renderAskSnn();
      case DLG_VIEW_REGISTER_OHC_CHECK_SSN:
        return this.renderAskSnnOhc();
      case DLG_VIEW_REGISTER_FORBIDDEN:
        return this.reservationForbidden();
      case DLG_VIEW_REGISTER_OHC_NOT_FOUND:
        return this.ohcClientNotFound();
      case DLG_VIEW_REGISTER_OHC_FORBIDDEN:
        return this.ohcReservationForbidden();
      case DLG_VIEW_REGISTER_CREATE_CLIENT:
        return this.renderAskClientInfoForm();
      case DLG_VIEW_REGISTER_ERROR:
        return this.renderClientCreationError();
      case DLG_VIEW_PRERESERVATION_ERROR:
        return this.renderPreReservationError();
      case DLG_VIEW_CONFIRMATION_ERROR:
        return this.renderReservationConfirmationError();
      case DLG_VIEW_ORDER_REMINDER_ERROR:
        return this.renderOrderReminderError();
      case DLG_VIEW_CANCEL_RESERVATION:
        return this.renderCancelReservation();
      case DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND:
        return this.renderCancelReservationNotFound();
      case DLG_VIEW_CANCEL_RESERVATION_CONFIRM:
        //TODO: this is big class
        return this.renderCancelReservationConfirm();
      case DLG_VIEW_CANCEL_RESERVATION_OK:
        //TODO: this is big class
        return this.renderCancelReservationOk();
      case DLG_VIEW_CANCEL_RESERVATION_ERROR:
        return this.renderCancelReservationError();
      case DLG_VIEW_DOCTOR_INFO:
        return this.renderDoctorInfo();
      case DLG_VIEW_DOCTOR_INFO_NOT_FOUND:
        return this.renderDoctorInfoNotFoundError();
      case DLG_VIEW_GENERIC_FAILURE:
        return this.renderGenericFailure();
      default:
        return null;
      }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.dialogisopen}
        onRequestClose={this.resetState.bind(this)}
        shouldCloseOnOverlayClick={false}
        className='modal-class-big'
        overlayClassName="overlay-class"
        >
        { this.renderDialog() }
      </Modal>
    );
  }
};


function mapStateToProps(state) {
  return {
    dialogisopen: state.app.dialogisopen,
    dialogview: state.app.dialogview,
    reservation: state.app.reservation,
    values: getFormValues('newClient')(state),
    client: state.app.client,
    doctorinfo: state.app.doctorinfo
  };
}

export default connect(mapStateToProps, actions)(Popup);
