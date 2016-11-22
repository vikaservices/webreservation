import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import text from './common/translate';
import SvgIcon from './common/svg_definitions';
import { APP_STATE_CONFIRMATION_OK } from '../actions/types';
import utils from './common/util';

class SectionConfirmation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      payer: '',
      phone_validate_error: false,
      email_validate_error: false,
      diacor_plus_approval_missing: false,
      buttonDisabled: false,
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
     if (e.charCode === 13) {
          e.preventDefault();
      }
  }

  componentWillReceiveProps(nextProps) {
    let payer = nextProps.is_ohc_client
                  ? nextProps.is_private_visit ? 'PRIVATE' : 'OCCUPATIONAL'
                  : 'PRIVATE';
    this.setState( {payer: payer, phone_validate_error: false,
                    email_validate_error: false, diacor_plus_approval_missing: false} );
    console.log("SectionConfirmation: componentWillReceiveProps: " + payer);
    if( nextProps.startprereservationtimer ) {
      console.log("SectionConfirmation: componentWillReceiveProps: startprereservationtimer is set");
    } else {
      console.log("SectionConfirmation: componentWillReceiveProps: startprereservationtimer not set");
      this.props.clearPreReservationTimerFlag();
    }
  }

  handleCancel(event) {
    event.preventDefault();
    console.log("handleCancel");
    this.props.resetState();
  }

  validatePhoneNumber(phone) {
    let re = /^\s*\+?(\d[\s\-]*){6,}\d\s*$/;
    return re.test(phone);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  confirmReservation( notes, visitType, smsNotificationTo, emailConfirmationTo, diacor_plus_approval, event) {
    event.preventDefault();
    console.log( "confirmReservation" +
                 " notes: " + notes +
                 " visitType: " + visitType +
                 " smsNotificationTo: " + smsNotificationTo +
                 " emailConfirmationTo: " + emailConfirmationTo);

    this.setState( {phone_validate_error: false,
                    email_validate_error: false,
                    diacor_plus_approval_missing: false} );
    let validation_error = false;
    // validate phone number and sms
    if( !smsNotificationTo ) {
      console.log("confirmReservation: no phone");
      this.setState({phone_validate_error: true}, () => {
        //return false;
      });
      validation_error = true;
    }
    else if( !this.validatePhoneNumber(smsNotificationTo) ) {
      console.log("confirmReservation: wrong phone");
      this.setState({phone_validate_error: true}, () => {
        //return false;
      });
      validation_error = true;
    }

    if( !emailConfirmationTo ) {
      console.log("confirmReservation: no email");
      this.setState({email_validate_error: true}, () => {
        //return false;
      });
      validation_error = true;
    }
    else if( !this.validateEmail(emailConfirmationTo) ) {
      console.log("confirmReservation: wrong email");
      this.setState({email_validate_error: true}, () => {
        //return false;
      });
      validation_error = true;
    }

    if( this.props.selectedtimeslot.online && !diacor_plus_approval) {
      console.log("confirmReservation: diacor plus not not approved");
      this.setState({diacor_plus_approval_missing: true}, () => {
        //return false;
      });
      validation_error = true;
    }

    if( validation_error ) {
      return false;
    }
    this.props.confirmReservation( this.props.reservationid,
                                   this.props.client_id,
                                   notes,
                                   visitType,
                                   smsNotificationTo,
                                   emailConfirmationTo,
                                   this.props.pagelang
                                 ).then( () => {
                                   if( this.props.appstate == APP_STATE_CONFIRMATION_OK) {
                                     console.log("confirmReservation: confirmation ok");
                                     this.setState({
                                         buttonDisabled: true
                                     });
                                     if( this.props.native_entry_flag ) {
                                       // Inform DiacorPlus app that webapp has finished
                                       window.location.assign("?&finish=1");
                                     }
                                   } else {
                                     // error
                                     console.log("confirmReservation: confirmation failed");
                                   }
                                 });
  }

  onPayerChange(event) {
    console.log("onPayerClick: " + event.target.value);
    this.setState( { payer: event.target.value } );
  }

  // Go back to time selection
  backToTimeSelection(e) {
    e.preventDefault();
    this.props.resetState( true );
  }

  render() {
    let active = this.props.confirmation_section_active;
    //active = 'active';

    if( active == 'hidden') {
      return <div></div>;
    }

    if( active == 'inactive') {
      return (
        <div className="section-confirmation-inactive row">
          <div className="col-xs-12 header-row">
            <h4 className="section-title pull-left">{text('diacor_section_confirmation_header')}</h4>
          </div>
        </div>
      );
    }

    let slot = this.props.selectedtimeslot;
    return (

      <div className="section-confirmation row">
        <div className="">
          <div className="header-row">
            <h4 className="section-title pull-left">{text('diacor_section_confirmation_header')}</h4>
          </div>
          <p className="confirmation-text">{text('diacor_section_confirmation_content')}</p>

          <div className="confirmation-block row nopadding">
            <div className="col-xs-12 col-sm-6 confirmation-1st-col nopadding">

              <div className="confirmation-logo logo-border">
                <img src={slot.imageUrl ? slot.imageUrl : '/public/img/placeholder-person-image.png'} />
              </div>
              <div className="confirmation-content-narrow">
                <h5 className="hide-mobile">{text('diacor_section_confirmation_content_time')}</h5>
                <p>{slot ? slot.resourceName : ""}</p>
                <p>{this.props.selectedtimeslot ? slot.title : ""}</p>
                <p>{utils.formatDate3(this.props.pagelang, new Date(this.props.date_filter))}</p>
                <p>{slot ? slot.startTimeHours : ""} {slot ? "(" + slot.duration + " min)" : ""}</p>
                {slot.online ?
                <div className="unit-info">
                  <a className="popup-svg-phone" href={slot.unitLinkUrl ? slot.unitLinkUrl : ''}>
                    <SvgIcon className="" Icon='phone' />
                  </a>
                  <p className="unit-name vertical-align-middle">
                    <a className="link" href={slot.unitLinkUrl ? slot.unitLinkUrl : ''}>{slot.unitName ? slot.unitName : ''}</a>
                  </p>
                </div>
                :
                <p>{slot.unitName ? slot.unitName : ''}</p>
                }
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 confirmation-2nd-col nopadding">
              <div className="confirmation-note">
                <p>{text('diacor_section_confirmation_note_slot1')}</p>
              </div>
              <div className="confirmation-note">
                <p>{text('diacor_section_confirmation_note_slot2')}</p>
              </div>
            </div>
          </div>

          <form onKeyPress={this.handleKeyPress}
                onSubmit={(event) => this.confirmReservation( $('textarea[name="notes"]').val(),
                                                              this.state.payer,
                                                              $('input[name="smsNotificationTo"]').val(),
                                                              $('input[name="emailConfirmationTo"]').val(),
                                                              $('input[name="diacor_plus_approval"]').prop('checked'),
                                                              event)} >
            <div className="confirmation-block row nopadding">
              <div className="col-xs-12 col-sm-6 confirmation-1st-col nopadding">
                <div className="confirmation-logo hide-mobile">
                  <img src="public/img/confirmation-reason.png" />
                </div>
                <div className="confirmation-content">
                  <h5>{text('diacor_section_confirmation_content_reason')}</h5>
                  <textarea placeholder={text('diacor_input_placeholder_reason')} name="notes" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 confirmation-2nd-col nopadding">
              </div>
            </div>

            <div className="confirmation-block row nopadding">
              <div className="col-xs-12 col-sm-6 confirmation-1st-col nopadding">
                <div className="confirmation-logo hide-mobile">
                  <img src="public/img/confirmation-payer.png" />
                </div>
                <div className="confirmation-content">
                  <h5>{text('diacor_section_confirmation_content_payer')}</h5>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{verticalAlign: 'top'}}>
                          <input type="radio"
                                 onChange={this.onPayerChange.bind(this)}
                                 checked={this.state.payer === "PRIVATE"}
                                 name="visitType"
                                 value="PRIVATE" />
                        </td>
                        <td>
                          <label>{text('diacor_section_confirmation_content_private')}</label>
                        </td>
                      </tr>
                      <tr className={this.props.is_ohc_client ? "" : "hide" }>
                        <td style={{verticalAlign: 'top'}}>
                          <input type="radio"
                                 onChange={this.onPayerChange.bind(this)}
                                 checked={this.state.payer === "OCCUPATIONAL"}
                                 name="visitType"
                                 value="OCCUPATIONAL" />
                        </td>
                        <td>
                          <label>{text('diacor_section_confirmation_content_ohc')} {this.props.selected_employer ? this.props.selected_employer.name : ""}</label>
                        </td>
                      </tr>
                      <tr>
                        <td style={{verticalAlign: 'top'}}>
                          <input type="radio"
                                 onChange={this.onPayerChange.bind(this)}
                                 checked={this.state.payer === "OTHER"}
                                 name="visitType"
                                 value="OTHER" />
                        </td>
                        <td>
                          <label>{text('diacor_section_confirmation_content_other_payer')}</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 confirmation-2nd-col nopadding">
                <div className={this.state.payer == "OCCUPATIONAL" ? "confirmation-note" : "hide"}>
                  <p>{text('diacor_section_confirmation_note_ohc')}</p>
                </div>
              </div>
            </div>

            <div style={{borderBottom: 0}} className="confirmation-block row nopadding">
              <div className="col-xs-12 col-sm-6 confirmation-1st-col nopadding">
                <div className="confirmation-logo hide-mobile">
                  <img src="public/img/confirmation-contact.png" />
                </div>
                <div className="confirmation-content">
                  <h5>{text('diacor_section_confirmation_content_contactInfo1')}</h5>
                  <input className={this.state.email_validate_error ? "validate-error" : ""}
                         type="text"
                         name="emailConfirmationTo"
                         placeholder={text('diacor_input_placeholder_email')} /><br />
                  <input className={this.state.phone_validate_error ? "validate-error" : ""}
                         type="text"
                         name="smsNotificationTo"
                         placeholder={text('diacor_input_placeholder_cell')} />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 confirmation-2nd-col nopadding">
                <div className={this.state.email_validate_error ? "confirmation-note hide-mobile" : "hide"}>
                  <p>{text('diacor_section_confirmation_note_email')}</p>
                </div>
                <div className={this.state.phone_validate_error ? "confirmation-note hide-mobile" : "hide"}>
                  <p>{text('diacor_section_confirmation_note_phone')}</p>
                </div>
              </div>
            </div>

            <div className={this.props.selectedtimeslot.online ? "" : "hide"}>
              <table className="">
                <tbody>
                  <tr>
                    <td style={{verticalAlign: 'top'}}>
                      <input type="checkbox" name="diacor_plus_approval" />
                    </td>
                    <td>
                      <label className={this.state.diacor_plus_approval_missing ? "validate-error" : ''}>
                        {text('diacor_section_confirmation_content_plus')}
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="confirmation-submit">
              <div className="submit-buttons-centered">
                <button type="button" className="btn-white" onClick={(event) => this.backToTimeSelection(event)}>{text('diacor_popup_button_cancel')}</button>
                <button type="submit" disabled={this.state.buttonDisabled} className="btn-red">
                  {text('diacor_popup_button_confirm')}
                </button>
              </div>
            </div>
          </form>

          <div className="confirmation-terms">
            <p>{text('diacor_section_confirmation_content_terms')}</p>
            <p>{text('diacor_section_confirmation_content_notification')}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    date_filter: state.app.filters.date_filter,
    selectedtimeslot: state.app.selectedtimeslot,
    reservationid: state.app.reservationid,
    appstate: state.app.appstate,
    client_id: state.app.client_id,
    is_ohc_client: state.app.is_ohc_client,
    selected_employer: state.app.selected_employer,
    confirmation_section_active: state.app.confirmation_section_active,
    native_entry_flag: state.app.native_entry_flag,
    is_private_visit: state.app.is_private_visit,
    pagelang: state.app.pagelang,
    startprereservationtimer: state.app.startprereservationtimer
  };
}

export default connect(mapStateToProps, actions)(SectionConfirmation);
