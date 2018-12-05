import { expect } from 'chai';
import * as MyProfileActionTypes from '../actionTypes/MyProfileActionTypes';
import * as actions from './MyProfileAction';

describe('My Profile Actions', () => {
    describe('My Profile Action Form', () => {
        let MyProfileRequest = null;
        it('returns correct action type get note', () => {
            MyProfileRequest = actions.MyProfileRequest();
            expect(MyProfileRequest.type).to.equal(MyProfileActionTypes.GET_PROFILE_REQUEST);
        });
    });
    describe('My Profile accountManagementDeletePopupClose', () => {
        let accountManagementDeletePopupClose = null;
        it('returns correct action type accountManagementDeletePopupClose', () => {
            accountManagementDeletePopupClose = actions.accountManagementDeletePopupClose();
            expect(accountManagementDeletePopupClose.type).to.equal(MyProfileActionTypes.RESET_DELETE_POPUP_OPEN);
        });
    });
    describe('My Profile getDefaultProfile', () => {
        let getDefaultProfile = null;
        it('returns correct action type getDefaultProfile', () => {
            getDefaultProfile = actions.getDefaultProfile();
            expect(getDefaultProfile.type).to.equal(MyProfileActionTypes.GET_DEFAULT_PROFILE);
        });
    });
    describe('My Profile accountManagementGetUserRoleRequest', () => {
        let accountManagementGetUserRoleRequest = null;
        it('returns correct action type accountManagementGetUserRoleRequest', () => {
            accountManagementGetUserRoleRequest = actions.accountManagementGetUserRoleRequest();
            expect(accountManagementGetUserRoleRequest.type).to.equal(MyProfileActionTypes.ACCOUNT_MANAGEMENT_GET_USER_ROLE_REQUEST);
        });
    });
    describe('My Profile accountManagementDeleteUser', () => {
        let accountManagementDeleteUser = null;
        it('returns correct action type accountManagementDeleteUser', () => {
            accountManagementDeleteUser = actions.accountManagementDeleteUser();
            expect(accountManagementDeleteUser.type).to.equal(MyProfileActionTypes.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_REQUEST);
        });
    });
    describe('My Profile profileImageUploadRequest', () => {
        let profileImageUploadRequest = null;
        it('returns correct action type profileImageUploadRequest', () => {
            profileImageUploadRequest = actions.profileImageUploadRequest();
            expect(profileImageUploadRequest.type).to.equal(MyProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_REQUEST);
        });
    });
    describe('My Profile profileImageUploadSuccess', () => {
        let profileImageUploadSuccess = null;
        it('returns correct action type profileImageUploadSuccess', () => {
            profileImageUploadSuccess = actions.profileImageUploadSuccess();
            expect(profileImageUploadSuccess.type).to.equal(MyProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_SUCCESS);
        });
    });
    describe('My Profile profileImageUploadError', () => {
        let profileImageUploadError = null;
        it('returns correct action type profileImageUploadError', () => {
            profileImageUploadError = actions.profileImageUploadError();
            expect(profileImageUploadError.type).to.equal(MyProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR);
        });
    });
    describe('My Profile updateMyProfileRequest', () => {
        let updateMyProfileRequest = null;
        it('returns correct action type updateMyProfileRequest', () => {
            updateMyProfileRequest = actions.updateMyProfileRequest();
            expect(updateMyProfileRequest.type).to.equal(MyProfileActionTypes.UPDATE_MY_PROFILE_REQUEST);
        });
    });
    describe('My Profile updateMyProfileSuccess', () => {
        let updateMyProfileSuccess = null;
        it('returns correct action type updateMyProfileSuccess', () => {
            updateMyProfileSuccess = actions.updateMyProfileSuccess();
            expect(updateMyProfileSuccess.type).to.equal(MyProfileActionTypes.UPDATE_MY_PROFILE_SUCCESS);
        });
    });
    describe('My Profile updateMyProfileError', () => {
        let updateMyProfileError = null;
        it('returns correct action type updateMyProfileError', () => {
            updateMyProfileError = actions.updateMyProfileError();
            expect(updateMyProfileError.type).to.equal(MyProfileActionTypes.UPDATE_MY_PROFILE_ERROR);
        });
    });
    describe('My Profile isSaveBtnDisabled', () => {
        let isSaveBtnDisabled = null;
        it('returns correct action type isSaveBtnDisabled', () => {
            isSaveBtnDisabled = actions.isSaveBtnDisabled();
            expect(isSaveBtnDisabled.type).to.equal(MyProfileActionTypes.IS_SAVE_BUTTON_DISABLED);
        });
    });
    describe('My Profile getMyProfileImageRequest', () => {
        let getMyProfileImageRequest = null;
        it('returns correct action type getMyProfileImageRequest', () => {
            getMyProfileImageRequest = actions.getMyProfileImageRequest();
            expect(getMyProfileImageRequest.type).to.equal(MyProfileActionTypes.GET_PROFILE_IMAGE_REQUEST);
        });
    });
    describe('My Profile getProfileImageSuccess', () => {
        let getProfileImageSuccess = null;
        it('returns correct action type getProfileImageSuccess', () => {
            getProfileImageSuccess = actions.getProfileImageSuccess();
            expect(getProfileImageSuccess.type).to.equal(MyProfileActionTypes.GET_PROFILE_IMAGE_SUCCESS);
        });
    });
    describe('My Profile getProfileImageError', () => {
        let getProfileImageError = null;
        it('returns correct action type getProfileImageError', () => {
            getProfileImageError = actions.getProfileImageError();
            expect(getProfileImageError.type).to.equal(MyProfileActionTypes.GET_PROFILE_IMAGE_ERROR);
        });
    });
    describe('My Profile resetServerAlert', () => {
        let resetServerAlert = null;
        it('returns correct action type resetServerAlert', () => {
            resetServerAlert = actions.resetServerAlert();
            expect(resetServerAlert.type).to.equal(MyProfileActionTypes.RESEST_SERVER_ERROR_MSG);
        });
    });
    describe('My Profile accountManagementDeletePopupClose ', () => {
        let accountManagementDeletePopupClose  = null;
        it('returns correct action type accountManagementDeletePopupClose ', () => {
            accountManagementDeletePopupClose  = actions.accountManagementDeletePopupClose ();
            expect(accountManagementDeletePopupClose .type).to.equal(MyProfileActionTypes.RESET_DELETE_POPUP_OPEN);
        });
    });
});
