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
      // value in search-terms input box
      terms_search: '',
      // value in units-search input box
      units_search: '',
      // resource id
      resource_filter: null,
      // speciality id
      speciality_filter: null,
      // grpup id
      group_filter: null,
      // unit id
      unit_filter: null,
      // value of language-filter
      lang_filter: null,
      // value of gender-filter
      gender_filter: null,
      // value of city-filter
      city_filter: null,
      // selected day value of calendar-filter
      date_filter: new Date(),
      // selected month of calendar-filter
      date_filter_month: new Date().getMonth(),
      // selected year of calendar-filter
      date_filter_year: new Date().getFullYear(),
      // Visibility of extra filters
      extra_filters: false,
      // visibility of units list
      unit_list_visible: false,
      // filtered unit list
      units_list_filtered: []
    };
  }

  componentDidMount() {
    // Prefetch all units
    setTimeout(() => {
      console.log("componentDidMount: calling unitsSearch");
      this.props.unitsSearch();
    }, 500);
  }

  render() {
    return (
      <div className="filter-main col-xs-12 col-sm-6">
        <div id="terms-search">
          <input
            value={this.state.terms_search}
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

          <a className={this.state.terms_search == '' ? "hide" : "input-reset"}
              onClick={(event) => this.clearInput('terms', event)} href=""></a>
        </div>

        <div id="units-search">
          <input
            value={this.state.units_search}
            placeholder="Toimipiste"
            data-name="units"
            onChange={(event) => this.onInputChangeUnit(event.target.value)}
            onFocus={(event) => this.onFocus(event)}
            onBlur={(event) => this.onBlur(event)} />

          {this.state.unit_list_visible ?
          <SearchResultList items_list={this.state.units_list_filtered.length > 0 || this.state.units_search.length > 0
                                        ? this.state.units_list_filtered : this.props.units_list }
                            onClickHandler={this.onClickHandlerUnits.bind(this)}
                            list_id="units-search-hints"
                            is_active={this.state.unit_list_visible} />
          : ''}

          <div id="units-search-quicklinks" className="hide">
            units search quicklinks here
          </div>

          <a className={this.state.units_search == '' ? "hide" : "input-reset"}
             onClick={(event) => this.clearInput('units', event)} href=""></a>
        </div>

        <FilterExtra onChange={this.onChange.bind(this)}
                     onClick={this.onToggleExtraFilters.bind(this)}
                     show={this.state.extra_filters} />

        <div id="calendar-filter">
            <FilterCalendar freedays_list={this.props.freedays_list}
                            selected_day={this.state.date_filter}
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
      this.setState( {terms_search: '',
                      resource_filter: null,
                      speciality_filter: null,
                      group_filter: null }, () => {
        this.props.termsSearch();
        // update free days
        this.doFreedaysSearch();
      } );
    } else if( input == 'units' ) {
      this.setState( {units_search: '', unit_filter: null}, () => {
        this.props.unitsSearch();
        // update free days
        this.doFreedaysSearch();
      } );
    }
  }

  // Called every time user types in main search field
  onInputChangeTerms(terms_search) {
    this.setState( { terms_search }, function(){
      // defer search until:
      // 1) 3 chars written
      // TODO: 2) at least 200-300ms between keypresses
      if( this.state.terms_search.length >= 3 ) {
        this.props.termsSearch(terms_search);
      } else {
        this.props.termsSearch();
      }
    });
  }

  // Called when user selects value from main search results
  onClickHandlerTerms(id, type, name, event) {
    event.preventDefault();
    console.log("onClickHandlerSearch: type: " + type + " name: " + name);
    let state;
    switch(type) {
      case "RESOURCE":
        state = { terms_search: name, resource_filter: id };
        break;
      case "SPECIALITY":
        state = { terms_search: name, speciality_filter: id };
        break;
      case "GROUP":
        state = { terms_search: name, group_filter: id };
        break;
      case "UNIT":
        state = { terms_search: name, unit_filter: id };
        break;
      default:
    }
    this.setState( state, function(){
        this.doTimeslotsSearch();
        this.doFreedaysSearch();
        // clear search-hints
        this.props.termsSearch();
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
    this.setState( {units_list_filtered: units_list_filtered}, () => {
      //console.log(this.state.units_list_filtered);
    });
  }

  // Called every time user types in units search field
  onInputChangeUnit(units_search) {
    this.setState( { units_search }, function(){

      this.filterUnitsList(units_search);
    });
  }

  // Called when user selects value from units search results
  onClickHandlerUnits(id, type, name, event) {
    event.preventDefault();
    console.log("onClickHandlerUnits: " + name);
    this.setState( { units_search: name, unit_filter: id }, function(){
        this.doTimeslotsSearch();
        this.doFreedaysSearch();
        // clear search-hints
        //this.props.unitsSearch();
    });
  }


  onDayChange( date_filter ) {
    this.props.setSelectedDate(date_filter);
    this.setState( { date_filter }, function() {
      let date = formatDate( date_filter );
      console.log("onDayChange: date = " + date);
      this.doTimeslotsSearch();
    });
  }

  onMonthChange( month, year ) {
    console.log("FilterMain: current month = " + this.state.date_filter_month + " year = " + this.state.date_filter_year);
    console.log("FilterMain: new month = " + month + " year = " + year);

    // Calendar's onMonthUpdate gives the months in range 1-12, adjust range to 0-11
    // for jaascript Date-object
    this.setState( {date_filter_month: month-1, date_filter_year: year}, () => {
      this.doFreedaysSearch();
    });
  }

  onFocus(event) {
    console.log( event.target.dataset.name  + " on focus");
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
    this.setState( {extra_filters: !this.state.extra_filters} );
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

  doTimeslotsSearch() {
/*
    console.log("date_filter :" + this.state.date_filter);
    console.log("resource_filter :" + this.state.resource_filter);
    console.log("speciality_filter :" + this.state.speciality_filter);
    console.log("group_filter :" + this.state.group_filter);
    console.log("unit_filter :" + this.state.unit_filter);
*/
    this.props.timeslotsSearch( formatDate(this.state.date_filter),
                                this.state.resource_filter,
                                this.state.speciality_filter,
                                this.state.group_filter,
                                this.state.unit_filter,
                                this.state.lang_filter,
                                this.state.gender_filter,
                                this.state.city_filter );
  }

  doFreedaysSearch() {

    console.log("date_filter :" + this.state.date_filter);
    console.log("resource_filter :" + this.state.resource_filter);
    console.log("speciality_filter :" + this.state.speciality_filter);
    console.log("group_filter :" + this.state.group_filter);
    console.log("unit_filter :" + this.state.unit_filter);

/*
    let today = new Date();
    let currY = today.getFullYear();
    let currM = (today.getMonth() < 10) ? "0" + (today.getMonth()) : (today.getMonth());
    let daysInMonth = new Date(currY, currM, 0).getDate();
    let last_of_month = new Date(currY, currM, daysInMonth);
*/

    // calculate start day
    // start day is either
    // - if selected month fro calendar is current month -> current day
    // - selected month some next month -> 1
    let today = new Date();
    let currY = today.getFullYear();
    let currM = (today.getMonth() < 10) ? "0" + (today.getMonth()) : (today.getMonth());
    let start_day;
    if( (currM != this.state.date_filter_month) ||
        (currY != this.state.date_filter_year) ) {
      // set to first day of selected month
      start_day = new Date(this.state.date_filter_year, this.state.date_filter_month, 1);
    } else {
      start_day = today;
    }

    // calculate end day
    let daysInMonth = new Date(this.state.date_filter_year, this.state.date_filter_month, 0).getDate();
    let last_of_month = new Date(this.state.date_filter_year, this.state.date_filter_month, daysInMonth);

    console.log("currY = " + currY + " currM = " + currM);
    console.log("year = " + this.state.date_filter_year + " month = " + this.state.date_filter_month);
    console.log("doFreedaysSearch: start_day = " + start_day);
    console.log("doFreedaysSearch: last_of_month = " + last_of_month);

    this.props.freedaysSearch( formatDate(start_day),
                               formatDate(last_of_month),
                               this.state.resource_filter,
                               this.state.speciality_filter,
                               this.state.group_filter,
                               this.state.unit_filter,
                               this.state.lang_filter,
                               this.state.gender_filter,
                               this.state.city_filter );
  }
} //class


function mapStateToProps(state) {
  return {
    terms_list: state.terms.terms_list,
    units_list: state.units.units_list,
    freedays_list: state.freedays.freedays_list,
  };
}

export default connect(mapStateToProps, actions)(FilterMain);
