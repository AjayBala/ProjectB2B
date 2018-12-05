import React, { Component } from 'react';
import {
    ControlLabel, FormGroup, Button,
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import './Signup.scss';
import Recaptcha from 'react-recaptcha';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as SignUpAction from '../../actions/SignUpAction';
import floatingLabelField from '../FloatingLabel/FloatingLabel';
import { validateEmail, validatePassword, getEmailDomain } from '../../common/Utils';
import { GOVT_EMAIL_EXTENSION, PSWD_MIN_CHAR, PSWD_CAPS_CHAR, PSWD_SPECIAL_CHAR, PSWD_NUMBER, SELECT_APPLICABLE_BUSINESS, HAVE_GOV_ID_MESG, SIGN_UP } from '../../common/Constants';

export const validate = values => {
    const error = {};
    let length = document.getElementById('length');
    let capital = document.getElementById('capital');
    let special = document.getElementById('special');
    let number = document.getElementById('number');
    if (!length) {
        values.password = '';
    }

    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }

    const errorObj = validatePassword(values, length, capital, special, number);
    if (errorObj.error) {
        error.password = errorObj.error;
        length = errorObj.length;
        capital = errorObj.capital;
        special = errorObj.special;
        number = errorObj.number;
    }

   return error;
};

export class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            recaptchaVerified: false,
            hasGovEmail: false,
            isGovEmail: false,
            serverErrorCheck: false,
            passwordHasVerified: false,
            passwordRequired: false,
        };
    }

    componentWillMount = () => {
        this.setState({
            serverErrorCheck: true,
        });
    }

    recaptchaVerifyCallback = () => {
        this.setState({
            recaptchaVerified: true,
        });
    }

    checkHasGovEmail = value => {
        const { emailId, change } = this.props;
        let isGovEmail = false;
        if (value.target.checked) {
            const getDomain = getEmailDomain(emailId);
            if (!GOVT_EMAIL_EXTENSION.includes(getDomain)) {
                change('emailId', '');
                isGovEmail = true;
            }
        } else if (!value.target.checked) {
            isGovEmail = false;
        }
        this.setState({
            hasGovEmail: isGovEmail,
            isGovEmail: value.target.checked,
            serverErrorCheck: true
        });
    };

    isEmailHasGovermentEmail = e => {
        const { change, checkboxState, emailId } = this.props;
        const getDomain = getEmailDomain(emailId);

        if (getDomain && !GOVT_EMAIL_EXTENSION.includes(getDomain) && checkboxState) {
            change('emailId', '');
            e.preventDefault();
            this.setState({
                hasGovEmail: true,
                serverErrorCheck: true
            });
        }
    }

    clearRemoteError = () => {
        const { serverErrorCheck } = this.state;
        if (!serverErrorCheck) {
            this.setState({
                serverErrorCheck: true
            });
        }
    }

    onBlurShow = event => {
        if (!event.target.defaultValue) {
            this.setState({ passwordRequired: true });
        } else {
            this.setState({ passwordRequired: false });
        }
    }

    recaptchaIsShow = event => {
        const onCurValue = event.target.value;
        const upperCaseLetters = /[A-Z]/g;
        const atleastOneNumber = /[0-9]/g;
        const specialSmallLetters = /[!@#$%^&*)(+=._-]/g;
        if (!onCurValue) {
            this.setState({ passwordRequired: true });
        } else {
            this.setState({ passwordRequired: false });
        }
        if (onCurValue.match(upperCaseLetters) && onCurValue.match(atleastOneNumber) && onCurValue.match(specialSmallLetters) && onCurValue.length > 7) {
            this.setState({
                passwordHasVerified: true,
            });
        } else {
            this.setState({
                passwordHasVerified: false,
            });
        }
    }

    recaptchaOnLoadCallback = () => '';

    render() {
        const { handleSubmit, SignUpError } = this.props;
        const { recaptchaVerified, hasGovEmail, isGovEmail, serverErrorCheck, passwordHasVerified, passwordRequired } = this.state;
        const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');

        const signupFormOnSubmit = values => {
            const submitValue = {};
            submitValue.signupStage = 1;
            submitValue.isSignupDone = false;
            submitValue.emailId = values.emailId;
            submitValue.password = values.password;
            const { actions } = this.props;
            actions.signUpRequest(submitValue);
            this.setState({
                serverErrorCheck: false,
            });
        };

        return (

            <div className="formWrap signupFormWrap">
                <form onSubmit={handleSubmit(signupFormOnSubmit)}>
                    <Field
                        name="emailId"
                        type="text"
                        component={floatingLabelField}
                        onBlur={this.isEmailHasGovermentEmail}
                        onChange={this.clearRemoteError}
                        serverError={(SignUpError) && (!serverErrorCheck) ? SignUpError : null}
                        label={hasGovEmail
                            ? 'Enter government email ID' : 'Email'}
                        id="emailId"
                        />
                    <div className={passwordRequired ? '' : 'hideError'}>
                        <Field
                            name="password"
                            type="password"
                            component={floatingLabelField}
                            label="Create Password"
                            id="pswd"
                            onChange={this.recaptchaIsShow}
                            onBlur={this.onBlurShow}
                            onFocus={() => {
                                passwordCriteriaBox.style.display = 'block';
                            }}/>
                    </div>
                    <div id="passwordCriteriaBox">
                        <p id="length">
                            {PSWD_MIN_CHAR}
                        </p>
                        <p id="capital">
                            {PSWD_CAPS_CHAR}
                        </p>
                        <p id="special">
                            {PSWD_SPECIAL_CHAR}
                        </p>
                        <p id="number">
                            {PSWD_NUMBER}
                        </p>
                    </div>
                    <FormGroup className="formRowWrap">
                        <ControlLabel className="label-styles">
                            {SELECT_APPLICABLE_BUSINESS}
                        </ControlLabel>
                        <p className="govEmailTxtWrap">
                            <Field
                                name="checkbox"
                                type="checkbox"
                                id="checkHasGovEmail"
                                checked={isGovEmail}
                                component="input"
                                className="checkbox-overrides"
                                onChange={this.checkHasGovEmail} />
                            <ControlLabel className="checkbox-labelStyle" htmlFor="checkHasGovEmail">
                                {HAVE_GOV_ID_MESG}
                            </ControlLabel>
                        </p>
                    </FormGroup>
                    {passwordHasVerified
                        && (
                        <FormGroup className="formRowWrap recaptchaWrap">
                            <Recaptcha
                                className="rca-styles"
                                sitekey="6LfKaWoUAAAAAJDt-nKlTsZ92TkprXJ2xqgZ-YND"
                                render="explicit"
                                verifyCallback={this.recaptchaVerifyCallback}
                                onloadCallback={this.recaptchaOnLoadCallback}
                            />
                        </FormGroup>
                        )
                    }
                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            className="btnBlueStyle createAccBtn"
                            disabled={(!serverErrorCheck) || (!recaptchaVerified)}>
                            {SIGN_UP}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

SignupForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    emailId: PropTypes.string,
    checkboxState: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    SignUpError: PropTypes.string,
};


const SignupReduxForm = reduxForm({
    form: 'SignupForm',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SignupForm);

const selector = formValueSelector('SignupForm');

const mapStateToProps = state => ({
    emailId: selector(state, 'emailId'),
    password: selector(state, 'password'),
    checkboxState: selector(state, 'checkbox'),
    SignUpError: state.signUp.error ? state.signUp.error : '',
    SignUpUser: state.signUp.signUpDetails ? state.signUp.signUpDetails : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignUpAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupReduxForm);
