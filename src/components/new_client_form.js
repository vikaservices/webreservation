import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import SvgIcon from './common/svg_definitions';
import text from './common/translate';

class NewClientForm extends Component {

  onSubmit() {
    console.log("NewClientForm: onSubmit");
  }

    renderNormalButtons() {
      return (
          <div className="submit-buttons-centered">
            <a href="" onClick={(event) => this.props.resetState(event)}><button className="btn-white">{text('diacor_popup_button_cancel')}</button></a>
            <a href=""><button className="btn-red">{text('diacor_popup_button_accept')}</button></a>
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
                    <a href="" onClick={(event) => this.props.resetState(event)}><button className="btn-white">{text('diacor_popup_button_cancel')}</button></a>
                    <a href=""><button className="btn-red">{text('diacor_popup_button_accept')}</button></a>
                  </div>
              </div>
          </div>
      );
    }

    phoneValidation(input) {
        return input.length > 0 && /^\\s*\\+?(\\d[\\s\\-]*){6,}\\d\\s*$/.test(input);
    }

    render() {
        const { fields: { first_name, last_name, address, postcode, city, phone }, handleSubmit} = this.props;
        return (
          <form className={this.props.popUp === true ? 'client-popup-form' : ''} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h4>{text('diacor_popup_new_client_header_one')}</h4>
            <input placeholder={text('diacor_input_placeholder_ssn')} type="text" name="ssn" /><br />
            <div>
              <h4>{text('diacor_popup_new_client_header_two')}</h4>
                <table>
                  <tbody>
                    <tr>
                      <td className={`${first_name.touched && first_name.error ? 'danger' : ''}`}>
                        <input autoFocus placeholder={text('diacor_input_placeholder_name')} type="text" className="form-control" {...first_name} />
                        {first_name.touched && first_name.invalid ? <span>{first_name.error}</span> : ''}
                      </td>
                      <td className={`${last_name.touched && last_name.error ? 'danger' : ''}`}>
                        <input placeholder={text('diacor_input_placeholder_surname')} type="text" className="form-control" {...last_name} />
                        {last_name.touched && last_name.invalid ? <span>{last_name.error}</span> : ''}
                      </td>
                    </tr>
                    <tr>
                      <td className={`${address.touched && address.error ? 'danger' : ''}`}>
                        <input placeholder={text('diacor_input_placeholder_address')} type="text" className="form-control" {...address} />
                        {address.touched && address.invalid ? <span>{address.error}</span> : ''}
                      </td>
                      <td className={`${postcode.touched && postcode.error ? 'danger' : ''}`}>
                        <input placeholder={text('diacor_input_placeholder_postalcode')} type="text" className="form-control" {...postcode} />
                        {postcode.touched && postcode.invalid ? <span>{postcode.error}</span> : ''}
                      </td>
                    </tr>
                    <tr>
                      <td className={`${city.touched && city.error ? 'danger' : ''}`}>
                        <input placeholder={text('diacor_input_placeholder_city')} type="text" className="form-control" {...city} />
                        {city.touched && city.invalid ? <span>{city.error}</span> : ''}
                      </td>
                      <td className={`${phone.touched && phone.error ? 'danger' : ''}`}>
                        <input ref="phoneNumber" placeholder={text('diacor_input_placeholder_phone')} type="text" className="form-control" {...phone} />
                        {phone.touched && phone.invalid ? <span>{phone.error}</span> : ''}
                        {/*this.phoneValidation(this.refs.phoneNumber.value) === false ? <span>Number format not correct</span> : ''*/}
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
    errors.first_name = text('diacor_error_required');
  }
  if( !values.last_name ) {
    errors.last_name = text('diacor_error_required');
  }
  if( !values.address ) {
    errors.address = text('diacor_error_required');
  }
  if( !values.postcode ) {
    errors.postcode = text('diacor_error_required');
  }
  if( !values.city ) {
    errors.city = text('diacor_error_required');
  }
  if( !values.phone ) {
    errors.phone = text('diacor_error_required');
  }
  return errors;
}

export default reduxForm({
  form: 'newClient',
  fields: ['first_name', 'last_name', 'address', 'postcode', 'city', 'phone'],
  validate
}, null, actions)(NewClientForm);

//export default NewClientForm;
