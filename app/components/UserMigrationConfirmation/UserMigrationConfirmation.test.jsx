import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UserMigrationConfirmation from './UserMigrationConfirmation';


describe('<UserMigrationConfirmation/>', () => {
    it('should render the component items properly in UserMigrationConfirmation', () => {
        const component = shallow(<UserMigrationConfirmation />);
        expect(component.contains('Do you already Shop on Overstock using your work email?')).to.exist;
    });
    it('should render the component formWrap properly', () => {
        const wrapper = shallow(<UserMigrationConfirmation />);
        expect(wrapper.find('.formWrap')).to.have.lengthOf(1);
    });
    it('should render the component NoButton properly', () => {
        const wrapper = shallow(<UserMigrationConfirmation />);
        expect(wrapper.find('.NoButton')).to.have.lengthOf(1);
    });
    it('should render the component YesButton properly', () => {
        const wrapper = shallow(<UserMigrationConfirmation />);
        expect(wrapper.find('.YesButton')).to.have.lengthOf(1);
    });
    it('should simulate the button 2 onclick function properly for history.push', () => {
        const wrapper = shallow(<UserMigrationConfirmation />);
        wrapper.find('Button').at(1).simulate('click');
    });
    it('should simulate the button 1 onclick function properly for history.push', () => {
        const wrapper = shallow(<UserMigrationConfirmation />);
        wrapper.find('Button').at(0).simulate('click');
    });
});
