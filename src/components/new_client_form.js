import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import SvgIcon from './common/svg_definitions';

class NewClientForm extends Component {

  onSubmit() {
    console.log("NewClientForm: onSubmit");
  }

  renderNormalButtons() {
      return (
          <div className="submit-buttons-centered">
            <a href="" onClick={(event) => this.props.resetState(event)}><button className="btn-white">Peruuta</button></a>
            <a href=""><button className="btn-red">Jatka</button></a>
          </div>
      );
  }

  renderPopupButtons() {
      return (
          <div>
              <a href="" onClick={(event) => this.resetState(event)}>
                <SvgIcon className="popup-close" Icon='close' />
              </a>
              <div className="popup-control-box">
                  <div className="submit-buttons-centered">
                    <a href="" onClick={(event) => this.props.resetState(event)}><button className="btn-white">Peruuta</button></a>
                    <a href=""><button className="btn-red">Jatka</button></a>
                  </div>
              </div>
          </div>
      );
  }

  render() {
    const { fields: { first_name, last_name, address, postcode, city, phone }, handleSubmit} = this.props;
    //console.log("newClientForm");
    return (
      <form className={this.props.popUp === true ? 'client-popup-form' : ''} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h4>Hei, kuka on tulossa vastaanotolle</h4>
        <input placeholder="Henkilötunnus" type="text" name="ssn" autofocus /><br />
        <div>
          <h4>Uusi asiakas, tervetuloa! Lisää vielä seuraavat tiedot:</h4>
            <table>
              <tbody>
                <tr>
                  <td className={`${first_name.touched && first_name.error ? 'danger' : ''}`}>
                    <input autoFocus placeholder="Etunimi" type="text" className="form-control" {...first_name} />
                    {first_name.touched && first_name.invalid ? <span>{first_name.error}</span> : ''}
                  </td>
                  <td className={`${last_name.touched && last_name.error ? 'danger' : ''}`}>
                    <input placeholder="Sukunimi" type="text" className="form-control" {...last_name} />
                    {last_name.touched && last_name.invalid ? <span>{last_name.error}</span> : ''}
                  </td>
                </tr>
                <tr>
                  <td className={`${address.touched && address.error ? 'danger' : ''}`}>
                    <input placeholder="Katuosoite" type="text" className="form-control" {...address} />
                    {address.touched && address.invalid ? <span>{address.error}</span> : ''}
                  </td>
                  <td className={`${postcode.touched && postcode.error ? 'danger' : ''}`}>
                    <input placeholder="Postinumero" type="text" className="form-control" {...postcode} />
                    {postcode.touched && postcode.invalid ? <span>{postcode.error}</span> : ''}
                  </td>
                </tr>
                <tr>
                  <td className={`${city.touched && city.error ? 'danger' : ''}`}>
                    <input placeholder="Postitoimipaikka" type="text" className="form-control" {...city} />
                    {city.touched && city.invalid ? <span>{city.error}</span> : ''}
                  </td>
                  <td className={`${phone.touched && phone.error ? 'danger' : ''}`}>
                    <input placeholder="Puhelinnumero" type="text" className="form-control" {...phone} />
                    {phone.touched && phone.invalid ? <span>{phone.error}</span> : ''}
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        {this.props.popUp === true ? this.renderPopupButtons() : this.renderNormalButtons()}
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if( !values.first_name ) {
    errors.first_name = "Pakollinen kenttä";
  }
  if( !values.last_name ) {
    errors.last_name = "Pakollinen kenttä";
  }
  if( !values.address ) {
    errors.address = "Pakollinen kenttä";
  }
  if( !values.postcode ) {
    errors.postcode = "Pakollinen kenttä";
  }
  if( !values.city ) {
    errors.city = "Pakollinen kenttä";
  }
  if( !values.phone ) {
    errors.phone = "Pakollinen kenttä";
  }
  return errors;
}

export default reduxForm({
  form: 'newClient',
  fields: ['first_name', 'last_name', 'address', 'postcode', 'city', 'phone'],
  validate
}, null, actions)(NewClientForm);

//export default NewClientForm;
