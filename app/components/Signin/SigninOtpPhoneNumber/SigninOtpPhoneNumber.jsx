import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SigninOtpPhoneNumber.scss';
import {
    Row, Col, ControlLabel, Button,
} from 'react-bootstrap';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';

export const validate = values => {
    const errors = {};

    if (!values.phone) {
        errors.phone = 'Required';
    } else if (values.phone.length < 12) {
        errors.phone = 'Minimum 10 digits mobile number';
    } else if (values.phone.length > 14) {
        errors.phone = 'Maximum 12 digits mobile number';
    }

    return errors;
};

export const normalizePhone = value => {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }

    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

export class SignInOtpPhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendCode: 'phone',
            sendPhoneCode: 'textMessage',
        };
    }

    onhandleClick = (type, phoneCode) => {
        this.setState({
            sendCode: type,
            sendPhoneCode: phoneCode,
        });
    }

    render() {
        const { handleSubmit, emailId, inputVal } = this.props;
        const { sendCode, sendPhoneCode } = this.state;

return (
    <div className="formWrap" >
        <form onSubmit={handleSubmit}>
            <div className="secureVerifyTxt">
                <Row>
                    <Col className="otpInfoRequest" sm={12} lg={12}>
                        <h3 className="twoStepTitle">Two-Step Authentication</h3>
                        <p>
To help us verify identity and protect your private information, a
                                confirmation code will be sent to your phone or email.
                        </p>
                    </Col >
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <h4 className="twoStepTitle_2">Send the code:</h4>
                    </Col>
                    <Col sm={12} lg={12}>
                        <div className="radio">
                            <ControlLabel>
                                <input
                                    type="radio"
                                    name="optradioParent"
                                    onChange={() => this.onhandleClick('phone', 'textMessage')}
                                    checked={sendCode === 'phone'}/>
                                       To my phone via text message or voice call
                                {/* <div className="sendcode"></div> */}
                                <div>
                                    <Field
                                        name={sendCode === 'phone' ? 'phone' : 'phonenumber'}
                                        component={floatingLabelField}
                                        normalize={normalizePhone}
                                        label="Send code to"
                                            />
                                </div>
                                <div>Send code via</div>
                                <div className="radio">
                                    <ControlLabel>
                                        <input
                                            type="radio"
                                            name="optradio"
                                            onChange={() => this.onhandleClick('phone', 'textMessage')}
                                            checked={(sendCode === 'phone' && sendPhoneCode === 'textMessage')}/>
                                            Text message (message and data rates may apply)
                                    </ControlLabel>
                                </div>
                                <div className="radio">
                                    <ControlLabel>
                                        <input
                                            type="radio"
                                            name="optradio"
                                            checked={sendCode === 'phone' && sendPhoneCode === 'voiceCall'}
                                            onChange={() => this.onhandleClick('phone', 'voiceCall')}
                                        />
                                            Voice call
                                    </ControlLabel>
                                </div>
                            </ControlLabel>
                        </div>
                        <div className="radio">
                            <ControlLabel>
                                <input
                                    type="radio"
                                    name="optradioParent"
                                    onChange={() => this.onhandleClick('emailId')}
                                    checked={sendCode === 'emailId'}/>
                                    To my email address at &nbsp;
                                {emailId}
                                {inputVal}
                            </ControlLabel>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col className="otpInfoRequest" sm={12} lg={12}>
                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            className="btnBlueStyle createAccBtn">
                                Send Confirmation Code
                        </Button>
                    </div>
                </Col >
            </Row>
        </form>
    </div>

    );
    }
}

SignInOtpPhoneNumber.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    emailId: PropTypes.string,
    inputVal: PropTypes.number,
};

const SignInOtpPhoneNumberForm = reduxForm({
    form: 'login',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SignInOtpPhoneNumber);

const selector = formValueSelector('login');
const mapStateToProps = state => ({
    emailId: selector(state, 'emailId'),
    password: selector(state, 'password'),
});

export default connect(mapStateToProps)(SignInOtpPhoneNumberForm);
