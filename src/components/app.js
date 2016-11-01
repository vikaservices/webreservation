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
import text from './common/translate';
import { DLG_VIEW_REGISTER_CHECK_SSN,
         DLG_VIEW_REGISTER_CREATE_CLIENT,
         DLG_VIEW_REGISTER_ERROR,
         DLG_VIEW_PRERESERVATION_ERROR,
         DLG_VIEW_CANCEL_RESERVATION,
         MAKE_RESERVATION,
         APP_STATE_INITIAL,
         APP_STATE_CLIENT_IDENTIFIED
       } from '../actions/types';

class App extends Component {

  componentDidMount() {
    console.log("App: componentDidMount");

    const query = this.props.location.query;
    if( !query ) {
      console.log("App: no query params");
      return;
    }

    // TODO: parameter decoding ?
    const hetu            = query.hetu;
    const employerId      = query.employerId;
    const resourceId      = query.resourceId;
    const resourceName    = query.resourceName;
    let FirstName = query.clientFirstName  ? query.clientFirstName : null;
    let LastName  = query.clientLastName   ? query.clientLastName  : null;
    let Address   = query.clientAddress    ? query.clientAddress   : null;
    let Postcode  = query.clientPostcode   ? query.clientPostcode  : null;
    let City      = query.clientCity       ? query.clientCity      : null;
    let Phone     = query.clientPhone      ? query.clientPhone     : null;

    if( hetu ) {
      this.props.saveClientInfo(hetu, FirstName, LastName, Address, Postcode, City, Phone);

      this.props.checkClientSSN(hetu).then(() => {
        let filters = this.props.filters;
        if( employerId ) {

          if( employerId != this.props.selected_employer.if ) {
            // TODO: need to change employer here
            //this.props.setSelectedEmployer(employerId);
          }

          filters.employer_id_filter = employerId;
          filters.terms_search = this.props.selected_employer.name + text('diacor_ohc_search');
          console.log("App: componentDidMount: this.props.selected_employer.employerName = " + this.props.selected_employer.name)

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
        else if( this.props.is_ohc_client ) {
          // Did not get employer, but if this is ohc client give him
          // ohc team as default anyway
          filters.employer_id_filter = this.props.selected_employer.id;
          filters.terms_search = this.props.selected_employer.name + text('diacor_ohc_search');
          filters.do_time_search = true;
        }

        this.props.setFilter( filters );
      });
    }
  }

  componentDidUpdate() {
    //console.log("App: componentDidUpdate");
    if( (this.props.appstate == APP_STATE_CLIENT_IDENTIFIED) &&
        (this.props.pendingreservation == true) ) {
      console.log("Have pending reservation");
      let slot = this.props.selectedtimeslot;
      let employerId = this.props.selected_employer.id != undefined ? this.props.selected_employer.id : null
      this.props.makePreReservation( this.props.client_id, slot.resourceId, slot.unitId,
                                     slot.start, slot.duration, employerId );
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
  makeReservation(resourceId, unitId, start, duration, online,
                  imageUrl=null, resourceName=null, title=null, unitName=null, event=null) {
    if( event != null ) {
      event.preventDefault();
    }
    console.log("makeReservation: " + resourceId + " " + unitId + " " + start + " " + duration);

    console.log("selectedtate: " + formatDate(this.props.date_filter));
    let start_str = (start.length == 4) ? ("0" + start) : start;
    var starttime = formatDate(this.props.date_filter) + "T" + start_str + ":00";
    // for unitName save either actual unitName or "DiacorPlus", depending on
    // value of online-flag
    unitName = online ? text('diacor_timeslot_diacorplus') : unitName;
    this.props.saveSelectedTimeslot( resourceId, unitId, starttime, duration, online, imageUrl, resourceName, title, unitName, start );
    if ( this.props.appstate == APP_STATE_INITIAL ) {
      this.props.loginClient( true );
    }
  }

  render() {

    return (
      <div className="col-xs-12 overlay-bg-color">
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
    selected_employer: state.app.selected_employer,
    is_ohc_client: state.app.is_ohc_client
  };
}

export default connect(mapStateToProps, actions)(App);
