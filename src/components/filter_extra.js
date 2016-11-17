import React from 'react';
import text from './common/translate';

const FilterExtra = ({onChange, onClick, languages, cities, genders, gender_selected
                     , city_selected, lang_selected, show, pagelang}) => {

  const gens = genders.map((gen)  => {
    return (
      <span key={`gender_${gen.id}`}>
        <input type="radio" name="gender_filter" id={`gender_${gen.id}`} value={gen.id} checked={gender_selected == gen.id ? "checked" : ''} />
        <label htmlFor={`gender_${gen.id}`}>{gen.name}</label>
      </span>
    );
  });

  const citys = cities.map((city) => {
    return (
      <span className="" key={`city_${city.id}`}>
        <input type="radio" name="city_filter" id={`city_${city.id}`} value={city.id} checked={city_selected == city.id ? "checked" : ''} />
        <label htmlFor={`city_${city.id}`}>{city.name}</label>
      </span>
    );
  });

  const langs = languages.map((lang) => {
    return (
      <span className="" key={`lang_${lang.id}`}>
        <input type="radio" name="lang_filter" id={`lang_${lang.id}`} value={lang.id} checked={lang_selected == lang.id ? "checked" : ''} />
        <label htmlFor={`lang_${lang.id}`}>{lang.name}</label>
      </span>
    );
  });


  return (
    <div className="extra-filters">
      <div className="extra-filters-input">
        <span className="extra-filters-label" onClick={(event) => onClick(event)}>{text('diacor_filter_extra_label')}</span>
        <span className="" />
      </div>

      <div className={show ? "hide" : ""}>
        <a href="" className="link font-size-11 extra-filters-link" onClick={(event) => onClick(event)}>{text('diacor_filter_extra_show')}
          <span className="font-size-16">+</span>
        </a>
      </div>

      <div className={show ? "" : "hide"}>
        <a href="" className="link font-size-11 extra-filters-link" onClick={(event) => onClick(event)}>{text('diacor_filter_extra_hide')}
          <span className="font-size-16">-</span>
        </a>
        <div className="extra-filters-content">

          <form onChange={(event) => onChange(event)}>
            <div className="filter-group">
              <div className="extra-filters-label">{text('diacor_filter_extra_label_gender')}</div>
              {gens}
            </div>
            <div className="filter-group">
              <div className="extra-filters-label">{text('diacor_filter_extra_label_city')}</div>
              {citys}
            </div>
            <div className="filter-group">
              <div className="extra-filters-label">{text('diacor_filter_extra_label_language')}</div>
              {langs}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default FilterExtra;
