import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import DeactivateComAccount from './DeactivateComAccount';

describe('<DeactivateComAccount />', () => {
    let DeactivateComAccountPopupWrapper;
    let component;
    const handleSubmit = sinon.spy();
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    const handleSubmitMock = cb => cb({ push: sinon.spy() });
    beforeEach(() => {
        DeactivateComAccountPopupWrapper = shallow(<DeactivateComAccount handleSubmit={handleSubmit} />);
        component = mount(
            <Provider store={store}>
                <DeactivateComAccount
                    handleSubmit={handleSubmitMock}
                    />
            </Provider>,
        );
    });
    it('Should render the component', () => {
        expect(DeactivateComAccountPopupWrapper).to.exist;
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('Password page API called and UI should render', () => {
    const wrapper = shallow(<DeactivateComAccount handleSubmit={handleSubmit} />);
    const instance = wrapper.instance();
    expect(instance).to.be.instanceOf(DeactivateComAccount);
});
});
