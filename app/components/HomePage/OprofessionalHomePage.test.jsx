import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import OprofessionalHomeReduxPage, { OprofessionalHomePage } from './OprofessionalHomePage';


describe('Test suits for OprofessionalHomePage', () => {
    let shallowWrapper;
    let component;
    const getSignUpDetails = sinon.spy();
    const props = {
        actions: {
            getSignUpDetails
        },
        signUpDetails: {}
    };
    const mockStore = configureStore([]);
    const store = mockStore({
        signUp: { signUpDetails: {} },
        getSignUpDetails: {}
    });
    beforeEach(() => {
        shallowWrapper = shallow(<OprofessionalHomePage
            {...props}
        />);
        component = mount(
            <Provider store={store}>
                <OprofessionalHomeReduxPage />
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the OprofessionalHomePage wrapper component exist on load', () => {
        expect(shallowWrapper).to.exist;
    });

    it('validate the componentWillMount lifecycle method', () => {
        shallowWrapper.instance().componentWillMount();
        shallowWrapper.setProps({
            actions: { getSignUpDetails () {} },
        });
    });
    it('click the shop now button', () => {
        shallowWrapper.instance().redirectToB2C();
    });
    it('click the shop now button else', () => {
        shallowWrapper.instance().redirectToB2C();
    });
});
