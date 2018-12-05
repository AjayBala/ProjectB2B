import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SignUpReduxForm, {
    validate, SignupForm,
} from './SignupForm';

describe('Test suits for <SignupForm />', () => {
    let component;
    let shallowWrapper;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    const recaptchaVerifyCallback = sinon.spy();
    const recaptchaOnLoadCallback = sinon.spy();
    const checkSignupEmailDomain = sinon.spy();
    const clearRemoteError = sinon.spy();
    const checkHasGovEmail = sinon.spy();
    const isEmailHasGovermentEmail = sinon.spy();
    const handlePasswrdChange = sinon.spy();
    const change = sinon.spy();
    const props = {
        actions:
        {
            recaptchaVerifyCallback, recaptchaOnLoadCallback, checkSignupEmailDomain, checkHasGovEmail, handlePasswrdChange, isEmailHasGovermentEmail, clearRemoteError
        },
        change,
    };
    const mockStore = configureStore([]);
    const store = mockStore({
        signUp: {
            error: 'error',
            signUpDetails: {}
        }
    });
    beforeEach(() => {
        shallowWrapper = shallow(<SignupForm
            handleSubmit={handleSubmit}
            {...props}
            submitCase={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <SignUpReduxForm
                    submitCase={handleSubmit} />
            </Provider>,
        );
        ['length', 'special', 'capital']
            .forEach(id => {
                const p = global.document.createElement('p');
                p.id = id;
                global.document.body.appendChild(p);
            });
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });

    it('inValid Email and Password', () => {
        const input = { id: 'length', contains: () => {} };
        const instance = shallowWrapper.instance();
        instance.node = input;
        const aptError = validate({ emailId: '', password: '' });
        expect(aptError.emailId).to.equal('Required');
        expect(aptError.password).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ emailId: 'Overstock@' });
        expect(aptError.emailId).to.equal('Please Enter a Valid Email');
    });

    it('Valid password-test 3', () => {
        const input = { id: 'length', contains: () => {} };
        const instance = shallowWrapper.instance();
        instance.node = input;
        const aptError = validate({ password: 'Overstock!18' });
        expect(aptError.password).to.equal(undefined);
    });

    it('Valid Email', () => {
        const aptError = validate({ emailId: 'Overstock@gmail.com' });
        expect(aptError.emailId).to.equal(undefined);
    });

    it('checkHasGovEmail should be invoked with values', () => {
        const change = sinon.spy();
        shallowWrapper.setState({ passwordRequired: true, passwordHasVerified: true });
        shallowWrapper.setProps({ change, emailId: 'Overstock@gmail.com' });
        shallowWrapper.instance().checkHasGovEmail({ target: { checked: true } });
    });

    it('checkHasGovEmail should be invoked with values', () => {
        const change = sinon.spy();
        shallowWrapper.setProps({ change, emailId: 'Overstock@gmail.gov' });
        shallowWrapper.instance().checkHasGovEmail({ target: { checked: true } });
    });

    it('checkHasGovEmail should be invoked without values', () => {
        const change = sinon.spy();
        shallowWrapper.setProps({ change, emailId: 'Overstock@gmail.com' });
        shallowWrapper.instance().checkHasGovEmail({ target: { checked: false } });
    });

    it('Submit the form', () => {
        component.find('form').at(0).props().onSubmit();
    });
    it('funtion 1 should be invoked', () => {
        shallowWrapper.instance().recaptchaVerifyCallback();
    });
    it('funtion recaptchaOnLoadCallback should be invoked', () => {
        shallowWrapper.instance().recaptchaOnLoadCallback();
    });
    it('Trigger clearRemoteError method when user focused out from email field', () => {
        shallowWrapper.instance().state.serverErrorCheck = false;
        shallowWrapper.instance().clearRemoteError();
    });
    it('Trigger clearRemoteError method when user focused out from email field with out any servererror', () => {
        shallowWrapper.instance().clearRemoteError();
    });
    it('recaptchaIsShow should be Invoked', () => {
        shallowWrapper.instance().recaptchaIsShow({ target: { value: 'Overstock!18' } });
    });

    it('Trigger handle click method when user focused out from email field', () => {
        const e = {
            preventDefault: sinon.spy(),
        };
        shallowWrapper.instance().onBlurShow({ target: { defaultValue: 'test' } });
        shallowWrapper.setState({ serverErrorCheck: false });
        shallowWrapper.setProps({ change, SignUpError: 'user not found', emailId: 'Overstock@gmail.com', checkboxState: true });
        shallowWrapper.instance().isEmailHasGovermentEmail(e);
        shallowWrapper.setProps({ change, emailId: 'Overstock@gmail.gov', checkboxState: true });
        shallowWrapper.instance().isEmailHasGovermentEmail(e);
    });
    it('serverErrorCheck should be false', () => {
        shallowWrapper.setState({ serverErrorCheck: false });
        shallowWrapper.instance().onBlurShow({ target: { defaultValue: '' } });
        shallowWrapper.instance().recaptchaIsShow({ target: { value: '' } });
    });
});
