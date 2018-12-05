import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import history from '../../history';
import ModalPopup from '../Model/Model';
import {
    HELP_URL,
    ORGANIZATION_INFO, MAIL_INFO,
} from '../../common/Constants';
import './BtoCMigrationFrom.scss';
import floatingLabelField from '../FloatingLabel/FloatingLabel';
import { validateEmail } from '../../common/Utils';

export const validate = values => {
    const error = {};

    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }

    if (!values.password) {
        error.password = 'Required';
    }

return error;
};

export class BtoCMigration extends Component {
    constructor() {
        super();
        this.state = ({ checked: false });
    }

  closeModel = () => {
      this.setState({
          open: false,
      });
  }

  handleChange = () => {
      const { checked } = this.state;
      this.setState({
          checked: !checked,
      });
  }

    render() {
        const { handleSubmit } = this.props;
        const { checked, open } = this.state;
        const handleSubmitForm = () => {
            this.setState({ open: true });
        };

        const ExistAccBtn = checked
            ? (
                <button
                    type="submit"
                    className="btnSignIn crteBtn"
                    onClick={this.handleSignIn}>
                Use Existing Account
                </button>
            )
            : (
                <button
                    type="submit"
                    className="btnSignIn crteBtn"
                    disabled>
                    Use Existing Account
                </button>
            );
        const CreateAccBtn = checked
            ? (
                <a
                    className="btnSignIn crteBtn"
                    onClick={() => history.push('/signup')}>
                    Create Separate Account
                </a>
            )
            : (
                <a className="btnSignIn crteBtn disabled">
                Create Separate Account
                </a>
            );

        return (
            <div className="">
                <h1 className="title_h1">
                Sign up with existing Overstock.com account
                </h1>
                <div className="loginBoxWrap">
                    <div className="loginBox">
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <Field
                                name="emailId"
                                component={floatingLabelField}
                                label="Email"
                                placeholder="Email" />
                            <Field
                                name="password"
                                type="password"
                                component={floatingLabelField}
                                label="Password"
                                placeholder="Password" />
                            <div className="form-group">
                                <p
                                    className="termsTxt checkopt"
                                    htmlFor="term-condition" >
                                    <input
                                        type="checkbox"
                                        id="term-condition"
                                        name="term-condition"
                                        checked={checked}
                                        onChange={this.handleChange} />
                                        I agree to user
                                    <a
                                        rel="noopener noreferrer"
                                        href={HELP_URL}
                                        target="_blank">
                                        Terms & Conditions
                                    </a>
                                </p>
                            </div>
                            <div className="form-group">
                                <h4 className="title_h4">Account Options</h4>
                                { ExistAccBtn }
                                <ModalPopup
                                    show={open}
                                    onHide={this.closeModel} />
                                <div className="recommendPadd">
                                    <h4 className="title_h5">
                                    Recommended if you
                                    </h4>
                                    <ul className="ListWrap">
                                        <li>
                                        Already use your Overstock account
                                         exclusively for business
                                        </li>
                                        <li>{ORGANIZATION_INFO}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="form-group">
                                { CreateAccBtn }
                                <div className="recommendPadd">
                                    <h4 className="title_h5">
                                    Recommended if you
                                    </h4>
                                    <ul className="ListWrap">
                                        <li>
                                        want to keep your businees and personal
                                         Overstock Activity Separate
                                        </li>
                                        <li>{MAIL_INFO}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="forgotTxt">
                                    Already a member of Overstock Professional?
                                    <a onClick={() => history.push('/')}>
                                    Sign In
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

BtoCMigration.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

const BtoCMigrationFrom = reduxForm({
    form: 'Exitaccount',
    validate,
})(BtoCMigration);

export default BtoCMigrationFrom;
