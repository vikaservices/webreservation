import React from 'react';
import FilterTimeOfDay from './filter_time_of_day';
import TimeSlotListItem from './timeslot_list_item';
import text from './common/translate';
import utils from './common/util';

const TimeslotList = (props) => {

  const result = props.timeslots_list.map((slot) => {
    return (
      <TimeSlotListItem
        slot={slot}
        reservationHandler={props.reservationHandler}
        doctorinfoHandler={props.doctorinfoHandler}
        filter={props.timeofdayfilter}
        key={`${slot.time}${slot.duration}${slot.resourceName}${slot.unitName}${slot.online}`}/>
    );
  });

  return (
    <div className="timeslot-list col-xs-12 col-sm-6 nopadding-right">
      <div className="row nopadding">
        {props.previousday != null ?
        <h4 className="timeslot-list-header">{text('diacor_timeslot_list_header') + formatDate2(props.pagelang, props.previousday)}</h4> :
        <h4 className="timeslot-list-header">{text('diacor_timeslot_list_header') + formatDate2(props.pagelang, props.date_filter)}</h4>
        }
        {props.previousday == null ?
        <FilterTimeOfDay {...props}/> :
        ''}
      </div>
      <div className="list-container row">
        {props.timeslots_list ?
        <ul className="list-group">
          {(props.timeslots_list && props.timeslots_list.length == 0) || (props.nextdaysearch == 2) ?
           <li className="timeslot-list-no-free-times"><p>{text('diacor_timeslot_list_no_free_times')}</p></li> :
           result}
          {((props.timeslots_list && props.timeslots_list.length == 0) && (props.nextdaysearch == 2)) ||
            ((props.timeslots_list && props.timeslots_list.length > 0) && (props.nextdaysearch != 2)) ?
           '' :
           <span>
            <h4 className="timeslot-list-header">{text('diacor_timeslot_list_header') + formatDate2(props.pagelang, props.date_filter)}</h4>
            <FilterTimeOfDay {...props}/>
            {result}
           </span>}
        </ul> :
        ''}
      </div>
    </div>
  );
}

export default TimeslotList;
