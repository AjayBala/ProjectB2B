import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as SignInAction from '../../../actions/SigninAction';
import './SigninForm.scss';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { validateEmail } from '../../../common/Utils';
import { SIGN_IN, EMAIL_PATTERN } from '../../../common/Constants';

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

/* eslint-disable react/prop-types */
export const checkBoxField = ({
    placeholder, label, type, input,
}) => (
    <p>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="checkBoxStyle" />
        {label}
    </p>);

export class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            serverErrorCheck: false,
        };
    }

    componentWillMount() {
        this.setState({ serverErrorCheck: true });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false);
    }

    handleChange = event => {
        const { emailId, password } = this.props;
        if (event.target.checked) {
            Cookies.set('LoginUser', { emailId, password });
        } else {
            Cookies.remove('LoginUser');
        }
    };

    errorCheckChange = () => {
        const signInEmailID = document.getElementById('signInEmailID');
        const emailPattern = EMAIL_PATTERN;
        const emailError = emailPattern.test(signInEmailID.value);
        if (emailError === true) {
            this.setState({ serverErrorCheck: false });
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

    escFunction(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    }

    render() {
        const { handleSubmit, SignInError, b2cSignInServerError } = this.props;
        const { pathname } = location;
        const { serverErrorCheck } = this.state;

    return (
        <div className="formWrap">
            <form onSubmit={handleSubmit} className="">
                <Field
                    name="emailId"
                    fieldID="signInEmailID"
                    component={floatingLabelField}
                    onChange={this.clearRemoteError}
                    serverError={b2cSignInServerError ? b2cSignInServerError : null}
                    label="Email"
                    placeholder="Email"
                    />
                <Field
                    name="password"
                    type="password"
                    component={floatingLabelField}
                    label="Password"
                    placeholder="Password"
                    />

                {/*  <div className="form-group secureVerifyTxt" id={CookiesVerify ? 'CookiesVerifyed' : null}>
                    <p>
                        Secure your Oprofessional
                        account with two-step authentication
                    </p>
                    <div className="checkbox-authVerify checkbox"> */}
                {/* <Field
                            name="isCookiesVerifyed"
                            type="checkbox"
                            component={checkBoxField}
                            checked={CookiesVerify ? 'true' : 'false'}
                            label="authentication"/> */}
                {/* <Field
                            name="isAuthenticationRequired"
                            type="checkbox"
                            component={checkBoxField}
                            label=" Verify my account
                                    with two-step authentication"/>
                    </div>
                </div> */}
                <div className="form-group formRowWrap signinMarginTop">
                    <Button
                        type="submit"
                        className="btnBlueStyle createAccBtn"
                        onClick={this.errorCheckChange}
                        >
                        {SIGN_IN}
                    </Button>
                </div>
            </form>
        </div>
    );
    }
}

SignInForm.propTypes = {
    SignInError: PropTypes.string,
};


export const SignInReduxForm = reduxForm({
    form: 'signIn',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInForm);

const CookieUser = Cookies.get('LoginUser')
    ? JSON.parse(Cookies.get('LoginUser')) : {};
const mapStateToProps = state => ({
    stateValue: state,
    enableReinitialize: true,
    initialValues: {
        emailId: CookieUser.emailId || '',
        password: CookieUser.password || '',
    },
    signInUser: state.signIn.SignInUser ? state.signIn.SignInUser : '',
    SignInError: state.signIn.error ? state.signIn.error : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignInAction), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignInReduxForm);
