import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { APP_STATE_CONFIRMATION_OK, APP_STATE_CONFIRMATION_FAILED } from '../actions/types';

class SectionConfirmation extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  handleCancel(event) {
    event.preventDefault();
    console.log("handleCancel");
    this.props.resetState();
  }

  confirmReservation( notes, visitType, smsNotificationTo, emailConfirmationTo, event) {
    event.preventDefault();
    console.log( "cancelPreReservation" +
                 " notes: " + notes +
                 " visitType: " + visitType +
                 " smsNotificationTo: " + smsNotificationTo +
                 " emailConfirmationTo: " + emailConfirmationTo);
    this.props.confirmReservation( this.props.prereservation.id,
                                   this.props.client_id,
                                   notes,
                                   visitType,
                                   smsNotificationTo,
                                   emailConfirmationTo,
                                 ).then( () => {
                                   if( this.props.appstate == APP_STATE_CONFIRMATION_OK) {
                                     // route to summary page
                                     console.log("confirmReservation: confirmation ok");
                                     //this.context.router.push('/summary');
                                   } else {
                                     // error
                                     console.log("confirmReservation: confirmation failed");
                                   }
                                 });
  }

  render() {
    const active = this.props.confirmation_section_active;

    if( active == 'hidden') {
      return <div></div>;
    }

    if( active == 'inactive') {
      return (
        <div className="section-confirmation-inactive row">
          <div className="col-xs-12">
            <h4 className="section-title">VARAUKSEN VAHVISTAMINEN</h4>
          </div>
        </div>
      );
    }

    return (
      <div className="section-confirmation row">
        <div className="col-xs-12">
          <h4 className="section-title">VARAUKSEN VAHVISTAMINEN</h4>
          <p>Tarkista tiedot ennen varauksen vahvistamista. Esteen sattuessa
          peruuta aikasi viimeistään edellisenä päivänä ennen sovittua ajankohtaa.
          Peruuttamattomasta tai samaman päivänä perutusta varauksesta perimme maksun.</p>
          <div className="confirmation-block">
            <div className="confirmation-logo">
              <img src={this.props.selectedtimeslot.imageUrl ? this.props.selectedtimeslot.imageUrl : ""} />
            </div>
            <div className="confirmation-content">
              <h5>VARATTAVA AIKA</h5>
              <span>{this.props.selectedtimeslot ? this.props.selectedtimeslot.resourceName : ""}</span><br />
              <span>{this.props.selectedtimeslot ? this.props.selectedtimeslot.title : ""}</span><br />
              <span>{formatDate2('fi', this.props.selecteddate)}</span><br />
              <span>{this.props.selectedtimeslot ? this.props.selectedtimeslot.startTimeHours : ""} </span>
              <span>{this.props.selectedtimeslot ? "(" + this.props.selectedtimeslot.duration + " min)" : ""}</span><br />
              <span>{this.props.selectedtimeslot ? this.props.selectedtimeslot.unitName : ""}</span>
            </div>
          </div>

          <form onSubmit={(event) => this.confirmReservation( $('textarea[name="notes"]').val(),
                                                              $('input[name="visitType"]').val(),
                                                              $('input[name="smsNotificationTo"]').val(),
                                                              $('input[name="emailConfirmationTo"]').val(),
                                                              event)} >
            <div className="confirmation-block">
              <div className="confirmation-logo">
                <img src="public/img/confirmation-reason.png" />
              </div>
              <div className="confirmation-content">
                <h5>KÄYNNIN SYY</h5>
                <textarea placeholder="Kirjoita syy käynnillesi..." name="notes" />
              </div>
            </div>
            <div className="confirmation-block">
              <div className="confirmation-logo">
                <img src="public/img/confirmation-payer.png" />
              </div>
              <div className="confirmation-content">
                <h5>MAKSAJA</h5>
                <input type="radio" name="visitType" value="PRIVATE" selected="selected" />Yksityiskäynti<br />
                <input type="radio" name="visitType" value="OCCUPATIONAL" />Työterveyskäynti, [==yrityksen nimi tähän==]<br />
                <input type="radio" name="visitType" value="OTHER" />Muu maksaja (vakuutusyhtiö tai maksusitoumus)

              </div>
            </div>
            <div className="confirmation-block">
              <div className="confirmation-logo">
                <img src="public/img/confirmation-contact.png" />
              </div>
              <div className="confirmation-content">
                <h5>YHTEYSTIETOSI</h5>
                <span>Yhteystiedot</span><br />
                <input type="text" name="emailConfirmationTo" placeholder="Sähköpostiosoite" /><br />
                <input type="text" name="smsNotificationTo" placeholder="Matkapuhelinnumero" />
              </div>
            </div>
            <div className="confirmation-block confirmation-diacor-plus">
              <div className="confirmation-content">
                <input type="checkbox" name="diacor_plus" />
                <span>Ymmärrän, että online vastaanotto onnistuu vain DiacorPlus sovelluksen avulle</span>
              </div>
            </div>
            <div className="confirmation-block confirmation-submit">
              <div className="submit-buttons-centered">
                <button className="btn-white" onClick={(event) => this.handleCancel(event)}>PERUUTA</button>
                <button className="btn-red">VAHVISTA VARAUS</button>
              </div>
            </div>
          </form>

          <div className="confirmation-terms">
            <p>Peruutusehdot</p>
            <p>Varauksen voi peruuttaa ilmaiseksi 4 tuntia ennen aikaa. Tämän jälkeen täytyy maksaa täysi hinta vaikka ei pääsisi paikalle.</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selecteddate: state.app.selecteddate,
    selectedtimeslot: state.app.selectedtimeslot,
    prereservation: state.app.prereservation,
    appstate: state.app.appstate,
    client_id: state.app.client_id,
    confirmation_section_active: state.app.confirmation_section_active
  };
}

export default connect(mapStateToProps, actions)(SectionConfirmation);
