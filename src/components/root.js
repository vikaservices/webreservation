import React, { Component, PropTypes } from 'react';

class Root extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    console.log("componentDidMount: Root");
    console.log(this.props);
    if( this.props.location.query.cancelreservation ) {
      console.log("cancelreservation");
      this.context.router.push('cancelreservation?id=' + this.props.location.query.cancelreservation);
      return;
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Root;
