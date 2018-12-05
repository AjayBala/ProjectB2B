import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DashboardSideMenuList from './DashboardSideMenuList';

describe('<DashboardSideMenuList/>', () => {
    const wrapper = shallow(<DashboardSideMenuList/>);
    it('should have an DashboardSideMenuList', () => {
        expect(wrapper).to.exist;
    });
    it('Redirect to accountabs page', () => {
        wrapper.find('a').at(0).simulate('click');
    });
    it('Redirect to accountabs page', () => {
        wrapper.find('a').at(1).simulate('click');
    });
});
