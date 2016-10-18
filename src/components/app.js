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

  componentDidMount() {
    console.log("App: componentDidMount");

    const hetu = this.props.location.query.hetu;
    const employerId = this.props.location.query.employerId;
    const resourceId = this.props.location.query.resourceId;
    const resourceName = this.props.location.query.resourceName;

    if( hetu ) {
      this.props.checkClientSSN(hetu).then(() => {
        let filters = this.props.filters;
        if( employerId ) {
          filters.employer_id_filter = employerId;
          filters.terms_search = this.props.selected_employer.name;
          console.log("App: this.props.selected_employer.employerName = " + this.props.selected_employer.employerName)

          if( resourceId ) {
            // If resource is given -> do more specific search with resource
            // instead of employer
            filters.employer_id_filter = null;
            filters.resource_filter = resourceId;
            filters.terms_search = '';
            if( resourceName ) {
              filters.terms_search = resourceName;
            }
          }

          filters.do_time_search = true;
        }

        this.props.setFilter( filters );
      });
    }
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

  onClickHeaderLink(event) {
    event.preventDefault();
    console.log("onClickHeaderClick: " + event.target.dataset.target);
    if( event.target.dataset.target == "cancel_reservation" ) {
      this.props.cancelReservation();
    } else if( event.target.dataset.target == "ohc_login" ) {
      this.props.loginOhcClient();
    }
  }

  // Callback from timeslot
  makeReservation(resourceId, unitId, start, duration,
                  imageUrl=null, resourceName=null, title=null, unitName=null, event=null) {
    if( event != null ) {
      event.preventDefault();
    }
    console.log("makeReservation: " + resourceId + " " + unitId + " " + start + " " + duration);

    console.log("selectedtate: " + formatDate(this.props.date_filter));
    let start_str = (start.length == 4) ? ("0" + start) : start;
    var starttime = formatDate(this.props.date_filter) + "T" + start_str + ":00";
    this.props.saveSelectedTimeslot( resourceId, unitId, starttime, duration, imageUrl, resourceName, title, unitName, start );
    if ( this.props.appstate == APP_STATE_INITIAL ) {
      this.props.loginClient( true );
    }
  }

  render() {

    return (
      <div className="col-xs-12">
        <SectionHeader clickHandler={this.onClickHeaderLink.bind(this)} title={this.props.headertitle}/>
        <div className="app">
          <SectionResourceSelection />
          <SectionTimeSearch {...this.props}
                             reservationHandler={this.makeReservation.bind(this)} />
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
    date_filter: new Date(state.app.filters.date_filter),
    headertitle: state.app.headertitle,
    filters: state.app.filters,
    selected_employer: state.app.selected_employer
  };
}

export default connect(mapStateToProps, actions)(App);
