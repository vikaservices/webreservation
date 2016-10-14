import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import NewClientForm from './new_client_form';
import SvgDefinitions from './common/svg_definitions';
import { DLG_VIEW_REGISTER_CHECK_SSN,
         DLG_VIEW_REGISTER_OHC_CHECK_SSN,
         DLG_VIEW_REGISTER_OHC_NOT_FOUND,
         DLG_VIEW_REGISTER_OHC_FORBIDDEN,
         DLG_VIEW_REGISTER_CREATE_CLIENT,
         DLG_VIEW_REGISTER_ERROR,
         DLG_VIEW_PRERESERVATION_ERROR,
         DLG_VIEW_CANCEL_RESERVATION,
         DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND,
         DLG_VIEW_CANCEL_RESERVATION_CONFIRM,
         DLG_VIEW_CANCEL_RESERVATION_OK,
         DLG_VIEW_CANCEL_RESERVATION_ERROR
       } from '../actions/types';


class Popup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reservation_code: '',
      hetu: ''
    };
  }

  componentDidUpdate() {
    this.modParentOpacity();
  }

  modParentOpacity() {
      if (this.props.dialogisopen) {
          console.log("isopen");
          $('.container-fluid').css({ opacity: 0.7 });
      } else {
          $('.container-fluid').css({ opacity: 1 });
      }
  }

  checkClientSSN( ssn, event ) {
    event.preventDefault();
    console.log("Popup : checkSSN : ssn = " + ssn);
    if( event.target.name == "regularLoginForm" ) {
      this.props.checkClientSSN(ssn);
    }
    else if( event.target.name == "ohcLoginForm" ) {
      this.props.checkOhcClientSSN(ssn);
    }
  }

  createClient( ssn, first_name, last_name, address, postcode, city, phone, event ) {
    event.preventDefault();
    console.log("Popup: createClient: first_name=" + first_name + " last_name=" + last_name +
    " address=" + address +  " postcode=", postcode + " city=" + city + " phone=" + phone);
    this.props.saveClientInfo(ssn, first_name, last_name, address, postcode, city, phone);
    this.props.createClient(ssn, first_name, last_name, address, postcode, city, phone);
  }

  getReservation(code, hetu, event) {
    event.preventDefault();
    console.log("Popup: getReservation");
    this.setState( {reservation_code: code, hetu: hetu} );
    this.props.getReservation(code, hetu);
  }

  cancelReservation(event) {
    event.preventDefault();
    //console.log("Popup: handleCancelReservation: code: " + this.state.reservation_code + " hetu: " + this.state.hetu);
    this.props.cancelReservation(this.state.reservation_code, this.state.hetu);
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
        <h4>Hei, kuka on tulossa vastaanotolle</h4>
        <form name="regularLoginForm" onSubmit={(event) => this.checkClientSSN($('input[name="ssn"]').val(), event)}>
          <input className="popup-form-input" placeholder="Henkilötunnus" type="text" name="ssn" /><br />
          <div className="popup-control-box">
            <div className="submit-buttons-centered">
              <button className="btn-white" onClick={(event) => this.resetState(event)}>Peruuta</button>
              <button className="btn-red">Jatka</button>
            </div>
          </div>
          <img className='img-doctor' src="public/img/group-15@3x.png" />
        </form>
      </div>
    );
  }

  renderAskSnnOhc() {
    return (
      <div className="client-popup">
        <h4>Hei työterveysasiakas, aloita ajan varaaminen tästä.</h4>
        <form name="ohcLoginForm" onSubmit={(event) => this.checkClientSSN($('input[name="ssn"]').val(), event)}>
          <input placeholder="Henkilötunnus" type="text" name="ssn" /><br />
          <div className="submit-buttons-centered">
            <button onClick={(event) => this.resetState(event)}>Peruuta</button>
            <button>Jatka</button>
          </div>
        </form>
      </div>
    );
  }

  ohcClientNotFound() {
    return (
      <div className="dialog">
        <h4>Hups, jotain meni pieleen.</h4>
        <p>
          Henkilötiedoillasi ei löytynyt työterveysasiakkuutta. Tarkista
          työterveyssopimuksen voimassaolo työnantajaltasi.
        </p>
        <div className="submit-buttons-centered">
          <a href="" onClick={(event) => this.resetState(event)}><button>Palaa ajanvaraukseen</button></a>
        </div>
      </div>
    );
  }

  ohcReservationForbidden() {
    return (
      <div className="dialog">
        <h4>Ajanvarausta ei voitu tehdä.</h4>
        <p>
          Voit varata ajan internetin kautta vain yksityiskäyntinä. Varaa
          työterveyskäynti soittamalla numeroon 09 7750 7755
        </p>
        <div className="submit-buttons-centered">
          <a href="" onClick={(event) => this.resetState(event)}><button>Palaa ajanvaraukseen</button></a>
        </div>
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
          <h4>Hei, kuka on tulossa vastaanotolle</h4>
          <input placeholder="Henkilötunnus" type="text" name="ssn" autofocus />
          <div>
            <h4>Uusi asiakas, tervetuloa! Lisää vielä seuraavat tiedot:</h4>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input placeholder="Etunimi" type="text" name="first_name" />
                    </td>
                    <td>
                      <input placeholder="Sukunimi" type="text" name="last_name" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input placeholder="Katuosoite" type="text" name="address" />
                    </td>
                    <td>
                      <input placeholder="Postinumero" type="text" name="postcode" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input placeholder="Postitoimipaikka" type="text" name="city" />
                    </td>
                    <td>
                      <input placeholder="Puhelinnumero" type="text" name="phone" />
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

  renderAskClientInfoForm() {
    console.log("renderAskClientInfoForm");
    return (
      <div className="dialog">
        <NewClientForm popUp={true} resetState={this.resetState.bind(this)}/>
      </div>
    );
  }

  renderClientCreationError() {
    return (
      <div className="dialog">
        <h4>Jotakin meni pieleen...</h4>
        <div className="submit-buttons-centered">
          <button onClick={(event) => this.resetState(event)}>Palaa ajanvaraukseen</button>
        </div>
      </div>
    );
  }

  renderPreReservationError() {
    return (
      <div className="dialog">
        <h4>Jotakin meni pieleen esivarauksen teossa...</h4>
        <div className="submit-buttons-centered">
          <button onClick={(event) => this.resetState(event)}>Palaa ajanvaraukseen</button>
        </div>
      </div>
    );
  }

  renderCancelReservation() {
    return (
      <div className="dialog">
        <form onSubmit={(event) => this.getReservation($('input[name="code"]').val(),
                                                       $('input[name="ssn"]').val(),
                                                       event)}>
          <h4>Syötä varauskoodi peruaksesi varaus</h4>
          <input type="text" name="code" placeholder="Varauskoodi" /><br />
          <input type="text" name="ssn" placeholder="Henkilötunnus" /><br />
          <p>Löydät varauskoodin sähköpostistasi varausvahvistuksesta.</p>
          <div className="submit-buttons-centered">
            <a href="" onClick={(event) => this.resetState(event)}><button>Peruuta</button></a>
            <a href=""><button>Jatka</button></a>
          </div>
        </form>
      </div>
    );
  }

  renderCancelReservationNotFound() {
    return (
      <div className="dialog">
        <p>Varaustunnuksella {this.state.reservation_code} ei löytynyt varausta.</p>
        <div className="submit-buttons-centered">
          <a href="" onClick={(event) => this.resetState(event)}><button>Palaa ajanvaraukseen</button></a>
        </div>
      </div>
    );
  }

  renderCancelReservationConfirm() {
    let reservation = this.props.reservation;
    return (
      <div className="dialog">
        <h4>Varauksen tiedot</h4>
        <p>
          <span>{reservation.product}</span><br />
          <span>{reservation.resourceName}</span><br />
          <span>{reservation.title}</span><br/>
          <span>{formatDate4("fi", reservation.start)}</span><br />
          <span>{reservation.start} ({reservation.duration})</span>
        </p>
        <p>
          <span><a href={reservation.unitLinkUrl}>TODO: yksikön nimi</a></span><br />
          <span>{reservation.unitAddress}</span><br />
          <span>{reservation.unitPostCode} {reservation.unitCity}</span><br />
        </p>
        <p>Varauskoodi: {this.state.reservation_code}</p>
        <p>Voit hallinnoida kaikkia varauksiasi DiacorPlus-palvelussa.</p>
        <div className="submit-buttons-centered">
          <a href="" onClick={(event) => this.resetState(event)}><button>Palaa ajanvaraukseen</button></a>
          <a href="" onClick={(event) => this.cancelReservation(event)}><button>Peruuta varaus</button></a>
        </div>
      </div>
    );
  }

  renderCancelReservationOk() {
    let reservation = this.props.reservation;
    return (
      <div className="dialog">
        <h4>Varaus peruttu</h4>
        <p>Peruutit seuraavan varauksen.</p>
        <p>
          <span>{reservation.product}</span><br />
          <span>{reservation.resourceName}</span><br />
          <span>{reservation.title}</span><br/>
          <span>{formatDate4("fi", reservation.start)}</span><br />
          <span>{reservation.start} ({reservation.duration})</span>
        </p>
        <p>
          <span><a href={reservation.unitLinkUrl}>TODO: yksikön nimi</a></span><br />
          <span>{reservation.unitAddress}</span><br />
          <span>{reservation.unitPostCode} {reservation.unitCity}</span><br />
        </p>
        <p>Varauskoodi: {this.state.reservation_code}</p>
        <p>Voit hallinnoida kaikkia varauksiasi DiacorPlus-palvelussa.</p>
        <div className="submit-buttons-centered">
          <a href="http://diacor.fi"><button>Poistu ajanvarauksesta</button></a>
          <a href="" onClick={(event) => this.resetState(event)}><button>Varaa uusi aika</button></a>
        </div>
      </div>
    );
  }

  renderCancelReservationError() {
    return (
      <div className="dialog">
        <h4>Jotakin meni pieleen varauksen peruuttamisessa...</h4>
        <div className="submit-buttons-centered">
          <a href="" onClick={(event) => this.resetState(event)}><button>Palaa ajanvaraukseen</button></a>
        </div>
      </div>
    );
  }

  renderDialog() {
    //console.log("Popup - renderDialog : isopen : " + this.props.dialogisopen);
    switch( this.props.dialogview ) {
      case DLG_VIEW_REGISTER_CHECK_SSN:
        return this.renderAskSnn();
      case DLG_VIEW_REGISTER_OHC_CHECK_SSN:
        return this.renderAskSnnOhc();
      case DLG_VIEW_REGISTER_OHC_NOT_FOUND:
        return this.ohcClientNotFound();
      case DLG_VIEW_REGISTER_OHC_FORBIDDEN:
        return ohcReservationForbidden();
      case DLG_VIEW_REGISTER_CREATE_CLIENT:
        return this.renderAskClientInfoForm(); //renderAskClientInfoForm || renderAskClientInfo
      case DLG_VIEW_REGISTER_ERROR:
        return this.renderClientCreationError();
      case DLG_VIEW_PRERESERVATION_ERROR:
        return this.renderPreReservationError();
      case DLG_VIEW_CANCEL_RESERVATION:
        return this.renderCancelReservation();
      case DLG_VIEW_CANCEL_RESERVATION_NOT_FOUND:
        return this.renderCancelReservationNotFound();
      case DLG_VIEW_CANCEL_RESERVATION_CONFIRM:
        return this.renderCancelReservationConfirm();
      case DLG_VIEW_CANCEL_RESERVATION_OK:
        return this.renderCancelReservationOk();
      case DLG_VIEW_CANCEL_RESERVATION_ERROR:
        return this.renderCancelReservationError();
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
        className="modal-class"
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
    reservation: state.app.reservation
  };
}

export default connect(mapStateToProps, actions)(Popup);
