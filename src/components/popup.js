import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { DLG_VIEW_REGISTER_CHECK_SSN,
         DLG_VIEW_REGISTER_CREATE_CLIENT,
         DLG_VIEW_REGISTER_ERROR,
         DLG_VIEW_PRERESERVATION_ERROR,
         DLG_VIEW_CANCEL_RESERVATION,
         DLG_VIEW_CANCEL_RESERVATION_OK,
         DLG_VIEW_CANCEL_RESERVATION_ERROR
       } from '../actions/types';


class Popup extends Component {

  checkClientSSN( ssn, event ) {
    event.preventDefault();
    console.log("Popup : checkSSN : ssn = " + ssn);
    this.props.checkClientSSN(ssn);
  }

  createClient( ssn, first_name, last_name, address, postcode, city, phone, event ) {
    event.preventDefault();
    console.log("Popup: createClient: first_name=" + first_name + " last_name=" + last_name +
    " address=" + address +  " postcode=", postcode + " city=" + city + " phone=" + phone);
    this.props.saveClientInfo(ssn, first_name, last_name, address, postcode, city, phone);
    this.props.createClient(ssn, first_name, last_name, address, postcode, city, phone);
  }

  cancelReservation(code, hetu, event) {
    event.preventDefault();
    console.log("Popup: handleCancelReservation");
    this.props.cancelReservation(code, hetu);
  }

  resetState(event) {
    event.preventDefault();
    console.log("Popup: resetState");
    this.props.resetState();
  }

  /************* DIALOG CONTENT RENDERING FUNCTIONS ***************/
  renderAskSnn() {
    return (
      <div className="client-popup">
        <form onSubmit={(event) => this.checkClientSSN($('input[name="ssn"]').val(), event)}>
          <h6>Hei, kuka on tulossa vastaanotolle</h6>
          <p>Henkilötunnus</p>
          <input type="text" name="ssn" /><br />
          <div className="submit-buttons-centered">
            <button onClick={(event) => this.resetState(event)}>Peruuta</button>
            <button>Jatka</button>
          </div>
        </form>
      </div>
    );
  }

  renderAskClientInfo() {
    return (
      <div className="dialog">
        <form onSubmit={(event) => this.createClient($('input[name="ssn"]').val(),
                                                     $('input[name="first_name"]').val(),
                                                     $('input[name="last_name"]').val(),
                                                     $('input[name="address"]').val(),
                                                     $('input[name="postcode"]').val(),
                                                     $('input[name="city"]').val(),
                                                     $('input[name="phone"]').val(), event)}>
          <h6>Hei, kuka on tulossa vastaanotolle</h6>
          <p>Henkilötunnus</p>
          <input type="text" name="ssn" autofocus /><br />
          <div>
            <h6>Uusi asiakas, tervetuloa! Lisää vielä seuraavat tiedot:</h6>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Etunimi<br />
                      <input type="text" name="first_name" />
                    </td>
                    <td>
                      Sukunimi<br />
                      <input type="text" name="last_name" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Katuosoite<br />
                      <input type="text" name="address" />
                    </td>
                    <td>
                      Postinumero<br />
                      <input type="text" name="postcode" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Postitoimipaikka<br />
                      <input type="text" name="city" />
                    </td>
                    <td>
                      Puhelinnumero<br />
                      <input type="text" name="phone" />
                    </td>
                  </tr>
                  </tbody>
              </table>
          </div>
          <div className="submit-buttons-centered">
            <button onClick={(event) => this.resetState(event)}>Peruuta</button>
            <button>Jatka</button>
          </div>
        </form>
      </div>
    );
  }

  renderClientCreationError() {
    return (
      <div className="dialog">
        <h6>Jotakin meni pieleen...</h6>
        <div className="submit-buttons-centered">
          <button onClick={(event) => this.resetState(event)}>Palaa ajanvaraukseen</button>
        </div>
      </div>
    );
  }

  renderPreReservationError() {
    return (
      <div className="dialog">
        <h6>Jotakin meni pieleen esivarauksen teossa...</h6>
        <div className="submit-buttons-centered">
          <button onClick={(event) => this.resetState(event)}>Palaa ajanvaraukseen</button>
        </div>
      </div>
    );
  }

  renderCancelReservation() {
    return (
      <div className="dialog">
        <form onSubmit={(event) => this.cancelReservation($('input[name="code"]').val(),
                                                          $('input[name="ssn"]').val(),
                                                          event)}>
          <h6>Syötä varauskoodi peruaksesi varauksesi</h6>
          <input type="text" name="code" placeholder="Varauskoodi" /><br />
          <input type="text" name="ssn" placeholder="Sosiaaliturvatunnus" /><br />
          <p>Löydät varauskoodin sähköpostistasi varausvahvistuksesta.</p>
          <div className="submit-buttons-centered">
            <button onClick={(event) => this.resetState(event)}>Poistu</button>
            <button>Peruuta varaus</button>
          </div>
        </form>
      </div>
    );
  }

  renderCancelReservationOk() {
    return (
      <div className="dialog">
        <h6>Varaus on peruutettu.</h6>
        <div className="submit-buttons-centered">
          <button onClick={(event) => this.resetState(event)}>Palaa ajanvaraukseen</button>
        </div>
      </div>
    );
  }

  renderCancelReservationError() {
    return (
      <div className="dialog">
        <h6>Jotakin meni pieleen varauksen peruuttamisessa...</h6>
        <div className="submit-buttons-centered">
          <button onClick={(event) => this.resetState(event)}>Palaa ajanvaraukseen</button>
        </div>
      </div>
    );
  }

  renderDialog() {
    console.log("Popup - renderDialog : isopen : " + this.props.dialogisopen);
    switch( this.props.dialogview ) {
      case DLG_VIEW_REGISTER_CHECK_SSN:
        return this.renderAskSnn();
      case DLG_VIEW_REGISTER_CREATE_CLIENT:
        return this.renderAskClientInfo();
      case DLG_VIEW_REGISTER_ERROR:
        return this.renderClientCreationError();
      case DLG_VIEW_PRERESERVATION_ERROR:
        return this.renderPreReservationError();
      case DLG_VIEW_CANCEL_RESERVATION:
        return this.renderCancelReservation();
      case DLG_VIEW_CANCEL_RESERVATION_OK:
        return this.renderCancelReservationOk();
      case DLG_VIEW_CANCEL_RESERVATION_ERROR:
        return this.renderCancelReservationError();
      default:
        return null;
      }
  }

  render() {
    const customStyles = {
      overlay : {
        position : 'absolute'
      },
      content : {
        zIndex : '1000'
      }
    };
    return (
      <Modal
        isOpen={this.props.dialogisopen}
        onRequestClose={this.resetState.bind(this)}
        shouldCloseOnOverlayClick={false}
        style={customStyles} >
        { this.renderDialog() }
      </Modal>
    );
  }
};


function mapStateToProps(state) {
  return {
    dialogisopen: state.app.dialogisopen,
    dialogview: state.app.dialogview,
  };
}

export default connect(mapStateToProps, actions)(Popup);
