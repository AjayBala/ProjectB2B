import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';

describe('Test suits for <HomePage />', () => {
    const shallowWrapper = shallow(<ForgotPasswordPopUp />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });
});
