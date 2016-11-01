import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterMain from './filter_main';
import FilterExtra from './filter_extra';
import FilterCalendar from './filter_calendar';
import TimeslotList from './timeslot_list';
import * as actions  from '../actions/index';
import text from './common/translate';

class SectionTimeSearch extends Component {

  componentWillMount() {
    let today = new Date().toISOString().substr(0,10);
    // Initially search timeslots for today for general practioner (speciality = 2)
    this.props.timeslotsSearch(today, null, null, [72]);
  }

  // Go back to time selection
  backToTimeSelection(e) {
    e.preventDefault();
    this.props.resetState( true );
  }

  changeTimeOfDay(event) {
    console.log("SectionTimeSearch: changeTimeOfDay");
    this.props.setTimeOfDayFilter(event.target.value);
  }

  doctorinfoHandler(event, resourceId) {
    event.preventDefault();
    console.log("SectionTimeSearch: doctorinfoHandler: id: " + resourceId);
    this.props.showDoctorInfo(resourceId);
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
            <div className="header-row">
              <h4 className="section-title pull-left">{text('diacor_section_timesearch_header')}</h4>
              <div className="reservation-summary">
                <span>
                  {formatDate2("fi", this.props.date_filter)}&nbsp;
                  {this.props.selectedtimeslot.startTimeHours},&nbsp;
                  {this.props.selectedtimeslot.resourceName},&nbsp;
                  {this.props.selectedtimeslot.unitName}
                </span>
              </div>
              <a href="" className="link font-size-14 pull-right" onClick={(event) => this.backToTimeSelection(event)}>{text('diacor_section_timesearch_link')}</a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="section-time-search row">
        <div className="">
          <div className="header-row col-xs-12 nopadding">
            <h4 className="pull-left">{text('diacor_section_timesearch_header')}</h4>
          </div>
          <hr />
          <FilterMain {...this.props} />
          <TimeslotList {...this.props}
                        reservationHandler={this.props.reservationHandler}
                        doctorinfoHandler={this.doctorinfoHandler.bind(this)}
                        changeTimeOfDay={this.changeTimeOfDay.bind(this)} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    date_filter: new Date(state.app.filters.date_filter),
    selectedtimeslot: state.app.selectedtimeslot,
    timesearch_section_active: state.app.timesearch_section_active,
    timeslots_list: state.app.timeslots_list,
    timeofdayfilter: state.app.timeofdayfilter
  };
}

export default connect(mapStateToProps, actions)(SectionTimeSearch);
