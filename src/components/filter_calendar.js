import React, { Component } from 'react';
import { DatePicker } from 'belle';

class FilterCalendar extends Component {

  constructor(props) {
    super(props);
  }

  dayChange(dir, event) {
    event.preventDefault();
    console.log("dayChange");
    let selected = this.props.selected_day;
    if( dir === "next" ) {
      selected.setDate(selected.getDate() + 1);
    }
    else if( dir === "prev" ) {
      selected.setDate(selected.getDate() - 1);
    }
    else {
      // error
      console.log("error");
    }
    this.linkState.requestChange(selected);
    this.props.onDayChange(selected);
  }

  // Pass changed selected day back to parent
  onDayChange() {
    //console.log("belleOnUpdate called: " + this.linkState.value );
    this.props.onDayChange(this.linkState.value);
  }

  onMonthChange(month, year) {
    console.log("Month changed: " + month + "/" + year);
    this.props.onMonthChange(month, year);
  }

  renderDay(day, box, disc) {

    var d = day.toLocaleDateString();
    var day_str = day.getFullYear();
    day_str    += "-";
    day_str    += (day.getMonth() < 9) ? "0" + (day.getMonth()+1) : (day.getMonth()+1);
    day_str    += "-";
    day_str    += (day.getDate() < 10)  ? "0" + day.getDate()  : day.getDate();
    //console.log(day.getFullYear() + "-" + day.getMonth() + "-" + day.getDate() +  " / " + d + " / " + day_str);

    if( !this.props.freedays_list || 
        this.props.freedays_list.length==0 ||
        this.props.freedays_list.indexOf(day_str) == -1
      ) {
      return day.getDate();
    } else {
      return <span style={box}><span style={disc}>{day.getDate()}</span></span>;
    }
  }

  renderDayDesk(day) {
    // green circle for free days
    var box = {
      position: 'absolute',
      top: '3px',
      left: '0',
      width: '39px',
      height: '25px',
      textAlign: 'center'
    }
    var disc = {
      backgroundColor: 'rgba(176, 226, 168, 0.64)',
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '25px',
      height: '25px',
      borderRadius: '12px',
      lineHeight: '25px'
    };
    return this.renderDay(day, box, disc);
  }

  renderDayMob(day) {
    // green circle for free days
    var box = {
      position: 'absolute',
      top: '-3px',
      left: '0',
      width: '46px',
      height: '38px',
      textAlign: 'center'
    }
    var disc = {
      backgroundColor: 'rgba(176, 226, 168, 0.64)',
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '38px',
      height: '38px',
      borderRadius: '19px',
      lineHeight: '38px'
    };
    return this.renderDay(day, box, disc);
  }

  toggleCalendar(event) {
    event.preventDefault();
    console.log("toggleCalendar");
    let display = $('.calendar-datepicker-mobile').css('display');
     $('.calendar-datepicker-mobile').css('display', (display == 'none' ? 'block' : 'none'));
  }

  // DatePicker component supports only depraceted valueLink for
  // controlled day selection. I.e this is a hack...
  linkState =  {
    value: new Date(),
    requestChange: function(new_date){
      this.value = new_date;
    }
  };

  render() {
    let selectedStyle = {
      border: '1px solid red',
      backgroundColor: '#fff',
    };

    let selected_day;
    if( !this.props.selected_day ) {
      selected_day = new Date();
    } else {
      selected_day = this.props.selected_day;
    }

    let current_month = new Date().getMonth();

    //console.log("selecter_day = " + selected_day);
    //console.log("current_month = " + current_month);
    //console.log("selected_month = " + selected_day.getMonth());

    let mindate = new Date();
    mindate.setDate(mindate.getDate() - 1);

    let navleft = "";

    return (
      <div>
        <div className="calendar-day-selector">
          <a href="" onClick={(event) => this.dayChange("prev", event)} className="pull-left"><span className="glyphicon glyphicon-menu-left" /></a>
          <a href="" onClick={(event) => this.toggleCalendar(event)}>
            <span>{formatDate3("fi", selected_day)}&nbsp;&nbsp;&nbsp;</span>
            <span className="glyphicon glyphicon-calendar"/>
          </a>
          <a href="" onClick={(event) => this.dayChange("next", event)} className="pull-right"><span className="glyphicon glyphicon-menu-right" /></a>
        </div>
        <div className="calendar-datepicker-mobile">
          <DatePicker
                  locale='fi'
                  value={selected_day}
                  renderDay={ this.renderDayMob.bind(this) }
                  onUpdate={ this.onDayChange.bind(this) }
                  selectedDayStyle={ selectedStyle }
                  onMonthUpdate={ this.onMonthChange.bind(this) }
                  valueLink={this.linkState}
                  min={mindate}
                  prevMonthNavStyle={(current_month != selected_day.getMonth()) ?
                                      {borderTop: 0, borderLeft: 0, borderBottom: 0, borderRight: 0} :
                                      {display: 'none'}}
                  nextMonthNavStyle={{borderTop: 0, borderLeft: 0, borderBottom: 0, borderRight: 0}}
                  navBarStyle={{border: 0}}
                  weekHeaderStyle={{boxShadow: 0}}
                  dayStyle={{border: 0, width: '46px', height: '46px', fontSize: '16px', display: 'inline-block', lineHeigh: '46px', verticalAlign: 'middle'}}
                  dayLabelStyle={{width: '46px', height: '46px', opacity: '0.75'}}
                  style={{width: '318px', display: 'inline-block'}}
                  />
        </div>
        <div className="calendar-datepicker-desktop">
          <DatePicker
                  locale='fi'
                  value={selected_day}
                  renderDay={ this.renderDayDesk.bind(this) }
                  onUpdate={ this.onDayChange.bind(this) }
                  selectedDayStyle={ selectedStyle }
                  onMonthUpdate={ this.onMonthChange.bind(this) }
                  valueLink={this.linkState}
                  min={mindate}
                  prevMonthNavStyle={(current_month != selected_day.getMonth()) ?
                                      {borderTop: 0, borderLeft: 0, borderBottom: 0, borderRight: 0} :
                                      {display: 'none'}}
                  nextMonthNavStyle={{borderTop: 0, borderLeft: 0, borderBottom: 0, borderRight: 0}}
                  navBarStyle={{border: 0}}
                  weekHeaderStyle={{boxShadow: 0}}
                  dayStyle={{border: 0}}
                  />
        </div>
      </div>
    );
  }
}

export default FilterCalendar;
