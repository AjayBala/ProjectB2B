import React from 'react';
import {
    ControlLabel, Button,
} from 'react-bootstrap';
import history from '../../../history';
import '../ForgotPassword.scss';

const ForgotPasswordReverify = () => (
    <div className="forgotPswdBox sendLinkWrap">
        <ControlLabel
            className="forgotPswdReverify_labelTxt">
                Go check your email. If we find an account associated with this email we send a password reset link.
        </ControlLabel>
        <div className="form-group formRowWrap">
            <Button
                type="button"
                className="btnBlueStyle createAccBtn"
                onClick={() => history.push('./email-template')}>
                    Send Another Reset Link
            </Button>
        </div>
    </div>
);

export default ForgotPasswordReverify;
