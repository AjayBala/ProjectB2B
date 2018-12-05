import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import RemoveCompanyFile from './RemoveCompanyFile';

describe('Test suits for <RemoveCompanyFile />', () => {
    let component;
    const handleSubmit = sinon.spy();
    const onHide = sinon.spy();
    const submitCase = sinon.spy();
    let wrapperRedComp;
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
       const handleSubmitMock = cb => cb({ push: sinon.spy() });
    beforeEach(() => {
        wrapperRedComp = shallow(<RemoveCompanyFile
            handleSubmit={handleSubmit}
            onHide={onHide}
            onClick={onHide}
            submitCase={submitCase}/>);
        component = mount(
            <Provider store={store}>
                <RemoveCompanyFile handleSubmit={handleSubmitMock}/>
            </Provider>,
        );
});
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });
});