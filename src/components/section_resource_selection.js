import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import OhcTeamList from './ohc_team_list';
import OhcEmployerList from './ohc_employer_list';
import DropdownMenu from './dropdown_menu';
import text from './common/translate';

class SectionResourceSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show_team: false,
      employers: [] // [{id: employer.id, value: employer.name},...]
    };
  }

  componentWillReceiveProps(nextProps) {
    // Make {id : value} pair array form employers
    if(nextProps.employers) {
      let emps = [];
      nextProps.employers.map((item) => {
          emps.push({id: item.id, value: item.name});
      });
      setTimeout(() => {
        if( this.props.native_entry_flag ) {
          // Ohc client from diacorplus -> hide team by default
          this.setState( {employers: emps} )
        } else {
          if( this.props.selectedtimeslot.resourceId ) {
            // Ohc client logged in by selecting timeslot
            this.setState( {employers: emps} );
          } else {
            // Ohc customer from normal browser using ohc login
            this.setState( {employers: emps, show_team: true} );
          }
        }
      }
      ,0);
    }
  }

  toggleVisibility(e) {
    e.preventDefault();
    this.setState( {show_team: !this.state.show_team} );
  }

  handleEmployerChange(id, event) {
    event.preventDefault();
    console.log("SectionResourceSelection: handleEmployerChange: " + id);
    this.props.setSelectedEmployer(id);
  }

  handleResourceSelection(event, resourceId, resourceName) {
    event.preventDefault();
    console.log("SectionResourceSelection handleResourceSelection: " + resourceId);
    let filters = this.props.filters;
    filters.resource_filter = resourceId;
    filters.terms_search = resourceName;
    filters.employer_id_filter = null;
    filters.do_time_search = true;
    this.props.setFilter( filters );
    if( this.props.native_entry_flag ) {
      this.setState( {show_team: false} );
    }
  }

  render () {
    var active = this.props.resource_section_active;
    var show_team = this.state.show_team;

    if( active == 'hidden') {
      return <div></div>;
    }

    return (
      <div>
        <div className={ active == 'active' ? "section-resource-selection row" : "section-resource-selection-inactive row"}>

          <div>
            <div className="header-row">
              <h4 className="pull-left" style={{width:'25%',textAlign:'left'}}>{text('diacor_section_resource_header')}</h4>
              <div className="ohc-employer-list">
                <DropdownMenu items={this.state.employers}
                              selected={this.props.selected_employer.name}
                              onChange={this.handleEmployerChange.bind(this)} />
              </div>
              <a href="#" className="link font-size-14 pull-right" style={{width:'25%',textAlign:'right'}} onClick={(event) => this.toggleVisibility(event)}>
                { active == 'active' ? (show_team ? text('diacor_section_header_hide_link') : text('diacor_section_header_show_link')) : ""}
              </a>
            </div>

            <div className={ active == 'active' && show_team ? "header-row ohc-employer-selection" : "hide" }>
              <div className="ohc-employer-list-mobile">
                <DropdownMenu items={this.state.employers}
                              selected={this.props.selected_employer.name}
                              onChange={this.handleEmployerChange.bind(this)} />
              </div>
            </div>

            <div className={ active == 'active' && show_team ? "" : "hide" }>
              <OhcTeamList team={this.props.ohc_team != undefined ? this.props.ohc_team : []}
                           onClick={this.handleResourceSelection.bind(this)} />
              <p className="ohc-disclaimer">{text('diacor_section_resource_content')}</p>
            </div>
          </div>
        </div>

        <div className="block-separator row">
          <img src="public/img/block-separator.png" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resource_section_active: state.app.resource_section_active,
    ohc_team: state.app.selected_employer.professionals,
    employers: state.app.employers,
    selected_employer: state.app.selected_employer,
    filters: state.app.filters,
    native_entry_flag: state.app.native_entry_flag,
    selectedtimeslot: state.app.selectedtimeslot,
    appstate: state.app.appstate,
    pagelang: state.app.pagelang
  };
}

export default connect(mapStateToProps, actions)(SectionResourceSelection);
