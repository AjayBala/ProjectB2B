import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Activity from './Activity';


describe('<Activity/>', () => {
    it('should render the component items properly', () => {
        const component = shallow(<Activity />);
        expect(component.contains('Activity')).to.exist;
    });
});
