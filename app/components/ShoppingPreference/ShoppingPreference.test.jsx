import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShoppingPreferenceForm, { ShoppingPreference } from './ShoppingPreference';

describe('<ShoppingPreference />', () => {
    let component;
    let wrapperRedComp;
    const mockStore = configureStore([]);
    const store = mockStore({
        professional: { initValue: 'Electronics' }
    });
    const handleSubmit = sinon.spy();
    const handleSubmitForm = sinon.spy();
    const shoppingPreferenceHasValue = sinon.spy();
    const change = sinon.spy();
    const selectedBusinessCategory = sinon.spy();
    const props = {
        actions:
        {
            shoppingPreferenceHasValue, selectedBusinessCategory
        },
    };
    beforeEach(() => {
        wrapperRedComp = shallow(<ShoppingPreference
            {...props}
            handleSubmit={handleSubmit}
            handleSubmitForm={handleSubmitForm}
            actions={props.actions}
            change={change}/>);
        component = mount(
            <Provider store={store}>
                <ShoppingPreferenceForm handleSubmit={handleSubmitForm}/>
            </Provider>,
        );


    });

    // afterEach(() => {
    //     component.unmount();
    // });

    it('Should render ShoppingPreference component', () => {
        expect(component).to.be.exist;
    });

    it('Shopping category method to have been called with value', () => {
        const instance = wrapperRedComp.instance();
        wrapperRedComp.setState({ shoppingPreferenceHasValue: true });
        instance.shoppingCategoryOnChange({}, { value: 'Baby' });
    });

    it('Shopping category method to have been called with empty value', () => {
        const instance = wrapperRedComp.instance();
        wrapperRedComp.setState({ shoppingPreferenceHasValue: true });
        instance.shoppingCategoryOnChange({}, { value: '' });
    });
});
