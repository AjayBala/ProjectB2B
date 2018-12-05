import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import Cookie from 'js-cookie';
import CompanyProfileForm, {
    CompanyProfile,
} from './CompanyProfile';


describe('Test suits for <CompanyProfile />', () => {
    let component;
    let shallowWrapper;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    const getDefaultCompanyProfile = sinon.spy();
    const isButtonDisabled = sinon.spy();
    const changeButton = sinon.spy();
    const saveChanges = sinon.spy();
    const closeModel = sinon.spy();
    const closeModelAcc = sinon.spy();
    const closeModelRemoveFile = sinon.spy();
    const handlePdfFunction = sinon.spy();
    const deactivateAccount = sinon.spy();
    const RemoveComFile = sinon.spy();
    const removeMyProfile = sinon.spy();
    const change = sinon.spy();
    const getMyProfileImageRequest = sinon.spy();
    const resetServerAlert = sinon.spy();
    const props = {
        actions:
        {
            resetServerAlert, isButtonDisabled, getMyProfileImageRequest, getDefaultCompanyProfile, changeButton, saveChanges, closeModel, closeModelAcc, closeModelRemoveFile, handlePdfFunction, deactivateAccount, RemoveComFile, removeMyProfile
        },
        change,
    };
    const mockStore = configureStore([]);
        const store = mockStore({
            accountManagement: {
                companyProfileInitValues: {},
                error: 'failed',
                isValuesUpdated: false,
                isButtonDisabled: false,
            },
            signUp: {
                signUpDetails: {
                    companyInfo: {
                        profileImageId: 'b2b',
                    }
                }
            },
            signUser: {
                signUpDetails: {
                    companyInfo: {
                        profileImageId: 'b2b',
                    }
                }
            },
            professional: {
                professional: {}
            },
            myProfile: {
                profileImageResponse: '',
            }
    });

    beforeEach(() => {
        shallowWrapper = shallow(<CompanyProfile
            handleSubmit={handleSubmit}
            actions={props.actions}
            submitCase={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <CompanyProfileForm
                    actions={props.actions}
                    submitCase={handleSubmit} />
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('validate the componentWillMount lifecycle method', () => {
        shallowWrapper.instance().componentWillMount();
        shallowWrapper.setProps({
            actions: { getMyProfileImageRequest () {} },
        });
    });
    it('To invoke handleChange function without checkbox enabled', () => {
        expect(Cookie.get('signUserDetails')).to.be.undefined;
     });
    it('closeModel should be false', () => {
        shallowWrapper.instance().closeModel({ deactivateAcc: false, isModalAppear: false });
    });

    it('closeModelAcc should be false', () => {
        shallowWrapper.instance().closeModelAcc({ deactivateAcc: false });
    });

    it('closeModelRemoveFile should be false', () => {
        shallowWrapper.instance().closeModelRemoveFile({ RemoveComFileIcon: false });
    });

    it('deactivateAccount should be true', () => {
        shallowWrapper.instance().deactivateAccount({ deactivateAcc: true });
    });

    it('RemoveComFile should be true', () => {
        shallowWrapper.instance().RemoveComFile({ RemoveComFileIcon: true });
    });

    it('removeMyProfile should be true', () => {
        shallowWrapper.instance().removeMyProfile({ deactivateAcc: true });
    });
    it('cropSuccessCallBack should be true', () => {
        shallowWrapper.instance().cropSuccessCallBack({ imageCropResp: true });
    });
    it('handleDismiss should trigger action', () => {
        shallowWrapper.instance().handleDismiss({
            actions: { resetServerAlert () {} },
        });
    });
    it('Submit the form', () => {
        component.find('form').at(0).props().onSubmit();
    });
    it('Componentwillreceiveprops with reinitiate scenario', () => {
        const MyProfileWrapper = new CompanyProfile();
        MyProfileWrapper.props = {
            profileImageResponse: {
                userDetails: { firstName: ['Over'], lastName: ['Stock'], profileImageId: null }
            },
        };
        const nextProps = {
            initialValues: {
                userDetails: { firstName: ['Over'], lastName: ['Stock'], profileImageId: null }
            },
        };
        MyProfileWrapper.componentWillReceiveProps(nextProps);
        shallowWrapper.instance().componentWillReceiveProps({ profileImgURL: true });
    });
});
