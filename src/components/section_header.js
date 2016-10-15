import React, { Component } from 'react';

const SectionHeader = (props) => {

  return (
    <div className="section-header row">
      <div><img src="/public/img/header-diacor-logo.png" /></div>
      <div className="section-header-title">{props.title}</div>
      <div className="section-header-links">
        <span className={props.hide_links ? "hide" : ""}>
          <img src="/public/img/header-login-ohc.png" />
          <a href="" data-target="ohc_login" onClick={(event) => props.clickHandler(event)}>Työterveysasiakkaan ajanvaraus</a>
        </span>
        <span className={props.hide_links ? "hide" : "pull-right"}>
          <img src="/public/img/header-reservations.png" />
          <a href="" data-target="cancel_reservation" onClick={(event) => props.clickHandler(event)}>Omat varaukset</a>
        </span>
      </div>
    </div>
  );
}

export default SectionHeader;
