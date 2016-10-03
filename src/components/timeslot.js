import React from 'react';

const TimeSlot = (props) => {
  return (
    <li className="list-group-item row">
      <div className="slot-inline">
        <span className="slot-time">{props.slot.time}</span><br />
        <span className="slot-duration">{props.slot.duration} min</span>
      </div>
      <div className="slot-inline">
        <img  className="slot-image" src={props.slot.imageUrl} />
      </div>
      <div className="slot-inline">
        <span className="slot-resource">{props.slot.resourceName}</span><br />
        <span className="slot-title">{props.slot.title}</span><br />
        <span className="slot-unit">Diacor {props.slot.unitName}</span>
      </div>
      <div className="slot-inline pull-right">
        <a className="link" href="" onClick={(event) => props.reservationHandler(props.slot.resourceId, props.slot.unitId,
                                                        props.slot.time, props.slot.duration,
                                                        props.slot.imageUrl, props.slot.resourceName, props.slot.title, props.slot.unitName,
                                                        event)}>Varaa</a>
      </div>
    </li>
  );
}

export default TimeSlot;
