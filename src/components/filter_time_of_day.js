import React from 'react';

const FilterTimeOfDay = ({timeofdayfilter, changeTimeOfDay}) =>  {

  return (
    <div className="filter-time-of-day">
      <form onChange={(event) => changeTimeOfDay(event)}>
        <input type="radio" id="morning" name="tod" value="morning" checked={timeofdayfilter === "morning" ? "checked" : ""} />
        <label htmlFor="morning">AAMU</label>

        <input type="radio" id="day" name="tod" value="day" checked={timeofdayfilter === "day" ? "checked" : ""} />
        <label htmlFor="day">PÄIVÄ</label>

        <input type="radio" id="afternoon" name="tod" value="afternoon" checked={timeofdayfilter === "afternoon" ? "checked" : ""} />
        <label htmlFor="afternoon">ILTA</label>
      </form>
    </div>
  );
}

export default FilterTimeOfDay;
