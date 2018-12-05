import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Documents from './Documents';

describe('<Documents />', () => {
    let DocumentsPopupWrapper;
    const onDocumentLoadSuccess = sinon.spy();
    const mockHistory = {
        push: sinon.spy(),
    };
    beforeEach(() => {
        DocumentsPopupWrapper = shallow(<Documents history={mockHistory} onDocumentLoadSuccess={onDocumentLoadSuccess}/>);
    });
    it('Should render the component', () => {
        expect(DocumentsPopupWrapper).to.exist;
    });

it('Password page API called and UI should render', () => {
    const wrapper = shallow(<Documents onDocumentLoadSuccess={onDocumentLoadSuccess} />);
    const instance = wrapper.instance();
    expect(instance).to.be.instanceOf(Documents);
});
it('renderAllPages funtion should be invoked', () => {
    DocumentsPopupWrapper.instance().renderAllPages();
});
it('onDocumentLoadSuccess funtion should be invoked', () => {
    const instance = DocumentsPopupWrapper.instance();
        instance.onDocumentLoadSuccess(1);
    });
});
