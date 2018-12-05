import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Overview from './Overview';

describe('Overview', () => {
    const element = <Overview />;
    const component = shallow(element);
    it('renders as expected', () => {
        expect(component).to.exist;
    });

    it('trigger overviewSignupClick method', () => {
        component.instance().overviewSignupClick();
    });
});
