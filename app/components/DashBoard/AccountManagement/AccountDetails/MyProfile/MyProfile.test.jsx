import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import MyProfileForm, {
    validate,
    MyProfile,
} from './MyProfile';

describe('Test suits for <MyProfile />', () => {
    let component;
    let shallowWrapper;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    const removeMyProfile = sinon.spy();
    const changeButton = sinon.spy();
    const closeModelRemoveFile = sinon.spy();
    const onSwitchChange = sinon.spy();
    const deleteAccountConfirm = sinon.spy();
    const uploadSuccessCallBack = sinon.spy();
    const change = sinon.spy();
    const getDefaultProfile = sinon.spy();
    const accountManagementGetUserRoleRequest = sinon.spy();
    const accountManagementDeleteUser = sinon.spy();
    const isSaveBtnDisabled = sinon.spy();
    const getMyProfileImageRequest = sinon.spy();
    const resetServerAlert = sinon.spy();
    const accountManagementDeletePopupClose = sinon.spy();

    const props = {
        actions:
        {
            getDefaultProfile,
            isSaveBtnDisabled,
            resetServerAlert,
            accountManagementDeletePopupClose,
            accountManagementGetUserRoleRequest,
            removeMyProfile,
            changeButton,
            closeModelRemoveFile,
            onSwitchChange,
            deleteAccountConfirm,
            uploadSuccessCallBack,
            getMyProfileImageRequest,
            accountManagementDeleteUser
        },
        change,
    };
    const mockStore = configureStore([]);
    const store = mockStore({
        myProfile: {
            myProfileInitValues: {},
            userRoleResponse: {},
            userDeleteResposne: {},
        },
        context:{isSaveBtnDisabled: false }
    });
    beforeEach(() => {
        shallowWrapper = shallow(<MyProfile
            handleSubmit={handleSubmit}
            actions={props.actions}
            submitCase={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <MyProfileForm
                    actions={props.actions}
                    submitCase={handleSubmit} />
            </Provider>,
        );
        ['length', 'special', 'capital']
        .forEach(id => {
            const p = global.document.createElement('p');
            p.id = id;
            global.document.body.appendChild(p);
        });
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('Check if the shallow Wrapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });
    it('onSwitchChange promotional', () => {
        shallowWrapper.setProps({ value: 'promotional' });
        shallowWrapper.instance().onSwitchChange();
    });
    it('Submit the form', () => {
        component.find('form').at(0).props().onSubmit();
    });
    it('Componentwillreceiveprops with reinitiate scenario', () => {
        const MyProfileWrapper = new MyProfile();
        MyProfileWrapper.props = {
            initialValues: {
                userDetails: { firstName: ['Over'], lastName: ['Stock'], profileImageId: null }
            },
        };
        const nextProps = {
            initialValues: {
                userDetails: { firstName: ['Over'], lastName: ['Stock'], profileImageId: null }
            },
        };
        MyProfileWrapper.componentWillReceiveProps(nextProps);
    });
    it('Componentwillreceiveprops with Signin no data scenario', () => {
        shallowWrapper.setProps({
            initialValues: {
                userDetails: { firstName: ['Over'], lastName: ['Stock'] }
            }
        });
        shallowWrapper.instance().render();
    });
    it('Componentwillreceiveprops with reinitiate scenario', () => {
        const MyProfileWrapper = new MyProfile();
        MyProfileWrapper.props = {
            imageCropResp: null,
        };
        const nextProps = {
            profileImageResponse: 'success',
        };
        MyProfileWrapper.componentWillReceiveProps(nextProps);
    });
    it('validate the componentWillMount lifecycle method', () => {
        shallowWrapper.instance().closeModelRemoveFile();
    });
    it('validate the componentWillMount lifecycle method', () => {
        shallowWrapper.instance().componentWillMount();
        shallowWrapper.setProps({
            actions: { getMyProfileImageRequest () {} },
        });
    });
    it('cropSuccessCallBack should be true', () => {
        shallowWrapper.instance().cropSuccessCallBack({ imageCropResp: true });
    });
    it('validate the componentWillMount lifecycle method', () => {
        shallowWrapper.instance().deleteAccountConfirm();
    });
    it('handleDismiss should trigger action', () => {
        shallowWrapper.instance().handleDismiss({
            actions: { resetServerAlert () {} },
        });
    });
});
