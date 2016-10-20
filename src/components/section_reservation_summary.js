import React, { Component } from 'react';
import { connect } from 'react-redux';
import text from './common/translate';

class SectionReservationSummary extends Component {

  componentDidUpdate() {
    if( this.props.reservation_summary_section_active == 'active' ) {
      window.scrollTo(0,0);
    }
  }

  handleCancelReservation(event) {
    event.preventDefault();
    console.log("handleCancel");
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
                  <span><a href="#" onClick={(event) => event.preventDefault()}>{text('diacor_section_summary_add_calendar')}</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className="block row">
            <h4 className="section-title">{text('diacor_section_summary_reminder_question')}</h4>
            <p>{text('diacor_section_summary_reminder_choise')}</p>
            <div className="inline-box">
              <div>
                <img src="public/img/reminder-logo.png"/>
              </div>
              <div className="padding-left-20">
                <input type="radio" name="sms_reminder" value="30" />{text('diacor_section_summary_reminder_30min')}<br />
                <input type="radio" name="sms_reminder" value="60" />{text('diacor_section_summary_reminder_60min')}<br />
                <input type="radio" name="sms_reminder" value="120" />{text('diacor_section_summary_reminder_2h')}<br />
                <input type="radio" name="sms_reminder" value="1440" />{text('diacor_section_summary_reminder_24h')}
              </div>
            </div>
            <div className="submit-buttons-centered">
              <button className="btn-red">{text('diacor_section_summary_reminder_order')}</button>
            </div>
          </div>
          <div className="block-separator row">
            <img src="public/img/block-separator.png" />
          </div>

          <div className={this.props.online ? "row block" : "hide"}>
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
          <div className={this.props.online ? "block-separator row" : "hide"}>
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
    reservation_code: state.app.reservation_code,
    selectedtimeslot: state.app.selectedtimeslot,
    selecteddate: state.app.filters.date_filter,
    online: state.app.prereservation.online,
    reservation_summary_section_active: state.app.reservation_summary_section_active
  };
}


export default connect(mapStateToProps)(SectionReservationSummary);
