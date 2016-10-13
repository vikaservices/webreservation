import React from 'react';

const FilterExtra = (props) => {

  return (
    <div id="extra-filters">
      <div className={props.show ? "" : "hide"}>
        <a href="" className="link font-size-11" onClick={(event) => props.onClick(event)}>Piilota lisävalinnat -</a>
        <div id="lang-filter">
          <input type="radio" name="lang_filter" value="fi" onChange={(event) => props.onChange(event)} />Suomi
          <input type="radio" name="lang_filter" value="sw" onChange={(event) => props.onChange(event)} />Ruotsi
          <input type="radio" name="lang_filter" value="ru" onChange={(event) => props.onChange(event)} />Venäjä
        </div>
        <div id="gender-filter">
          <input type="radio" name="gender_filter" value="male" onChange={(event) => props.onChange(event)} />Mies
          <input type="radio" name="gender_filter" value="female" onChange={(event) => props.onChange(event)} />Nainen
        </div>
        <div id="city-filter">
          <input type="radio" name="city_filter" value="espoo" onChange={(event) => props.onChange(event)} />Espoo
          <input type="radio" name="city_filter" value="helsinki" onChange={(event) => props.onChange(event)} />Helsinki
          <input type="radio" name="city_filter" value="vantaa" onChange={(event) => props.onChange(event)} />Vantaa
        </div>
      </div>
      <div className={!props.show ? "" : "hide"}>
        <a href="" className="link font-size-11" onClick={(event) => props.onClick(event)}>Näytä lisävalinnat +</a>
      </div>
    </div>
  );
}

export default FilterExtra;
