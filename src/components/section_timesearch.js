import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterMain from './filter_main';
import FilterExtra from './filter_extra';
import FilterCalendar from './filter_calendar';
import TimeslotList from './timeslot_list';
import * as actions  from '../actions/index';
import text from './common/translate';
import utils from './common/util';
import {
  TOD_MORNING,
  TOD_DAY,
  TOD_AFTERNOON
} from '../actions/types';

class SectionTimeSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // time of day filter disabled flags
      tod_filter_morning_disabled: true,
      tod_filter_day_disabled: true,
      tod_filter_afternoon_disabled: true
    };
  }

  componentWillMount() {
    let today = new Date().toISOString().substr(0,10);
    // Initially search timeslots for today for general practioner (speciality = 2)
    this.props.timeslotsSearch(today, null, null, DEFAULT_SEARCH_GROUP, null, null,
                               null, null, null, null, this.props.pagelang).then(() => {
                                 if( (this.props.timeslots_list && this.props.timeslots_list.length == 0) &&
                                     this.props.filters.next_day_search == 0 ) {
                                   console.log("FilterMain: doTimeslotsSearch: no free times for today, search for tomorrow")
                                   let filters = this.props.filters;
                                   filters.next_day_search = 1;
                                   let next_day = new Date(filters.date_filter);
                                   let date_filter = new Date(filters.date_filter);
                                   next_day.setDate( date_filter.getDate() + 1 );
                                   //console.log("today: " + filters.date_filter + " : tomorrow: " + next_day);
                                   filters.previous_day = filters.date_filter;
                                   filters.date_filter = next_day.toISOString();
                                   this.props.setFilter( filters );
                                 }
                               } );
  }

  componentWillReceiveProps(nextProps) {
    // Loop through the time slots and set flags for disabling time of day
    // filters if shown timeslot list would be empty if that filter was selected
    let list = nextProps.timeslots_list ? nextProps.timeslots_list : [];
    let tod_filters = { tod_filter_morning_disabled: true,
                        tod_filter_day_disabled: true,
                        tod_filter_afternoon_disabled: true};
    if( list.length > 0 ) {
      for( let i = 0; i < list.length; i++ ) {
        if( parseInt(list[i].time.substr(0,(list[i].time.indexOf(":")+1))) > parseInt(TOD_MORNING) ) {
          tod_filters.tod_filter_morning_disabled = false;
          break;
        }
      }
      for( let i = 0; i < list.length; i++ ) {
        if( parseInt(list[i].time.substr(0,(list[i].time.indexOf(":")+1))) > parseInt(TOD_DAY) ) {
          tod_filters.tod_filter_day_disabled = false;
          break;
        }
      }
      for( let i = 0; i < list.length; i++ ) {
        if( parseInt(list[i].time.substr(0,(list[i].time.indexOf(":")+1))) > parseInt(TOD_AFTERNOON) ) {
          tod_filters.tod_filter_afternoon_disabled = false;
          break;
        }
      }
      this.setState(tod_filters, () => {
        // console.log("tod_filter_morning_disabled: " + this.state.tod_filter_morning_disabled);
        // console.log("tod_filter_day_disabled: " + this.state.tod_filter_day_disabled);
        // console.log("tod_filter_afternoon_disabled: " + this.state.tod_filter_afternoon_disabled);
      });
    }
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
    this.props.showDoctorInfo(resourceId, this.props.pagelang);
  }

  render() {
    const active = this.props.timesearch_section_active;

    if( active == 'hidden') {
      return <div></div>;
    }

    else if( active == 'inactive') {
      return (
        <div>
          <div className="section-time-search-inactive row">
            <div className="">
              <div className="header-row">
                <h4 className="pull-left">{text('diacor_section_timesearch_header')}</h4>
                <div className="reservation-summary">
                  <span>
                    {utils.formatDate2(this.props.pagelang, this.props.date_filter)}&nbsp;
                    {this.props.selectedtimeslot.startTimeHours},&nbsp;
                    {this.props.selectedtimeslot.resourceName},&nbsp;
                    {this.props.selectedtimeslot.unitName}
                  </span>
                </div>
                <a href="" className="link font-size-14 pull-right" onClick={(event) => this.backToTimeSelection(event)}>{text('diacor_section_timesearch_link')}</a>
              </div>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="section-time-search row">
          <div className="">
            <div className="header-row">
              <h4 className="pull-left">{text('diacor_section_timesearch_header')}</h4>
            </div>
            <FilterMain {...this.props} />
            <TimeslotList {...this.props}
                          reservationHandler={this.props.reservationHandler}
                          doctorinfoHandler={this.doctorinfoHandler.bind(this)}
                          changeTimeOfDay={this.changeTimeOfDay.bind(this)}
                          morning_filter_disabled={this.state.tod_filter_morning_disabled}
                          day_filter_disabled={this.state.tod_filter_day_disabled}
                          afternoon_filter_disabled={this.state.tod_filter_afternoon_disabled} />
          </div>
        </div>
        <div className="block-separator row">
          <img src="public/img/block-separator.png" />
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
    timeofdayfilter: state.app.timeofdayfilter,
    nextdaysearch: state.app.filters.next_day_search,
    previousday: state.app.filters.previous_day ? new Date(state.app.filters.previous_day) : null,
    pagelang: state.app.pagelang,
    filters: state.app.filters
  };
}

export default connect(mapStateToProps, actions)(SectionTimeSearch);
