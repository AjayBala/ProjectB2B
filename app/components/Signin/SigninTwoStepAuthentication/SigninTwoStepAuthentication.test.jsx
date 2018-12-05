import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignInTwoStepAuthentication from './SigninTwoStepAuthentication';

describe('Test suits for <SignInTwoStepAuthentication />', () => {
    const shallowWrapper = shallow(<SignInTwoStepAuthentication />);
    const location = { pathname: '/signin-two-step-authentication' };

    it('Check if the wrapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });
    it('should render the component items properly , to check twostep_auth_wrap is available', () => {
        const wrapper = shallow(<SignInTwoStepAuthentication location={location}/>);
        expect(wrapper.find('.twostep_auth_wrap')).to.exist;
    });
});
