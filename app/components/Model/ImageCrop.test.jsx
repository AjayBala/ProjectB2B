import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ImageCrop from './ImageCrop';

describe('<ImageCrop />', () => {
    let ModalPopupWrapper;
    beforeEach(() => {
        ModalPopupWrapper = shallow(<ImageCrop/>);
    });
    it('Should render the component', () => {
        expect(ModalPopupWrapper).to.exist;
    });
    it('should trigger the relevant functions', (image, pixelCrop) => {
        const instance = ModalPopupWrapper.instance();
        instance.onImageLoaded();
        instance.onCropChange();
        instance.onUploadClick();
        instance.onCropComplete();
        instance.getCroppedImg(image, pixelCrop);
    });
    it('Should trigger hide click method on cancel', () => {
        ModalPopupWrapper.find('Button').at(0).simulate('click');
    });
    it('Modal popup on confirmation', () => {
        ModalPopupWrapper.find('Button').at(1).simulate('click');
    });
});
