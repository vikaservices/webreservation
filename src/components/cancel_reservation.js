import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CancelReservation extends Component {
  parseCode(id) {
    console.log("id: " + id );

    let code = id.substr(0,5);
    let hetu = id.substr(5,11);

    return [code, hetu];
  }

  cancelReservation(id, event) {
    event.preventDefault();

    let res = this.parseCode(id)
    console.log("code = " + res[0] + " hetu = " + res[1]);

    this.props.cancelReservation(res[0], res[1]).then(() => {
        console.log("status: " + this.props.reservationstatus);
        if( this.props.reservationstatus == 204 ) {
          alert("ok");
        } else {
          alert("failed");
        }
    });
  }

  render() {
    return (
      <div className="app">
        <div className="cancel-reservation">
          <p>Haluatko peruuttaa varauksen {this.parseCode(this.props.location.query.id)}</p>
          <a href="http://diacor.fi"><button>Poistu</button></a>
          <a href="" onClick={(event) => this.cancelReservation(this.props.location.query.id, event)}><button>Peruuta varaus</button></a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reservationstatus: state.app.reservationstatus
  };
}

export default connect(mapStateToProps, actions)(CancelReservation);
