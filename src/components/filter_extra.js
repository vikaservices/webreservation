import React from 'react';
import text from './common/translate';

const FilterExtra = (props) => {

  return (
    <div id="extra-filters">
      <div className={props.show ? "" : "hide"}>
        <a href="" className="link font-size-11" onClick={(event) => props.onClick(event)}>{text('diacor_filter_extra_hide')}-</a>
        <div id="lang-filter">
          <input type="radio" name="lang_filter" value="fi" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_country_fin')}
          <input type="radio" name="lang_filter" value="sw" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_country_swe')}
          <input type="radio" name="lang_filter" value="ru" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_country_rus')}
        </div>
        <div id="gender-filter">
          <input type="radio" name="gender_filter" value="male" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_gender_male')}
          <input type="radio" name="gender_filter" value="female" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_gender_female')}
        </div>
        <div id="city-filter">
          <input type="radio" name="city_filter" value="espoo" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_city_Espoo')}
          <input type="radio" name="city_filter" value="helsinki" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_city_Helsinki')}
          <input type="radio" name="city_filter" value="vantaa" onChange={(event) => props.onChange(event)} />{text('diacor_filter_extra_city_Vantaa')}
        </div>
      </div>
      <div className={!props.show ? "" : "hide"}>
        <a href="" className="link font-size-11" onClick={(event) => props.onClick(event)}>{text('diacor_filter_extra_show')}+</a>
      </div>
    </div>
  );
}

export default FilterExtra;
