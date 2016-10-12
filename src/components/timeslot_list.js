import React from 'react';
import FilterTimeOfDay from './filter_time_of_day';
import TimeSlotListItem from './timeslot_list_item';

const TimeslotList = (props) => {

  const result = props.timeslots_list.map((slot) => {
    return (
      <TimeSlotListItem
        slot={slot}
        reservationHandler={props.reservationHandler}
        filter={props.timeofdayfilter}
        key={`${slot.time}${slot.duration}${slot.resourceName}${slot.unitName}`}/>
    );
  });

  return (
    <div className="timeslot-list col-xs-12 col-sm-6">
      <div className="row">
        <h4 className="timeslot-list-header">Vapaat ajat {formatDate2("fi", props.date_filter)}</h4>
        <FilterTimeOfDay {...props}/>
      </div>
      <div className="list-container row">
        <ul className="list-group">
          {!props.timeslots_list || props.timeslots_list.length == 0 ?
            <p>Ei aikoja tälle päivälle</p> :
           result}
        </ul>
      </div>
    </div>
  );
}

export default TimeslotList;
