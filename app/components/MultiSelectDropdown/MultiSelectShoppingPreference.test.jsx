import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import MultiSelectShoppingPreference from './MultiSelectShoppingPreference';

describe('<MultiSelectShoppingPreference />', () => {
    let MultiSelectShoppingPreferenceWrapper;
    let component;
        const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
        beforeEach(() => {
        MultiSelectShoppingPreferenceWrapper = shallow(<MultiSelectShoppingPreference />);
        component = mount(
            <Provider store={store}>
                <MultiSelectShoppingPreference />
            </Provider>,
        );
    });
    it('Should render the component', () => {
        expect(MultiSelectShoppingPreferenceWrapper).to.exist;
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
});
