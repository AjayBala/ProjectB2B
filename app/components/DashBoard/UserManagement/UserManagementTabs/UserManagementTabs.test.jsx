import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccountTabsForm from './AccountTabs';

describe('Test case  for <AccountTabs />', () => {
    let wrapper;
    const signUpDetails = { id: 123, emailId: 'Overstock18@gmail.com', b2cCustomerId: 17227 };
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            myProfile: {
                signUpDetails
            }
        });
        wrapper = mount(
            <Provider store={store}>
                <AccountTabsForm />
            </Provider>,
        );
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should load the AccountTabs component', () => {
        expect(wrapper).to.exist;
        expect(wrapper).to.have.length(1);
    });
});
