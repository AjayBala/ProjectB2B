import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import history from '../../../history';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { validatePassword } from '../../../common/Utils';
import './ResetNewPassword.scss';

export const validate = values => {
    const error = {};

    let length = document.getElementById('length');
    let capital = document.getElementById('capital');
    let special = document.getElementById('special');
    let number = document.getElementById('number');

    const errorObj = validatePassword(values, length, capital, special, number);
    if (errorObj.error) {
        error.password = errorObj.error;
        length = errorObj.length;
        capital = errorObj.capital;
        special = errorObj.special;
        number = errorObj.number;
    }

    if (!values.confirmPassword) {
        error.confirmPassword = 'Required';
    }

    if (values.password !== values.confirmPassword) {
        error.confirmPassword = 'Please provide matching password';
    }

return error;
};

class ResetNewPassword extends Component {
    render() {
        const { handleSubmit } = this.props;
        const handleSubmitForm = () => {
            history.push('./signin-two-way-auth');
        };
        const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');

return (
    <div className="resetPasswordWrap signupFormWrap">
        <h1 className="title_h1 forgotTitle">
                Create a new password
        </h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Field
                name="password"
                type="password"
                component={floatingLabelField}
                label="Create New Password"
                onFocus={() => {
                    passwordCriteriaBox.style.display = 'block';
                        }}/>
            <div id="passwordCriteriaBox">
                <p id="length">
                    ✔ 8 characters minimum
                </p>
                <p id="capital">
                    ✔ At least 1 capital letter
                </p>
                <p id="special">
                    ✔ At least 1 special character (!,*,$,@)
                </p>
                <p id="number">
                    ✔ At least 1 numeric character
                </p>
            </div>
            <Field
                className="confirmPwdBox"
                name="confirmPassword"
                type="password"
                component={floatingLabelField}
                label="Confirm Password"
                    />
            <div className="form-group formRowWrap">
                <Button
                    type="submit"
                    className="btnBlueStyle createAccBtn">
                        Set New Password
                </Button>
            </div>
        </form>
    </div>
            );
        }
    }

ResetNewPassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'forgotPassword',
    validate,
})(ResetNewPassword);
