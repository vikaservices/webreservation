import React, { Component } from 'react';
import text from './common/translate';

const SectionHeader = (props) => {

  return (
    <div className="section-header row">
      <div><img src="/public/img/header-diacor-logo.png" /></div>
      <div className="section-header-title">{props.title}</div>
      <div className="section-header-links">
        <span>
          <img src="/public/img/header-login-ohc.png" />
          <a href="" data-target="ohc_login" onClick={(event) => props.clickHandler(event)}>{text('diacor_section_header1')}</a>
        </span>
        <span className="pull-right">
          <img src="/public/img/header-reservations.png" />
          <a href="" data-target="cancel_reservation" onClick={(event) => props.clickHandler(event)}>{text('diacor_section_header2')}</a>
        </span>
      </div>
    </div>
  );
}

export default SectionHeader;
