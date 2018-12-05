import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProfessionalInfoPage, {
    ProfessionalInfo,
    validate,
} from './ProfessionalInfo';
import { required } from '../../../common/Utils';

describe('Test suits for <ProfessionalInfo />', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
        signUp: { signUpDetails: { id: '1' } },
        professional: { companyInfoError: 'Test Error Message', companyInfoInitValues: 'Test_Value', businessCategoryHasUpload: true, selectedFile: '' }
    });
    const defautStoreVal = mockStore({
        context: { deviceType: { isDesktop: false } },
        signUp: { },
        professional: { }
    });
    const signUpDetails = { id: 1 };
    const getSignupCustomerById = sinon.spy();
    const getBusinessCategorys = sinon.spy();
    const businessCategoryHasValue = sinon.spy();
    const selectedBusinessCategory = sinon.spy();
    const businessCategoryHasUpload = sinon.spy();
    const fileChange = sinon.spy();
    const props = {
        actions:
        {
            getSignupCustomerById, getBusinessCategorys, businessCategoryHasValue, selectedBusinessCategory, businessCategoryHasUpload, fileChange
        },
    };
    const change = sinon.spy();
    let wrapper;
    let shallowWrapper;
    const handleSubmit = sinon.spy();

    beforeEach(() => {
        shallowWrapper = shallow(<ProfessionalInfo
            signUpDetails={signUpDetails}
            change={change}
            actions={props.actions}/>);
        wrapper = mount(
            <Provider store={store}>
                <ProfessionalInfoPage
                    submitCase={handleSubmit}/>
            </Provider>,
        );
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should load the professionalInfoForm component', () => {
        expect(wrapper).to.exist;
        expect(wrapper).to.have.length(1);
    });

    it('should load the professionalInfoForm component with default values', () => {
        const wrapperWithDefault = mount(
            <Provider store={defautStoreVal}>
                <ProfessionalInfoPage
                    submitCase={handleSubmit}/>
            </Provider>,
        );
        expect(wrapperWithDefault).to.exist;
        expect(wrapperWithDefault).to.have.length(1);
    });

    it('Should be called required with value', () => {
        const aptError = required('name');
        expect(aptError).to.equal(undefined);
    });
    it('inValid Email', () => {
        const aptError = validate({ email: '' });
        expect(aptError.email).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ email: 'Overstock@' });
        expect(aptError.email).to.equal('Please Enter a Valid Email');
    });

    it('Passing valid emailId', () => {
        const aptError = validate({ email: 'Overstock@gmail.com' });
        expect(aptError.email).to.equal(undefined);
    });

    it('handle server error method to be called', () => {
        wrapper.find('button').at(0).simulate('click');
    });

    it('BusinessCategoryOnChange method to have been called with value', () => {
        const instance = shallowWrapper.instance();
        instance.BusinessCategoryOnChange({}, { value: 'Contractor' });
    });

    it('BusinessCategoryOnChange method to have been called with empty value', () => {
        const instance = shallowWrapper.instance();
        instance.BusinessCategoryOnChange({}, { value: '' });
    });

    it('BusinessCategoryOnChange method to have been called with contractor value in it', () => {
        const instance = shallowWrapper.instance();
        instance.BusinessCategoryOnChange({}, { value: 'Other' });
    });

    it('file change method is called', () => {
        const instance = shallowWrapper.instance();
        instance.fileChange({ target: { value: 'ofs.dox' } });
    });
});
