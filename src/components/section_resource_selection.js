import React, { Component } from 'react';
import { connect } from 'react-redux';

class SectionResourceSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show_content: true
    };
  }

  toggleVisibility(e) {
    console.log("toggle");
    e.preventDefault();
    this.setState( {show: !this.state.show_content} );
  }

  render () {
    const active = this.props.resource_section_active;

    return (
      <div className={ active == 'active' ? "section-resource-selection row" : "section-resource-selection hide row" }>
        <div className={ this.state.show_content ? "hide" : "col-xs-12" }>
          <h4 className="section-header">TYÖTERVEYSASIAKAS</h4>
          <a href="#" className="pull-right" onClick={(e) => this.toggleVisibility(e)}>Näytä</a>
        </div>
        <div className={this.state.show_content ? "col-xs-12" : "hide"} >
          <h4 className="section-header">TYÖTERVEYSASIAKAS</h4>
          <a href="#" className="pull-right" onClick={(e) => this.toggleVisibility(e)}>Piilota</a>
          <hr />
          <p>Työterveystiimi tähän</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resource_section_active: state.app.resource_section_active
  };
}

export default connect(mapStateToProps)(SectionResourceSelection);
