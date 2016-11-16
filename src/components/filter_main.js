import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router';
import FilterCalendar from './filter_calendar';
import _ from 'lodash';
import SearchResultList from './search_result_list';
import FilterExtra from './filter_extra';
import text from './common/translate';

class FilterMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // visibility of extra filters
      extra_filters_visible: false,
      // visibility of units list
      unit_list_visible: false,
      // filtered unit list
      units_list_filtered: [],
      // target list for up/down arrow keys navigation ("terms-search-hints" or "units-search-hints")
      keypress_nav_target:  null,
      //
      terms_list_index: -1,
      //
      units_list_index: -1,
    };
  }

  componentDidMount() {
    // Prefetch all units and fixed groups for extra filters (genders & languages)
    setTimeout(() => {
      this.props.getFixedgroups( this.props.pagelang );

      this.props.unitsSearch().then(() => {
        this.filterUnitsList();
      });
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    //console.log("FilterMain: componentWillReceiveProps");

    if( nextProps.filters.do_terms_search == true ) {
      //console.log("do_terms_search");
      if( nextProps.filters.terms_search.length >= 3 ) {
        console.log("FilterMain: componentWillReceiveProps: do_terms_search");
        this.props.termsSearch(nextProps.filters.terms_search, this.props.pagelang);
      } else {
        console.log("FilterMain: componentWillReceiveProps: do_terms_search: clear value");
        this.props.termsSearch();
      }
      let filters = nextProps.filters;
      filters.do_terms_search = false;
      this.props.setFilter( filters );
    }

    if( nextProps.filters.do_units_filtering == true ) {
      console.log("FilterMain: componentWillReceiveProps: do_units_filtering");
      this.filterUnitsList(nextProps.filters.units_search);
      this.setState( {units_list_index: -1} );
      let filters = nextProps.filters;
      filters.do_units_filtering = false;
      this.props.setFilter( filters );
    }

    if( nextProps.filters.do_time_search == true ) {
      console.log("FilterMain: componentWillReceiveProps: do_time_search");
      console.log("next_day_search: " + nextProps.filters.next_day_search);
      //console.log(nextProps);
      this.doTimeslotsSearch(nextProps);
      this.doFreedaysSearch(nextProps);
      this.props.termsSearch();
      let filters = nextProps.filters;
      filters.do_time_search = false;
      this.props.setFilter( filters );
    }

    if( nextProps.filters.next_day_search == 1 ) {
      console.log("FilterMain: componentWillReceiveProps: do_next_day_search");
      this.doTimeslotsSearch(nextProps);
      let filters = nextProps.filters;
      filters.next_day_search = 2;
      this.props.setFilter( filters );
    }

  } // componentWillReceiveProps

  render() {
    const filters = this.props.filters;
    const date_filter_obj = new Date(filters.date_filter);

    return (
      <div className="filter-main col-xs-12 col-sm-6 nopadding-left">
        <div className="search-box">
          <input
            value={filters.terms_search}
            placeholder={text('diacor_input_placeholder_name_or_service')}
            tabIndex="1"
            data-name="terms"
            onChange={(event) => this.onInputChangeTerms(event.target.value)}
            onFocus={(event) => this.onFocus(event)}
            onBlur={(event) => this.onBlur(event)}
            onKeyDown={(event) => this.onKeyDown(event)} />

          <SearchResultList items_list={this.props.terms_list}
                            onClickHandler={this.onClickHandlerTerms.bind(this)}
                            list_id="terms-search-hints"
                            index={this.state.terms_list_index}
                            is_active={this.props.terms_list.length==0 ? false : true} />

          <div id="terms-search-quicklinks" className="hide">
            terms search quicklinks here
          </div>

          <a className={filters.terms_search == '' ? "hide" : "input-reset"}
              onClick={(event) => this.clearInput('terms', event)} href=""></a>
        </div>

        <div className="search-box">
          <input
            value={filters.units_search}
            placeholder={text('diacor_input_placeholder_office')}
            tabIndex="2"
            data-name="units"
            onChange={(event) => this.onInputChangeUnit(event.target.value)}
            onFocus={(event) => this.onFocus(event)}
            onBlur={(event) => this.onBlur(event)}
            onKeyDown={(event) => this.onKeyDown(event)} />

          {this.state.unit_list_visible ?
          <SearchResultList items_list={this.state.units_list_filtered}
                            onClickHandler={this.onClickHandlerUnits.bind(this)}
                            list_id="units-search-hints"
                            index={this.state.units_list_index}
                            is_active={this.state.unit_list_visible} />
          : ''}

          <div id="units-search-quicklinks" className="hide">
            units search quicklinks here
          </div>

          <a className={filters.units_search == '' ? "hide" : "input-reset"}
             onClick={(event) => this.clearInput('units', event)} href=""></a>
        </div>

        <FilterExtra onChange={this.onChange.bind(this)}
                     onClick={this.onToggleExtraFilters.bind(this)}
                     languages={this.props.fixedgroups ? this.props.fixedgroups.language : []}
                     genders={this.props.fixedgroups ? this.props.fixedgroups.gender : []}
                     cities={cities}
                     gender_selected={filters.gender_filter}
                     city_selected={filters.city_filter}
                     lang_selected={filters.lang_filter}
                     show={this.state.extra_filters_visible} />

        <div className="turku-link">
          <a href="https://wrui01.securasp.fi/LA2094_Eloni/">{text('diacor_filter_main_reservation_turku_link')} &gt;</a>
        </div>

        <div id="calendar-filter">
            <FilterCalendar freedays_list={this.props.freedays_list}
                            selected_day={new Date(this.props.filters.date_filter)}
                            onDayChange={this.onDayChange.bind(this)}
                            onMonthChange={this.onMonthChange.bind(this)} />
        </div>
      </div>
    );
  }

  onKeyDown(event) {
    let target = event.target.dataset.name;
    if( event.keyCode == 38 ) { // up arrow
      if( target == "terms") {
        if( this.state.terms_list_index > 0 ) {
          this.setState( {terms_list_index: this.state.terms_list_index - 1}, () => {
            console.log("terms: current index: " + this.state.terms_list_index);
          });
        }
      }
      else {
        if( this.state.units_list_index > 0 ) {
          this.setState( {units_list_index: this.state.units_list_index - 1}, () => {
            console.log("units: current index: " + this.state.units_list_index);
          });
        }
      }
    }
    if( event.keyCode == 40 ) { // down arrow
      if( target == "terms" ) {
        if( this.state.terms_list_index < this.props.terms_list.length ) {
          this.setState( {terms_list_index: this.state.terms_list_index + 1}, () => {
            console.log("terms: current index: " + this.state.terms_list_index );
          });
        }
      }
      else {
        if( this.state.units_list_index < this.props.units_list.length ) {
          this.setState( {units_list_index: this.state.units_list_index + 1}, () => {
            console.log("units: current index: " + this.state.units_list_index );
          });
        }
      }
    }
    if( event.keyCode == 13 ) { // enter
      if( target == "terms" ) {
        console.log("terms: current index: " + this.state.terms_list_index);
        console.log("terms: item.name: " + this.props.terms_list[this.state.terms_list_index].name);
        this.onClickHandlerTerms(this.props.terms_list[this.state.terms_list_index].id,
                                 this.props.terms_list[this.state.terms_list_index].type,
                                 this.props.terms_list[this.state.terms_list_index].name);
        this.setState( {terms_list_index: -1} );
      }
      else {
        console.log("units: current index: " + this.state.units_list_index);
        console.log("units: item.name: " + this.props.units_list[this.state.units_list_index].name);

        let selected_list = this.state.units_list_filtered;

        this.onClickHandlerUnits(selected_list[this.state.units_list_index].id,
                                 selected_list[this.state.units_list_index].type,
                                 selected_list[this.state.units_list_index].name);
        this.setState( {units_list_index: -1, unit_list_visible: false} );
      }
    }
    if( event.keyCode == 27 ) { // ESQ
      if( target == "terms") {

      }
      else {
        this.setState( {unit_list_visible: false} );
      }
    }
  }


  // Erases value from units or main search field depending on event target
  clearInput(input, event) {
    event.preventDefault();
    console.log("clearInput: " + input);
    if( input == 'terms' ) {
      let filters = this.props.filters;
      filters.terms_search = '';
      filters.resource_filter = null;
      filters.group_filter = null;
      filters.employer_id_filter = null;
      filters.do_terms_search = true;
      filters.do_time_search = true;
      this.props.setFilter( filters );

    } else if( input == 'units' ) {
      let filters = this.props.filters;
      filters.units_search = '';
      filters.unit_filter = null;
      filters.do_units_filtering = true;
      filters.do_time_search = true;
      this.props.setFilter( filters );
    }
  }

  // Called every time user types in main search field
  onInputChangeTerms(terms_search) {
    console.log("onInputChangeTerms: " + terms_search);
    let filters = this.props.filters;
    filters.terms_search = terms_search;
    filters.do_terms_search = true;
    this.props.setFilter( filters );
  }

  // Called when user selects value from main search results
  onClickHandlerTerms(id, type, name, event=null) {
    event ? event.preventDefault() : null;
    console.log("FilterMain: onClickHandlerSearch: type: " + type + " name: " + name);
    let filters = this.props.filters;
    filters.terms_search = name;
    switch(type) {
      case "RESOURCE":
        filters.resource_filter = id ;
        break;
      case "GROUP":
        filters.group_filter = id;
        break;
      case "UNIT":
        filters.unit_filter = id;
        break;
      default:
    }
    filters.do_time_search = true;
    filters.next_day_search = 0;
    filters.previous_day = null;
    this.props.setFilter( filters );
  }

  filterUnitsList( filter = '') {
    if( filter == '' ) {
      this.setState( {units_list_filtered: this.props.units_list} );
      return;
    }
    let units_list_filtered = [];
    if( this.props.units_list.length > 0 ) {
      this.props.units_list.map((item) => {
        if( item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1 ) {
          units_list_filtered.push(item);
        }
      });
      this.setState( {units_list_filtered: units_list_filtered} );
    }
  }

  // Called every time user types in units search field
  onInputChangeUnit(units_search) {
    let filters = this.props.filters;
    filters.units_search = units_search;
    filters.do_units_filtering = true;
    this.props.setFilter( filters );
    this.setState( {unit_list_visible: true} );
  }

  // Called when user selects value from units search results
  onClickHandlerUnits(id, type, name, event=null) {
    event ? event.preventDefault() : null;
    console.log("FilterMain: onClickHandlerUnits: " + name);
    let filters = this.props.filters;
    filters.units_search = name;
    filters.unit_filter = id;
    filters.do_time_search = true;
    filters.next_day_search = 0;
    filters.previous_day = null;
    this.props.setFilter( filters );
  }

  onDayChange( date_filter ) {
    let filters = this.props.filters;
    date_filter.setHours(12);
    filters.date_filter = date_filter.toISOString();
    filters.do_time_search = true;
    filters.next_day_search = 0;
    filters.previous_day = null;
    this.props.setFilter( filters );
  }

  onMonthChange( month, year ) {
    console.log("FilterMain: onMonthChange: current month = " + this.props.date_filter_month + " year = " + this.props.date_filter_year);
    console.log("FilterMain: onMonthChange: new month = " + month + " year = " + year);

    // Calendar's onMonthUpdate gives the months in range 1-12, adjust range to 0-11
    // for jaascript Date-object
    let filters = this.props.filters;
    filters.date_filter_month = month - 1;
    filters.date_filter_year = year;
    let first_of_month = new Date(filters.date_filter_year, filters.date_filter_month, 1);
    filters.date_filter = first_of_month.toISOString();
    filters.do_time_search = true;
    filters.next_day_search = 0;
    filters.previous_day = null;
    this.props.setFilter( filters );
  }

  onFocus(event) {
    //console.log( event.target.dataset.name  + " on focus");
    if(  event.target.dataset.name == "units" ) {
      this.setState( {unit_list_visible: true} );
    }
    // TODO: show quick select buttons
  }

  onBlur(event) {
    console.log( event.target.dataset.name + " off focus")
    if(  event.target.dataset.name == "units" ) {
      setTimeout((event) => {
        this.setState( {unit_list_visible: false} );
      }, 200);
    }
    // TODO: hide quick select buttons ?
  }

  onToggleExtraFilters(event) {
    event.preventDefault();
    this.setState( {extra_filters_visible: !this.state.extra_filters_visible}, () => {
      if( $(document).width() >= 768 ) {
        // Do this only for tablet and desktop
        $('.timeslot-list').height($('.filter-main').height());
        $('.list-container').height($('.filter-main').height() - 29);
      }
    });
  }

  // Handle extra filter changes
  onChange(event) {
    console.log("onChange: name = " + event.target.name + " / value = " + event.target.value + " / checked = " + event.target.checked);
    let filters = this.props.filters;

    if( event.target.name == "gender_filter" ) {
      if( event.target.value == filters.gender_filter ) {
        filters.gender_filter = null;
      } else {
        filters.gender_filter = event.target.value;
      }
    }

    if( event.target.name == "city_filter" ) {
      if( event.target.value == filters.city_filter ) {
        filters.city_filter = null;
      } else {
        filters.city_filter = event.target.value;
      }
    }

    if( event.target.name == "lang_filter" ) {
      if( event.target.value == filters.lang_filter ) {
        filters.lang_filter = null;
      } else {
        filters.lang_filter = event.target.value;
      }
    }
    filters.do_time_search = true;
    filters.next_day_search = 0;
    filters.previous_day = null;

    this.props.setFilter( filters );
  }

  doTimeslotsSearch( props ) {
    if( props.filters.resource_filter == null &&
        props.filters.group_filter == null &&
        props.filters.unit_filter == null &&
        props.filters.lang_filter == null &&
        props.filters.gender_filter == null &&
        props.filters.city_filter == null &&
        props.filters.employer_id_filter == null ) {
      return;
    }
    this.props.timeslotsSearch( formatDate(new Date(props.filters.date_filter)),
                                           props.filters.resource_filter,
                                           null,
                                           props.filters.group_filter,
                                           props.filters.unit_filter,
                                           props.filters.lang_filter,
                                           props.filters.gender_filter,
                                           props.filters.city_filter,
                                           props.filters.employer_id_filter,
                                           props.client_id == 0 ? null : props.client_id,
                                           props.pagelang).then(() => {
                                             if( (this.props.timeslots_list && this.props.timeslots_list.length == 0) &&
                                                 this.props.filters.next_day_search == 0 ) {
                                               console.log("FilterMain: doTimeslotsSearch: no free times for today, search for tomorrow")
                                               let filters = this.props.filters;
                                               filters.next_day_search = 1;
                                               let next_day = new Date(filters.date_filter);
                                               let date_filter = new Date(filters.date_filter);
                                               next_day.setDate( date_filter.getDate() + 1 );
                                               //console.log("today: " + filters.date_filter + " : tomorrow: " + next_day);
                                               filters.previous_day = filters.date_filter;
                                               filters.date_filter = next_day.toISOString();
                                               this.props.setFilter( filters );
                                             }
                                           } );
  }

  doFreedaysSearch( props ) {
    // calculate start day
    // start day is either
    // - if selected month fro calendar is current month -> current day
    // - selected month some next month -> 1
    let today = new Date();
    let currY = today.getFullYear();
    let currM = (today.getMonth() < 10) ? "0" + (today.getMonth()) : (today.getMonth());
    let start_day;
    if( (currM != props.filters.date_filter_month) ||
        (currY != props.filters.date_filter_year) ) {
      // set to first day of selected month
      start_day = new Date(props.filters.date_filter_year, props.filters.date_filter_month, 1);
    } else {
      start_day = today;
    }

    // calculate end day
    let daysInMonth = new Date(props.filters.date_filter_year, props.filters.date_filter_month, 0).getDate();
    let last_of_month = new Date(props.filters.date_filter_year, props.filters.date_filter_month, daysInMonth);

    this.props.freedaysSearch( formatDate(start_day),
                               formatDate(last_of_month),
                               props.filters.resource_filter,
                               null,
                               props.filters.group_filter,
                               props.filters.unit_filter,
                               props.filters.lang_filter,
                               props.filters.gender_filter,
                               props.filters.city_filter,
                               props.filters.employer_id_filter,
                               props.client_id == 0 ? null : props.client_id );
  }
}

const cities = [
  {
    "id": 99,
    "type": "city",
    "name": "espoo"
  },
  {
    "id": 100,
    "type": "city",
    "name": "helsinki"
  },
  {
    "id": 101,
    "type": "city",
    "name": "vantaa"
  },
  {
    "id": 102,
    "type": "city",
    "name": "kirkkonummi"
  }
];

function mapStateToProps(state) {
  return {
    terms_list: state.terms.terms_list,
    units_list: state.units.units_list,
    freedays_list: state.freedays.freedays_list,
    filters: state.app.filters,
    client_id: state.app.client_id,
    fixedgroups: state.app.fixedgroups,
    pagelang: state.app.pagelang,
    timeslots_list: state.app.timeslots_list
  };
}

export default connect(mapStateToProps, actions)(FilterMain);
