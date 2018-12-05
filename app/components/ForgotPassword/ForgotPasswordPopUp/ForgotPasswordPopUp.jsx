import React, { Fragment, Component } from 'react';
import ForgotPopUp from '../../Model/SuccessPopup';
import ResetNewPassword from './ResetNewPassword';
import SignIn from '../../Signin/Signin';

const bgStyle = {
    width: '100%',
    float: 'left',
};

class ForgotPasswordPopUp extends Component {
    constructor() {
        super();
        this.state = ({ isModalAppear: true });
    }

    render() {
        const { isModalAppear } = this.state;
        const { pathname } = location;

        return (
            <Fragment>
                <img alt="home background" style={bgStyle} id="bgImg"/>
                <div>
                    {isModalAppear && (
                        <ForgotPopUp
                            show={isModalAppear}
                            resetpassword={1}
                            bodycontent={pathname && pathname === '/signin-two-way-auth' ? <SignIn /> : <ResetNewPassword/>} />
                    )}
                </div>
            </Fragment>
        );
    }
}

export default ForgotPasswordPopUp;
