import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LandingPageNotification from './LandingPageNotification';

describe('<LandingPageNotification/>', () => {
    const shallowWrapper = shallow(<LandingPageNotification />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });
});
