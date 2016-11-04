import React, { Component } from 'react';
import text from './common/translate';

const SectionHeader = ({clickHandler, title, is_ohc_client, native_entry_flag}) => {

  return (
    <div className="row">
    <div className="section-header">

      <div className={native_entry_flag ? "hide" : "logo-bar"}>
      <div className="lang-selection pull-right">
          <span className="current-lang"></span>
          <ul>
            <li id="lang_fi"><a href="">{text('diacor_header_lang_fi')}</a></li>
            <li id="lang_se"><a href="">{text('diacor_header_lang_se')}</a></li>
            <li id="lang_en"><a href="">{text('diacor_header_lang_en')}</a></li>
          </ul>
        </div>
        <span className="diacor-logo" />
        <div className="title">{title}</div>
      </div>

      <div className="title-bar">
        <span className="title">{title}</span>
        <span className="header-link pull-right">
          <span className={is_ohc_client ? "header-link pull-right" : "hide" }>
            <span className="logo-reservation" />
            <a href="" data-target="cancel_reservation" onClick={(event) => clickHandler(event)}>{text('diacor_section_header2')}</a>
          </span>
          <span className={is_ohc_client ? "hide" : "header-link pull-right" }>
            <a href="https://wrui01.securasp.fi/LA2094_Eloni/">Turun ajanvaraus &gt;</a>
          </span>
        </span>
      </div>

      <div className={is_ohc_client ? "hide" : "links-bar"}>
        <span className="header-link">
          <span className="logo-login-ohc" />
          <a className="ohc_login_desktop" href="" data-target="ohc_login" onClick={(event) => clickHandler(event)}>
            {text('diacor_section_header1_desktop')}
          </a>
          <a className="ohc_login_mobile" href="" data-target="ohc_login" onClick={(event) => clickHandler(event)}>
            {text('diacor_section_header1_mobile')}
          </a>
        </span>
        <span className="header-link pull-right">
          <span className="logo-reservation" />
          <a href="" data-target="cancel_reservation" onClick={(event) => clickHandler(event)}>{text('diacor_section_header2')}</a>
        </span>
      </div>

    </div>
    </div>
  );
}

export default SectionHeader;
