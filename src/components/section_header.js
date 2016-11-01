import React, { Component } from 'react';
import text from './common/translate';

const SectionHeader = (props) => {

  return (
    <div className="row">
    <div className="section-header">

      <div className="logo-bar">
      <div className="lang-selection pull-right">
          <span className="current-lang"></span>
          <ul>
            <li id="lang_fi"><a href="">{text('diacor_header_lang_fi')}</a></li>
            <li id="lang_se"><a href="">{text('diacor_header_lang_se')}</a></li>
            <li id="lang_en"><a href="">{text('diacor_header_lang_en')}</a></li>
          </ul>
        </div>
        <span className="diacor-logo" />
        <div className="title">{props.title}</div>
      </div>

      <div className="title-bar">
        <span className="title">{props.title}</span>
        <span className="header-link pull-right">
          <span />
          <a href="https://wrui01.securasp.fi/LA2094_Eloni/" className="header-turku-link">Turun ajanvaraus &gt;</a>
        </span>
      </div>

      <div className="links-bar">
        <span className={props.hide_links ? "hide" : "header-link"}>
          <span className="logo-login-ohc" />
          <a className="ohc_login_desktop" href="" data-target="ohc_login" onClick={(event) => props.clickHandler(event)}>
            {text('diacor_section_header1_desktop')}
          </a>
          <a className="ohc_login_mobile" href="" data-target="ohc_login" onClick={(event) => props.clickHandler(event)}>
            {text('diacor_section_header1_mobile')}
          </a>
        </span>
        <span className={props.hide_links ? "hide" : "header-link pull-right"}>
          <span className="logo-reservation" />
          <a href="" data-target="cancel_reservation" onClick={(event) => props.clickHandler(event)}>{text('diacor_section_header2')}</a>
        </span>
      </div>

    </div>
    </div>
  );
}

export default SectionHeader;

// return (
//   <div className="section-header row">
//     <div><img src="/public/img/header-diacor-logo.png" /></div>
//     <div className="section-header-title">{props.title}</div>
//     <div className="section-header-links">
//       <span className={props.hide_links ? "hide" : ""}>
//         <img src="/public/img/header-login-ohc.png" />
//         <a href="" data-target="ohc_login" onClick={(event) => props.clickHandler(event)}>{text('diacor_section_header1')}</a>
//       </span>
//       <span className={props.hide_links ? "hide" : "pull-right"}>
//         <img src="/public/img/header-reservations.png" />
//         <a href="" data-target="cancel_reservation" onClick={(event) => props.clickHandler(event)}>{text('diacor_section_header2')}</a>
//       </span>
//     </div>
//   </div>
// );
