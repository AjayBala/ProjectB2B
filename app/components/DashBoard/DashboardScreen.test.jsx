import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DashboardScreen from './DashboardScreen';

describe('<DashboardScreen/>', () => {
    const wrapper = shallow(<DashboardScreen/>);
    it('should have an DashboardScreen', () => {
        expect(wrapper).to.exist;
    });
    it('clicking menuClickHandler Events', () => {
        wrapper.setState({ isOpen: true });
        wrapper.instance().menuClickHandler();
    });
});
