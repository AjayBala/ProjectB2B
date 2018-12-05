import React, { Component } from 'react';
import './ForgotPassword.scss';
import PasswordResetLinkSend from './PasswordResetLinkSend/PasswordResetLinkSend';
import ForgotPasswordReverify from './ForgotPasswordReverify/ForgotPasswordReverify';
import history from '../../history';

const steps = [{ id: 0 }, { id: 1 }];
class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = ({ currentStep: steps[0] });
    }

  nextPage = () => {
      const { currentStep } = this.state;
      this.setState({ currentStep: steps[currentStep.id + 1] });
  }

  previousPage = () => {
      const { currentStep } = this.state;
      this.setState({ currentStep: steps[currentStep.id - 1] });
  }

  onSubmit = () => {
      history.push('./home');
  }

  closeModel = () => {
      history.push('./home');
  }

  render() {
      const { currentStep } = this.state;

return (
    <div>
        {currentStep.id === 0
            && (
                <PasswordResetLinkSend
                    onSubmit={this.nextPage}/>
            )}
        {currentStep.id === 1
            && (
                <ForgotPasswordReverify
                    previousPage={this.previousPage}
                    onSubmit={this.onSubmit} />
            )}
    </div>

      );
  }
}

export default ForgotPassword;
