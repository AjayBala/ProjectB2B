import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import SwitchComponent from './Switch';


describe('<SwitchComponent/>', () => {
    const shallowWrapper = shallow(<SwitchComponent />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });
    it('should fire onChange method when search text got changed', () => {
        const searchText = shallowWrapper.find('#Switch').at(0);
        shallowWrapper.onChange = sinon.spy();
        const onchange = shallowWrapper.onChange;
        searchText.at(0).simulate('change');
        expect(onchange).to.be.called;
    });
});
