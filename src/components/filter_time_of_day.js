import React from 'react';
import text from './common/translate';
import {
  TOD_MORNING,
  TOD_DAY,
  TOD_AFTERNOON
} from '../actions/types';

const FilterTimeOfDay = ({timeofdayfilter, changeTimeOfDay}) =>  {

  return (
    <div className="filter-time-of-day">
      <form onChange={(event) => changeTimeOfDay(event)}>
        <input type="radio" id="morning" name="tod" value="morning" checked={timeofdayfilter === TOD_MORNING ? "checked" : ""} />
        <label htmlFor="morning">{text('diacor_filter_time_morning')}</label>

        <input type="radio" id="day" name="tod" value="day" checked={timeofdayfilter === TOD_DAY ? "checked" : ""} />
        <label htmlFor="day">{text('diacor_filter_time_day')}</label>

        <input type="radio" id="afternoon" name="tod" value="afternoon" checked={timeofdayfilter === TOD_AFTERNOON ? "checked" : ""} />
        <label htmlFor="afternoon">{text('diacor_filter_time_evening')}</label>
      </form>
    </div>
  );
}

export default FilterTimeOfDay;
