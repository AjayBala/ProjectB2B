import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import FloatingLabel from './FloatingLabel';

describe('Test case  for <FloatingLabel />', () => {
    const meta = {
        touched: false,
        error: ''
    };
    const input = {
        value: 'test'
    };
    const wrapper = mount(<FloatingLabel input={input} meta={meta} type="hidden" />);

    it('should load the FloatingLabel component', () => {
        expect(wrapper).to.exist;
        expect(wrapper).to.have.length(1);
    });

    it('should load the HeaderComponent a click', () => {
        const floatinLabel = wrapper.find('input').at(0);
        floatinLabel.simulate('keyup');
    });

    it('should load the HeaderComponent a click', () => {
        wrapper.setState({ inputValue: true });
        wrapper.setProps({
            type: 'number',
            touched: true,
            value: 'test'
        });
        const floatinLabel = wrapper.find('input').at(0);
        floatinLabel.simulate('keyup');
    });
    it('should load the HeaderComponent a click', () => {
        wrapper.setState({ inputValue: '' });
        wrapper.setProps({
            type: 'number',
            touched: true,
            input: { value: '' }
        });
        const floatinLabel = wrapper.find('input').at(0);
        floatinLabel.simulate('keypress', { e: { target: { value: 'test' } }, which: 101, keyCode: 101 });
    });
    it('should load the HeaderComponent a click', () => {
        wrapper.setState({ inputValue: null });
        wrapper.setProps({
            type: 'number',
            isInfo: true,
            meta: { touched: true, error: 'error' },
            input: { value: '' }
        });
        const floatinLabel = wrapper.find('input').at(0);
        floatinLabel.simulate('keyup');
        floatinLabel.simulate('keypress', { e: { target: { value: 'test' } } });
    });
});
