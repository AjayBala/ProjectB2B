import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ForgotPasswordReverify from './ForgotPasswordReverify';

configure({ adapter: new Adapter() });

describe('ForgotPasswordEmailTemplate', () => {
    it('should render the component items properly', () => {
        const component = shallow(<ForgotPasswordReverify />);
        expect(component.contains('Go check your email. If we find an account associated with this email we send a password reset link')).to.exist;
    });

    it('should simulate the onclick function properly for history.push', () => {
        const wrapper = shallow(<ForgotPasswordReverify />);
        wrapper.find('Button').at(0).simulate('click');
    });
});
