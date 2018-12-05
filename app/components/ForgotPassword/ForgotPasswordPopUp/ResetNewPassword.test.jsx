import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ResetNewPassword, { validate } from './ResetNewPassword';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';

describe('Test suits for <ResetNewPassword />', () => {
    const submitCase = sinon.spy();
    let wrapperCreateAcct;
    const handleSubmitMock = cb => cb({ emailId: 'test@test.com', password: 'password@123' });
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            context: { deviceType: { isDesktop: false } },
        });
        const handleSubmit = sinon.spy();
        wrapperCreateAcct = shallow(<ResetNewPassword
            handleSubmit={handleSubmit}
            submitCase={submitCase}/>);
        const component = mount(
            <Provider store={store}>
                <ResetNewPassword handleSubmit={handleSubmitMock}/>
            </Provider>,
        );

        ['length', 'special', 'capital']
        .forEach(id => {
            const p = global.document.createElement('p');
            p.id = id;
            global.document.body.appendChild(p);
        });
    });

    it('should render the component items properly', () => {
        expect(wrapperCreateAcct.contains('Enter a new password')).to.exist;
    });

    it('renders an error message for the input', () => {
        const input = { name: 'email' };
        const label = 'Email';
        const meta = { touched: true, error: 'Required' };
        const type = 'email';
        const placeholder = 'Email';
        const element = floatingLabelField({
            placeholder, label, type, input, meta,
        });
        shallow(element);
    });

    it('should render the component items properly', () => {
        expect(wrapperCreateAcct.contains(' Done ')).to.exist;
    });


    it('should render the component elements properly', () => {
        expect(wrapperCreateAcct.contains('form-group')).to.exist;
    });

    it('should render the component elements properly', () => {
        expect(wrapperCreateAcct.contains('loginBoxWrap')).to.exist;
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });

    it('inValid password-test', () => {
        const aptError = validate({ password: 'Overstock!' });
        expect(aptError.password).to.equal(undefined);
    });

    it('Confirm password-test', () => {
        const aptError = validate({ password: 'Overstock', confirmPassword: 'Overstock!' });
        expect(aptError.confirmPassword).to.equal('Please provide matching password');
    });
});
