import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import OhcTeamList from './ohc_team_list';
import OhcEmployerList from './ohc_employer_list';
import text from './common/translate';

class SectionResourceSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show_team: true
    };
  }

  toggleVisibility(e) {
    e.preventDefault();
    this.setState( {show_team: !this.state.show_team} );
  }

  handleEmployerChange(event) {
    console.log("handleEmployerChange: " + event.target.value);
  }

  handleResourceSelection(event, resourceId, resourceName) {
    event.preventDefault();
    console.log("handleResourceSelection: " + resourceId);
    let filters = this.props.filters;
    filters.resource_filter = resourceId;
    filters.terms_search = resourceName;
    filters.employer_id_filter = null;
    filters.do_time_search = true;
    this.props.setFilter( filters );
  }

  render () {
    var active = this.props.resource_section_active;
    var show_team = this.state.show_team;

    if( active == 'hidden') {
      return <div></div>;
    }

    return (
      <div className={ active == 'active' ? "section-resource-selection row" : "section-resource-selection-inactive row"}>

        <div className="col-xs-12">
          <div className="header-row">
            <h4 className="section-title pull-left">{text('diacor_section_resource_header')}</h4>
            <OhcEmployerList employers={this.props.employers != undefined ? this.props.employers : []}
                             selected_employer={this.props.selected_employer}
                             onChange={this.handleEmployerChange.bind(this)} />
            <a href="#" className="link font-size-14 pull-right" onClick={(e) => this.toggleVisibility(e)}>
              { active == 'active' ? (show_team ? "Piilota" : "Näytä") : ""}
            </a>
          </div>
          <div className={ active == 'active' && show_team ? "" : "hide" }>
            <hr />
            <OhcTeamList team={this.props.ohc_team != undefined ? this.props.ohc_team : []}
                         onClick={this.handleResourceSelection.bind(this)} />
            <p>{text('diacor_section_resource_content')}</p>
          </div>
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
    filters: state.app.filters
  };
}

export default connect(mapStateToProps, actions)(SectionResourceSelection);
