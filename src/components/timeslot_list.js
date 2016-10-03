import React, { Component } from 'react';
import FilterTimeOfDay from './filter_time_of_day';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TimeSlot from './timeslot';

class TimeslotList extends Component {

  renderTimeslots() {

    console.log("renderTimeslots");

    if( !this.props.timeslots ) {
      return '';
    }

    if( this.props.timeslots.length == 0 ) {
      return <p>Ei aikoja tälle päivälle</p>
    }

    return this.props.timeslots.map((slot) => {
      return (
        <TimeSlot
          slot={slot}
          reservationHandler={this.props.reservationHandler}
          key={`${slot.time}${slot.duration}${slot.resourceName}${slot.unitName}`}/>
      );
    });
  }

  render() {
    return (
      <div className="timeslot-list col-xs-12 col-sm-6">
        <div className="row">
          <h4 className="timeslot-list-header">Vapaat ajat {formatDate2("fi", this.props.selecteddate)}</h4>
          <FilterTimeOfDay />
        </div>
        <div className="list-container row">
          <ul className="list-group">
            {this.renderTimeslots()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //timeslots: state.timeslots.timeslots_list
    timeslots: state.app.timeslots_list,
    selecteddate: state.app.selecteddate
  };
}

export default connect(mapStateToProps, null)(TimeslotList);
