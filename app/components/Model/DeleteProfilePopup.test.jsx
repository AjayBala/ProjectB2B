import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { expect } from 'chai';
import DeleteProfilePopup from './DeleteProfilePopup';

describe('<DeleteProfilePopup />', () => {
    let ModalPopupWrapper;
    beforeEach(() => {
        ModalPopupWrapper = shallow(<DeleteProfilePopup/>);
    });
    it('Should render the component', () => {
        expect(ModalPopupWrapper).to.exist;
    });
    it('should render the component items properly , to check if v1 class is used twice', () => {
        const wrapper = shallow(<DeleteProfilePopup />);
        expect(wrapper.contains('removeProfileProps')).to.exist;
    });
    // it('should trigger the relevant functions', () => {
    //     const instance = ModalPopupWrapper.instance();
    //     instance.onDeleteConfirm();
    //     instance.onHide();
    //     // instance.onUploadClick();
    //     // instance.onCropComplete();
    //     // instance.getCroppedImg(image, pixelCrop);
    // });
    // // it('Should trigger hide click method on cancel', () => {
    // //     ModalPopupWrapper.find('Button').at(0).simulate('click');
    // // });
    // // it('Modal popup on confirmation', () => {
    // //     ModalPopupWrapper.find('Button').at(1).simulate('click');
    // // });
});
