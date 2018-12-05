import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SignInForm, { SignIn } from './Signin';

describe('Test suits for <SignIn />', () => {
    let component;
    const nextPage = sinon.spy();
    const previousPage = sinon.spy();
    const SignInRequestActionSend = sinon.spy();
    const AuthenticationRequired = sinon.spy();
    const signInRequest = sinon.spy();
    const props = {
        actions:
        {
            nextPage, previousPage, SignInRequestActionSend, AuthenticationRequired, signInRequest,
        },
    };
    const shallowWrapper = shallow(
        <SignIn AuthenticationRequired={() => {}} {...props} />,
    );
    const mockStore = configureStore([]);
    const store = mockStore({
        signIn: {
            SignInUser: ''
        }
    });
    beforeEach(() => {
        component = mount(
            <Provider store={store}>
                <SignInForm
                    submitCase={AuthenticationRequired} />
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });


    it('Check if the wrapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });

    it('Signin page API called and UI should render', () => {
        const input = { id: 'length', contains: () => {} };
        const instance = shallowWrapper.instance();
        instance.node = input;
        instance.nextPage();
        instance.previousPage();
        instance.SignInRequestActionSend();
        });

    it('Signin page after render', () => {
        const instance = shallowWrapper.instance();
        instance.nextPage();
        instance.nextPage();
        shallowWrapper.setState({ currentStep: 2 });
    });

    it('Signin page after render', () => {
        const SignInWrapper = new SignIn();
        SignInWrapper.props = {
            signInUser: { id: '12345' },
        };
        const nextProps = {
            signInUser: { id: '12345' },
        };
        shallowWrapper.instance().AuthenticationRequired({ isAuthenticationRequired: true });
        SignInWrapper.componentWillReceiveProps(nextProps);
    });

    it('Componentwillreceiveprops with Signin no data scenario', () => {
        shallowWrapper.setProps({
            signInUser: { id: '' },
        });
        shallowWrapper.instance().render();
    });
});
