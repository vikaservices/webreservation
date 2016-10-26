import React from 'react';
import text from './common/translate';

const TimeSlotListItem = (props) => {
  return (
    <li className={parseInt(props.slot.time.substr(0,(props.slot.time.indexOf(":")+1))) < parseInt(props.filter)
      ? "hide" : "list-group-item row" }>
      <div className="slot-inline slot-align-middle">
        <span className="slot-time">{props.slot.time}</span><br />
        <span className="slot-duration">{props.slot.duration} min</span>
      </div>
      <div className="slot-inline slot-align-middle">
        <span className="slot-image slot-align-middle">
          <img src={props.slot.imageUrl} />
        </span>
      </div>
      <div className="slot-inline slot-align-middle">
        <span className="slot-resource">{props.slot.resourceName}</span><br />
        <span className="slot-title">{props.slot.title}</span><br />
        <span className="slot-unit">{props.slot.online ? text('diacor_timeslot_diacorplus') : props.slot.unitName}</span>
      </div>
      <div className="slot-inline lh-50 pull-right">
        <a className="link font-size-13" href="" onClick={(event) => props.reservationHandler(props.slot.resourceId, props.slot.unitId,
                                                                    props.slot.time, props.slot.duration, props.slot.online,
                                                                    props.slot.imageUrl, props.slot.resourceName, props.slot.title, props.slot.unitName,
                                                                    event)}>{text('diacor_timeslot_link')}</a>
      </div>
    </li>
  );
}

export default TimeSlotListItem;
