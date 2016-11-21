import React, { Component } from 'react';
import text from './common/translate';

const SectionHeader = ({clickHandler, title, is_ohc_client, native_entry_flag, pagelang, hide_links}) => {
//TODO: language selection
  return (
    <div className="row">
    <div className="section-header">

      <div className={native_entry_flag ? "hide" : "logo-bar"}>
        <div className="lang-selection pull-right">
          <span className="current-lang"></span>
          <ul className={hide_links ? "visibility-hidden" : ""}>
            <li id="lang_fi"><a href="" data-target="fi" onClick={(event) => clickHandler(event)}>{text('diacor_header_lang_fi')}</a></li>
            <li id="lang_se"><a href="" data-target="sv" onClick={(event) => clickHandler(event)}>{text('diacor_header_lang_se')}</a></li>
            <li id="lang_en"><a href="" data-target="en" onClick={(event) => clickHandler(event)}>{text('diacor_header_lang_en')}</a></li>
          </ul>
        </div>
        <span className="diacor-logo" />
        <div className="title">{title}</div>
      </div>

      <div className={native_entry_flag ? "title-bar diacorplus-bg" : "title-bar"}>
        <span className={native_entry_flag ? "hide" : "title"}>{title}</span>
        <span className="header-link pull-right">
          <span className={!native_entry_flag ? "header-link pull-right" : "hide" }>
            <span className="logo-reservation" />
            <a href="" data-target="cancel_reservation" onClick={(event) => clickHandler(event)}>{text('diacor_section_header2')}</a>
          </span>
          <span className={!native_entry_flag ? "hide" : "header-link pull-right" }>
            <a href="https://wrui01.securasp.fi/LA2094_Eloni/">{text('diacor_header_turku_link')} &gt;</a>
          </span>
        </span>
      </div>

      <div className={hide_links ? "visibility-hidden" : native_entry_flag ? "hide" : ""}>
        <div className={is_ohc_client ? "links-bar hide-mobile-links-bar" : "links-bar"}>
          <span className="header-link">
            <span className={is_ohc_client ? "hide" : "logo-login-ohc"} />
            <a className={is_ohc_client ? "hide" : "ohc_login_desktop"} href="" data-target="ohc_login" onClick={(event) => clickHandler(event)}>
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
    </div>
  );
}

export default SectionHeader;
