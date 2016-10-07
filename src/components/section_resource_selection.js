import React, { Component } from 'react';
import { connect } from 'react-redux';
import OhcTeamList from './ohc_team_list';
import OhcEmployerList from './ohc_employer_list';

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

  render () {
    var active = this.props.resource_section_active;
    var show_team = this.state.show_team;

    if( active == 'hidden') {
      return <div></div>;
    }

    return (
      <div className={ active == 'active' ? "section-resource-selection row" : "section-resource-selection-inactive row"}>

        <div className="col-xs-12">
          <h4 className="section-title pull-left">TYÖTERVEYSTIIMISI</h4>
          <OhcEmployerList employers={this.props.employers != undefined ? this.props.employers : []}
                           selected_employer={this.props.selected_employer}
                           onChange={this.handleEmployerChange.bind(this)} />
          <a href="#" className="link pull-right" onClick={(e) => this.toggleVisibility(e)}>
            { show_team ? "Piilota" : "Näytä" }
          </a>
          <div className={ active == 'active' && show_team ? "" : "hide" }>
            <hr />
            <OhcTeamList team={this.props.ohc_team != undefined ? this.props.ohc_team : []} />
            <p>Varmista, että palvelu kuuluu yrityksesi työterveys-sopimukseen.</p>
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
    selected_employer: state.app.selected_employer
  };
}

export default connect(mapStateToProps)(SectionResourceSelection);
