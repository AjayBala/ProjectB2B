
import React, { Component } from 'react';
import './SigninOtpVerification.scss';
import {
    Row, Col, Button,
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Field, reduxForm, formValueSelector,
} from 'redux-form';
import axios from 'axios';
import history from '../../../history';
import { normalizeZip } from '../../../common/Utils';

export const phoneChangeKeyUp = (length, event) => {
    const elemtName = event.target.name;
    const value = event.target.value.toString();
    const valueLength = value.length;

    if (valueLength >= length) {
        if (elemtName === 'comPhoneText1') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText3')[0].focus();
        } else if (elemtName === 'comPhoneText3') {
            document.getElementsByName('comPhoneText4')[0].focus();
        } else if (elemtName === 'comPhoneText4') {
            document.getElementsByName('comPhoneText5')[0].focus();
        } else if (elemtName === 'comPhoneText5') {
            document.getElementsByName('comPhoneText6')[0].focus();
        }
    }
};

export const phoneChangeKeyDown = (length, event) => {
    const elemtName = event.target.name;
    const value = event.target.value.toString();
    const valueLength = value.length;

    if (event.keyCode === 8) {
        if (valueLength === 0) {
            if (elemtName === 'comPhoneText6') {
                document.getElementsByName('comPhoneText5')[0].focus();
            } else if (elemtName === 'comPhoneText5') {
                document.getElementsByName('comPhoneText4')[0].focus();
            } else if (elemtName === 'comPhoneText4') {
                document.getElementsByName('comPhoneText3')[0].focus();
            } else if (elemtName === 'comPhoneText3') {
                document.getElementsByName('comPhoneText2')[0].focus();
            } else if (elemtName === 'comPhoneText2') {
                document.getElementsByName('comPhoneText1')[0].focus();
            }
        }
    }
};

export const customPhoneField = ({
    maxLength, placeholder, input, type, meta: { touched, error },
}) => (
    <div className="form-group customPhoneField">
        <input
            {...input}
            maxLength={maxLength}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText new"
            onKeyUp={phoneChangeKeyUp.bind(this, maxLength)}
            onKeyDown={phoneChangeKeyDown.bind(this, maxLength)} />
        {touched && ((error && (<span className="error_text">{error}</span>)))}
    </div>
);

/* eslint-disable react/prop-types */
export const checkBoxField = ({
    placeholder, label, checkOrNot, type, input,
}) => (
    <p>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            checked={checkOrNot}
            className="checkBoxStyle" />
        {label}
    </p>);

export class SignInOtpVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpNumber: '',
            rememberMeCheck: true,
            otpErrorText: '',
        };
    }

    componentWillMount() {
        const { change } = this.props;
        change('rememberMeCheck', 'true');
        this.setState({ otpErrorText: '' });
    }

    componentDidMount() {
        axios.get('../../../../data.json')
        .then(res => {
            const otpNumber = res.data && res.data.otpNumber;
            this.setState({ otpNumber });
        });
    }

    handleChange = event => {
        const { emailId, password } = this.props;
        if (event.target.checked) {
            Cookies.set('LoginUser', { email: emailId, password });
            this.setState({ rememberMeCheck: true });
        } else {
            Cookies.remove('LoginUser');
            this.setState({ rememberMeCheck: false });
        }
    };

    render() {
        const { handleSubmit, phone } = this.props;
        const { rememberMeCheck, otpErrorText } = this.state;

        const handleSubmitForm = values => {
            const { otpNumber } = this.state;
            const otp = parseInt(`${values.comPhoneText1}${values.comPhoneText2}${values.comPhoneText3}${values.comPhoneText4}${values.comPhoneText5}${values.comPhoneText6}`, 10);
            const otpSting = otp.toString();
            const myotpNumber = otpNumber;
            if (otpSting.length < 6) {
                this.setState({ otpErrorText: 'Required' });
            } else if (otpSting === myotpNumber) {
                    if (values.rememberMeCheck) {
                        const { emailId, password } = this.props;
                        Cookies.set('LoginUser', { email: emailId, password });
                    }
                    history.push('./professionalHome');
                } else {
                    this.setState({ otpErrorText: 'Incorrect confirmation code,please try again.' });
                }
        };

        return (
            <div className="formWrap secureVerifyTxt">
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Row>
                        <Col sm={12} lg={12}>
                            <h3 className="twoStepTitle">Two-Step Authentication</h3>
                            <p>
                                Enter the confirmation code
                               that was sent to your phone at
                                {phone}
                            </p>
                        </Col >
                        <Col className="rememberDevice" sm={12} lg={12}>
                            <Field
                                name="rememberMeCheck"
                                type="checkbox"
                                component={checkBoxField}
                                checkOrNot={rememberMeCheck}
                                onChange={this.handleChange}
                                label="Remember this device (not recommended for public or shared devices)."/>
                        </Col >
                    </Row>
                    <Row>
                        <Col md={12} >
                            <ul className="phonenumberBox">
                                <li>
                                    <Field
                                        name="comPhoneText1"
                                        type="text"
                                        normalize={normalizeZip}
                                        style={{ width: '80px' }}
                                        maxLength="1"
                                        component={customPhoneField}/>
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText2"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField}/>
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText3"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText4"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText5"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText6"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <span className="error_text">{otpErrorText}</span>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="otpFirst" sm={12} lg={12}>

                            <div className="form-group formRowWrap">
                                <Button
                                    type="submit"
                                    className="btnBlueStyle createAccBtn">
                                        Confirm
                                </Button>
                            </div>
                        </Col >
                        <Col sm={12} lg={12} className="requestNewCode">
                            If you did not receive a code, wait a few minutes and request a new one.
                        </Col >
                        <Col className="requestCode" sm={12} lg={12}>
                                  Request new code
                        </Col >
                    </Row>
                </form>
            </div>

        );
    }
}

SignInOtpVerification.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    emailId: PropTypes.string,
    password: PropTypes.string,
    phone: PropTypes.string,
};

export const SignInOtpVerificationForm = reduxForm({
    form: 'signInOtp',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInOtpVerification);

const selector = formValueSelector('signInOtp');
const mapStateToProps = state => ({
    emailId: selector(state, 'emailId'),
    phone: selector(state, 'phone'),
});

export default connect(mapStateToProps)(SignInOtpVerificationForm);
