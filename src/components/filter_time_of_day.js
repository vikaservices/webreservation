import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FilterTimeOfDay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: null
    };
  }

  changeHandler(event) {
    this.setState( {filter: event.target.id}, () => { console.log("state: " + this.state.filter) } );
    this.props.setTimeOfDayFilter(event.target.value);
  }

  render() {
    return (
      <div className="filter-time-of-day pull-right">
        <form onChange={(event) => this.changeHandler(event)}>
          <input type="radio" id="tod1" name="tod" value="morning" checked={this.state.filter === "tod1" ? "checked" : ""} /><label htmlFor="tod1">AAMU</label>
          <input type="radio" id="tod2" name="tod" value="day" checked={this.state.filter === "tod2" ? "checked" : ""} /><label htmlFor="tod2">PÄIVÄ</label>
          <input type="radio" id="tod3" name="tod" value="afternoon" checked={this.state.filter === "tod3" ? "checked" : ""} /><label htmlFor="tod3">ILTA</label>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(FilterTimeOfDay);
