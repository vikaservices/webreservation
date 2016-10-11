import React, { Component } from 'react';
import { connect } from 'react-redux';

class SectionReservationSummary extends Component {

  componentDidUpdate() {
    if( this.props.reservation_summary_section_active == 'active' ) {
      window.scrollTo(0,0);
    }
  }

  handleCancelReservation(event) {
    event.preventDefault();
    console.log("handleCancel");
  }

  render() {
    const active = this.props.reservation_summary_section_active;

    if( active == 'hidden') {
      return <div></div>;
    }

    return (
      <div className="section-summary row">
        <div className="col-xs-12">
          <div className="header-row">
            <h4 className="section-title pull-left">VARAUKSEN TIEDOT</h4>
          </div>

          <div className="block row">
            <p>
            Hienoa! Varaus on vastaanotettu ja olemme lähettäneet sähköpostivarmistuksen
            osoitteeseesi! Varauksesi tunnus on <span style={{fontWeight: 'bold'}}>{this.props.reservation_code ? this.props.reservation_code : "TESTINGTESTING"}</span>
            </p>
            <div className="inline-box">
              <div className="col-xs-12 col-sm-6">
                <div className="summary-logo">
                  <img className="reservation-info-face" src={this.props.selectedtimeslot.imageUrl ? this.props.selectedtimeslot.imageUrl : ""} />
                </div>
                <div className="padding-left-20">
                  <span>{this.props.selectedtimeslot.resourceName ? this.props.selectedtimeslot.resourceName : "Jaakko Teppo"}</span><br />
                  <span>{this.props.selectedtimeslot.title ? this.props.selectedtimeslot.title : "Yleislääkäri"}</span><br />
                  <span>Diacor {this.props.selectedtimeslot.unitName ? this.props.selectedtimeslot.unitName : "keskusta "}</span>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div>
                  <img src="public/img/calendar-logo.png"/>
                </div>
                <div className="padding-left-20">
                  <span style={{fontWeight: 'bold'}}>{this.props.selecteddate ? formatDate2('fi', this.props.selecteddate) : "Keskiviikkona 18.5.2016"}</span><br />
                  <span>{this.props.selectedtimeslot.startTimeHours ? this.props.selectedtimeslot.startTimeHours : "12:00"} </span>
                  <span>{this.props.selectedtimeslot.duration ? "(" + this.props.selectedtimeslot.duration + " min)" : "(30 min)"}</span><br />
                  <span><a href="#" onClick={(event) => event.preventDefault()}>Lisää kalenteriin</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="block row">
            <h4 className="section-title">HALUATKO MUISTUTUKSEN?</h4>
            <p>Valitse milloin haluat muistutuksen tekstiviestillä.</p>
            <div className="inline-box">
              <div>
                <img src="public/img/reminder-logo.png"/>
              </div>
              <div className="padding-left-20">
                <input type="radio" name="sms_reminder" value="30" />30 min ennen<br />
                <input type="radio" name="sms_reminder" value="60" />60 min ennen<br />
                <input type="radio" name="sms_reminder" value="120" />2h  ennen<br />
                <input type="radio" name="sms_reminder" value="1440" />24h ennen
              </div>
            </div>
            <div className="submit-buttons-centered">
              <button className="btn-red">TILAA MUISTUTUS</button>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="row block">
            <h4 className="section-title">MITEN KÄYTÄN DIACOR ONLINE-PALVELUA?</h4>
            <div className="inline-box">
              <div>
                <img src="public/img/diacorplus-logo.png" />
              </div>
              <div className="padding-left-40">
                <ol type="A">
                  <li>Lataa <a href="" target="_blank">Diacor Plus</a>-sovellus</li>
                  <li>Varmista, että sinulla on puhelin mukana ja että siinä on akkua riittävästi.</li>
                  <li>Saat notifikaation kun lääkäri on valmis ottamaan sinut vastaan.</li>
                  <li>Avaa notifikaation ja DiacorPlus sovellus avataan.</li>
                  <li>Sinut ohjataan suoraan vastaanotolle.</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="row block">
            <h4 className="section-title">ARVOASIAKKUUS</h4>
            <p>Mitäs tähän?</p>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="row block">
            <div className="submit-buttons-centered">
              <a href="/"><button className="btn-white">TEE UUSI VARAUS</button></a>
              <a href="http://diacor.fi"><button className="btn-red">POISTU AJANVARAUKSESTA</button></a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reservation_code: state.app.reservation_code,
    selectedtimeslot: state.app.selectedtimeslot,
    selecteddate: state.app.selecteddate,
    reservation_summary_section_active: state.app.reservation_summary_section_active
  };
}


export default connect(mapStateToProps)(SectionReservationSummary);
