import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import QuickverifyConnect, {
    validate, QuickVerify,
} from './Quickverify';
import { normalizeZip,
    normalizeCard } from '../../../common/Utils';

describe('Test suits for <Quickverify />', () => {
    let component;
    const submitCase = sinon.spy();
    const onChange = sinon.spy();
    let wrapperRedComp;
    const ProfessionalAction = sinon.spy();
    const props = {
        actions: {
            ProfessionalAction
        },
    };
    const formValues = [{
        name: 'name',
        value: 'test',
    }];
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
        professional: {
            cardDetialError: '',
            cardDetails: {},
        }
    });
    const handleSubmit = sinon.spy();
    const previousPage = sinon.spy();
    beforeEach(() => {
        wrapperRedComp = shallow(<QuickVerify
            {...props}
            handleSubmit={handleSubmit}
            previousPage={previousPage}
            submitCase={submitCase}
            change={onChange}
            formValues={formValues}/>);
        component = mount(
            <Provider store={store}>
                <QuickverifyConnect submitCase={handleSubmit}/>
            </Provider>,
        );
    });

    it('Check if the werapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });

    it('Quickverify page onFocus function trigger', () => {
        expect(component).to.exist;
        component.find('form').at(0).simulate('focus');
    });

    it('Quickverify page trigger normalizeZip', () => {
        let aptError = normalizeZip(undefined);
        expect(aptError).to.equal(undefined);
        aptError = normalizeZip('aaaa');
        expect(aptError).to.equal('');
    });

    it('Should be check starting 4 digits number', () => {
        const val = '6756';
        const cardError1 = normalizeCard(val);
        expect(cardError1).to.equal('6756-');
    });

    it('Should be check 8 digits number', () => {
        const val = '67777777';
        const cardError1 = normalizeCard(val);
        expect(cardError1).to.equal('6777-7777-');
    });

    it('Should be check 12 digits number', () => {
        const val = '677777778989';
        const cardError1 = normalizeCard(val);
        expect(cardError1).to.equal('67777777-8989-');
    });

    it('Should be check 12 digits number', () => {
        const val = '6777777789893';
        const cardError1 = normalizeCard(val);
        expect(cardError1).to.equal('6777-7777-8989-3');
    });

    it('Should be check 2 digits number', () => {
        const val = '67';
        const cardError1 = normalizeCard(val, '67');
        expect(cardError1).to.equal('67');
    });

    it('Should be check 6 digits number', () => {
        const val = '672299';
        const cardError1 = normalizeCard(val, '672299');
        expect(cardError1).to.equal('6722-99');
    });

    it('Should be check 10 digits number', () => {
        const val = '6722996666';
        const cardError1 = normalizeCard(val, '672299');
        expect(cardError1).to.equal('67229966-66');
    });

    it('Should be check 6 digits number', () => {
        const val = '';
        const cardError1 = normalizeCard(val, '');
        expect(cardError1).to.equal('');
    });

    it('Quickverify page trigger normalizeCard', () => {
        const aptError = normalizeCard(undefined, undefined);
        expect(aptError).to.equal(undefined);
    });

    it('Year should be at least 2019', () => {
        const aptError = validate({ year: 2020 });
        expect(aptError.year).to.equal(undefined);
    });

    it('Trigger method on field changes with value', () => {
        const e = { target: {
            name: 'desc',
            value: ' ',
        } };
        component.find('form').at(0).props().onChange(e);
    });

    it('Trigger method on field changes without value', () => {
        const e = { target: {
            name: '',
            value: '',
        } };
        component.find('form').at(0).props().onChange(e);
    });

    it('Trigger validate method', () => {
        const obj = validate({ cardNumber: '4111111111111111', expirationYear: 2020 });
        expect(obj).to.be.equal(obj);
    });

    it('Set the changed values in an global array', () => {
        const instance = component.instance();
        instance.formValues = [{
            name: 'name',
            value: 'test',
        }];
        const e = { target: {
            name: 'name',
            value: '',
        } };
        component.find('form').at(0).props().onChange(e);
    });
    it('Set the changed values in an global array with same values', () => {
        const instance = component.instance();
        instance.formValues = [{
            name: 'name',
            value: 'name',
        }];
        const e = { target: {
            name: '',
            value: '',
        } };
        component.find('form').at(0).props().onChange(e);
    });
    it('Set the changed values in an global array with same values', () => {
        wrapperRedComp.instance().handleServerError();
    });
});
