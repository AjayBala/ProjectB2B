import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DashboardSideMenu from './DashboardSideMenu';

describe('<DashboardSideMenu/>', () => {
    const wrapper = shallow(<DashboardSideMenu/>);
    it('should have an DashboardSideMenu', () => {
        expect(wrapper).to.exist;
    });
});
