import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router';
import FilterCalendar from './filter_calendar';
import _ from 'lodash';
import SearchResultList from './search_result_list';
import FilterExtra from './filter_extra';

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
      //
      do_terms_search: false,
      do_units_filtering: false,
      do_time_search: false
    };
  }

  componentDidMount() {
    // Prefetch all units
    setTimeout(() => {
      this.props.unitsSearch();
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");

    if( this.state.do_terms_search == true ) {
      console.log("do_terms_search");
      this.setState( { do_terms_search: false }, () => {
        if( nextProps.filters.terms_search.length >= 3 ) {
          console.log("do_terms_search: 1");
          this.props.termsSearch(nextProps.filters.terms_search);
        } else {
          console.log("do_terms_search: 2");
          this.props.termsSearch();
        }
      });
    }

    if( this.state.do_units_filtering == true ) {
      console.log("do_units_search");
      this.setState( {do_units_search: false}, () => {
        this.filterUnitsList(nextProps.filters.units_search);
      });
    }

    if( this.state.do_time_search == true ) {
      console.log("do_time_search");
      this.setState( {do_time_search: false}, ()  => {
        this.doTimeslotsSearch(nextProps.filters);
        this.doFreedaysSearch(nextProps.filters);
        this.props.termsSearch();
      });
    }

    if( nextProps.filters.employer_id_filter ) {
      console.log("employer_id_filter search");
      //this.doTimeslotsSearch(nextProps.filters);
      //this.doFreedaysSearch(nextProps.filters);
    }
  } // componentWillReceiveProps

  render() {
    const filters = this.props.filters;

    return (
      <div className="filter-main col-xs-12 col-sm-6">
        <div id="terms-search">
          <input
            value={filters.terms_search}
            placeholder="Nimi tai palvelu"
            data-name="terms"
            onChange={(event) => this.onInputChangeTerms(event.target.value)}
            onFocus={(event) => this.onFocus(event)}
            onBlur={(event) => this.onBlur(event)} />

          <SearchResultList items_list={this.props.terms_list}
                            onClickHandler={this.onClickHandlerTerms.bind(this)}
                            list_id="terms-search-hints"
                            is_active={this.props.terms_list.length==0 ? false : true} />

          <div id="terms-search-quicklinks" className="hide">
            terms search quicklinks here
          </div>

          <a className={filters.terms_search == '' ? "hide" : "input-reset"}
              onClick={(event) => this.clearInput('terms', event)} href=""></a>
        </div>

        <div id="units-search">
          <input
            value={filters.units_search}
            placeholder="Toimipiste"
            data-name="units"
            onChange={(event) => this.onInputChangeUnit(event.target.value)}
            onFocus={(event) => this.onFocus(event)}
            onBlur={(event) => this.onBlur(event)} />

          {this.state.unit_list_visible ?
          <SearchResultList items_list={this.state.units_list_filtered.length > 0 || filters.units_search.length > 0
                                        ? this.state.units_list_filtered : this.props.units_list }
                            onClickHandler={this.onClickHandlerUnits.bind(this)}
                            list_id="units-search-hints"
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
                     show={this.state.extra_filters_visible} />

        <div id="calendar-filter">
            <FilterCalendar freedays_list={this.props.freedays_list}
                            selected_day={this.props.filters.date_filter}
                            onDayChange={this.onDayChange.bind(this)}
                            onMonthChange={this.onMonthChange.bind(this)} />
        </div>
      </div>
    );
  }

  // Erases value from units or main search field depending on event target
  clearInput(input, event) {
    event.preventDefault();
    console.log("clearInput: " + input);
    if( input == 'terms' ) {
      this.setState( {do_terms_search: true, do_time_search: true}, () => {
        let filters = this.props.filters;
        filters.terms_search = '';
        filters.resource_filter = null;
        filters.group_filter = null;
        filters.employer_id_filter = null;
        this.props.setFilter( filters );
      });

    } else if( input == 'units' ) {
      this.setState( {do_time_search: true}, () => {
        let filters = this.props.filters;
        filters.units_search = '';
        filters.unit_filter = null;
        this.props.setFilter( filters );
        // this.props.unitsSearch();
        // // update free days
        // this.doFreedaysSearch();
      });
    }
  }

  // Called every time user types in main search field
  onInputChangeTerms(terms_search) {
    console.log("onInputChangeTerms: " + terms_search);
    let filters = this.props.filters;
    filters.terms_search = terms_search;
    this.setState( {do_terms_search: true}, () => {
      console.log("calling setFilter : dotermssearch = " + this.state.dotermssearch);
      this.props.setFilter( filters );
    });
  }

  // Called when user selects value from main search results
  onClickHandlerTerms(id, type, name, event) {
    event.preventDefault();
    console.log("onClickHandlerSearch: type: " + type + " name: " + name);
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
    this.setState( {do_time_search: true}, () =>{
      this.props.setFilter( filters );
    });
  }

  filterUnitsList( filter ) {
    let units_list_filtered = [];
    if( this.props.units_list.length > 0 ) {
      this.props.units_list.map((item) => {
        if( item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1 ) {
          units_list_filtered.push(item);
        }
      });
    }
    this.setState( {units_list_filtered: units_list_filtered} );
  }

  // Called every time user types in units search field
  onInputChangeUnit(units_search) {
    let filters = this.props.filters;
    filters.units_search = units_search;
    this.setState( {do_units_filtering: true}, () => {
      this.props.setFilter( filters );
    });
  }

  // Called when user selects value from units search results
  onClickHandlerUnits(id, type, name, event) {
    event.preventDefault();
    console.log("onClickHandlerUnits: " + name);
    let filters = this.props.filters;
    filters.units_search = name;
    filters.unit_filter = id;
    this.setState( {do_time_search: true}, () => {
      this.props.setFilter( filters );
    });
  }

  onDayChange( date_filter ) {
    this.setState( {do_time_search: true}, () => {
      let filters = this.props.filters;
      filters.date_filter = date_filter;
      this.props.setFilter( filters );
    });
  }

  onMonthChange( month, year ) {
    console.log("FilterMain: current month = " + this.props.date_filter_month + " year = " + this.props.date_filter_year);
    console.log("FilterMain: new month = " + month + " year = " + year);

    // Calendar's onMonthUpdate gives the months in range 1-12, adjust range to 0-11
    // for jaascript Date-object
    this.setState( {date_filter_month: month-1, date_filter_year: year}, () => {
      this.doFreedaysSearch();
    });
    // this.setState( {do_time}, () => {
    //
    // });
  }

  onFocus(event) {
    //console.log( event.target.dataset.name  + " on focus");
    if(  event.target.dataset.name == "units" ) {
      this.setState( {unit_list_visible: true} );
    }
    // TODO: show quick select buttons
  }

  onBlur(event) {
    //console.log( event.target.dataset.name + " off focus")
    if(  event.target.dataset.name == "units" ) {
      setTimeout((event) => {
        this.setState( {unit_list_visible: false} );
      }, 200);
    }
    // TODO: hide quick select buttons ?
  }

  onToggleExtraFilters(event) {
    event.preventDefault();
    this.setState( {extra_filters_visible: !this.state.extra_filters_visible} );
  }

  // Handle extra filter changes
  onChange(event, name, value) {
    if( event.target.name == "lang_filter" )
      this.setState( { lang_filter: event.target.value } );
    if( event.target.name == "gender_filter" )
      this.setState( { gender_filter : event.target.value } );
    if( event.target.name == "city_filter" )
      this.setState( { city_filter : event.target.value } );
    //console.log( "lang_filter: " + this.state.lang_filter);
    //console.log( "gender_filter: " + this.state.gender_filter);
    //console.log( "city_filter: " + this.state.city_filter);
    this.doTimeslotsSearch();
  }

  doTimeslotsSearch( filters ) {
    if( filters.resource_filter == null &&
        filters.group_filter == null &&
        filters.unit_filter == null &&
        filters.lang_filter == null &&
        filters.gender_filter == null &&
        filters.city_filter == null &&
        filters.employer_id_filter == null ) {
      return;
    }
    this.props.timeslotsSearch( formatDate(filters.date_filter),
                                           filters.resource_filter,
                                           null,
                                           filters.group_filter,
                                           filters.unit_filter,
                                           filters.lang_filter,
                                           filters.gender_filter,
                                           filters.city_filter,
                                           filters.employer_id_filter );
  }

  doFreedaysSearch( filters ) {
    if( filters.resource_filter == null &&
        filters.group_filter == null &&
        filters.unit_filter == null &&
        filters.lang_filter == null &&
        filters.gender_filter == null &&
        filters.city_filter == null &&
        filters.employer_id_filter == null ) {
      return;
    }
    // calculate start day
    // start day is either
    // - if selected month fro calendar is current month -> current day
    // - selected month some next month -> 1
    let today = new Date();
    let currY = today.getFullYear();
    let currM = (today.getMonth() < 10) ? "0" + (today.getMonth()) : (today.getMonth());
    let start_day;
    if( (currM != filters.date_filter_month) ||
        (currY != filters.date_filter_year) ) {
      // set to first day of selected month
      start_day = new Date(filters.date_filter_year, filters.date_filter_month, 1);
    } else {
      start_day = today;
    }

    // calculate end day
    let daysInMonth = new Date(filters.date_filter_year, filters.date_filter_month, 0).getDate();
    let last_of_month = new Date(filters.date_filter_year, filters.date_filter_month, daysInMonth);

    console.log("currY = " + currY + " currM = " + currM);
    console.log("year = " + filters.date_filter_year + " month = " + filters.date_filter_month);
    console.log("doFreedaysSearch: start_day = " + start_day);
    console.log("doFreedaysSearch: last_of_month = " + last_of_month);

    this.props.freedaysSearch( formatDate(start_day),
                               formatDate(last_of_month),
                               filters.resource_filter,
                               null,
                               filters.group_filter,
                               filters.unit_filter,
                               filters.lang_filter,
                               filters.gender_filter,
                               filters.city_filter,
                               filters.employer_id_filter );
  }
}


function mapStateToProps(state) {
  return {
    terms_list: state.terms.terms_list,
    units_list: state.units.units_list,
    freedays_list: state.freedays.freedays_list,
    filters: state.app.filters,
    selecteddate: state.app.selecteddate,
    updated: state.app.updated
  };
}

export default connect(mapStateToProps, actions)(FilterMain);
