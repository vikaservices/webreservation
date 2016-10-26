import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { APP_STATE_ORDER_REMINDER_OK } from '../actions/types';
import text from './common/translate';

class SectionReservationSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reminderId: '60 min',
      reminderName: '60 min'
    }
  }

  componentDidUpdate() {
    if( this.props.reservation_summary_section_active == 'active' ) {
      window.scrollTo(0,0);
    }
  }

  onReminderChange(event) {
    console.log("onReminderChange: " + event.target.value);
    this.setState( { reminderId: event.target.value, reminderName: event.target.dataset.name } );
  }

  onSubmitReminder(reminderId, event) {
    event.preventDefault();
    console.log("onSubmitReminder: " + reminderId);
    this.props.orderReminder(this.props.prereservation.id, this.props.client_id, reminderId);
  }

  // addCalendarEntry(event) {
  //   event.preventDefault();
  //   console.log("addCalendarEntry");
  //   let today = new Date();
  //   let end_millis = new Date(this.props.selectedtimeslot.start).getTime() + (this.props.selectedtimeslot.duration * 60000);
  //   let end = new Date(end_millis);
  //   let rnd = Math.floor(Math.random() * 1000000);
  //
  //   console.log("today: " + today);
  //   console.log("end: " + end);
  //
  //   let dtstamp   = getCalendarDateString( today.toISOString() );
  //   let dtstart   = getCalendarDateString( this.props.selectedtimeslot.start);
  //   let dtend     = getCalendarDateString( end );
  //   let uid       = this.props.selectedtimeslot.start + "-" + rnd + "-diacor.fi@diacor.fi";
  //   let cn        = "Asiakaspalvelu";
  //   let mailto    = "info@diacor.fi";
  //   let resourcename = this.props.selectedtimeslot.resourceName;
  //   let title     = this.props.selectedtimeslot.title;
  //   let location  = this.props.selectedtimeslot.unitName;
  //
  //   let e = "";
  //   e += "BEGIN:VCALENDAR\n";
  //   e += "VERSION:2.0\n";
  //   e += "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n";
  //   e += "BEGIN:VEVENT\n";
  //   e += "UID:"     + uid     + "\n";
  //   e += "DTSTAMP:" + dtstamp + "\n";
  //   e += "ORGANIZER;CN=" + cn + ":MAILTO:" + mailto + "\n";
  //   e += "DTSTART:" + dtstart + "\n";
  //   e += "DTEND:"   + dtend   + "\n";
  //   e += "SUMMARY:" + resourcename + ", " + title + ", " + location + "\n";
  //   e += "END:VEVENT\n";
  //   e += "END:VCALENDAR\n";
  //
  //   console.log("calendar entry: \n" + e)
  // }

  addCalendarEntry(event) {
    // TODO: fix timezone for begin end times
    event.preventDefault();
    console.log("addCalendarEntry");
    let end_millis = new Date(this.props.selectedtimeslot.start).getTime() + (this.props.selectedtimeslot.duration * 60000);

    let begin     = this.props.selectedtimeslot.start;
    let end       = new Date(end_millis).toISOString();
    let resourcename = this.props.selectedtimeslot.resourceName;
    let title     = this.props.selectedtimeslot.title;
    let location  = this.props.selectedtimeslot.unitName;
    let subject   = resourcename + ", " + title;

    var cal = ics();
    cal.addEvent(subject, "", location, begin, end);
    cal.download();
  }

  render() {
    const active = this.props.reservation_summary_section_active;
    const reservation = this.props.selectedtimeslot;

    if( active == 'hidden') {
      return <div></div>;
    }

    return (
      <div className="section-summary row">
        <div className="col-xs-12">
          <div className="header-row">
            <h4 className="section-title pull-left">{text('diacor_section_summary_header')}</h4>
          </div>

          <div className="block row">
            <p>
            {text('diacor_section_summary_content')}<span style={{fontWeight: 'bold'}}>{this.props.reservation_code ? this.props.reservation_code : ""}</span>
            </p>
            <div className="inline-box">
              <div className="col-xs-12 col-sm-6">
                <div className="summary-logo">
                  <img className="reservation-info-face" src={reservation.imageUrl ? reservation.imageUrl : ""} />
                </div>
                <div className="padding-left-20">
                  <span>{reservation.resourceName ? reservation.resourceName : ""}</span><br />
                  <span>{reservation.title ? reservation.title : ""}</span><br />
                  <span>{text('diacor_company_name') + reservation.unitName ? reservation.unitName : " "}</span>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div>
                  <img src="public/img/calendar-logo.png"/>
                </div>
                <div className="padding-left-20">
                  <span style={{fontWeight: 'bold'}}>{this.props.selecteddate ? formatDate2('fi', new Date(this.props.selecteddate)) : ""}</span><br />
                  <span>{reservation.startTimeHours ? reservation.startTimeHours : ""} </span>
                  <span>{reservation.duration ? "(" + reservation.duration + " min)" : ""}</span><br />
                  <span><a href="#" onClick={(event) => this.addCalendarEntry(event)}>{text('diacor_section_summary_add_calendar')}</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="block row">
            <div className={this.props.appstate === APP_STATE_ORDER_REMINDER_OK ? "" : "hide" }>
              <br /><br />
              <p>Tilaus tallennettu. Saat muistutuksen tekstiviestinä {this.state.reminderName} vastaanottoaikaa.</p>
            </div>
            <div className={this.props.appstate === APP_STATE_ORDER_REMINDER_OK ? "hide" : ""}>
              <h4 className="section-title">{text('diacor_section_summary_reminder_question')}</h4>
              <p>{text('diacor_section_summary_reminder_choise')}</p>
              <form onSubmit={(event) => this.onSubmitReminder(this.state.reminderId, event)}>
                <div className="inline-box">
                  <div>
                    <img src="public/img/reminder-logo.png"/>
                  </div>
                  <div className="padding-left-20">
                      <input type="radio"
                             onChange={this.onReminderChange.bind(this)}
                             checked={this.state.reminderId === "1" ? true : false}
                             name="sms_reminder"
                             data-name={text('diacor_section_summary_reminder_30min')}
                             value="1" />{text('diacor_section_summary_reminder_30min')}<br />
                      <input type="radio"
                             onChange={this.onReminderChange.bind(this)}
                             checked={this.state.reminderId === "60 min" ? true : false}
                             name="sms_reminder"
                             data-name={text('diacor_section_summary_reminder_60min')}
                             value="60 min" />{text('diacor_section_summary_reminder_60min')}<br />
                      <input type="radio"
                             onChange={this.onReminderChange.bind(this)}
                             checked={this.state.reminderId === "2 h" ? true : false}
                             name="sms_reminder"
                             data-name={text('diacor_section_summary_reminder_2h')}
                             value="2 h" />{text('diacor_section_summary_reminder_2h')}<br />
                      <input type="radio"
                             onChange={this.onReminderChange.bind(this)}
                             checked={this.state.reminderId === "24 h" ? true : false}
                             name="sms_reminder"
                             data-name={text('diacor_section_summary_reminder_24h')}
                             value="24 h" />{text('diacor_section_summary_reminder_24h')}
                  </div>
                </div>
                <div className="submit-buttons-centered">
                  <button className="btn-red">{text('diacor_section_summary_reminder_order')}</button>
                </div>
              </form>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>
          <div className={this.props.prereservation.online ? "row block" : "hide"}>
            <h4 className="section-title">{text('diacor_section_summary_reminder_question2')}</h4>
            <div className="inline-box">
              <div>
                <img src="public/img/diacorplus-logo.png" />
              </div>
              <div className="padding-left-40">
                <ol type="A">
                  <li>{text('diacor_section_summary_download')}<a href="" target="_blank">{text('diacor_section_summary_plus')}</a>{text('diacor_section_summary_app')}</li>
                  <li>{text('diacor_section_summary_sure')}</li>
                  <li>{text('diacor_section_summary_notification')}</li>
                  <li>{text('diacor_section_summary_open')}</li>
                  <li>{text('diacor_section_summary_redirect')}</li>
                </ol>
              </div>
            </div>
          </div>
          <div className={this.props.prereservation.online ? "block-separator row" : "hide"}>
            <img src="public/img/block-separator.png" />
          </div>

          <div className="row block">
            <h4 className="section-title">{text('diacor_section_summary_valued_customer')}</h4>
            <p>{text('diacor_section_summary_what')}</p>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="row block">
            <div className="submit-buttons-centered">
              <a href="/"><button className="btn-white">{text('diacor_section_summary_button_new')}</button></a>
              <a href="http://diacor.fi"><button className="btn-red">{text('diacor_section_summary_button_leave')}</button></a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client_id: state.app.client_id,
    appstate: state.app.appstate,
    reservation_code: state.app.reservation_code,
    selectedtimeslot: state.app.selectedtimeslot,
    selecteddate: state.app.filters.date_filter,
    prereservation: state.app.prereservation,
    reservation_summary_section_active: state.app.reservation_summary_section_active
  };
}


export default connect(mapStateToProps, actions)(SectionReservationSummary);
