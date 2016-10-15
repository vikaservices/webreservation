import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SectionHeader from './section_header';

class CancelReservation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    console.log(this.props.location.query.id);
    let hetu_code = this.parseCode(this.props.location.query.id);

    console.log("hetu = " + hetu_code[0]);
    console.log("code = " + hetu_code[1]);

    this.props.getReservation(hetu_code[1], hetu_code[0], true).then( () => {
      console.log("reservationstatus: " + this.props.reservationstatus);
      this.setState( {loading: false} );
    });
  }

  cancelReservation(event) {
    event.preventDefault();

    console.log("cancelReservation");

    let hetu_code = this.parseCode(this.props.location.query.id)

    this.props.cancelReservation(hetu_code[1], hetu_code[0]).then(() => {
        console.log("cancelReservation status: " + this.props.reservationstatus);
    });
  }

  parseCode(id) {
    let id_str = atob(id);

    let hetu = id_str.substr(0,11);
    let code = id_str.substr(12,5);

    return [hetu, code];
  }

  renderContent() {
    let reservation = this.props.reservation;

    if( this.state.loading ) {
      return (
        <div className="content">
          <p>Haataan varauksen tietoja</p>
        </div>
      );


    } else if( this.props.reservationstatus == 404 ) {
      return (
        <div className="content">
          <p>Varaustunnuksella {this.props.reservation_code} ei löytynyt varausta.</p>
          <div className="submit-buttons-centered">
            <a href="http://diacor.fi"><button className="btn-red">Poistu</button></a>
          </div>
        </div>
      );


    } else if( this.props.reservationstatus == 204 ) {
      return (
        <div className="content">
          <h4>Varaus peruttu</h4>
          <p>Peruutit seuraavan varauksen.</p>
          <p>
            {reservation.product ? ['<span>',reservation.product,'</span><br />'] : ''}
            <span>{reservation.resourceName}</span><br />
            {reservation.title ? `<span>${reservation.title}</span><br />` : ''}
            <span>{formatDate4("fi", reservation.start)}</span><br />
            <span>{reservation.start ? reservation.start.substr(11, 5) : ''} ({reservation.duration})</span>
          </p>
          <p>
            <span><a href={reservation.unitLinkUrl}>{reservation.unitName}</a></span><br />
            {reservation.unitAddress ? <span>{reservation.unitAddress}<br /></span> : ''}
            {reservation.unitPostCode ? <span>{reservation.unitPostCode} </span> : ''}
            {reservation.unitCity ? <span>{reservation.unitCity}<br /></span> : ''}
          </p>
          <p>Varauskoodi: {this.props.reservation_code}</p>
          <div className="submit-buttons-centered">
            <a href="http://diacor.fi"><button className="btn-white">Poistu ajanvarauksesta</button></a>
            <a href="http://localhost:9090"><button className="btn-red">Varaa uusi aika</button></a>
          </div>
        </div>
      );


    } else if( this.props.reservationstatus != 204 &&
               this.props.reservationstatus != 404 &&
               this.props.reservationstatus != 0) {
      return (
        <div className="content">
          <h4>Jotakin meni pieleen varauksen peruuttamisessa...</h4>
          <div className="submit-buttons-centered">
            <a href="http://localhost:9090"><button className="btn-red">Palaa ajanvaraukseen</button></a>
          </div>
        </div>
      );


    } else {
      return (
        <div className="content">
          <h4>Varauksen tiedot</h4>
          <p>
            {reservation.product ? ['<span>',reservation.product,'</span><br />'] : ''}
            <span>{reservation.resourceName}</span><br />
            {reservation.title ? `<span>${reservation.title}</span><br />` : ''}
            <span>{formatDate4("fi", reservation.start)}</span><br />
            <span>{reservation.start ? reservation.start.substr(11, 5) : ''} ({reservation.duration})</span>
          </p>
          <p>
            <span><a href={reservation.unitLinkUrl}>{reservation.unitName}</a></span><br />
            {reservation.unitAddress ? <span>{reservation.unitAddress}<br /></span> : ''}
            {reservation.unitPostCode ? <span>{reservation.unitPostCode} </span> : ''}
            {reservation.unitCity ? <span>{reservation.unitCity}<br /></span> : ''}
          </p>
          <p>Varauskoodi: {this.props.reservation_code}</p>
          <p>Voit hallinnoida kaikkia varauksiasi DiacorPlus-palvelussa.</p>
          <div className="submit-buttons-centered">
            <a href="http://diacor.fi" className=""><button className="btn-white">Poistu</button></a>
            <a href="" onClick={(event) => this.cancelReservation(event)}><button className="btn-red">Peruuta aika</button></a>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-xs-12">
        <SectionHeader title="Varauksen peruuttaminen" hide_links={true}/>
        <div className="cancel-reservation">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reservation: state.app.reservation,
    reservation_code: state.app.reservation_code,
    reservationstatus: state.app.reservationstatus
  };
}

export default connect(mapStateToProps, actions)(CancelReservation);
