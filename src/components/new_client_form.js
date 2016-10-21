import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { findDOMNode } from 'react-dom';
import SvgIcon from './common/svg_definitions';
import text from './common/translate';

class NewClientForm extends Component {

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

  renderNormalButtons() {
    return (
      <div className="submit-buttons-centered">
        <a href="" onClick={(event) => this.props.resetState(event)}><button className="btn-white">Peruuta</button></a>
        <a href=""><button className="btn-red">Jatka</button></a>
      </div>
    );
  }

  phoneValidation(input) {
    return (input.length > 0 && /^\\s*\\+?(\\d[\\s\\-]*){6,}\\d\\s*$/.test(input));
  }


  render() {
    const { handleSubmit } = this.props;
    //console.log("newClientForm");
    return (
      <form className={this.props.popUp === true ? 'client-popup-form' : ''}
            onSubmit={(event) => handleSubmit(event)} >
        <h4>{text('diacor_popup_new_client_header_one')}</h4>
        <Field name="ssn" component={renderField} value="{this.props.hetu}" type="text" label={text('diacor_input_placeholder_ssn')} /><br />
        <div>
          <h4>{text('diacor_popup_new_client_header_two')}</h4>
          <table>
            <tbody>
              <tr>
                <td>
                  <Field autoFocus name="first_name" component={renderField} type="text" className="form-control" label={text('diacor_input_placeholder_name')} />
                </td>
                <td>
                  <Field name="last_name" component={renderField} type="text" className="form-control" label={text('diacor_input_placeholder_surname')} />
                </td>
              </tr>
              <tr>
                <td>
                  <Field name="address" component={renderField} type="text" className="form-control" label={text('diacor_input_placeholder_address')} />
                </td>
                <td>
                  <Field name="postcode" component={renderField} type="text" className="form-control" label={text('diacor_input_placeholder_postalcode')} />
                </td>
              </tr>
              <tr>
                <td>
                  <Field name="city" component={renderField} type="text" className="form-control" label={text('diacor_input_placeholder_city')} />
                </td>
                <td>
                  <Field name="phone" component={renderField} type="text" className="form-control" label={text('diacor_input_placeholder_phone')} />
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


const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <span>
      <input {...input} placeholder={label} type={type} className={touched && (error && "form-error")}/>
      {touched && (error && <span>{error}</span>)}
    </span>
  )
}

const validate = (values) => {
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
  validate
}, null, actions)(NewClientForm);
