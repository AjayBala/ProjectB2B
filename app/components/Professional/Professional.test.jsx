import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import ProfessionalPage, { Professional } from './Professional';

describe('Test suits for <Professional />', () => {
    let wrapper;
    const bussinessCategorysList = [{
        id: 3,
        text: 'Carpenter',
        value: 'Carpenter'
    },
    {
        id: 4,
        text: 'Contractor',
        value: 'Contractor'
     },
    {
       id: 24,
       text: 'Other',
       value: 'Other'
    }];
    const companyInfo = {
        isNonProfitOrg: false,
        isReseller: false,
        name: '',
        email: '',
        ein: '',
        uploadFile: {},
        categorys: ['Carpenter', 'Contractor'],
        agencyName: '',
        otherCategory: '',
    };
    const signUpDetails = { id: 123, emailId: 'Overstock18@gmail.com', b2cCustomerId: 17227 };
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            context: { deviceType: { isDesktop: false } },
            signUp: { signUpDetails },
            professional: { bussinessCategorysList: [],
                stageIndex: 1,
                 companyInfoSuccess: 'Success',
                 categorys: [{ id: 2, text: 'Carpenter', value: 'Carpenter' }] }
        });
        wrapper = mount(
            <Provider store={store}>
                <ProfessionalPage />
            </Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should load the Professional component', () => {
        expect(wrapper).to.exist;
    });

    it('Professional page API called and UI should render', () => {
        const getSignUpDetails = sinon.spy();
        const getBusinessCategorys = sinon.spy();
        const uploadFileCompanyInfo = sinon.spy();
        const createCompanyInfo = sinon.spy();
        const createCardDetails = sinon.spy();
        const getSignupCustomerById = sinon.spy();
        const decrementStage = sinon.spy();
        const createShoppingPreferences = sinon.spy();
        wrapper = shallow(<Professional
            currentStageIndex={1}
            signUpDetails={signUpDetails}
            bussinessCategorysList={bussinessCategorysList}
            actions={{
                getSignUpDetails,
                getBusinessCategorys,
                uploadFileCompanyInfo,
                createCompanyInfo,
                createCardDetails,
                getSignupCustomerById,
                decrementStage,
                createShoppingPreferences
            }}
        />);
        const instance = wrapper.instance();
        instance.nextPage(companyInfo);
        instance.previousPage();
        companyInfo.otherCategory = 'test Other category 1';
        companyInfo.categorys = ['Education'];
        companyInfo.uploadFile = null;
        instance.nextPage(companyInfo);
        instance.onSubmit({ shoppingPrefrences: ['Electronics', 'Painting'] });
        expect(wrapper).to.have.length(1);
        wrapper.setProps({
            currentStageIndex: 2
        });
        const CardDetails = {
            nameOnCard: '',
            cardNumber: '4111111111111111',
            expirationMonth: '',
            expirationYear: '',
            cvv: '',
            address1: '28 test Road',
            city: '',
            state: '',
            email: '',
            zip: '',
        };
        instance.nextPage(CardDetails);
        instance.businessTypeChange({ type: 'Corporation' });
        CardDetails.address1 = '';
        CardDetails.cardNumber = '';
        instance.nextPage(CardDetails);
        wrapper.setProps({
            currentStageIndex: 3,
            signUpDetails: {}
        });
        instance.previousPage();
        instance.nextPage({});
    });
});
