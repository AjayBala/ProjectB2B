import React, { Component } from 'react';
import axios from 'axios';
import './Signin.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SigninForm/SigninForm';
import * as SignInAction from '../../actions/SigninAction';
import SignInOtpPhoneNumber from './SigninOtpPhoneNumber/SigninOtpPhoneNumber';
import SignInOtpVerification from './SigninOtpVerification/SigninOtpVerification';
import history from '../../history';

const steps = [{ id: 0 }, { id: 1 }, { id: 2 }];
export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentStep: steps[0],
            signInUserEmailId: '',
            b2cSignInPwd: '',
            b2cSignInServerError: '',
        });
    }

  nextPage = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: steps[currentStep.id + 1] });
  }

  previousPage = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: steps[currentStep.id - 1] });
  }

SignInRequestActionSend = values => {
    const { actions } = this.props;
    actions.signInRequest(values);
    this.setState({ b2cSignInPwd: values.password });
    // const b2curl = 'https://www.overstock.com/myaccount?cst_email=';
    // const b2curlpassword = '&cst_password=';
    // const b2curlloginparams = '&bvkey_myacckey=myacckey&myacckey=order_info&processlogin=true&loggingin=true&submit=true';
    // const configURL = `${b2curl}${values.emailId}${b2curlpassword}${values.password}${b2curlloginparams}`;
    // axios.post(configURL, {
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json'
    //         }
    // })
    // .then(response => {
    //     const respString = response.data;

    //     if (respString.includes('class="message danger"')) {
    //         const exitpoint = respString.indexOf('message danger');
    //         const starIndex = exitpoint + 16;
    //         const searchIndex = starIndex + respString.substring(starIndex).indexOf('<');
    //         if (starIndex < searchIndex - 1) {
    //             const errMsg = respString.substring(starIndex, searchIndex).trim();
    //             this.setState({ b2cSignInServerError: errMsg });
    //         } else {
    //             // window.location.href = configURL;
    //             actions.signInRequest(values);
    //         }
    //     } else {
    //         actions.signInRequest(values);
    //     }
    // })
    // .catch(function(error) {});
    // this.setState({ b2cSignInPwd: values.password });
}

componentWillReceiveProps = values => {
    const { b2cSignInPwd } = this.state;
    const { signInUser } = values;
    const { id } = signInUser;
    if (id) {
        history.push('./dashboard/accountabs');
        // const b2curl = 'https://www.overstock.com/myaccount?cst_email=';
        // const b2curlpassword = '&cst_password=';
        // const b2curlloginparams = '&bvkey_myacckey=myacckey&myacckey=order_info&processlogin=true&loggingin=true&submit=true';
        // const configUrl = `${b2curl}${signInUser.emailId}${b2curlpassword}${b2cSignInPwd}${b2curlloginparams}`;
        // axios.post(configUrl, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json'
        //      }
        // })
        // .then(response => {
        //     console.log(response);
        //     window.location.href = configUrl;
        //     window.location.href = 'https://www.overstock.com/Office-Supplies/22/store.html';
        // });
    }
}

AuthenticationRequired = values => {
    // const { isAuthenticationRequired } = values;
    // this.setState({ formSubmitSuccess: isAuthenticationRequired });
    this.SignInRequestActionSend(values);
}

  render() {
    const { currentStep, signInUserEmailId, b2cSignInServerError } = this.state;
    let routingTo = '';
    const { location } = this.props;
    if (location && location.query && location.query.routingTo) {
        routingTo = location.query.routingTo;
        location.query.routingTo = undefined;
    }

return (
    <div>
        {routingTo === 'redirectingToTwoStepAuth'
            ? [this.nextPage()]
            : null
        }
        {currentStep.id === 0
    && (
        <SignInForm
            onSubmit={this.AuthenticationRequired}
            b2cSignInServerError={b2cSignInServerError}
        />
    )}
        {currentStep.id === 1
    && (
        <SignInOtpPhoneNumber
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            inputVal={signInUserEmailId}
        />
    )}
        {currentStep.id === 2
    && (
        <SignInOtpVerification
            previousPage={this.previousPage}
            onSubmit={this.nextPage} />
    )}
    </div>
    );
  }
}

SignIn.propTypes = {
    location: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
    // signInUser: PropTypes.string,
};

const mapStateToProps = state => ({
    signInUser: state.signIn.SignInUser ? state.signIn.SignInUser : ''
    // SignInError: state.signIn.error ? state.signIn.error : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignInAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
