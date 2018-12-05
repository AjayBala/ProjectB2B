import React, { Component } from 'react';
import {
    ControlLabel, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { info } from 'react-icons-kit/feather/info';
import { check } from 'react-icons-kit/entypo/check';
import './FloatingLabel.scss';
import { EMAIL_PATTERN } from '../../common/Constants';

export class FloatingLabelField extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: false,
            emailValidate: false,
        };
    }

    floatingLabelAnimate = e => {
        if (e.target.value) {
            this.setState({ inputValue: true });
        } else {
            this.setState({ inputValue: false });
        }
        const emailPattern = EMAIL_PATTERN;
        const validEmail = emailPattern.test(e.target.value);
        if (validEmail) {
            this.setState({ emailValidate: true });
        } else {
            this.setState({ emailValidate: false });
        }
    }


    render() {
        const { input, label, fieldID, serverError, type, disabled, isInfo, infoText, showEyeIcon, meta: { touched, error }, placeholder, isAutofocus } = this.props;
        const { inputValue, emailValidate } = this.state;

        return (
            <div id={type === 'hidden' ? 'hideTextBox' : null} className={inputValue || (input.value !== '') ? 'form-group labelActive' : 'form-group'}>
                <div
                    id={emailValidate ? 'successBorder' : null}
                    className={(touched
            && error) || serverError ? 'floatLabelWrap errorBorder' : 'floatLabelWrap'}>
                    <input
                        {...input}
                        autoComplete="off"
                        type={type}
                        onKeyPress={type === 'number' ? this.onlyNumbersAllowFunction : null}
                        onKeyUp={this.floatingLabelAnimate}
                        disabled={disabled}
                        id={fieldID}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus={isAutofocus}
                        className="inputTxtStyle"
                    />
                    {showEyeIcon}
                    <ControlLabel className="labelTxt">{label}</ControlLabel>
                    {emailValidate && (
                        <span className="iconRight">
                            <Icon size={20} icon={check} />
                        </span>
                    )}
                    <span className="iconWarning">
                        <i className="fa fa-exclamation-triangle" aria-hidden="true" />
                    </span>
                    {
                        (touched && error) || serverError
                        ? <span className="error_text">{ serverError ? serverError : error}</span>
                        : null
                    }
                    <span className="iconInfo">
                        {isInfo && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={(
                                    <Tooltip id="tooltip">
                                        <strong>{infoText}</strong>
                                    </Tooltip>
                                )}>
                                <Icon size={20} style={{ color: '#E9C46A' }} icon={info} />
                            </OverlayTrigger>
                            )}
                    </span>
                </div>
            </div>
        );
    }
}

export default FloatingLabelField;
