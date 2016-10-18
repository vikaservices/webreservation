import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { APP_STATE_CONFIRMATION_OK, APP_STATE_CONFIRMATION_FAILED } from '../actions/types';

class SectionConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payer: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    let payer = nextProps.is_ohc_client ? 'OCCUPATIONAL' : 'PRIVATE';
    this.setState( {payer: payer} );
    console.log("SectionConfirmation: componentWillReceiveProps: " + payer);
  }

  handleCancel(event) {
    event.preventDefault();
    console.log("handleCancel");
    this.props.resetState();
  }

  confirmReservation( notes, visitType, smsNotificationTo, emailConfirmationTo, event) {
    event.preventDefault();
    console.log( "confirmReservation" +
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
                                     console.log("confirmReservation: confirmation ok");
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

  render() {
    const active = this.props.confirmation_section_active;

    if( active == 'hidden') {
      return <div></div>;
    }

    if( active == 'inactive') {
      return (
        <div className="section-confirmation-inactive row">
          <div className="col-xs-12 header-row">
            <h4 className="section-title pull-left">VARAUKSEN VAHVISTAMINEN</h4>
          </div>
        </div>
      );
    }

    return (
      <div className="section-confirmation row">
        <div className="col-xs-12">
          <div className="header-row">
            <h4 className="section-title pull-left">VARAUKSEN VAHVISTAMINEN</h4>
          </div>
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
              <span>{formatDate2('fi', new Date(this.props.date_filter))}</span><br />
              <span>{this.props.selectedtimeslot ? this.props.selectedtimeslot.startTimeHours : ""} </span>
              <span>{this.props.selectedtimeslot ? "(" + this.props.selectedtimeslot.duration + " min)" : ""}</span><br />
              <span>{this.props.selectedtimeslot ? this.props.selectedtimeslot.unitName : ""}</span>
            </div>
          </div>

          <form onSubmit={(event) => this.confirmReservation( $('textarea[name="notes"]').val(),
                                                              this.state.payer,
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
                <input type="radio"
                       onChange={this.onPayerChange.bind(this)}
                       checked={this.state.payer === "PRIVATE"}
                       name="visitType"
                       value="PRIVATE" />Yksityiskäynti<br />
                <span className={this.props.is_ohc_client ? "" : "hide" }>
                <input type="radio"
                       onChange={this.onPayerChange.bind(this)}
                       checked={this.state.payer === "OCCUPATIONAL"}
                       name="visitType"
                       value="OCCUPATIONAL" />Työterveyskäynti, {this.props.selected_employer ? this.props.selected_employer.name : ""}<br />
                </span>
                <input type="radio"
                       onChange={this.onPayerChange.bind(this)}
                       checked={this.state.payer === "OTHER"}
                       name="visitType"
                       value="OTHER" />Muu maksaja (vakuutusyhtiö tai maksusitoumus)

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
    date_filter: state.app.filters.date_filter,
    selectedtimeslot: state.app.selectedtimeslot,
    prereservation: state.app.prereservation,
    appstate: state.app.appstate,
    client_id: state.app.client_id,
    is_ohc_client: state.app.is_ohc_client,
    selected_employer: state.app.selected_employer,
    confirmation_section_active: state.app.confirmation_section_active
  };
}

export default connect(mapStateToProps, actions)(SectionConfirmation);
