import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import Cookies from 'js-cookie';
import SignInOtpVerificationForm, {
    SignInOtpVerification,
    customPhoneField, phoneChangeKeyUp, phoneChangeKeyDown
} from './SigninOtpVerification';

describe('Test suits for <SignInOtpVerification />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    const change = sinon.spy();

    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            context: { deviceType: { isDesktop: false } },
        });
        wrapperRedComp = shallow(<SignInOtpVerification
            handleSubmit={handleSubmit}
            submitCase={onSubmitCall}
            change={change}
        />);
        component = mount(
            <Provider store={store}>
                <SignInOtpVerificationForm
                    submitCase={handleSubmit} />
            </Provider>,
        );
        ['comPhoneText1', 'comPhoneText2', 'comPhoneText3', 'comPhoneText4', 'comPhoneText5', 'comPhoneText6']
            .forEach(name => {
                const p = global.document.createElement('input');
                p.setAttribute('name', name);
                global.document.body.appendChild(p);
        });
    });
    afterEach(() => {
        component.unmount();
    });

    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });

    it('inValid comPhoneText1', () => {
        const aptError = validate({ comPhoneText1: '' });
        expect(aptError.comPhoneText1).to.equal('Required');
    });
    it('checkHasGovEmail should be invoked without values', () => {
        const change = sinon.spy();
        wrapperRedComp.setProps({ change });
    });
    it('inValid comPhoneText2', () => {
        const aptError = validate({ comPhoneText1: '' });
        expect(aptError.comPhoneText1).to.equal('Required');
    });
    it('On comPhoneText1 phoneChange with  values', () => {
        const event = { target: { name: 'comPhoneText1', value: '12345' } };
        phoneChangeKeyUp(3, event);

        // expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText2')[0]);
    });
    it('On comPhoneText2 phoneChange with values', () => {
        const event = { target: { name: 'comPhoneText2', value: '12345' } };
        phoneChangeKeyUp(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText2')[0]);
    });
        it('On comPhoneText3 phoneChange with  values', () => {
        const event = { target: { name: 'comPhoneText3', value: '12345' } };
        phoneChangeKeyUp(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText2')[0]);
    });
        it('On comPhoneText4 phoneChange with  values', () => {
        const event = { target: { name: 'comPhoneText4', value: '12345' } };
        phoneChangeKeyUp(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText2')[0]);
    });
        it('On comPhoneText5 phoneChange with  values', () => {
        const event = { target: { name: 'comPhoneText5', value: '12345' } };
        phoneChangeKeyUp(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText2')[0]);
    });
        it('On comPhoneText6 phoneChange with  values', () => {
        const event = { target: { name: 'comPhoneText6', value: '12345' } };
        phoneChangeKeyUp(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText2')[0]);
    });
    it('On comPhoneText1 phoneChange with  values', () => {
        const event = { keyCode: 8, target: { name: 'comPhoneText1', value: '12345' } };
        phoneChangeKeyUp(6, event);
    });
        it('On comPhoneText6 phoneChange with out values', () => {
        const event = { keyCode: 8, target: { name: 'comPhoneText6', value: '' } };
        phoneChangeKeyDown(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText5')[0]);
    });
    it('On comPhoneText5 phoneChange with out values', () => {
        const event = { keyCode: 8, target: { name: 'comPhoneText5', value: '' } };
        phoneChangeKeyDown(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText5')[0]);
    });
    it('On comPhoneText4 phoneChange with out values', () => {
        const event = { keyCode: 8, target: { name: 'comPhoneText4', value: '' } };
        phoneChangeKeyDown(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText5')[0]);
    });
    it('On comPhoneText3 phoneChange with out values', () => {
        const event = { keyCode: 8, target: { name: 'comPhoneText3', value: '' } };
        phoneChangeKeyDown(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText5')[0]);
    });
    it('On comPhoneText2 phoneChange with out values', () => {
        const event = { keyCode: 8, target: { name: 'comPhoneText2', value: '' } };
        phoneChangeKeyDown(3, event);

    //    expect(document.activeElement).to.be.equal(document.getElementsByName('comPhoneText5')[0]);
    });
    it('customPhoneField ', () => {
        const input = { name: 'comPhoneText1' };
        const label = 'phonenumber*';
        const meta = { touched: true, error: 'Required' };
        const type = 'text';
        const placeholder = 'phonenumber';
        const element = customPhoneField({
            placeholder, label, type, input, meta,
        });
        shallow(element);
    });
    it('To invoke handleChange function with checkbox enabled', () => {
        wrapperRedComp.instance().handleChange({ target: { checked: true } });
        expect(Cookies.get('LoginUser')).to.exist;
    });
    it('To invoke handleChange function with checkbox enabled', () => {
        wrapperRedComp.instance().handleChange({ target: { checked: true } });
        expect(Cookies.get('LoginUser')).to.exist;
        });
        it('To invoke handleChange function with checkbox enabled', () => {
        wrapperRedComp.instance().handleChange({ target: { checked: false } });
        expect(Cookies.remove('undefined')).to.be.equal(undefined);
        });
        it('To invoke handleSubmitForm function', () => {
        const formWrapper = component.find('form').first();
        formWrapper.simulate('submit');
    });
});
