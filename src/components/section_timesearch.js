import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterMain from './filter_main';
import FilterExtra from './filter_extra';
import FilterCalendar from './filter_calendar';
import TimeslotList from './timeslot_list';
import * as actions  from '../actions/index';

class SectionTimeSearch extends Component {

  componentWillMount() {
    let d = new Date();
    let currY = d.getFullYear();
    let currM = (d.getMonth()+1 < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);

    // Get number of days in this month
    let daysInMonth = new Date(currY, currM, 0).getDate();
    let today = d.toISOString().substr(0,10);
    let last_of_m  = currY + "-" + currM + "-" + daysInMonth;

    // Initiall search timeslots for today for general practioner (specility = 2)
    this.props.timeslotsSearch(today, null, 2);
    //this.props.freedaysSearch(today, last_of_m);
  }

  // Go back to time selection
  handleClick(e) {
    console.log("handleClick");
    e.preventDefault();
    this.props.resetState();
  }

  render() {
    const active = this.props.timesearch_section_active;

    if( active == 'hidden') {
      return <div></div>;
    }

    else if( active == 'inactive') {
      return (
        <div className="section-time-search-inactive row">
          <div className="col-xs-12">
            <h4 className="section-title pull-left">AJAN VALINTA</h4>
            <div className="reservation-summary">
              <span>
                {formatDate2("fi", this.props.selecteddate)}&nbsp;
                {this.props.selectedtimeslot.startTimeHours},&nbsp;
                {this.props.selectedtimeslot.resourceName},&nbsp;
                {this.props.selectedtimeslot.unitName}
              </span>
            </div>
            <a href="" className="link pull-right" onClick={(event) => this.handleClick(event)}>Muuta valintaa</a>
          </div>
        </div>
      );
    }

    return (
      <div className="section-time-search row">
        <div className="col-xs-12">
          <h4 className="section-title">AJAN VALINTA</h4>
          <hr />
          <FilterMain />
          <TimeslotList reservationHandler={this.props.reservationHandler}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selecteddate: state.app.selecteddate,
    selectedtimeslot: state.app.selectedtimeslot,
    timesearch_section_active: state.app.timesearch_section_active
  };
}

export default connect(mapStateToProps, actions)(SectionTimeSearch);
