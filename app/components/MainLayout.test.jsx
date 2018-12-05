import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MainLayout from './MainLayout';

describe('Test suits for <MainLayout />', () => {
    const shallowWrapper = shallow(<MainLayout />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });
});
