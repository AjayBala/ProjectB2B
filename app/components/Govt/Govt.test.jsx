import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GovtPage, { Govt } from './Govt';

describe('Test case  for <Govt />', () => {
    let wrapper;
    const govtcategorysList = [{
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
            professional: { govtcategorysList: [],
                stageIndex: 1 },
            govt: {
                categorys: [{ id: 2, text: 'Carpenter', value: 'Carpenter' }]
            }
        });
        wrapper = mount(
            <Provider store={store} >
                <GovtPage />
            </Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should load the HeaderComponent component', () => {
        expect(wrapper).to.exist;
    });
    it('Professional page API called and UI should render', () => {
        const getSignUpDetails = sinon.spy();
        const getGovtCategorys = sinon.spy();
        const uploadFileCompanyInfo = sinon.spy();
        const createCompanyInfo = sinon.spy();
        const createCardDetails = sinon.spy();
        const getSignupCustomerById = sinon.spy();
        const decrementStage = sinon.spy();
        const createShoppingPreferences = sinon.spy();
        wrapper = shallow(<Govt
            currentStageIndex={1}
            signUpDetails={signUpDetails}
            govtcategorysList={govtcategorysList}
            actions={{
                getSignUpDetails,
                getGovtCategorys,
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
        companyInfo.categorys = [];
        instance.nextPage(companyInfo);
        instance.onSubmit({ shoppingPrefrences: ['Electronics', 'Painting'] });
        expect(wrapper).to.have.length(1);
        wrapper.setProps({
            currentStageIndex: 2,
            signUpDetails: {}
        });
        instance.previousPage();
        instance.nextPage({});
    });
});
