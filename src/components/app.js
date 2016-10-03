import React, { Component } from 'react';
import { connect } from 'react-redux';
import SectionHeader from './section_header';
import SectionResourceSelection from './section_resource_selection';
import SectionTimeSearch from './section_timesearch';
import SectionConfirmation from './section_confirmation';
import SectionReservationSummary from './section_reservation_summary';
import Popup from './popup';
import * as actions from '../actions/index';
import Modal from 'react-modal';
//import { reduxForm } from 'redux-form';
import { DLG_VIEW_REGISTER_CHECK_SSN,
         DLG_VIEW_REGISTER_CREATE_CLIENT,
         DLG_VIEW_REGISTER_ERROR,
         DLG_VIEW_PRERESERVATION_ERROR,
         DLG_VIEW_CANCEL_RESERVATION,
         MAKE_RESERVATION,
         APP_STATE_INITIAL,
         APP_STATE_CLIENT_IDENTIFIED,
         APP_STATE_WAIT_PRE_RESERVATION,
         APP_STATE_PRE_RESERVATION_OK,
         APP_STATE_WAIT_CONFIRMATION,
         APP_STATE_CONFIRMATION_OK
       } from '../actions/types';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      occupational_hc_client: false
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    if( (this.props.appstate == APP_STATE_CLIENT_IDENTIFIED) &&
        (this.props.pendingreservation == true) ) {
      console.log("Have pending reservation");
      let slot = this.props.selectedtimeslot;
      this.props.makePreReservation( this.props.client_id, slot.resourceId, slot.unitId, slot.start, slot.duration );
    }
  }

  // TODO: this should just open the cancel dialog
  handleCancelReservation(event) {
    event.preventDefault();
    console.log("handleCancelReservation");
    this.props.cancelReservation();
  }

  // Callback from timeslot
  makeReservation(resourceId, unitId, start, duration,
                  imageUrl=null, resourceName=null, title=null, unitName=null, event=null) {
    if( event != null ) {
      event.preventDefault();
    }
    console.log("makeReservation: " + resourceId + " " + unitId + " " + start + " " + duration);

    console.log("selectedtate: " + formatDate(this.props.selecteddate));
    let start_str = (start.length == 4) ? ("0" + start) : start;
    var starttime = formatDate(this.props.selecteddate) + "T" + start_str + ":00";
    this.props.saveSelectedTimeslot( resourceId, unitId, starttime, duration, imageUrl, resourceName, title, unitName, start );
    if ( this.props.appstate == APP_STATE_INITIAL ) {
      this.props.loginClient( true );
    }
  }

  render() {

    return (
      <div className="col-xs-12">
        <SectionHeader clickHandler={this.handleCancelReservation.bind(this)} title={this.props.headertitle}/>
        <div className="app">
          <SectionResourceSelection />
          <SectionTimeSearch reservationHandler={this.makeReservation.bind(this)} />
          <SectionConfirmation />
          <SectionReservationSummary />
          <Popup />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client_id: state.app.client_id,
    dialogisopen: state.app.dialogisopen,
    dialogview: state.app.dialogview,
    appstate: state.app.appstate,
    pendingreservation: state.app.pendingreservation,
    selectedtimeslot: state.app.selectedtimeslot,
    selecteddate: state.app.selecteddate,
    headertitle: state.app.headertitle
  };
}

export default connect(mapStateToProps, actions)(App);
