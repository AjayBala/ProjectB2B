import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import FileUploadComponent, { FieldFileInput } from './FileUpload';

describe('File Upload component', () => {
    let component;
    const onChange = sinon.spy();
    const fileChange = sinon.spy();
    const selectedFile = undefined;
    const props = { input: { onChange }, meta: { touched: {}, error: {} }, selectedFile, fileChange };
    const propsForFileUpload = { selectedFile, fileChange };

    beforeEach(() => {
        component = shallow(<FileUploadComponent props={propsForFileUpload}/>);
    });

    it('Check the fileupload component', () => {
        expect(component).to.exist;
    });

    it('Check the field file input component', () => {
        const wrapper = FieldFileInput(props, selectedFile);
        shallow(wrapper);
    });
});
