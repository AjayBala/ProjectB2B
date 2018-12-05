
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SignInOtpPhoneNumberForm, {
    SignInOtpPhoneNumber, normalizePhone
} from './SigninOtpPhoneNumber';

describe('Test suits for <SigninOtpPhoneNumber />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    beforeEach(() => {
        wrapperRedComp = shallow(<SignInOtpPhoneNumber
            handleSubmit={handleSubmit}
        />);
        component = mount(
            <Provider store={store}>
                <SignInOtpPhoneNumberForm
                    submitCase={handleSubmit} />
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('Should be check 10 digits number', () => {
        const val = '6756768687';
        const zipError1 = normalizePhone(val, '6756768687');
        expect(zipError1).to.equal('675-676-8687');
    });
    it('To invoke onhandleClick function', () => {
                wrapperRedComp.instance().onhandleClick();
                                   });
    it('Should be check 6 digits number', () => {
        const val = '';
        const zipError1 = normalizePhone(val, '');
        expect(zipError1).to.equal('');
});
it('Should be check 6 digits number', () => {
    const val = '672299';
    const zipError1 = normalizePhone(val, '672299');
    expect(zipError1).to.equal('672-299');
});
it('Should be check 2 digits number', () => {
    const val = '67';
    const zipError1 = normalizePhone(val, '67');
    expect(zipError1).to.equal('67');
});

it('Send OTP by phone', () => {
    wrapperRedComp.find('input').at(0).simulate('change');
});
it('Send OTP by textMessage', () => {
    wrapperRedComp.find('input').at(1).simulate('change');
});

it('Send OTP by voiceCall', () => {
    wrapperRedComp.find('input').at(2).simulate('change');
});
it('Send OTP by email', () => {
    wrapperRedComp.find('input').at(3).simulate('change');
});
});
