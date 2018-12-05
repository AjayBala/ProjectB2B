import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import Cookie from 'js-cookie';
import SignInReduxForm, {
    validate, SignInForm
} from './SigninForm';

describe('Test suits for <SignInForm />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            signIn: {
                SignInUser: ''
            }
        });
        wrapperRedComp = shallow(<SignInForm
            handleSubmit={handleSubmit}
            onSubmitCall={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <SignInReduxForm
                    onSubmitCall={onSubmitCall}/>
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });

    it('Check if the wrapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });
    it('inValid Email', () => {
        const aptError = validate({ emailId: '' });
        expect(aptError.emailId).to.equal('Required');
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ emailId: 'Overstock@' });
        expect(aptError.emailId).to.equal('Please Enter a Valid Email');
    });

    it('Valid Email', () => {
        const aptError = validate({ emailId: 'Overstock@gmail.com' });
        expect(aptError.emailId).to.equal(undefined);
    });

    it('Valid password', () => {
        const aptError = validate({ password: 'Overstock18' });
        expect(aptError.password).to.equal(undefined);
    });
    it('To invoke handleChange function without checkbox enabled', () => {
        wrapperRedComp.instance().handleChange({ target: { checked: false } });
        expect(Cookie.get('LoginUser')).to.be.undefined;
     });
     it('To invoke handleChange function with checkbox enabled', () => {
        wrapperRedComp.instance().handleChange({ target: { checked: true } });
        expect(Cookie.get('LoginUser')).to.exist;
     });
    it('To invoke escFunction calls preventDefault', () => {
        const data = { keyCode: 32, preventDefault: sinon.spy() };
        wrapperRedComp.instance().escFunction(data);
        expect(data.preventDefault.called).to.be.equal(true);
    });
    it('should render the component items properly', () => {
        const wrapper = shallow(<SignInForm />);
        expect(wrapper.find('.formWrap')).to.have.lengthOf(1);
    });
    it('should render the component elements properly', () => {
        component = shallow(<SignInForm handleSubmit={() => {}} />);
        expect(component.contains('formWrap')).to.exist;
    });
    it('To invoke handleChange function with checkbox enabled', () => {
            wrapperRedComp.instance().handleChange({ target: { checked: true } });
        expect(Cookie.get('LoginUser')).to.exist;
    });
        it('CloseModelRemoveFile should be false', () => {
        wrapperRedComp.instance().clearRemoteError();
    });
});
