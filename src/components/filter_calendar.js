import React, { Component } from 'react';
import { DatePicker } from 'belle';

class FilterCalendar extends Component {

  constructor(props) {
    super(props);
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

  renderDay(day) {
    // green circle for free days
    var s = {
      backgroundColor: 'rgba(176, 226, 168, 0.64)',
      width: '25px',
      height: '25px',
      display: 'inline-block',
      borderRadius: '12px'
    };

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
      return <span style={s}>{day.getDate()}</span>;
    }
  }

  // DatePicker component supports only depraceted valueLink for
  // controlled day selection. I.e this is a hack...
  linkState =  {
    value: new Date(),
    requestChange: function(new_date){
      this.value = new_date;
      //console.log( "linkState.value: " + this.value);
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

    return (<DatePicker
                    locale='fi'
                    value={selected_day}
                    renderDay={ this.renderDay.bind(this) }
                    onUpdate={ this.onDayChange.bind(this) }
                    selectedDayStyle={ selectedStyle }
                    onMonthUpdate={ this.onMonthChange.bind(this) }
                    valueLink={this.linkState}
                    />
          );
  }
}

export default FilterCalendar;
